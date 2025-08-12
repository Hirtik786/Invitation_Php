<?php


namespace App\Http\Controllers;
use App\Models\VisaApplication;

use Illuminate\Http\Request;

class VisaApplicationController extends Controller
{

    public function store(Request $request)
    {
        $data = $request->all();

        // Convert checkbox values to true/false
        foreach (['confirm_passport', 'confirm_picture', 'confirm_no_other_visa', 'confirm_decision'] as $field) {
            $data[$field] = $request->has($field);
        }

        VisaApplication::create($data);

        return response()->json(['status' => 'success', 'message' => 'Application saved successfully']);
    }


}
