<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CafeSetting extends Model
{
    protected $fillable = [
        'address',
        'phone',
        'email',
        'opening_hours'
    ];

    protected $casts = [
        'opening_hours' => 'array',
    ];
}
