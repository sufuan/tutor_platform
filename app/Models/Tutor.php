<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tutor extends Model
{
    protected $fillable = [
        'user_id', 'tutor_code', 'verification_status', 'verified_at', 'verified_by',
        'verification_notes', 'profile_completion_percentage', 'photo', 'first_name',
        'last_name', 'phone', 'address', 'gender', 'institution', 'education_level', 'subjects', 
        'experience_years', 'experience_details', 'hourly_rate', 'bio', 'location_id',
        'available_days', 'available_time_from', 'available_time_to', 'preferred_locations',
        'tutoring_styles', 'tutoring_method', 'preferred_categories', 'preferred_classes',
        'place_of_tutoring', 'division', 'district', 'cv_path',
    ];

    protected $casts = [
        'subjects' => 'array',
        'preferred_categories' => 'array',
        'preferred_classes' => 'array',
        'verified_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class);
    }

    public function applications(): HasMany
    {
        return $this->hasMany(Application::class);
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    public function jobRequests(): HasMany
    {
        return $this->hasMany(TutorJobRequest::class);
    }

    public function subjectsRelation(): BelongsToMany
    {
        return $this->belongsToMany(Subject::class, 'tutor_subjects');
    }
}
