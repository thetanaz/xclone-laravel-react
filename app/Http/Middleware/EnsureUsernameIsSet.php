<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUsernameIsSet
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next)
    {
        // Get user from already-loaded session data
        $user = $request->user();

        if (!$user) { // Not authenticated
            return redirect()->route('login');
        }

        if (!$user->username) { // No database query here
            return redirect()->route('username.create');
        }

        return $next($request);
    }
}
