<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $posts = Post::with([
            'user' => function ($query) {
                $query->select('id', 'username', 'avatar', 'name');
            }
        ])
            ->withCount('likes') // Adds likes_count to each post
            ->get()
            ->map(function ($post) {
                return [
                    'id' => $post->id,
                    'content' => $post->content,
                    'user' => $post->user,
                    'likes_count' => $post->likes_count,
                    'liked_by_user' => auth()->check() ? $post->likes()->where('user_id', auth()->id())->exists() : false,
                    'created_at' => $post->created_at->toIso8601String(),
                ];
            });

        return Inertia::render('Home', ['posts' => $posts]);
    }
}
