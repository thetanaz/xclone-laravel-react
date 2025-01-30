<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function view($username)
    {
        $user = User::where('username', $username)
            ->with(['posts' => function ($query) {
                $query->latest()->take(20);
            }])
            ->select('id', 'username', 'name', 'avatar', 'banner')
            ->firstOrFail(); // Automatically throws 404 if not found

        $postCount = $user->posts()->count();

        return Inertia::render('UserPage', [
            'user' => $user,
            'posts' => $user->posts,
            'postCount' => $postCount,
        ]);
    }
}
