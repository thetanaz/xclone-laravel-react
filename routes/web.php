<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\EnsureUsernameIsSet;
use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

Route::get('/', function (Request $request) {
    if ($request->user()) {
        return redirect(route('home'));
    }
    return redirect(route('login'));
});

Route::get('/gifs/trending', function (Request $request) {
    $response = Http::get('https://api.giphy.com/v1/gifs/trending', [
        'api_key' => config('services.giphy.key'),
        'limit' => 12,
        'offset' => $request->input('offset', 0)
    ]);

    return $response->json();
})->middleware('auth');;

Route::get('/gifs/search', function (Request $request) {
    $response = Http::get('https://api.giphy.com/v1/gifs/search', [
        'api_key' => config('services.giphy.key'),
        'q' => $request->input('q'),
        'limit' => 12,
        'offset' => $request->input('offset', 0)
    ]);
    return $response->json();
})->middleware('auth');



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', EnsureUsernameIsSet::class])->group(function () {

    Route::get('/home', function () {

        $posts = Post::with(['user' => function ($query) {
            $query->select('id', 'username', 'avatar', 'name');
        }])->get();
        return Inertia::render('Home', ['posts' => $posts]);
    })->name('home');
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/messages', function (Request $request) {
        return Inertia::render('Messages');
    });
    Route::post('/posts/store', [PostController::class, 'store']);
    Route::get('/posts/{id}', [PostController::class, 'view']);
});

require __DIR__ . '/auth.php';

Route::get('/{username}', [UserController::class, 'view']);
