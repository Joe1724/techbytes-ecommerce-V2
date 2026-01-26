<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        // 1. Create the user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // 2. Create a token so they are logged in immediately
        $token = $user->createToken('auth_token')->plainTextToken;

        // 3. Return the user and token as JSON
        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 201);
    }

    public function login(\Illuminate\Http\Request $request)
    {
        // 1. Validate
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // 2. Check User
        $user = User::where('email', $request->email)->first();

        // 3. Check Password
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        // 4. Issue Token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }
}
