<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'category_id'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
