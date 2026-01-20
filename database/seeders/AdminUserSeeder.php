<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@tutor.local',
            'password' => Hash::make('Admin@123'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);
    }
}
