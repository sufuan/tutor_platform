<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\GuardianFeedback;
use App\Models\User;
use Carbon\Carbon;

class GuardianFeedbackSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $guardians = User::where('role', 'guardian')->take(3)->pluck('id');
        
        if ($guardians->count() < 3) {
            $this->command->warn('Not enough guardians found. Creating feedbacks with first available guardian.');
            $guardianId = User::where('role', 'guardian')->first()->id ?? 1;
            $guardians = collect([$guardianId, $guardianId, $guardianId]);
        }

        $feedbacks = [
            [
                'guardian_id' => $guardians[0],
                'feedback' => 'CareTutors helped my daughter improve her math grades significantly. The tutor was professional, punctual, and really knew how to engage her in learning.',
                'rating' => 5,
                'status' => 'approved',
                'approved_at' => Carbon::now(),
                'approved_by' => User::where('role', 'admin')->first()->id ?? 1,
            ],
            [
                'guardian_id' => $guardians[1],
                'feedback' => 'Finding a qualified English tutor was so easy through this platform. My son\'s communication skills have improved remarkably in just 3 months!',
                'rating' => 5,
                'status' => 'approved',
                'approved_at' => Carbon::now(),
                'approved_by' => User::where('role', 'admin')->first()->id ?? 1,
            ],
            [
                'guardian_id' => $guardians[2],
                'feedback' => 'Excellent service! The verification process gave me confidence, and the tutor we found has been amazing for our children\'s preparation for admission tests.',
                'rating' => 5,
                'status' => 'approved',
                'approved_at' => Carbon::now(),
                'approved_by' => User::where('role', 'admin')->first()->id ?? 1,
            ],
        ];

        foreach ($feedbacks as $feedback) {
            GuardianFeedback::create($feedback);
        }
    }
}
