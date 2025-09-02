<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Package;

class PackageController extends Controller
{
    public function index()
    {
        $packages = Package::all();

        // decode features JSON before sending back
        $packages->transform(function ($pkg) {
            $pkg->features = json_decode($pkg->features, true);
            return $pkg;
        });

        return response()->json($packages);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'price' => 'required|numeric',
            'original_price' => 'required|numeric',
            // 'flag' => 'required|string|max:10',
            'features' => 'required|array', // accept array from JS
            'processing_time' => 'required|string|max:255',
            'slug' => 'required|string|unique:packages,slug',
        ]);

        $validated['features'] = json_encode($validated['features']); // store JSON

        Package::create($validated);

        return response()->json(['success' => true]);
    }
    // PackageController.php
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'original_price' => 'required|numeric|min:0',
            // 'flag' => 'required|string|max:10',
            'features' => 'required|array',
            'processing_time' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:packages,slug,' . $id,
        ]);

        $package = Package::findOrFail($id);
        $package->update($request->all());

        return response()->json(['success' => true, 'message' => 'Package updated successfully']);
    }
    // PackageController.php
    public function destroy($id)
    {
        try {
            $package = Package::findOrFail($id);
            $package->delete();

            return response()->json([
                'success' => true,
                'message' => 'Package deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete package: ' . $e->getMessage()
            ], 500);
        }
    }
}
