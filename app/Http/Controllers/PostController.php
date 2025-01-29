<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatePostRequest;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function store(CreatePostRequest $request)
    {
        $validatedData = $request->validated();

        $post = Post::create([
            'user_id' => auth()->id(),
            'content' => $validatedData['content'],
            'gif' => $validatedData['gif'] ?? null,
            'images' => $validatedData['images'] ?? null,
            'parent_id' => $validatedData['parent_id'] ?? null,
        ]);

        return response()->json([
            'message' => 'Post created successfully',
            'post' => $post
        ], 201);
    }
}
