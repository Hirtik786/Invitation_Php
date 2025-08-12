@extends('layouts.app')

@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-12 col-xl-10">
                <div class="card main-card">
                    <div class="header">
                        <h1>Invitation</h1>
                        <nav aria-label="breadcrumb" class="d-flex align-items-center">
                            <a href="#" class="fw-bold text-primary text-decoration-none">Dashboard</a>
                            <span
                                class="mx-2 rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                                style="width: 20px; height: 20px; font-size: 12px;">
                                <i class="bi bi-chevron-right"></i>
                            </span>
                            <span class="text-secondary">Invitation</span>
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
                    <form method="POST" action="{{ route('visa.submit') }}" enctype="multipart/form-data">
                        @csrf
                        {{-- Country Component --}}
                        <x-country-form-component />

                        {{-- Package Component --}}
                        <x-package-form-component />

                        {{-- Traveler Component --}}
                        <x-traveler-form-component />
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection