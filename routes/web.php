<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
// routes/web.php
use App\Http\Controllers\VisaApplicationController;

// Route::post('/visa/store', [VisaApplicationController::class, 'store'])->name('visa.store');
Route::post('/visa-submit', [VisaApplicationController::class, 'store'])->name('visa.submit');
use App\Http\Controllers\PackageController;

Route::post('/packages', [PackageController::class, 'store'])->name('packages.store');
