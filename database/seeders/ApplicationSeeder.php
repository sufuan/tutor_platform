<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Application;
use App\Models\Job;
use App\Models\Tutor;
use Carbon\Carbon;

class ApplicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::transaction(function () {
            // Get only approved jobs
            $approvedJobs = Job::where('approval_status', 'approved')
                ->where('status', 'open')
                ->get();

            // Get only verified tutors
            $verifiedTutors = Tutor::where('verification_status', 'verified')
                ->pluck('id')
                ->toArray();

            if (count($verifiedTutors) === 0) {
                $this->command->warn('No verified tutors found. Skipping applications seeding.');
                return;
            }

            $coverLetters = [
                'I am very interested in this tutoring position. With my extensive experience and passion for teaching, I believe I can help the student achieve excellent results. I am patient, dedicated, and committed to making learning enjoyable and effective.',
                'I would be honored to be considered for this position. I have a proven track record of helping students improve their grades and understanding. My teaching approach focuses on building strong fundamentals and boosting student confidence.',
                'I am writing to express my interest in this tutoring opportunity. I have experience teaching students of various levels and can adapt my teaching methods to suit individual learning styles. I am punctual, professional, and results-oriented.',
                'I believe I would be an excellent fit for this position. My background in education and hands-on teaching experience have equipped me with the skills to help students succeed. I emphasize conceptual understanding and practical application.',
                'I am excited about the opportunity to work with your student. I have a strong academic background and experience in providing personalized instruction. I am committed to helping students reach their full potential through patient and supportive teaching.',
            ];

            $applicationCount = 0;
            $applicationsByJob = [];

            // Target: 300 applications total
            // 60 shortlisted (max 5 per job), 30 confirmed (1 per 30 jobs)
            
            $shortlistedCount = 0;
            $confirmedCount = 0;
            $targetShortlisted = 60;
            $targetConfirmed = 30;

            // First, create confirmed applications for 30 random jobs (1 per job)
            $jobsForConfirmed = $approvedJobs->random(min(30, $approvedJobs->count()));
            
            foreach ($jobsForConfirmed as $job) {
                $tutor = $verifiedTutors[array_rand($verifiedTutors)];
                $createdAt = Carbon::parse($job->created_at)->addHours(rand(1, 48));
                
                Application::create([
                    'job_id' => $job->id,
                    'tutor_id' => $tutor,
                    'status' => 'accepted',
                    'cover_letter' => $coverLetters[array_rand($coverLetters)],
                    'is_read' => true,
                    'applied_at' => $createdAt,
                    'shortlisted_at' => $createdAt->copy()->addHours(rand(12, 36)),
                    'status_updated_at' => $createdAt->copy()->addHours(rand(48, 72)),
                    'status_read' => true,
                    'created_at' => $createdAt,
                    'updated_at' => $createdAt->copy()->addHours(rand(48, 72)),
                ]);

                $applicationsByJob[$job->id] = isset($applicationsByJob[$job->id]) ? $applicationsByJob[$job->id] + 1 : 1;
                $applicationCount++;
                $confirmedCount++;
            }

            // Create shortlisted applications (max 5 per job, but spread across different jobs)
            $remainingJobs = $approvedJobs->reject(function($job) use ($jobsForConfirmed) {
                return $jobsForConfirmed->contains($job);
            });

            $jobsForShortlisted = $remainingJobs->random(min(15, $remainingJobs->count())); // 15 jobs * 4 avg = 60 shortlisted
            
            foreach ($jobsForShortlisted as $job) {
                $shortlistedForThisJob = rand(3, 5); // 3-5 shortlisted per job
                
                for ($i = 0; $i < $shortlistedForThisJob && $shortlistedCount < $targetShortlisted; $i++) {
                    // Ensure unique tutor for this job
                    $maxAttempts = 20;
                    $attempts = 0;
                    do {
                        $tutor = $verifiedTutors[array_rand($verifiedTutors)];
                        $exists = Application::where('job_id', $job->id)
                            ->where('tutor_id', $tutor)
                            ->exists();
                        $attempts++;
                    } while ($exists && $attempts < $maxAttempts);

                    if ($exists) continue; // Skip if can't find unique tutor

                    $createdAt = Carbon::parse($job->created_at)->addHours(rand(1, 48));
                    
                    Application::create([
                        'job_id' => $job->id,
                        'tutor_id' => $tutor,
                        'status' => 'shortlisted',
                        'cover_letter' => $coverLetters[array_rand($coverLetters)],
                        'is_read' => true,
                        'applied_at' => $createdAt,
                        'shortlisted_at' => $createdAt->copy()->addHours(rand(12, 36)),
                        'status_updated_at' => $createdAt->copy()->addHours(rand(12, 48)),
                        'status_read' => rand(0, 1) === 1,
                        'created_at' => $createdAt,
                        'updated_at' => $createdAt->copy()->addHours(rand(12, 48)),
                    ]);

                    $applicationsByJob[$job->id] = isset($applicationsByJob[$job->id]) ? $applicationsByJob[$job->id] + 1 : 1;
                    $applicationCount++;
                    $shortlistedCount++;
                }
            }

            // Fill remaining applications with pending/rejected status
            $targetTotal = 300;
            
            foreach ($approvedJobs as $job) {
                if ($applicationCount >= $targetTotal) break;

                $currentAppsForJob = $applicationsByJob[$job->id] ?? 0;
                $maxAppsForJob = 5;
                
                $remainingSlots = $maxAppsForJob - $currentAppsForJob;
                $appsToCreate = rand(1, min($remainingSlots, 3));

                for ($i = 0; $i < $appsToCreate && $applicationCount < $targetTotal; $i++) {
                    // Ensure unique tutor for this job
                    $maxAttempts = 20;
                    $attempts = 0;
                    do {
                        $tutor = $verifiedTutors[array_rand($verifiedTutors)];
                        $exists = Application::where('job_id', $job->id)
                            ->where('tutor_id', $tutor)
                            ->exists();
                        $attempts++;
                    } while ($exists && $attempts < $maxAttempts);

                    if ($exists) continue;

                    $status = rand(1, 4) === 1 ? 'rejected' : 'pending'; // 25% rejected, 75% pending
                    $createdAt = Carbon::parse($job->created_at)->addHours(rand(1, 72));
                    
                    Application::create([
                        'job_id' => $job->id,
                        'tutor_id' => $tutor,
                        'status' => $status,
                        'cover_letter' => $coverLetters[array_rand($coverLetters)],
                        'is_read' => rand(0, 1) === 1,
                        'applied_at' => $createdAt,
                        'status_updated_at' => $status === 'rejected' ? $createdAt->copy()->addHours(rand(24, 48)) : null,
                        'status_read' => $status === 'rejected' ? (rand(0, 1) === 1) : false,
                        'created_at' => $createdAt,
                        'updated_at' => $createdAt->copy()->addHours(rand(0, 48)),
                    ]);

                    $applicationsByJob[$job->id] = isset($applicationsByJob[$job->id]) ? $applicationsByJob[$job->id] + 1 : 1;
                    $applicationCount++;
                }
            }
        });

        $this->command->info('Applications seeded successfully');
    }
}
