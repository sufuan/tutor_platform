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
        $totalFields = 8;
        
        if ($tutor->first_name) $filledCount++;
        if ($tutor->last_name) $filledCount++;
        if ($tutor->institution) $filledCount++;
        if ($tutor->education_level) $filledCount++;
        if (is_array($tutor->subjects) && count($tutor->subjects) >= 1) $filledCount++;
        if ($tutor->experience_years) $filledCount++;
        if ($tutor->bio) $filledCount++;
        if ($tutor->location_id) $filledCount++;
        
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
