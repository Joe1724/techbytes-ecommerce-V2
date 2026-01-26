<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    // GET /api/products
    public function index()
    {
        // Return 10 products per page
        return Product::paginate(10);
    }

    // GET /api/products/{slug}
    public function show($slug)
    {
        // Find product by slug or fail with 404
        $product = Product::where('slug', $slug)->firstOrFail();

        return $product;
    }
}
