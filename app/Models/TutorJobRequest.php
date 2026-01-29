<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TutorJobRequest extends Model
{
    protected $fillable = [
        'tutor_id',
        'title',
        'description',
        'subjects',
        'education_level',
        'class_level',
        'education_medium',
        'tuition_type',
        'tutor_gender_preference',
        'hourly_rate',
        'monthly_salary',
        'availability',
        'available_days',
        'division',
        'district',
        'teaching_mode',
        'preferred_gender',
        'status',
        'approval_status',
        'rejection_reason',
        'approved_by',
        'approved_at',
        'views',
    ];

    protected $casts = [
        'subjects' => 'array',
        'available_days' => 'array',
        'hourly_rate' => 'decimal:2',
        'monthly_salary' => 'decimal:2',
    ];

    protected $appends = ['subject_names'];

    public function tutor()
    {
        return $this->belongsTo(Tutor::class);
    }

    public function getSubjectNamesAttribute()
    {
        if (empty($this->subjects)) {
            return [];
        }
        return Subject::whereIn('id', $this->subjects)->pluck('name')->toArray();
    }
}
