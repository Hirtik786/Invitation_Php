<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Package;

class PackageController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'price' => 'required|numeric',
            'original_price' => 'required|numeric',
            'flag' => 'required|string|max:10',
            'features' => 'required|array', // accept array from JS
            'processing_time' => 'required|string|max:255',
            'slug' => 'required|string|unique:packages,slug',
        ]);

        $validated['features'] = json_encode($validated['features']); // store JSON

        Package::create($validated);

        return response()->json(['success' => true]);
    }
}
