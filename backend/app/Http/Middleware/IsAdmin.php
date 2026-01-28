<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // 1. Check if user is logged in
        if (!auth()->check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // 2. Check if user has the 'admin' role
        if (auth()->user()->role !== 'admin') {
            return response()->json(['message' => 'Access Denied: Admins Only'], 403);
        }

        // 3. If they are admin, let them pass
        return $next($request);
    }
}
