<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Application extends Model
{
    protected $fillable = [
        'job_id', 'tutor_id', 'status', 'cover_letter', 'cv_path', 'applied_at',
        'shortlisted_at', 'is_read', 'status_updated_at', 'status_read',
    ];

    protected $casts = [
        'applied_at' => 'datetime',
        'shortlisted_at' => 'datetime',
        'status_updated_at' => 'datetime',
        'is_read' => 'boolean',
        'status_read' => 'boolean',
    ];

    public function job(): BelongsTo
    {
        return $this->belongsTo(Job::class);
    }

    public function tutor(): BelongsTo
    {
        return $this->belongsTo(Tutor::class);
    }

    public function booking(): HasOne
    {
        return $this->hasOne(Booking::class);
    }
}
