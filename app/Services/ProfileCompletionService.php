<?php

namespace App\Services;

use App\Models\{Guardian, Tutor};

class ProfileCompletionService
{
    public static function calculateGuardianCompletion(Guardian $guardian): int
    {
        $filledCount = 0;
        $totalFields = 7;
        
        if ($guardian->first_name) $filledCount++;
        if ($guardian->last_name) $filledCount++;
        if ($guardian->phone) $filledCount++;
        if ($guardian->location_id) $filledCount++;
        if ($guardian->detailed_address) $filledCount++;
        if (is_array($guardian->preferred_subjects) && count($guardian->preferred_subjects) >= 1) $filledCount++;
        if (is_array($guardian->preferred_class_levels) && count($guardian->preferred_class_levels) >= 1) $filledCount++;
        
        return round(($filledCount / $totalFields) * 100);
    }
    
    public static function updateGuardianCompletion(Guardian $guardian): void
    {
        $percentage = self::calculateGuardianCompletion($guardian);
        $status = ($percentage === 100) ? 'completed' : 'incomplete';
        
        $guardian->update([
            'profile_completion_percentage' => $percentage,
            'profile_completion_status' => $status,
        ]);
    }
    
    public static function calculateTutorCompletion(Tutor $tutor): int
    {
        $filledCount = 0;
        $totalFields = 14; // Match actual frontend fields
        
        // Basic Info (5 fields)
        if ($tutor->user && $tutor->user->name) $filledCount++;
        if ($tutor->phone) $filledCount++;
        if ($tutor->gender) $filledCount++;
        if ($tutor->address) $filledCount++;
        if ($tutor->preferred_locations) $filledCount++; // Using preferred_locations as location
        
        // Education (2 fields)
        if ($tutor->institution) $filledCount++;
        if ($tutor->education_level) $filledCount++;
        
        // Teaching Info (5 fields)
        if (is_array($tutor->subjects) && count($tutor->subjects) >= 1) $filledCount++;
        if ($tutor->experience_years !== null && $tutor->experience_years >= 0) $filledCount++;
        if ($tutor->experience_details) $filledCount++;
        if ($tutor->hourly_rate) $filledCount++;
        if ($tutor->bio) $filledCount++;
        
        // Teaching Preferences (2 fields)
        if ($tutor->tutoring_method) $filledCount++;
        if ($tutor->tutoring_styles) $filledCount++;
        
        return round(($filledCount / $totalFields) * 100);
    }
    
    public static function updateTutorCompletion(Tutor $tutor): void
    {
        $percentage = self::calculateTutorCompletion($tutor);
        
        $tutor->update([
            'profile_completion_percentage' => $percentage,
        ]);
    }
}
