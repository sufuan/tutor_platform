<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Student;
use App\Models\Guardian;
use Carbon\Carbon;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::transaction(function () {
            // Get all completed profile guardians (first 40)
            $completedGuardians = Guardian::where('profile_completion_status', 'completed')
                ->limit(40)
                ->pluck('id')
                ->toArray();

            // Realistic Bangladesh student names
            $maleNames = [
                'Rahim', 'Karim', 'Fahim', 'Shakib', 'Tamim', 'Mehedi', 'Mushfiq', 'Miraj', 'Sohan', 'Hasan',
                'Rafiq', 'Tahmid', 'Sabbir', 'Sadman', 'Rafi', 'Nayeem', 'Asif', 'Tanvir', 'Safwan', 'Raihan',
                'Abrar', 'Farhan', 'Mahir', 'Nafis', 'Saif', 'Zayan', 'Arnab', 'Adib', 'Redwan', 'Shafin',
                'Taskin', 'Nabil', 'Wasif', 'Fahad', 'Shahriar', 'Mahmud', 'Tawsif', 'Muktadir', 'Siam', 'Sajid'
            ];

            $femaleNames = [
                'Fatima', 'Ayesha', 'Zainab', 'Nusrat', 'Tasnim', 'Sumaya', 'Nabila', 'Lamia', 'Sadia', 'Farhana',
                'Maisha', 'Nusaiba', 'Tasnuva', 'Jannatul', 'Fabiha', 'Samira', 'Rumana', 'Sultana', 'Shazia', 'Mahfuza',
                'Anika', 'Nawrin', 'Tamanna', 'Samiha', 'Raiha', 'Mahira', 'Fairuz', 'Zahra', 'Ruqayyah', 'Anisa',
                'Tabassum', 'Nadia', 'Safia', 'Hafsa', 'Maryam', 'Rabeya', 'Sabrina', 'Farah', 'Nafisa', 'Rehana'
            ];

            $lastNames = [
                'Rahman', 'Ahmed', 'Khan', 'Islam', 'Hasan', 'Ali', 'Chowdhury', 'Hossain', 'Miah', 'Uddin',
                'Alam', 'Karim', 'Mahmud', 'Siddique', 'Sheikh', 'Begum', 'Khatun', 'Akhter'
            ];

            // Class levels by age
            $classLevelsByAge = [
                5 => 'Play',
                6 => 'KG',
                7 => 'Class 1',
                8 => 'Class 2',
                9 => 'Class 3',
                10 => 'Class 4',
                11 => 'Class 5',
                12 => 'Class 6',
                13 => 'Class 7',
                14 => 'Class 8',
                15 => 'Class 9',
                16 => 'Class 10',
                17 => 'A Level',
                18 => 'A Level',
            ];

            $schools = [
                'Dhaka Residential Model College',
                'Viqarunnisa Noon School',
                'Holy Cross School',
                'Notre Dame College',
                'Motijheel Govt. Boys High School',
                'Ideal School and College',
                'Rajuk Uttara Model College',
                'Scholastica School',
                'Sunbeams School',
                'Oxford International School',
                'Milestone College',
                'Adamjee Cantonment College',
                'St. Josephs Higher Secondary School',
                'BAF Shaheen College',
                'Siddheswari Girls High School',
            ];

            // Create 2 students for each completed guardian (80 total)
            foreach ($completedGuardians as $guardianId) {
                for ($s = 1; $s <= 2; $s++) {
                    $gender = rand(0, 1) ? 'male' : 'female';
                    $age = rand(5, 18);
                    
                    $firstName = $gender === 'male' 
                        ? $maleNames[array_rand($maleNames)]
                        : $femaleNames[array_rand($femaleNames)];
                    
                    $lastName = $lastNames[array_rand($lastNames)];
                    $name = $firstName . ' ' . $lastName;
                    
                    $classLevel = $classLevelsByAge[$age] ?? 'Class ' . ($age - 5);

                    Student::create([
                        'guardian_id' => $guardianId,
                        'name' => $name,
                        'age' => $age,
                        'class_level' => $classLevel,
                        'school_name' => $schools[array_rand($schools)],
                        'special_needs' => rand(1, 10) === 1 ? 'Needs extra attention in mathematics' : null,
                        'created_at' => Carbon::now()->subDays(rand(1, 180)),
                        'updated_at' => Carbon::now()->subDays(rand(0, 30)),
                    ]);
                }
            }
        });

        $this->command->info('80 students seeded successfully for 40 completed guardians');
    }
}
