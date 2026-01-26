<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    // POST /api/checkout - Place an order
    public function checkout(Request $request)
    {
        $cartItems = CartItem::with('product')->where('user_id', $request->user()->id)->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['message' => 'Cart is empty'], 400);
        }

        $total = $cartItems->sum(function ($item) {
            return $item->product->price * $item->quantity;
        });

        return DB::transaction(function () use ($request, $cartItems, $total) {
            $order = Order::create([
                'user_id' => $request->user()->id,
                'total_price' => $total,
                'status' => 'pending'
            ]);

            foreach ($cartItems as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $item->product->price
                ]);
            }

            CartItem::where('user_id', $request->user()->id)->delete();

            return response()->json([
                'message' => 'Order placed successfully',
                'order_id' => $order->id
            ], 201);
        });
    }

    // GET /api/orders - List my orders
    public function index(Request $request)
    {
        return Order::with('items.product') // Load the items and their product info
                    ->where('user_id', $request->user()->id)
                    ->orderByDesc('created_at')
                    ->get();
    }

    // GET /api/orders/{id} - Show order details
    public function show(Request $request, $id)
    {
        $order = Order::with('items.product')
                      ->where('user_id', $request->user()->id)
                      ->where('id', $id)
                      ->firstOrFail();

        return $order;
    }
}
