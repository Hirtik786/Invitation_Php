<?php

namespace App\Http\Controllers;

use App\Models\VisaApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class VisaApplicationController extends Controller
{
    /**
     * Display the visa application form
     */
    public function index()
    {
        return view('visa.application');
    }

    /**
     * Handle the visa application submission
     */
    public function submit(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'package_name' => 'required|string|max:255',
            'package_price' => 'required|numeric|min:0',
            'from_country' => 'required|string|max:255',
            'live_in_country' => 'required|string|max:255',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone_number' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'passport_number' => 'required|string|max:50',
            'dob' => 'required|date|before:today',
            'profession' => 'required|string|max:255',
            'travel_date_from' => 'required|date|after:today',
            'travel_date_to' => 'required|date|after:travel_date_from',
            'travel_purpose' => 'required|string|max:255',
            'num_travellers' => 'required|integer|min:1|max:10',
            'passport' => 'required|file|mimes:pdf,jpg,jpeg,png|max:10240', // 10MB max
            'headshot' => 'required|file|mimes:pdf,jpg,jpeg,png|max:10240', // 10MB max
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Handle file uploads
            $passportPath = null;
            $headshotPath = null;

            if ($request->hasFile('passport')) {
                $passportFile = $request->file('passport');
                $passportPath = $passportFile->store('visa_documents/passports', 'public');
            }

            if ($request->hasFile('headshot')) {
                $headshotFile = $request->file('headshot');
                $headshotPath = $headshotFile->store('visa_documents/headshots', 'public');
            }

            // Process additional travelers
            $additionalTravelers = [];
            $numTravelers = (int) $request->num_travellers;
            
            for ($i = 2; $i <= $numTravelers; $i++) {
                $travelerName = $request->input("traveler_{$i}_name");
                $travelerRelation = $request->input("traveler_{$i}_relation");
                $travelerPassport = $request->input("traveler_{$i}_passport");
                $travelerDob = $request->input("traveler_{$i}_dob");

                if ($travelerName) {
                    $additionalTravelers[] = [
                        'name' => $travelerName,
                        'relation' => $travelerRelation,
                        'passport_number' => $travelerPassport,
                        'dob' => $travelerDob
                    ];
                }
            }

            // Create the visa application
            $visaApplication = VisaApplication::create([
                'package_name' => $request->package_name,
                'package_price' => $request->package_price,
                'from_country' => $request->from_country,
                'live_in_country' => $request->live_in_country,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'phone_number' => $request->phone_number,
                'email' => $request->email,
                'passport_number' => $request->passport_number,
                'dob' => $request->dob,
                'profession' => $request->profession,
                'travel_date_from' => $request->travel_date_from,
                'travel_date_to' => $request->travel_date_to,
                'travel_purpose' => $request->travel_purpose,
                'num_travellers' => $numTravelers,
                'passport_document' => $passportPath,
                'headshot_document' => $headshotPath,
                'additional_travelers' => $additionalTravelers,
                'status' => 'pending'
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Visa application submitted successfully!',
                'application_id' => $visaApplication->id
            ]);

        } catch (\Exception $e) {
            // Clean up uploaded files if something goes wrong
            if ($passportPath && Storage::disk('public')->exists($passportPath)) {
                Storage::disk('public')->delete($passportPath);
            }
            if ($headshotPath && Storage::disk('public')->exists($headshotPath)) {
                Storage::disk('public')->delete($headshotPath);
            }

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while processing your application. Please try again.',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Display all visa applications (admin)
     */
    public function adminIndex()
    {
        $applications = VisaApplication::latest()->paginate(20);
        return view('admin.visa-applications.index', compact('applications'));
    }

    /**
     * Show specific application details (admin)
     */
    public function show(VisaApplication $visaApplication)
    {
        return view('admin.visa-applications.show', compact('visaApplication'));
    }

    /**
     * Update application status
     */
    public function updateStatus(Request $request, VisaApplication $visaApplication)
    {
        $request->validate([
            'status' => 'required|in:pending,processing,approved,rejected'
        ]);

        $visaApplication->update([
            'status' => $request->status
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Application status updated successfully!'
        ]);
    }
}