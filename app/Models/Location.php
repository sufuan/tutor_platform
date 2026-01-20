<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $fillable = [
        'city',
        'division',
        'country',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    // Accessor for backward compatibility - returns city as name
    protected $appends = ['name'];

    public function getNameAttribute()
    {
        return $this->city;
    }
}