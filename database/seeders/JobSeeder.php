<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Job;
use App\Models\Guardian;
use App\Models\Student;
use App\Models\User;
use Carbon\Carbon;

class JobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::transaction(function () {
            // Get completed guardians and their students
            $completedGuardians = Guardian::where('profile_completion_status', 'completed')
                ->with('students')
                ->get();

            $admin = User::where('role', 'admin')->first();

            // Job titles templates
            $titleTemplates = [
                'Experienced {subject} Tutor Needed for {class}',
                'Looking for {subject} Teacher for {class} Student',
                'Need Home Tutor for {subject} ({class})',
                '{subject} Tuition Required for {class}',
                'Urgent: {subject} Tutor for {class} Student',
                'Qualified {subject} Instructor Needed',
            ];

            $descriptions = [
                'We are looking for an experienced and dedicated tutor to help our child excel in their studies. The tutor should have good communication skills and be patient with students.',
                'Seeking a qualified teacher who can provide personalized attention and help improve academic performance. Previous teaching experience is preferred.',
                'Need a tutor who can make learning engaging and enjoyable. Should be punctual, responsible, and committed to student success.',
                'Looking for someone who can simplify complex concepts and build strong fundamentals. Regular feedback on progress is expected.',
                'We need a skilled educator who can adapt teaching methods to match our child\'s learning pace. Good knowledge of the curriculum is essential.',
            ];

            $specialRequirements = [
                'Must be punctual and professional',
                'Should provide regular progress reports',
                'Experience with the current curriculum required',
                'Patient and friendly approach needed',
                'Able to motivate and encourage students',
            ];

            $subjects = range(1, 40); // Assuming 40 subjects exist
            $classLevels = [
                'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
                'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
                'SSC', 'HSC', 'A Level', 'O Level'
            ];

            // Distribution: 2 approved+open, 2 pending+open, 2 rejected+closed
            $statusDistribution = [
                ['approval_status' => 'approved', 'status' => 'open', 'count' => 2],
                ['approval_status' => 'pending', 'status' => 'open', 'count' => 2],
                ['approval_status' => 'rejected', 'status' => 'closed', 'count' => 2],
            ];

            $jobCounter = 0;
            
            foreach ($statusDistribution as $distItem) {
                for ($i = 0; $i < $distItem['count']; $i++) {
                    $jobCounter++;
                    
                    // Get random guardian with students
                    $guardian = $completedGuardians->random();
                    $student = $guardian->students->random();

                    // Get random subjects (1-3)
                    $jobSubjectCount = rand(1, 3);
                    $jobSubjects = [];
                    for ($j = 0; $j < $jobSubjectCount; $j++) {
                        $jobSubjects[] = $subjects[array_rand($subjects)];
                    }
                    $jobSubjects = array_unique($jobSubjects);

                    $classLevel = $classLevels[array_rand($classLevels)];
                    $subjectName = $jobSubjectCount === 1 ? 'Mathematics' : 'Multiple Subjects';
                    
                    $title = str_replace(
                        ['{subject}', '{class}'],
                        [$subjectName, $classLevel],
                        $titleTemplates[array_rand($titleTemplates)]
                    );

                    $createdAt = Carbon::now()->subDays(rand(1, 90));

                    Job::create([
                        'guardian_id' => $guardian->id,
                        'student_id' => $student->id,
                        'job_code' => '', // Will be set by observer
                        'location_id' => $guardian->location_id,
                        'title' => $title,
                        'description' => $descriptions[array_rand($descriptions)],
                        'subjects' => json_encode(array_values($jobSubjects)),
                        'class_level' => $classLevel,
                        'education_medium' => ['Bangla', 'English', 'English Version'][array_rand(['Bangla', 'English', 'English Version'])],
                        'tuition_type' => ['home', 'online', 'group'][array_rand(['home', 'online', 'group'])],
                        'salary' => rand(2000, 15000),
                        'days_per_week' => rand(3, 7),
                        'duration_per_session' => rand(1, 3),
                        'detailed_address' => $guardian->detailed_address,
                        'preferred_tutor_gender' => ['male', 'female', 'any'][array_rand(['male', 'female', 'any'])],
                        'special_requirements' => rand(1, 3) === 1 ? $specialRequirements[array_rand($specialRequirements)] : null,
                        'approval_status' => $distItem['approval_status'],
                        'status' => $distItem['status'],
                        'approved_by' => $distItem['approval_status'] === 'approved' ? $admin->id : null,
                        'approved_at' => $distItem['approval_status'] === 'approved' ? $createdAt->copy()->addHours(rand(1, 24)) : null,
                        'rejection_reason' => $distItem['approval_status'] === 'rejected' ? 'Incomplete job details or requirements not clear' : null,
                        'created_at' => $createdAt,
                        'updated_at' => $createdAt->copy()->addDays(rand(0, 5)),
                    ]);
                }
            }
        });

        $this->command->info('6 jobs seeded successfully (2 approved, 2 pending, 2 rejected)');
    }
}
