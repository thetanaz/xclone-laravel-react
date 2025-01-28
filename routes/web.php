<?php

use App\Http\Controllers\ProfileController;
use App\Http\Middleware\EnsureUsernameIsSet;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

Route::get('/', function (Request $request) {
    if ($request->user()) {
        return redirect(route('home'));
    }
    return redirect(route('login'));
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', EnsureUsernameIsSet::class])->group(function () {
    Route::get('/home', function () {
        return Inertia::render('Home');
    })->name('home');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/messages', function (Request $request) {
        return Inertia::render('Messages');
    });
});

require __DIR__ . '/auth.php';
