<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TutorFeedback extends Model
{
    protected $table = 'tutor_feedbacks';

    protected $fillable = [
        'tutor_id',
        'feedback',
        'rating',
        'status',
        'approved_at',
        'approved_by',
    ];

    protected $casts = [
        'approved_at' => 'datetime',
    ];

    public function tutor()
    {
        return $this->belongsTo(User::class, 'tutor_id');
    }

    public function approvedBy()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }
}
