<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'country',
        'price',
        'original_price',
        'flag',
        'features',
        'processing_time',
        'slug',
    ];

}
