<?php

namespace App\Services;

use App\Models\{Tutor, Job, Application, TutorJobRequest, Blog, Contact, GuardianFeedback, TutorFeedback};

class BadgeCountService
{
    public static function getPendingVerificationsCount(): int
    {
        return Tutor::where('verification_status', 'pending')->count();
    }
    
    public static function getPendingJobsCount(): int
    {
        return Job::where('approval_status', 'pending')->count();
    }
    
    public static function getGuardianUnreadApplicationsCount(int $guardianId): int
    {
        return Application::whereHas('job', function($query) use ($guardianId) {
            $query->where('guardian_id', $guardianId);
        })->where('is_read', false)->count();
    }
    
    public static function getGuardianTotalJobsCount(int $guardianId): int
    {
        return Job::where('guardian_id', $guardianId)->count();
    }
    
    public static function getTutorApplicationUpdatesCount(int $tutorId): int
    {
        return Application::where('tutor_id', $tutorId)
            ->where('status_updated_at', '>', now()->subDays(7))
            ->where('status_read', false)
            ->count();
    }
    
    public static function getTutorTotalApplicationsCount(int $tutorId): int
    {
        return Application::where('tutor_id', $tutorId)->count();
    }
    
    // Admin badge counts
    public static function getTutorJobRequestsCount(): int
    {
        return TutorJobRequest::where('approval_status', 'pending')->count();
    }
    
    public static function getJobApplicationsCount(): int
    {
        return Application::where('status', 'pending')->count();
    }
    
    public static function getTotalBlogsCount(): int
    {
        return Blog::count();
    }
    
    public static function getUnreadContactMessagesCount(): int
    {
        return Contact::where('status', 'unread')->count();
    }
    
    public static function getPendingGuardianFeedbacksCount(): int
    {
        return GuardianFeedback::where('status', 'pending')->count();
    }
    
    public static function getPendingTutorFeedbacksCount(): int
    {
        return TutorFeedback::where('status', 'pending')->count();
    }
}
