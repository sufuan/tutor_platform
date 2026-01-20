<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Guardian extends Model
{
    protected $fillable = [
        'user_id',
        'guardian_code',
        'profile_completion_status',
        'profile_completion_percentage',
        'first_name',
        'last_name',
        'phone',
        'division',
        'district',
        'photo',
        'location_id',
        'detailed_address',
        'preferred_subjects',
        'preferred_class_levels',
    ];

    protected $casts = [
        'preferred_subjects' => 'array',
        'preferred_class_levels' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class);
    }

    public function students(): HasMany
    {
        return $this->hasMany(Student::class);
    }

    public function jobs(): HasMany
    {
        return $this->hasMany(Job::class);
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    /**
     * Update profile completion status and percentage
     */
    public function updateProfileCompletion(): void
    {
        $requiredFields = [
            'first_name',
            'last_name',
            'phone',
            'division',
            'district',
        ];

        $filledCount = 0;
        $totalFields = count($requiredFields) + 2; // +2 for arrays

        foreach ($requiredFields as $field) {
            if (!empty($this->$field)) {
                $filledCount++;
            }
        }

        if (!empty($this->preferred_subjects) && is_array($this->preferred_subjects) && count($this->preferred_subjects) > 0) {
            $filledCount++;
        }

        if (!empty($this->preferred_class_levels) && is_array($this->preferred_class_levels) && count($this->preferred_class_levels) > 0) {
            $filledCount++;
        }

        $percentage = round(($filledCount / $totalFields) * 100);
        $status = $percentage >= 100 ? 'completed' : 'incomplete';

        $this->update([
            'profile_completion_percentage' => $percentage,
            'profile_completion_status' => $status,
        ]);
    }
}
