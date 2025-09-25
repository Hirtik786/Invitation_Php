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

<!-- Add Package Modal -->
<div class="modal fade" id="addPackageModal" tabindex="-1" aria-labelledby="addPackageModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addPackageModalLabel">Add New Package</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                    aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="packageForm">
                    <div class="row">
                        <!-- Package Title -->
                        <div class="col-md-6 mb-3">
                            <label for="packageTitle" class="form-label">Package Title</label>
                            <input type="text" class="form-control" id="packageTitle" required
                                placeholder="Business Visa" value="Business Visa">
                        </div>

                        <!-- Country Dropdown -->
                        <div class="col-md-6 mb-3">
                            <label for="packageCountry" class="form-label">Country</label>
                            <select class="form-select" id="packageCountry" required>
                                <option value="" disabled>Select a country</option>
                                <option value="Turkey" selected>Turkey</option>
                                <option value="China">China</option>
                                <option value="Albania">Albania</option>
                                <option value="Kazakhstan">Kazakhstan</option>
                                <option value="Dubai">Dubai</option>
                                <option value="Portugal">Portugal</option>
                            </select>
                        </div>
                    </div>

                    <div class="row">
                        <!-- Price -->
                        <div class="col-md-6 mb-3">
                            <label for="packagePrice" class="form-label">Discounted Price (USD)</label>
                            <input type="number" class="form-control" id="packagePrice" required placeholder="300"
                                value="300">
                        </div>

                        <!-- Original Price -->
                        <div class="col-md-6 mb-3">
                            <label for="originalPrice" class="form-label">Original Price (USD)</label>
                            <input type="number" class="form-control" id="originalPrice" required placeholder="350"
                                value="350">
                        </div>
                    </div>

                    <!-- Features -->
                    <div class="mb-3">
                        <label for="packageFeatures" class="form-label">Features (one per line)</label>
                        <textarea class="form-control" id="packageFeatures" rows="4" required>Fast Processing
96 Hours Valid
Airport Transit</textarea>
                    </div>

                    <div class="row">
                        <!-- Processing Time -->
                        <div class="col-md-6 mb-3">
                            <label for="processingTime" class="form-label">Processing Time</label>
                            <input type="text" class="form-control" id="processingTime" required
                                placeholder="Invitation processing time is 48 hours"
                                value="Invitation processing time is 48 hours">
                        </div>

                        <!-- Package Slug -->
                        <div class="col-md-6 mb-3">
                            <label for="packageSlug" class="form-label">Package Slug</label>
                            <input type="text" class="form-control" id="packageSlug" required
                                placeholder="invitation-visa" value="invitation-visa">
                        </div>
                    </div>
                </form>

            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-secondary details-btn" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary details-btn" id="savePackageBtn"
                    onclick="savePackage()">Add Package</button>
            </div>
        </div>
    </div>
</div>