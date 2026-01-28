<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Order;
use App\Models\User;

class AdminController extends Controller
{
    public function stats()
    {
        $totalRevenue = Order::sum('total_price');
        $totalOrders = Order::count();
        $totalProducts = Product::count();
        $totalCustomers = User::where('role', 'customer')->count();
        $lowStock = Product::where('stock', '<', 10)->count();

        return response()->json([
            'revenue' => $totalRevenue,
            'orders' => $totalOrders,
            'products' => $totalProducts,
            'customers' => $totalCustomers,
            'low_stock' => $lowStock
        ]);
    }

    // --- NEW: Order Management Methods ---

    // 1. Get All Orders (Latest first, with User info)
    public function getOrders()
    {
        $orders = Order::with('user')->orderBy('created_at', 'desc')->get();
        return response()->json($orders);
    }

    // 2. Update Order Status (Pending -> Shipped, etc)
    public function updateOrderStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,processing,shipped,delivered,cancelled'
        ]);

        $order = Order::findOrFail($id);
        $order->status = $request->status;
        $order->save();

        return response()->json(['message' => 'Order status updated', 'order' => $order]);
    }
}
