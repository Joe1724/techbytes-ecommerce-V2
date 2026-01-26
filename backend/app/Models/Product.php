<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    // This tells Laravel: "It is okay to mass-assign these fields"
        protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'stock',
        'image_url',
        'is_featured',    // <--- Added
        'discount_price', // <--- Added
        'sale_end_date'   // <--- Added
    ];

    // Optional: Add a helper to check if product is on sale
    protected $casts = [
        'is_featured' => 'boolean',
        'sale_end_date' => 'datetime',
    ];



    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeOnSale($query)
    {
        return $query->whereNotNull('discount_price')
                    ->where('sale_ends_at', '>', now());
    }

    // app/Http/Controllers/ProductController.php
public function featured()
{
    // Fetches top-rated tech gear (GPUs, Laptops, etc.)
    return Product::where('is_featured', true)
                  ->where('stock', '>', 0)
                  ->take(8)
                  ->get();
}

}
