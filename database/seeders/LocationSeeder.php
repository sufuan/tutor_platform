<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Location;
use Illuminate\Support\Facades\DB;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('locations')->delete();

        $locations = [
            // Dhaka Division
            ['city' => 'Mirpur', 'division' => 'Dhaka', 'country' => 'Bangladesh'],
            ['city' => 'Dhanmondi', 'division' => 'Dhaka', 'country' => 'Bangladesh'],
            ['city' => 'Gulshan', 'division' => 'Dhaka', 'country' => 'Bangladesh'],
            ['city' => 'Uttara', 'division' => 'Dhaka', 'country' => 'Bangladesh'],
            ['city' => 'Mohammadpur', 'division' => 'Dhaka', 'country' => 'Bangladesh'],
            ['city' => 'Banani', 'division' => 'Dhaka', 'country' => 'Bangladesh'],
            ['city' => 'Bashundhara', 'division' => 'Dhaka', 'country' => 'Bangladesh'],
            ['city' => 'Badda', 'division' => 'Dhaka', 'country' => 'Bangladesh'],
            ['city' => 'Rampura', 'division' => 'Dhaka', 'country' => 'Bangladesh'],
            ['city' => 'Farmgate', 'division' => 'Dhaka', 'country' => 'Bangladesh'],
            ['city' => 'Tejgaon', 'division' => 'Dhaka', 'country' => 'Bangladesh'],
            ['city' => 'Motijheel', 'division' => 'Dhaka', 'country' => 'Bangladesh'],
            ['city' => 'Jatrabari', 'division' => 'Dhaka', 'country' => 'Bangladesh'],
            ['city' => 'Shyamoli', 'division' => 'Dhaka', 'country' => 'Bangladesh'],
            ['city' => 'Lalmatia', 'division' => 'Dhaka', 'country' => 'Bangladesh'],
            ['city' => 'Kawran Bazar', 'division' => 'Dhaka', 'country' => 'Bangladesh'],
            ['city' => 'Old Dhaka', 'division' => 'Dhaka', 'country' => 'Bangladesh'],
            ['city' => 'New Market', 'division' => 'Dhaka', 'country' => 'Bangladesh'],
            ['city' => 'Savar', 'division' => 'Dhaka', 'country' => 'Bangladesh'],
            ['city' => 'Narayanganj', 'division' => 'Dhaka', 'country' => 'Bangladesh'],
            ['city' => 'Gazipur', 'division' => 'Dhaka', 'country' => 'Bangladesh'],
            
            // Chattogram Division
            ['city' => 'Agrabad', 'division' => 'Chattogram', 'country' => 'Bangladesh'],
            ['city' => 'Panchlaish', 'division' => 'Chattogram', 'country' => 'Bangladesh'],
            ['city' => 'Khulshi', 'division' => 'Chattogram', 'country' => 'Bangladesh'],
            ['city' => 'Halishahar', 'division' => 'Chattogram', 'country' => 'Bangladesh'],
            ['city' => 'Coxs Bazar', 'division' => 'Chattogram', 'country' => 'Bangladesh'],
            
            // Rajshahi Division
            ['city' => 'Rajshahi', 'division' => 'Rajshahi', 'country' => 'Bangladesh'],
            ['city' => 'Bogura', 'division' => 'Rajshahi', 'country' => 'Bangladesh'],
            ['city' => 'Pabna', 'division' => 'Rajshahi', 'country' => 'Bangladesh'],
            
            // Khulna Division
            ['city' => 'Khulna', 'division' => 'Khulna', 'country' => 'Bangladesh'],
            ['city' => 'Jessore', 'division' => 'Khulna', 'country' => 'Bangladesh'],
            ['city' => 'Satkhira', 'division' => 'Khulna', 'country' => 'Bangladesh'],
            
            // Barishal Division
            ['city' => 'Barishal', 'division' => 'Barishal', 'country' => 'Bangladesh'],
            ['city' => 'Patuakhali', 'division' => 'Barishal', 'country' => 'Bangladesh'],
            
            // Sylhet Division
            ['city' => 'Sylhet', 'division' => 'Sylhet', 'country' => 'Bangladesh'],
            ['city' => 'Moulvibazar', 'division' => 'Sylhet', 'country' => 'Bangladesh'],
            
            // Rangpur Division
            ['city' => 'Rangpur', 'division' => 'Rangpur', 'country' => 'Bangladesh'],
            ['city' => 'Dinajpur', 'division' => 'Rangpur', 'country' => 'Bangladesh'],
            
            // Mymensingh Division
            ['city' => 'Mymensingh', 'division' => 'Mymensingh', 'country' => 'Bangladesh'],
            ['city' => 'Jamalpur', 'division' => 'Mymensingh', 'country' => 'Bangladesh'],
        ];

        foreach ($locations as $location) {
            Location::create($location);
        }

        $this->command->info('40 Bangladesh locations seeded successfully!');
    }
}
