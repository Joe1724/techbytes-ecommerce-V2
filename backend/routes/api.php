<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\AdminController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// ==========================================
// 1. PUBLIC ROUTES
// ==========================================
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/trending', [ProductController::class, 'featured']);
Route::get('/products/on-sale', [ProductController::class, 'onSale']);
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

    // Customer Order Routes
    Route::post('/checkout', [OrderController::class, 'checkout']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);

    // ==========================================
    // 3. ADMIN ROUTES (Inventory & Order Mgmt)
    // ==========================================
    Route::post('/products', [ProductController::class, 'store']);       // Create
    Route::put('/products/{id}', [ProductController::class, 'update']);  // Edit
    Route::delete('/products/{id}', [ProductController::class, 'destroy']); // Delete

    Route::get('/admin/stats', [AdminController::class, 'stats']);       // Stats

    // --- NEW: Admin Order Management Routes ---
    Route::get('/admin/orders', [AdminController::class, 'getOrders']);
    Route::put('/admin/orders/{id}', [AdminController::class, 'updateOrderStatus']);

});
