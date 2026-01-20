<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Tutor;
use App\Models\Guardian;
use Carbon\Carbon;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::transaction(function () {
            // Bangladesh tutor names
            $tutorFirstNames = [
                'Mohammed', 'Ahmed', 'Abdul', 'Karim', 'Rahman', 'Hasan', 'Hussain', 'Ali', 'Omar', 'Yusuf',
                'Farhan', 'Sabbir', 'Rashed', 'Tamim', 'Sakib', 'Mushfiq', 'Mahbub', 'Rifat', 'Tanvir', 'Nasir',
                'Fatima', 'Ayesha', 'Zainab', 'Khadija', 'Maryam', 'Nusrat', 'Farhana', 'Sadia', 'Razia', 'Shabnam',
                'Tasnim', 'Sumaya', 'Nabila', 'Lamia', 'Mahfuza', 'Rabeya', 'Taslima', 'Jannatul', 'Hasina', 'Nazma'
            ];

            $tutorLastNames = [
                'Rahman', 'Ahmed', 'Khan', 'Islam', 'Hasan', 'Ali', 'Chowdhury', 'Bhuiyan', 'Hoque', 'Uddin',
                'Alam', 'Karim', 'Hussain', 'Siddique', 'Miah', 'Sheikh', 'Mahmud', 'Akhter', 'Begum', 'Khatun'
            ];

            // Bangladeshi institutions
            $institutions = [
                'Dhaka University', 'BUET', 'Dhaka Medical College', 'Jahangirnagar University', 'Chittagong University',
                'Rajshahi University', 'BRAC University', 'North South University', 'Independent University',
                'East West University', 'Shahjalal University', 'Bangladesh Agricultural University',
                'Khulna University', 'Islamic University', 'Comilla University'
            ];

            // Subjects for tutors (3-5 random subject IDs, assuming subjects 1-40 exist)
            $getAllSubjectIds = function() {
                return range(1, 40); // Adjust based on actual subjects
            };

            // Bios
            $bios = [
                'Experienced educator with a passion for teaching. I believe in making learning enjoyable and effective for every student.',
                'Dedicated tutor specializing in personalized learning approaches. I focus on building strong fundamentals.',
                'Professional teacher with proven track record. My students consistently achieve excellent results.',
                'Patient and understanding tutor who adapts teaching methods to student needs. Excellence is my goal.',
                'Qualified instructor committed to student success. I use modern teaching techniques to ensure understanding.',
            ];

            // Get admin user ID
            $admin = User::where('email', 'admin@tutor.local')->first();

            // Create 5 Tutors
            $tutorVerificationDistribution = [
                'verified' => 2,
                'unverified' => 1,
                'pending' => 1,
                'rejected' => 1,
            ];

            $tutorCount = 0;
            foreach ($tutorVerificationDistribution as $status => $count) {
                for ($i = 0; $i < $count; $i++) {
                    $tutorCount++;
                    
                    $firstName = $tutorFirstNames[array_rand($tutorFirstNames)];
                    $lastName = $tutorLastNames[array_rand($tutorLastNames)];
                    
                    $user = User::create([
                        'name' => $firstName . ' ' . $lastName,
                        'email' => "tutor{$tutorCount}@tutor.local",
                        'password' => Hash::make('Tutor@123'),
                        'role' => 'tutor',
                        'email_verified_at' => now(),
                    ]);

                    // Get random subjects (3-5)
                    $allSubjects = $getAllSubjectIds();
                    $subjectCount = rand(3, 5);
                    $randomSubjects = array_rand(array_flip($allSubjects), $subjectCount);
                    if (!is_array($randomSubjects)) {
                        $randomSubjects = [$randomSubjects];
                    }

                    $tutorData = [
                        'user_id' => $user->id,
                        'tutor_code' => '', // Will be set by observer
                        'first_name' => $firstName,
                        'last_name' => $lastName,
                        'location_id' => rand(1, 40),
                        'subjects' => json_encode($randomSubjects),
                        'experience_years' => rand(1, 15),
                        'hourly_rate' => rand(300, 1500),
                        'bio' => $bios[array_rand($bios)],
                        'institution' => $institutions[array_rand($institutions)],
                        'education_level' => ['Bachelor', 'Master', 'PhD'][array_rand(['Bachelor', 'Master', 'PhD'])],
                        'verification_status' => $status,
                        'verified_at' => $status === 'verified' ? Carbon::now()->subDays(rand(1, 180)) : null,
                        'verified_by' => $status === 'verified' ? $admin->id : null,
                        'verification_notes' => $status === 'rejected' ? 'Incomplete documentation' : null,
                        'profile_completion_percentage' => rand(85, 100),
                        'created_at' => Carbon::now()->subDays(rand(1, 365)),
                        'updated_at' => Carbon::now()->subDays(rand(0, 30)),
                    ];

                    Tutor::create($tutorData);
                }
            }

            // Create 5 Guardians
            $guardianFirstNames = [
                'Mohammed', 'Abdul', 'Karim', 'Rashid', 'Hafiz', 'Jalal', 'Mizanur', 'Sirajul', 'Nurul', 'Shahjahan',
                'Abdus', 'Ashraf', 'Badrul', 'Delwar', 'Habib', 'Jahangir', 'Kamrul', 'Latif', 'Mofazzal', 'Nazrul',
                'Sultana', 'Rokeya', 'Nasima', 'Jahanara', 'Rowshan', 'Parvin', 'Shamsun', 'Khaleda', 'Rehana', 'Salma'
            ];

            $guardianLastNames = [
                'Rahman', 'Ahmed', 'Khan', 'Hossain', 'Ali', 'Chowdhury', 'Islam', 'Miah', 'Uddin', 'Alam',
                'Begum', 'Khatun', 'Akhter', 'Bibi', 'Nessa'
            ];

            // 4 completed profiles, 1 incomplete
            $completedProfileCount = 4;
            
            for ($i = 1; $i <= 5; $i++) {
                $firstName = $guardianFirstNames[array_rand($guardianFirstNames)];
                $lastName = $guardianLastNames[array_rand($guardianLastNames)];
                $isCompleted = $i <= $completedProfileCount;
                
                $user = User::create([
                    'name' => $firstName . ' ' . $lastName,
                    'email' => "guardian{$i}@tutor.local",
                    'password' => Hash::make('Guardian@123'),
                    'role' => 'guardian',
                    'email_verified_at' => now(),
                ]);

                // Get random preferred subjects (2-4)
                $allSubjects = $getAllSubjectIds();
                $subjectCount = rand(2, 4);
                $randomSubjects = array_rand(array_flip($allSubjects), $subjectCount);
                if (!is_array($randomSubjects)) {
                    $randomSubjects = [$randomSubjects];
                }

                // Class levels in Bangladesh
                $classLevels = [
                    'Play', 'Nursery', 'KG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
                    'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'SSC', 'HSC', 'A Level', 'O Level'
                ];
                
                $preferredClassLevels = [];
                if ($isCompleted) {
                    $levelCount = rand(2, 4);
                    $randomKeys = array_rand($classLevels, $levelCount);
                    if (!is_array($randomKeys)) {
                        $randomKeys = [$randomKeys];
                    }
                    foreach ($randomKeys as $key) {
                        $preferredClassLevels[] = $classLevels[$key];
                    }
                }

                // Dhaka areas
                $areas = [
                    'Dhanmondi', 'Gulshan', 'Banani', 'Mohammadpur', 'Mirpur', 'Uttara', 'Bashundhara',
                    'Lalmatia', 'Elephant Road', 'Farmgate', 'Panthapath', 'Kakrail', 'Malibagh', 'Rampura',
                    'Badda', 'Baridhara', 'Niketon', 'Mohakhali', 'Tejgaon', 'Shantinagar'
                ];

                $guardianData = [
                    'user_id' => $user->id,
                    'guardian_code' => '', // Will be set by observer
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                    'phone' => $isCompleted ? '01812345' . str_pad($i, 3, '0', STR_PAD_LEFT) : null,
                    'location_id' => $isCompleted ? rand(1, 40) : null,
                    'detailed_address' => $isCompleted ? 'House ' . rand(1, 99) . ', Road ' . rand(1, 20) . ', ' . $areas[array_rand($areas)] : null,
                    'preferred_subjects' => json_encode($randomSubjects),
                    'preferred_class_levels' => $isCompleted ? json_encode($preferredClassLevels) : json_encode([]),
                    'profile_completion_status' => $isCompleted ? 'completed' : 'incomplete',
                    'profile_completion_percentage' => $isCompleted ? 100 : rand(14, 71),
                    'created_at' => Carbon::now()->subDays(rand(1, 365)),
                    'updated_at' => Carbon::now()->subDays(rand(0, 30)),
                ];

                Guardian::create($guardianData);
            }
        });

        $this->command->info('Users seeded successfully: 5 tutors, 5 guardians');
    }
}
