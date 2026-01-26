<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema; // <--- IMPORTANT IMPORT

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Disable safety checks so we can wipe the tables
        Schema::disableForeignKeyConstraints();

        // 2. Wipe Products AND Carts (Start fresh)
        DB::table('cart_items')->truncate();
        DB::table('products')->truncate();

        // 3. Re-enable safety checks
        Schema::enableForeignKeyConstraints();

        $products = [
            // ... [KEEP YOUR ARRAY OF PRODUCTS HERE EXACTLY AS IT WAS] ...
            [
                'name' => 'Zephyrus G14 Gaming Laptop',
                'slug' => 'zephyrus-g14-2026',
                'description' => 'Ultra-slim gaming laptop with RTX 5080, Ryzen 9, and a 165Hz Mini-LED display. Perfect for creators and gamers.',
                'price' => 1899.99,
                'stock' => 15,
                'image_url' => 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80',
                'is_featured' => true,
                'discount_price' => null,
                'sale_end_date' => null,
            ],
            // ... [PASTE THE REST OF YOUR PRODUCTS HERE] ...
             [
                'name' => 'Keychron Q1 Pro Mechanical Keyboard',
                'slug' => 'keychron-q1-pro',
                'description' => 'Wireless custom mechanical keyboard with QMK/VIA support, aluminum body, and hot-swappable switches.',
                'price' => 199.00,
                'stock' => 50,
                'image_url' => 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80',
                'is_featured' => true,
                'discount_price' => null,
                'sale_end_date' => null,
            ],
            [
                'name' => 'Logitech G Pro X Superlight 2',
                'slug' => 'g-pro-x-superlight-2',
                'description' => 'The world’s lightest wireless esports mouse. Sub-63g weight, HERO 2 sensor, and zero-additive PTFE feet.',
                'price' => 159.99,
                'stock' => 100,
                'image_url' => 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80',
                'is_featured' => true,
                'discount_price' => null,
                'sale_end_date' => null,
            ],
            [
                'name' => 'Sony WH-1000XM5 Noise Cancelling',
                'slug' => 'sony-wh-1000xm5',
                'description' => 'Industry-leading noise cancellation, exceptional sound quality, and crystal-clear hands-free calling.',
                'price' => 348.00,
                'stock' => 30,
                'image_url' => 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80',
                'is_featured' => true,
                'discount_price' => 299.99, // On slight discount
                'sale_end_date' => null,
            ],

            // FLASH SALE ITEM
            [
                'name' => 'LG UltraGear 34" Curved Monitor',
                'slug' => 'lg-ultragear-34',
                'description' => 'Nano IPS 1ms, 144Hz refresh rate, and NVIDIA G-SYNC Compatible. The ultimate immersive experience.',
                'price' => 899.99,
                'stock' => 10,
                'image_url' => 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80',
                'is_featured' => false,
                'discount_price' => 499.99, // HUGE DISCOUNT
                'sale_end_date' => now()->addHours(24), // Ends in 24 hours
            ],

            // REGULAR ITEMS
            [
                'name' => 'RTX 4090 Founder Edition',
                'slug' => 'rtx-4090-fe',
                'description' => 'The ultimate GeForce GPU. It brings an enormous leap in performance, efficiency, and AI-powered graphics.',
                'price' => 1599.00,
                'stock' => 3,
                'image_url' => 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80',
                'is_featured' => false,
                'discount_price' => null,
                'sale_end_date' => null,
            ],
            [
                'name' => 'Elgato Stream Deck MK.2',
                'slug' => 'elgato-stream-deck',
                'description' => '15 LCD keys poised to trigger unlimited actions. The ultimate studio controller.',
                'price' => 149.99,
                'stock' => 45,
                'image_url' => 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80',
                'is_featured' => false,
                'discount_price' => null,
                'sale_end_date' => null,
            ],
            [
                'name' => 'Secretlab TITAN Evo 2022',
                'slug' => 'secretlab-titan-evo',
                'description' => 'Award-winning gaming chair with 4-way L-ADAPT lumbar support and magnetic memory foam head pillow.',
                'price' => 549.00,
                'stock' => 20,
                'image_url' => 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&q=80',
                'is_featured' => false,
                'discount_price' => null,
                'sale_end_date' => null,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
