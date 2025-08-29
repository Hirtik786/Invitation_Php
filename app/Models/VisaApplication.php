<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VisaApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'package_name',
        'package_price',
        'from_country',
        'live_in_country',
        'first_name',
        'last_name',
        'phone_number',
        'email',
        'passport_number',
        'dob',
        'profession',
        'travel_date_from',
        'travel_date_to',
        'travel_purpose',
        'num_travellers',
        'passport_document',
        'headshot_document',
        'additional_travelers',
        'status'
    ];

    protected $casts = [
        'dob' => 'date',
        'travel_date_from' => 'date',
        'travel_date_to' => 'date',
        'package_price' => 'decimal:2',
        'additional_travelers' => 'array'
    ];

    /**
     * Get the full name attribute
     */
    public function getFullNameAttribute()
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    /**
     * Scope for pending applications
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope for approved applications
     */
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }
}