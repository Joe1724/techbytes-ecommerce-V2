<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;

class StorefrontController extends Controller
{
    public function index()
    {
        return response()->json([
            'hero' => [
                'title' => 'The Techbytes Drop',
                'subtitle' => 'Exclusive Streetwear for Developers',
                'image' => asset('images/hero-banner.jpg'),
            ],
            'top_picks' => Product::featured()->with('category')->take(4)->get(),
            'on_sale' => Product::onSale()->take(8)->get(),
            'categories' => Category::all(['id', 'name', 'slug', 'image_path']),
        ]);
    }
}
