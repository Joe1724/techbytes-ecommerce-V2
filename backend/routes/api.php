<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
// use App\Http\Controllers\Api\StorefrontController; // Optional: Uncomment if you created this specific controller

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// ==========================================
// 1. PUBLIC ROUTES (Anyone can access)
// ==========================================

// Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Storefront & Products
// CRITICAL: Specific routes must go BEFORE the /{slug} wildcard
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/trending', [ProductController::class, 'featured']); // "Top Picks"
Route::get('/products/on-sale', [ProductController::class, 'onSale']);    // "Flash Sale"

// Optional Storefront index (Uncomment if you built the StorefrontController)
// Route::get('/storefront', [StorefrontController::class, 'index']);

// Product Details (Wildcard - Catches everything else)
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

    // Order Routes
    Route::post('/checkout', [OrderController::class, 'checkout']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);

    // ==========================================
    // 3. ADMIN ROUTES (Manage Inventory)
    // ==========================================
    Route::post('/products', [ProductController::class, 'store']);      // Create
    Route::put('/products/{id}', [ProductController::class, 'update']); // Edit
    Route::delete('/products/{id}', [ProductController::class, 'destroy']); // Delete

});
