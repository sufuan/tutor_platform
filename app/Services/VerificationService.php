<?php

namespace App\Services;

use App\Models\{Tutor, User, Notification};
use Illuminate\Support\Facades\DB;

class VerificationService
{
    public static function approve(Tutor $tutor): void
    {
        DB::transaction(function () use ($tutor) {
            $tutor->update([
                'verification_status' => 'verified',
                'verified_at' => now(),
                'verified_by' => auth()->id(),
            ]);
            
            NotificationService::notify(
                $tutor->user,
                'verification_approved',
                'Profile Verified!',
                'Congratulations! Your profile has been verified. You can now browse and apply to tuition jobs.'
            );
        });
    }
    
    public static function reject(Tutor $tutor, string $notes): void
    {
        DB::transaction(function () use ($tutor, $notes) {
            $tutor->update([
                'verification_status' => 'rejected',
                'verification_notes' => $notes,
                'verified_at' => null,
                'verified_by' => null,
            ]);
            
            NotificationService::notify(
                $tutor->user,
                'verification_rejected',
                'Verification Rejected',
                "Your verification was rejected. Reason: {$notes}. Please update your documents and contact support."
            );
        });
    }
}
