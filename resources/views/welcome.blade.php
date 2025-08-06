@extends('layouts.app')

@section('content')
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-12 col-xl-10">
            <div class="card main-card">
                <div class="header">
                    <h1>Invitation</h1>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Invitation</li>
                        </ol>
                    </nav>
                </div>

                <div class="step-nav d-flex flex-wrap">
                    <button class="step-tab active" data-step="country">Country</button>
                    <button class="step-tab" data-step="package">Package</button>
                    <button class="step-tab" data-step="traveler">Traveller</button>
                </div>

                <div class="success-message" id="successMessage">
                    🎉 Invitation submitted successfully! Your booking has been processed.
                </div>

                {{-- Country Component --}}
                <x-country-form-component />

                {{-- Package Component --}}
                <x-package-form-component />

                {{-- Traveler Component --}}
                <x-traveler-form-component />
            </div>
        </div>
    </div>
</div>
@endsection
