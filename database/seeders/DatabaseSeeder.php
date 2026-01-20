<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            // Step 1: Foundation data
            AdminUserSeeder::class,
            LocationSeeder::class,
            CategorySeeder::class,
            SubjectSeeder::class,
            
            // Step 2: Users (Tutors & Guardians)
            UserSeeder::class,
            
            // Step 3: Students (dependent on Guardians)
            StudentSeeder::class,
            
            // Step 4: Jobs (dependent on Guardians, Students)
            JobSeeder::class,
            
            // Step 5: Applications (dependent on Jobs, Tutors)
            ApplicationSeeder::class,
            
            // Step 6: Bookings (dependent on Applications)
            BookingSeeder::class,
            
            // Step 7: Reviews (dependent on Bookings)
            ReviewSeeder::class,
            
            // Step 8: Site Settings & Media
            SiteSettingSeeder::class,
            MediaSeeder::class,
        ]);
    }
}
