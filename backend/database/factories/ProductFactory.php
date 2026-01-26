<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->words(3, true), // "Gaming Mouse Pro"
            'slug' => $this->faker->slug(), // "gaming-mouse-pro"
            'description' => $this->faker->paragraph(),
            'price' => $this->faker->randomFloat(2, 10, 500), // Price between $10 and $500
            'image_url' => 'https://via.placeholder.com/640x480.png/0066cc?text=Product',
            'stock' => $this->faker->numberBetween(0, 100),
        ];
    }
}
