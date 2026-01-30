<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Job extends Model
{
    protected $table = 'tutor_jobs';
    
    protected $fillable = [
        'guardian_id', 'student_id', 'job_code', 'approval_status', 'approved_by',
        'approved_at', 'rejection_reason', 'status', 'filled_at', 'title', 'description',
        'subjects', 'class_level', 'education_medium', 'tuition_type', 'days_per_week',
        'duration_per_session', 'salary', 'location_id', 'detailed_address',
        'preferred_tutor_gender', 'special_requirements', 'division', 'district',
        'preferred_location', 'sessions_per_week',
    ];

    protected $casts = [
        'guardian_id' => 'integer',
        'student_id' => 'integer',
        'location_id' => 'integer',
        'approved_by' => 'integer',
        'subjects' => 'array',
        'sessions_per_week' => 'array',
        'approved_at' => 'datetime',
        'filled_at' => 'datetime',
        'salary' => 'decimal:2',
    ];

    protected $appends = [
        'subject_names',
    ];

    public function guardian(): BelongsTo
    {
        return $this->belongsTo(Guardian::class);
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class);
    }

    public function approvedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function applications(): HasMany
    {
        return $this->hasMany(Application::class);
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    /**
     * Get subject names from subject IDs
     */
    public function getSubjectNamesAttribute()
    {
        if (empty($this->subjects) || !is_array($this->subjects)) {
            return [];
        }

        return Subject::whereIn('id', $this->subjects)->pluck('name')->toArray();
    }
}
