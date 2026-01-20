<?php

namespace App\Services;

use App\Models\{Application, Job, Booking};
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ApplicationService
{
    public static function shortlist(Application $application): void
    {
        $shortlistedCount = Application::where('job_id', $application->job_id)
            ->where('status', 'shortlisted')
            ->count();
            
        if ($shortlistedCount >= 5) {
            throw ValidationException::withMessages([
                'shortlist' => 'Cannot shortlist more than 5 tutors per job.'
            ]);
        }
        
        $application->update([
            'status' => 'shortlisted',
            'shortlisted_at' => now(),
        ]);
    }
    
    public static function removeFromShortlist(Application $application): void
    {
        $application->update([
            'status' => 'pending',
            'shortlisted_at' => null,
        ]);
    }
    
    public static function confirmHire(Application $application): void
    {
        DB::transaction(function () use ($application) {
            // Create booking
            Booking::create([
                'job_id' => $application->job_id,
                'tutor_id' => $application->tutor_id,
                'guardian_id' => $application->job->guardian_id,
                'application_id' => $application->id,
                'status' => 'trial',
                'start_date' => now()->toDateString(),
            ]);
            
            // Update application
            $application->update(['status' => 'confirmed']);
            
            // Update job
            $application->job->update([
                'status' => 'filled',
                'filled_at' => now(),
            ]);
            
            // Reject other applications
            Application::where('job_id', $application->job_id)
                ->where('id', '!=', $application->id)
                ->update(['status' => 'rejected']);
            
            // Notify tutor
            NotificationService::notify(
                $application->tutor->user,
                'application_confirmed',
                'Congratulations! You\'ve been hired!',
                "You've been hired for '{$application->job->title}' (Code: {$application->job->job_code}). The guardian will contact you soon."
            );
        });
    }
}
