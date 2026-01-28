<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // 1. GET /api/products (Public)
    public function index()
    {
        // 1. Get latest products first (Newest on top)
        // 2. Wrap it in a 'data' key so the frontend parser works correctly
        return response()->json([
            'data' => Product::orderBy('created_at', 'desc')->get()
        ]);
    }

    // 2. GET /api/products/{slug} (Public)
    public function show($key)
    {
        // 1. If the key is a Number, find by ID (For Admin Panel)
        if (is_numeric($key)) {
            $product = Product::findOrFail($key);
        }
        // 2. Otherwise, find by Slug (For Customer Storefront)
        else {
            $product = Product::where('slug', $key)->firstOrFail();
        }

        return response()->json($product);
    }

    // 3. POST /api/products (Protected - Admin only)
    public function store(Request $request)
    {
        // 1. Validate the input (including the image)
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'category' => 'required|string',
            'description' => 'required|string',
            'is_featured' => 'boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120', // Max 5MB
        ]);

        // 2. Handle Image Upload
        $imageUrl = null; // Default if no image

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');

            // OLD WAY (Broken):
            // $imageUrl = '/storage/' . $path;

            // NEW WAY (Fixed):
            // This forces the full URL (http://localhost:8000/storage/...)
            $imageUrl = asset('storage/' . $path);
        }

        // 3. Create Product in Database
        $product = Product::create([
            'name' => $validated['name'],
            'slug' => \Illuminate\Support\Str::slug($validated['name']) . '-' . uniqid(), // Unique slug
            'price' => $validated['price'],
            'stock' => $validated['stock'],
            'category' => $validated['category'],
            'description' => $validated['description'],
            'is_featured' => $request->has('is_featured') ? true : false,
            'image_url' => $imageUrl ?? '/images/placeholder.jpg', // Fallback image
        ]);

        return response()->json($product, 201);
    }

    // 4. PUT /api/products/{id} (Protected - Admin only)
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'category' => 'required|string',
            'description' => 'required|string',
            'is_featured' => 'boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
        ]);

        // Handle Image Update
        if ($request->hasFile('image')) {
            // 1. Delete old image (if it's not the placeholder)
            if ($product->image_url && strpos($product->image_url, 'placeholder.jpg') === false) {
                 $oldPath = str_replace(asset('storage/'), '', $product->image_url);
                 \Illuminate\Support\Facades\Storage::disk('public')->delete($oldPath);
            }

            // 2. Upload new image
            $path = $request->file('image')->store('products', 'public');
            $product->image_url = asset('storage/' . $path);
        }

        // Update fields
        $product->update([
            'name' => $validated['name'],
            'price' => $validated['price'],
            'stock' => $validated['stock'],
            'category' => $validated['category'],
            'description' => $validated['description'],
            'is_featured' => $request->has('is_featured'),
            // Note: image_url is already updated above if a file was provided
        ]);

        return response()->json($product);
    }

    // 5. DELETE /api/products/{id} (Protected - Admin only)
    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        // 1. Delete the image file if it exists and isn't the default placeholder
        if ($product->image_url && strpos($product->image_url, 'placeholder.jpg') === false) {
            // Convert URL back to file path (e.g. "http://.../storage/products/abc.jpg" -> "products/abc.jpg")
            $path = str_replace(asset('storage/'), '', $product->image_url);
            \Illuminate\Support\Facades\Storage::disk('public')->delete($path);
        }

        // 2. Delete the record from the database
        $product->delete();

        return response()->json(['message' => 'Product deleted']);
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


