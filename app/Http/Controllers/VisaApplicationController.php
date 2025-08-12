<?php


namespace App\Http\Controllers;
use App\Models\VisaApplication;

use Illuminate\Http\Request;

class VisaApplicationController extends Controller
{

    public function store(Request $request)
    {
        $data = $request->all();

        VisaApplication::create($data);

        return response()->json(['status' => 'success', 'message' => 'Application saved successfully']);
    }


}
