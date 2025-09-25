<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VisaApplicationController;
use App\Http\Controllers\PackageController;

Route::get('/', function () {
    return view('welcome');
});

// Package routes
Route::get('/packages', [PackageController::class, 'index'])->name('packages.index');
Route::post('/packages', [PackageController::class, 'store'])->name('packages.store');
Route::put('/packages/{id}', [PackageController::class, 'update'])->name('packages.update');
Route::delete('/packages/{id}', [PackageController::class, 'destroy'])->name('packages.destroy');

// Visa application routes
Route::get('/visa/application', [VisaApplicationController::class, 'index'])->name('visa.application');
Route::post('/visa/submit', [VisaApplicationController::class, 'submit'])->name('visa.submit');

// Admin routes
Route::prefix('admin')->middleware(['auth', 'admin'])->group(function () {
    Route::get('/visa-applications', [VisaApplicationController::class, 'adminIndex'])->name('admin.visa.index');
    Route::get('/visa-applications/{visaApplication}', [VisaApplicationController::class, 'show'])->name('admin.visa.show');
    Route::patch('/visa-applications/{visaApplication}/status', [VisaApplicationController::class, 'updateStatus'])->name('admin.visa.update-status');
});
