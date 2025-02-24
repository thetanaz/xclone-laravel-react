<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function toggle(Post $post)
    {
        $user = auth()->user();

        if ($post->likedBy($user)) {
            $post->likes()->where('user_id', $user->id)->delete();
            return response()->json(['message' => 'Unliked', 'likes_count' => $post->likes()->count()]);
        }

        $post->likes()->create(['user_id' => $user->id]);
        return response()->json(['message' => 'Liked', 'likes_count' => $post->likes()->count()]);
    }
}
