<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // 1. GET /api/products (Public)
    public function index()
    {
        return Product::paginate(10);
    }

    // 2. GET /api/products/{slug} (Public)
    public function show($slug)
    {
        $product = Product::where('slug', $slug)->firstOrFail();
        return $product;
    }

    // 3. POST /api/products (Protected - Admin only)
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'slug' => 'required|string|unique:products,slug',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'image_url' => 'required|url' // For now, we will paste image links
        ]);

        return Product::create($fields);
    }

    // 4. PUT /api/products/{id} (Protected - Admin only)
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $product->update($request->all());

        return $product;
    }

    // 5. DELETE /api/products/{id} (Protected - Admin only)
    public function destroy($id)
    {
        return Product::destroy($id);
    }

        // 6. GET /api/storefront/featured (Public)
        public function featured()
    {
        // Get top 4 featured products
        return Product::where('is_featured', true)->take(4)->get();
    }

    // GET /api/products/on-sale
    public function onSale()
    {
        // Get products that have a discount price AND a valid sale date
        return Product::whereNotNull('discount_price')
                    ->whereNotNull('sale_end_date')
                    ->where('sale_end_date', '>', now()) // Only future sales
                    ->get();
    }
}


