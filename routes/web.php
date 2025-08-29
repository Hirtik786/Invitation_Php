<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
// routes/web.php
use App\Http\Controllers\VisaApplicationController;


// Route::post('/visa/store', [VisaApplicationController::class, 'store'])->name('visa.store');
use App\Http\Controllers\PackageController;

Route::post('/packages', [PackageController::class, 'store'])->name('packages.store');
Route::get('/packages', [PackageController::class, 'index'])->name('packages.index');
// Add these routes to your routes/web.php file

// Public routes for visa application
Route::get('/visa/application', [VisaApplicationController::class, 'index'])->name('visa.application');
Route::post('/visa/submit', [VisaApplicationController::class, 'submit'])->name('visa.submit');

// Admin routes (you may want to add middleware for authentication)
Route::prefix('admin')->middleware(['auth', 'admin'])->group(function () {
    Route::get('/visa-applications', [VisaApplicationController::class, 'adminIndex'])->name('admin.visa.index');
    Route::get('/visa-applications/{visaApplication}', [VisaApplicationController::class, 'show'])->name('admin.visa.show');
    Route::patch('/visa-applications/{visaApplication}/status', [VisaApplicationController::class, 'updateStatus'])->name('admin.visa.update-status');
});