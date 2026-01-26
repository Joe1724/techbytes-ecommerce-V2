<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'product_id', 'quantity'];

    // Allow the cart item to fetch its product details
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
