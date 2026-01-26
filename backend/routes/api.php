<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// ==========================================
// 1. PUBLIC ROUTES (Anyone can access)
// ==========================================
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{slug}', [ProductController::class, 'show']);

// ==========================================
// 2. PROTECTED ROUTES (Must have Login Token)
// ==========================================
Route::middleware('auth:sanctum')->group(function () {

    // User Info
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Cart Routes
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::delete('/cart/{id}', [CartController::class, 'destroy']);

    // Order Routes (Moved INSIDE here so we know who the user is)
    Route::post('/checkout', [OrderController::class, 'checkout']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);

});
