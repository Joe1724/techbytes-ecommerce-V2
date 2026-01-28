<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Super Admin',
            'email' => 'admin@techbytes.com',
            'password' => Hash::make('password123'),
            'role' => 'admin', // <--- The Important Part
        ]);
    }
}
