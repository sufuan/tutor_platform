<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TutorFeedback;
use App\Models\User;

class TutorFeedbackSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get tutors (users with role 'tutor')
        $tutors = User::where('role', 'tutor')->take(3)->get();

        if ($tutors->count() < 3) {
            $this->command->warn('Not enough tutors found. Creating sample feedbacks with existing tutors.');
        }

        $feedbacks = [
            [
                'feedback' => 'Teaching through this platform has been an amazing experience. The parents are very cooperative and the payment system is transparent.',
                'rating' => 5,
            ],
            [
                'feedback' => 'I have been tutoring on টিউশন বার্তা for 6 months now. Great students and supportive administration. Highly recommended!',
                'rating' => 5,
            ],
            [
                'feedback' => 'Professional platform with regular job opportunities. The verification process ensures quality for both tutors and students.',
                'rating' => 5,
            ],
        ];

        foreach ($feedbacks as $index => $feedbackData) {
            if (isset($tutors[$index])) {
                TutorFeedback::create([
                    'tutor_id' => $tutors[$index]->id,
                    'feedback' => $feedbackData['feedback'],
                    'rating' => $feedbackData['rating'],
                    'status' => 'approved',
                    'approved_at' => now(),
                    'approved_by' => 1, // Assuming admin user has ID 1
                ]);
            }
        }

        $this->command->info('Tutor feedbacks seeded successfully!');
    }
}
