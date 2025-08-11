@php
    $countries = include base_path('vendor/umpirsky/country-list/data/en/country.php');
@endphp

<!-- Step 1 Modal -->
    <div class="modal fade" id="step1Modal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <!-- Header -->
                <div class="modal-header flex-column align-items-start">
                    <div class="w-100 d-flex justify-content-between">
                        <div>
                            <h5 class="modal-title">Application Details</h5>
                            <div class="modal-subtitle">Location Information - Step 1 of 5</div>
                        </div>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="step-indicator w-100">
                        <div class="step active">
                            <div class="step-number">1</div> Location
                        </div>
                        <div class="step inactive">
                            <div class="step-number">2</div> Requirements
                        </div>
                        <div class="step inactive">
                            <div class="step-number">3</div> Documents
                        </div>
                        <div class="step inactive">
                            <div class="step-number">4</div> Personal
                        </div>
                        <div class="step inactive">
                            <div class="step-number">5</div> Review
                        </div>
                    </div>
                </div>

                <!-- Body -->
                <div class="modal-body">
                    <!-- Package Section -->
                    <div class="d-flex justify-content-between align-items-center bg-light p-3 rounded-3 mb-4">
                        <div>
                            <div class="text-muted small ">Selected Package</div>
                            <div class="text-primary fw-semibold" id="selectedPackageName">Selected Package</div>
                            <div class="text-muted small selected-country">Selected Country</div>
                        </div>
                        <div class="text-end">
                            <div class="fs-4 fw-bold text-dark" id="selectedPackagePrice">$0</div>
                            <div class="text-muted small">USD</div>
                        </div>
                    </div>

                    <form>
                        <div class="mb-3">
                            <label class="form-label">I am from</label>
                            <select class="form-select" id="fromCountry1" name="from_country">
                                <option value="">Select country</option>
                                @foreach($countries as $code => $name)
                                    <option value="{{ $code }}">{{ $code }} - {{ $name }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">I live in</label>
                            <select class="form-select" id="liveInCountry1" name="live_in_country">
                                <option value="">Select country</option>
                                @foreach($countries as $code => $name)
                                    <option value="{{ $code }}">{{ $code }} - {{ $name }}</option>
                                @endforeach
                            </select>
                        </div>
                    </form>
                </div>

                <!-- Footer -->
                <div class="modal-footer justify-content-between bg-light">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <div class="d-flex align-items-center gap-3">
                        <div class="text-muted small">Step 1 of 5</div>
                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#step2Modal"
                            data-bs-dismiss="modal">Next</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Step 2 Modal -->
    <div class="modal fade" id="step2Modal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">

                <!-- Header -->
                <div class="modal-header flex-column align-items-start">
                    <div class="w-100 d-flex justify-content-between">
                        <div>
                            <h5 class="modal-title">Application Details</h5>
                            <div class="modal-subtitle">Requirements & Confirmation - Step 2 of 5</div>
                        </div>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>

                    <div class="step-indicator w-100">
                        <div class="step inactive">
                            <div class="step-number">1</div> Location
                        </div>
                        <div class="step active">
                            <div class="step-number">2</div> Requirements
                        </div>
                        <div class="step inactive">
                            <div class="step-number">3</div> Documents
                        </div>
                        <div class="step inactive">
                            <div class="step-number">4</div> Personal
                        </div>
                        <div class="step inactive">
                            <div class="step-number">5</div> Review
                        </div>
                    </div>
                </div>

                <!-- Body -->
                <div class="modal-body scrollable-modal-body">

                    <div class="text-center mb-4">
                        <h5 class="fw-semibold">Let's get your Visa(s)</h5>
                        <p class="text-muted">What's required to make this application?</p>
                    </div>

                    <div class="row mb-4">
                        <div class="col-md-6 mb-3">
                            <div class="requirement-box">
                                <div class="mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 0 24 24" width="32"
                                        fill="#0ea5e9">
                                        <path d="M0 0h24v24H0z" fill="none" />
                                        <path
                                            d="M12 2c-4.97 0-9 4.03-9 9 0 5.25 7 13 7 13s7-7.75 7-13c0-4.97-4.03-9-9-9zm0 12c-1.66 0-3-1.34-3-3S10.34 8 12 8s3 1.34 3 3-1.34 3-3 3z" />
                                    </svg>
                                </div>
                                <h6 class="fw-bold">1 Valid Passport</h6>
                                <p class="text-muted small">Clear passport scan or picture with minimum of 6 months
                                    validity.</p>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="requirement-box">
                                <div class="mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 0 24 24" width="32"
                                        fill="#0ea5e9">
                                        <path d="M0 0h24v24H0z" fill="none" />
                                        <path
                                            d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4s-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>
                                </div>
                                <h6 class="fw-bold">2 Picture / Headshot</h6>
                                <p class="text-muted small">Clear passport scan or picture with minimum of 6 months
                                    validity.</p>
                            </div>
                        </div>
                    </div>

                    <div class="mb-4">
                        <p class="fw-semibold">Please confirm that you have read and agreed to the following:</p>
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="confirmPassport">
                            <label class="form-check-label" for="confirmPassport">
                                I have a valid passport with minimum 6 months validity
                            </label>
                        </div>
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="confirmPicture">
                            <label class="form-check-label" for="confirmPicture">
                                I have a clear picture/headshot available for the application
                            </label>
                        </div>
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="confirmNoOtherVisa">
                            <label class="form-check-label" for="confirmNoOtherVisa">
                                I hereby confirm that no active visa application is currently under processing by
                                another agent. This could lead to a non-refundable rejection of my visa application.
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="confirmDecision">
                            <label class="form-check-label" for="confirmDecision">
                                The decision to grant or refuse the visa(s) is the sole prerogative and at the sole
                                discretion of Government of Destination Country.
                            </label>
                        </div>
                    </div>

                </div>

                <!-- Footer -->
                <div class="modal-footer justify-content-between bg-light">
                    <button type="button" class="btn btn-secondary" data-bs-target="#step1Modal" data-bs-toggle="modal"
                        data-bs-dismiss="modal">Back</button>

                    <div class="d-flex align-items-center gap-3">
                        <div class="text-muted small">Step 2 of 5</div>
                        <button type="button" class="btn btn-primary" data-bs-target="#step3Modal" data-bs-toggle="modal"data-bs-dismiss="modal">Next</button>
                    </div>
                </div>


            </div>
        </div>
    </div>
    <!-- Step 3 Modal -->
    <div class="modal fade" id="step3Modal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">

                <!-- Header -->
                <div class="modal-header flex-column align-items-start">
                    <div class="w-100 d-flex justify-content-between">
                        <div>
                            <h5 class="modal-title">Application Details</h5>
                            <div class="modal-subtitle">Documents Upload - Step 3 of 5</div>
                        </div>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="step-indicator w-100">
                        <div class="step inactive">
                            <div class="step-number">1</div> Location
                        </div>
                        <div class="step inactive">
                            <div class="step-number">2</div> Requirements
                        </div>
                        <div class="step active">
                            <div class="step-number">3</div> Documents
                        </div>
                        <div class="step inactive">
                            <div class="step-number">4</div> Personal
                        </div>
                        <div class="step inactive">
                            <div class="step-number">5</div> Review
                        </div>
                    </div>
                </div>

                <!-- Body -->
                <div class="modal-body">
                    <div class="mb-4 d-flex justify-content-between align-items-center flex-wrap">
                        <div class="d-flex align-items-center gap-2 flex-wrap">
                            <span class="badge packcstm" id="selectedPackageName">Invitation + Visa
                                Documentation</span>
                            <span class="badge countrycstm visa-Selected">VISA FOR: Selected Country</span>
                        </div>
                        <span class="fw-bold fs-5 text-dark" id="selectedPackagePrice">Price: 599 USD</span>
                    </div>

                    <h6 class="fw-semibold mb-2">Please Upload the Following Documents</h6>
                    <p class="text-muted small mb-4">Accepted Formats: <strong>PDF, JPG, PNG</strong></p>

                    <div class="row">
                        <!-- Passport Upload -->
                        <div class="col-md-6 mb-4">
                            <label class="form-label fw-semibold">1 Valid Passport</label>
                            <div class="upload-box" id="passportBox"
                                onclick="document.getElementById('passportUpload').click()">
                                <span class="text-muted" id="passportFileName">Click to upload or drag and drop</span>
                                <input type="file" accept=".pdf,.jpg,.jpeg,.png" id="passportUpload" hidden>
                            </div>
                        </div>

                        <!-- Headshot Upload -->
                        <div class="col-md-6 mb-4">
                            <label class="form-label fw-semibold">2 Picture Headshot</label>
                            <div class="upload-box" id="headshotBox"
                                onclick="document.getElementById('headshotUpload').click()">
                                <span class="text-muted" id="headshotFileName">Click to upload or drag and drop</span>
                                <input type="file" accept=".jpg,.jpeg,.png" id="headshotUpload" hidden>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="modal-footer justify-content-between bg-light">
                    <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#step2Modal"
                        data-bs-dismiss="modal">Back</button>
                    <div class="d-flex align-items-center gap-3">
                        <div class="text-muted small">Step 3 of 5</div>
                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#step4Modal"
                            data-bs-dismiss="modal">Details</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Step 4 Modal-->
    <div class="modal fade" id="step4Modal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header flex-column align-items-start">
                    <div class="w-100 d-flex justify-content-between">
                        <div>
                            <h5 class="modal-title">Application Details</h5>
                            <div class="modal-subtitle">Personal Details - Step 4 of 5</div>
                        </div>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="step-indicator w-100">
                        <div class="step inactive">
                            <div class="step-number">1</div> Location
                        </div>
                        <div class="step inactive">
                            <div class="step-number">2</div> Requirements
                        </div>
                        <div class="step inactive">
                            <div class="step-number">3</div> Documents
                        </div>
                        <div class="step active">
                            <div class="step-number">4</div> Personal
                        </div>
                        <div class="step inactive">
                            <div class="step-number">5</div> Review
                        </div>
                    </div>
                </div>

                <div class="modal-body scrollable-modal-body">
                    <div class="text-muted mb-3 d-flex align-items-center flex-wrap gap-2">
                        <span class="badge packcstm">Invitation</span>
                        <span class="badge countrycstm visa-Selected">VISA FOR: Selected Country</span>
                        <div class="fw-bold ms-auto">
                            Price: <span class="text-dark text-danger">599 USD</span>
                        </div>
                    </div>


                    <h5 class="mb-3">Please Provide The Following Details</h5>

                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label">First Name</label>
                            <input type="text" class="form-control" id="firstName" name="first_name">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Last Name</label>
                            <input type="text" class="form-control" id="lastName" name="last_name">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Phone Number</label>
                            <input type="text" class="form-control" id="phoneNumber" name="phone_number">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Email Address</label>
                            <input type="email" class="form-control" id="emailAddress" name="email">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">From (Country)</label>
                            <input type="text" class="form-control" id="fromCountry" name="from_country">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Live in</label>
                            <input type="text" class="form-control" id="liveInCountry" name="live_in_country">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Passport Number</label>
                            <input type="text" class="form-control" id="passportNumber" name="passport_number">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Date Of Birth</label>
                            <input type="date" class="form-control" id="DOB" name="dob">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Profession</label>
                            <input type="text" class="form-control" id="profession" name="profession">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Travel Date From</label>
                            <input type="date" class="form-control" id="travelDateFrom" name="travel_date_from">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Travel Date To</label>
                            <input type="date" class="form-control" id="travelDateTo" name="travel_date_to">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Travel Purpose</label>
                            <input type="text" class="form-control" id="travelPurpose" name="travel_purpose">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Number of Travellers</label>
                            <input type="number" class="form-control" value="1" id="numTravellers" name="num_travellers"
                                max="10" min="1">
                        </div>

                        <div id="additionalTravelersSection" class="mt-4"></div>

                        <div class="col-12">
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                    </div>

                </div>

                <div class="modal-footer justify-content-between bg-light">
                    <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#step3Modal"
                        data-bs-dismiss="modal">Back</button>
                    <div class="d-flex align-items-center gap-3">
                        <div class="text-muted small">Step 4 of 5</div>
                        <button class="btn btn-primary" id="step4NextBtn" data-bs-target="#step5Modal"
                            data-bs-toggle="modal" data-bs-dismiss="modal">Review</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Step 5 Modal-->
    <div class="modal fade" id="step5Modal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header flex-column align-items-start">
                    <div class="w-100 d-flex justify-content-between">
                        <div>
                            <h5 class="modal-title">Application Summary</h5>
                            <div class="modal-subtitle">Review & Submit - Step 5 of 5</div>
                        </div>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="step-indicator w-100">
                        <div class="step inactive">
                            <div class="step-number">1</div> Location
                        </div>
                        <div class="step inactive">
                            <div class="step-number">2</div> Requirements
                        </div>
                        <div class="step inactive">
                            <div class="step-number">3</div> Documents
                        </div>
                        <div class="step inactive">
                            <div class="step-number">4</div> Personal
                        </div>
                        <div class="step active">
                            <div class="step-number">5</div> Review
                        </div>
                    </div>
                </div>
                <div class="modal-body scrollable-modal-body">
                    <p class="text-success">Please review all steps before submitting.</p>
                    <p>Once submitted, your application will be processed. Make sure all uploaded documents
                        and personal
                        details are correct.</p>
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <tr>
                                <th>Plan Name</th>
                                <td class="review-plan-name"></td>
                            </tr>
                            <tr>
                                <th>Description</th>
                                <td class="review-description"></td>
                            </tr>
                            <tr>
                                <th>Duration</th>
                                <td class="review-duration"></td>
                            </tr>
                            <tr>
                                <th>Name</th>
                                <td class="review-name"></td>
                            </tr>
                            <tr>
                                <th>Contact Number</th>
                                <td class="review-contact"></td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td class="review-email"></td>
                            </tr>
                            <tr>
                                <th>From Country</th>
                                <td class="review-from-country"></td>
                            </tr>
                            <tr>
                                <th>Live In Country</th>
                                <td class="review-livein-country"></td>
                            </tr>
                            <tr>
                                <th>Passport Number</th>
                                <td class="review-passport"></td>
                            </tr>
                            <tr>
                                <th>Date Of Birth</th>
                                <td class="review-dob"></td>
                            </tr>
                            <tr>
                                <th>Profession</th>
                                <td class="review-profession"></td>
                            </tr>
                            <tr>
                                <th>Travel Date</th>
                                <td class="review-travel-date"></td>
                            </tr>
                            <tr>
                                <th>Return Date</th>
                                <td class="review-return-date"></td>
                            </tr>
                            <tr>
                                <th>Number of Travelers</th>
                                <td class="review-num-travelers"></td>
                            </tr>
                            <tr>
                                <th>Purpose of Travel</th>
                                <td class="review-purpose"></td>
                            </tr>
                            <tr>
                                <th>Additional Travelers</th>
                                <td class="review-additional-travelers"></td>
                            </tr>
                        </table>
                    </div>


                </div>
                <div class="modal-footer justify-content-between bg-light">
                    <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#step4Modal"
                        data-bs-dismiss="modal">Back</button>
                    <div class="d-flex align-items-center gap-3">
                        <div class="text-muted small">Step 5 of 5</div>
                        <button id="submitButton" class="btn btn-primary">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
