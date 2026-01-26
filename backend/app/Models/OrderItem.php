<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = ['order_id', 'product_id', 'quantity', 'price'];

    // This tells Laravel that every OrderItem belongs to one Product
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
