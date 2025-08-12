<?php

// app/Models/VisaApplication.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VisaApplication extends Model
{
    protected $fillable = [
        'from_country',
        'live_in_country',
        'confirm_passport',
        'confirm_picture',
        'confirm_no_other_visa',
        'confirm_decision',
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
    ];
}
