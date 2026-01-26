<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;

class CartController extends Controller
{
    // GET /api/cart - List all items in the user's cart
    public function index(Request $request)
    {
        // Fetch items AND their product details (name, price, image)
        $items = CartItem::with('product')
                    ->where('user_id', $request->user()->id)
                    ->get();

        return $items;
    }

    // POST /api/cart - Add item
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        // Check if product is already in cart for this user
        $item = CartItem::where('user_id', $request->user()->id)
                        ->where('product_id', $request->product_id)
                        ->first();

        if ($item) {
            // If exists, just add to the quantity
            $item->increment('quantity', $request->quantity);
        } else {
            // If not, create a new row
            CartItem::create([
                'user_id' => $request->user()->id,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity
            ]);
        }

        return response()->json(['message' => 'Item added to cart']);
    }

    // DELETE /api/cart/{id} - Remove item
    public function destroy(Request $request, $id)
    {
        // Delete only if it belongs to the logged-in user
        CartItem::where('user_id', $request->user()->id)
                ->where('id', $id)
                ->delete();

        return response()->json(['message' => 'Item removed']);
    }
}
