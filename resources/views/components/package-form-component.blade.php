<div class="step-content" id="package-step">
        <h2 class="section-title">Select a Service Package</h2>
        <p class="section-subtitle">Choose from our comprehensive service packages designed to make your travel dreams</p>

        <!-- Add Package Button -->
        <button class="add-package-btn details-btn" data-bs-toggle="modal" data-bs-target="#addPackageModal">
            + Add New Package
        </button>

        <div class="row g-4" id="packages-container">

            <!-- Visa Form Component -->
            <x-visa-form-component />

            <!-- extra -->
        </div>
    </div>
</div>

<!-- Add Package Modal -->
<div class="modal fade" id="addPackageModal" tabindex="-1" aria-labelledby="addPackageModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addPackageModalLabel">Add New Package</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="packageForm">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="packageTitle" class="form-label">Package Title</label>
                            <input type="text" class="form-control" id="packageTitle" required>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="packageCountry" class="form-label">Country</label>
                            <input type="text" class="form-control" id="packageCountry" placeholder="Turkey" required>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <label for="packagePrice" class="form-label">Price (USD)</label>
                            <input type="number" class="form-control" id="packagePrice" required>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="originalPrice" class="form-label">Original Price (USD)</label>
                            <input type="number" class="form-control" id="originalPrice" required>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="countryFlag" class="form-label">Country Flag</label>
                            <input type="text" class="form-control" id="countryFlag" placeholder="🇹🇷" required>
                        </div>
                    </div>
                    
                    <div class="mb-3">
                        <label for="packageFeatures" class="form-label">Features (one per line)</label>
                        <textarea class="form-control" id="packageFeatures" rows="4" 
                                placeholder="Fast Processing&#10;96 Hours Valid&#10;Airport Transit" required></textarea>
                    </div>
                    
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="processingTime" class="form-label">Processing Time</label>
                            <input type="text" class="form-control" id="processingTime" 
                                   placeholder="Invitation processing time is 48 hours" required>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="packageSlug" class="form-label">Package Slug</label>
                            <input type="text" class="form-control" id="packageSlug" 
                                   placeholder="invitation-visa" required>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary details-btn" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary details-btn" onclick="addPackage()">Add Package</button>
            </div>
        </div>
    </div>