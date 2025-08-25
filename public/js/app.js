document.addEventListener('DOMContentLoaded', () => {

    // ===== GLOBAL STATE =====
    let selectedCountry = null;
    let selectedPackage = null;
    let selectedPackageName = "Selected Package";
    let selectedPackagePrice = null;
    let selectedFromCountry = "";
    let selectedLiveInCountry = "";
    let selectedTravelers = [];
    let uploadedDocuments = {};
    let personalDetails = {};

    // ===== DOM REFERENCES =====
    const stepTabs = document.querySelectorAll('.step-tab');
    const stepContents = document.querySelectorAll('.step-content');
    const countryCards = document.querySelectorAll('.country-card');
    const packageCards = document.querySelectorAll('.package-card');
    const travelerCardsContainer = document.getElementById('traveler-step');
    const submitButton = document.getElementById('submitButton');
    const successMessage = document.getElementById('successMessage');
    const numberInput = document.getElementById("numTravellers");
    const additionalSection = document.getElementById("additionalTravelersSection");

    // ===== HELPER: Switch Step =====
    function switchStep(stepName) {
        stepTabs.forEach(tab => tab.classList.toggle('active', tab.getAttribute('data-step') === stepName));
        stepContents.forEach(content => content.classList.toggle('active', content.id === `${stepName}-step`));
    }

    // ===== RESET FORM & STATE =====
    function resetFormAndState() {
        // Reset all forms
        document.querySelectorAll('form').forEach(form => form.reset());

        // Clear global state variables
        selectedCountry = null;
        selectedPackage = null;
        selectedPackageName = "Selected Package";
        selectedPackagePrice = null;
        selectedFromCountry = "";
        selectedLiveInCountry = "";
        selectedTravelers = [];
        uploadedDocuments = {};
        personalDetails = {};

        // Remove all selected classes
        document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));

        // Clear dynamically generated traveler info
        if (travelerCardsContainer) travelerCardsContainer.innerHTML = '';

        // Clear additional travelers section
        if (additionalSection) additionalSection.innerHTML = '';

        // Switch to country selection step
        switchStep('country');
    }

    // ===== STEP NAVIGATION =====
    stepTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const step = tab.getAttribute('data-step');
            switchStep(step);
        });
    });

    // ===== STEP 1 - COUNTRY SELECTION =====
    countryCards.forEach(card => {
        card.addEventListener('click', () => {
            selectedCountry = card.dataset.country;
            console.log("Country selected:", selectedCountry);

            countryCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');

            const countryName = card.querySelector(".country-name").textContent.trim();
            const countryFlagImg = card.querySelector(".country-flag img").src;

            document.querySelectorAll(".badge-package").forEach(badge => {
                badge.textContent = `Package For ${countryName}`;
            });
            document.querySelectorAll(".visa-Selected").forEach(badge => {
                badge.textContent = `VISA FOR : ${countryName}`;
            });
            document.querySelectorAll(".selected-country").forEach(badge => {
                badge.textContent = countryName;
            });
            document.querySelectorAll(".badge-flag").forEach(flagBadge => {
                flagBadge.innerHTML = `<img src="${countryFlagImg}" alt="${countryName} Flag" style="width:30px;height:auto;">`;
            });


            switchStep('package');
        });
    });

    // ===== STEP 2 - PACKAGE SELECTION =====
    document.querySelectorAll(".open-modal").forEach(button => {
        button.addEventListener("click", function () {
            selectedPackage = this.getAttribute("data-package-id") || null;
            selectedPackageName = this.getAttribute("data-package-name") || "Selected Package";
            selectedPackagePrice = this.getAttribute("data-package-price") || "0";

            document.getElementById("selectedPackageName").textContent = selectedPackageName;
            document.getElementById("selectedPackagePrice").textContent = `$${selectedPackagePrice}`;
        });
    });

    // ===== STEP 2.1 - DROPDOWNS =====
    document.getElementById("fromCountry1")?.addEventListener("change", function () {
        selectedFromCountry = this.value;
        document.getElementById("fromCountry").value = selectedFromCountry; // set fixed field
    });

    document.getElementById("liveInCountry1")?.addEventListener("change", function () {
        selectedLiveInCountry = this.value;
        document.getElementById("liveInCountry").value = selectedLiveInCountry; // set fixed field
    });


    // ===== STEP 3 - DOCUMENT UPLOAD  =====
    document.querySelectorAll(".document-upload").forEach(input => {
        input.addEventListener("change", function () {
            const file = this.files[0];
            const uploadArea = this.parentElement.querySelector('.upload-area-custom');
            const uploadContent = uploadArea.querySelector('.upload-content');
            const uploadPreview = uploadArea.querySelector('.upload-preview');
            const uploadFilename = uploadArea.querySelector('.upload-filename');
            const errorDiv = this.parentElement.querySelector('.step3-error');

            if (file) {
                // Store the uploaded file
                uploadedDocuments[this.name] = file.name;

                // Update UI to show uploaded state
                uploadArea.classList.add('uploaded');
                uploadContent.style.display = 'none';
                uploadPreview.style.display = 'block';
                uploadFilename.textContent = file.name;

                // Hide error message and remove error class
                if (errorDiv) errorDiv.style.display = 'none';
                uploadArea.classList.remove('error'); // ✅ REMOVE error state

                // console.log(Uploaded ${ this.name }:, file.name);
            } else {
                // Reset to initial state
                uploadArea.classList.remove('uploaded');
                uploadContent.style.display = 'block';
                uploadPreview.style.display = 'none';
                uploadFilename.textContent = '';

                delete uploadedDocuments[this.name];
            }
        });
    });
    (function () {
        const nextBtnStep3 = document.getElementById('nextStep3Btn');
        if (!nextBtnStep3) return;

        const requiredUploads = [
            { name: 'passport', msg: 'Please upload your passport document' },
            { name: 'headshot', msg: 'Please upload your picture/headshot' }
        ];

        // Hide error messages when files are uploaded
        document.querySelectorAll('.document-upload').forEach(inputEl => {
            inputEl.addEventListener('change', function () {
                if (this.files[0]) {
                    // Find error div within the same column
                    const colContainer = this.closest('.col-md-6');
                    const errorDiv = colContainer.querySelector('.step3-error');
                    if (errorDiv) errorDiv.style.display = 'none';
                }
            });
        });

        nextBtnStep3.addEventListener('click', function () {
            let allUploaded = true;

            // Clear all previous errors
            document.querySelectorAll('.step3-error').forEach(err => {
                err.style.display = 'none';
                err.textContent = '';
            });

            // Check each required upload
            requiredUploads.forEach(({ name, msg }) => {
                const inputEl = document.querySelector(`input[name="${name}"]`);
                if (!inputEl) {
                    allUploaded = false;
                    return;
                }

                const colContainer = inputEl.closest('.col-md-6');
                const errorDiv = colContainer.querySelector('.step3-error');

                if (!inputEl.files || !inputEl.files[0]) {
                    errorDiv.textContent = msg;
                    errorDiv.style.display = 'block';
                    const uploadArea = colContainer.querySelector('.upload-area-custom');
                    if (uploadArea) uploadArea.classList.add('error'); // ✅ ADD error class
                    allUploaded = false;
                } else {
                    // Clean up in case it was previously marked as error
                    const uploadArea = colContainer.querySelector('.upload-area-custom');
                    if (uploadArea) uploadArea.classList.remove('error'); // ✅ Ensure error is cleared
                }
            });

            // If all files uploaded, proceed to next step
            if (allUploaded) {
                const step3Modal = bootstrap.Modal.getInstance(document.getElementById('step3Modal'));
                step3Modal.hide();

                const step4Modal = new bootstrap.Modal(document.getElementById('step4Modal'));
                step4Modal.show();
            }
        });
    })();


    // ===== STEP 4 - TRAVELER SELECTION =====
    // Use event delegation for traveler cards (since they may be dynamically generated)
    document.body.addEventListener('click', e => {
        if (e.target.closest('.traveler-card')) {
            const card = e.target.closest('.traveler-card');
            const travelerId = card.getAttribute('data-traveler');
            if (card.classList.contains('selected')) {
                card.classList.remove('selected');
                selectedTravelers = selectedTravelers.filter(id => id !== travelerId);
            } else {
                card.classList.add('selected');
                selectedTravelers.push(travelerId);
            }
        }
    });








    // ===== Additional TRAVELER FIELDS =====
    if (numberInput && additionalSection) {
        numberInput.addEventListener("input", () => {
            const num = parseInt(numberInput.value) || 1;
            additionalSection.innerHTML = `<h5 class="fw-bold mb-4">Additional Travelers Information</h5>`;
            for (let i = 2; i <= num; i++) {
                const card = document.createElement('div');
                card.className = 'card p-3 mb-3';
                card.style.backgroundColor = '#f1f6fc';
                card.innerHTML = `
                    <h6 class="fw-bold mb-3">Traveler ${i}</h6>
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label">Full Name</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="bi bi-person"></i></span>
                                <input type="text" class="form-control" name="traveler_${i}_name" placeholder="Full Name">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Relation</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="bi bi-people"></i></span>
                                <input type="text" class="form-control" name="traveler_${i}_relation" placeholder="Relation">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Passport Number</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="bi bi-passport"></i></span>
                                <input type="text" class="form-control" name="traveler_${i}_passport" placeholder="Passport Number">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Date Of Birth</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="bi bi-calendar"></i></span>
                                <input type="date" class="form-control" name="traveler_${i}_dob" placeholder="Date Of Birth">
                            </div>
                        </div>
                    </div>`;
                additionalSection.appendChild(card);
            }
        });
    }



    // ===== STEP 4 VALIDATION =====
    (function () {
        const nextBtnStep4 = document.getElementById('step4NextBtn');
        if (!nextBtnStep4) return;

        const requiredFields = [
            { name: 'first_name', msg: 'First name is required' },
            { name: 'last_name', msg: 'Last name is required' },
            { name: 'phone_number', msg: 'Phone number is required' },
            { name: 'email', msg: 'Email address is required' },
            { name: 'passport_number', msg: 'Passport number is required' },
            { name: 'dob', msg: 'Date of Birth is required' },
            { name: 'profession', msg: 'Profession is required' },
            { name: 'travel_date_from', msg: 'Travel start date is required' },
            { name: 'travel_date_to', msg: 'Travel end date is required' },
            { name: 'travel_purpose', msg: 'Travel purpose is required' }
        ];

        // Hide errors when user types
        requiredFields.forEach(({ name }) => {
            const input = document.querySelector(`input[name = "${name}"]`);
            if (input) {
                input.addEventListener('input', function () {
                    const errorDiv = this.nextElementSibling;
                    if (errorDiv && errorDiv.classList.contains('step4-error') && this.value.trim()) {
                        errorDiv.style.display = 'none';
                        this.classList.remove('error');
                    }
                });
            }
        });

        nextBtnStep4.addEventListener('click', function (e) {
            e.preventDefault();
            let allValid = true;

            // Clear previous errors
            document.querySelectorAll('#step4Modal .step4-error').forEach(err => {
                err.style.display = 'none';
            });
            document.querySelectorAll('#step4Modal .form-control').forEach(input => {
                input.classList.remove('error');
            });

            // Validate each field
            requiredFields.forEach(({ name, msg }) => {
                const input = document.querySelector(`input[name = "${name}"]`);
                const errorDiv = input.nextElementSibling;

                if (!input.value.trim()) {
                    // input.style.border = "1px solid red";
                    // input.style.backgroundColor = "#fef2f2"; // light red for visibility
                    errorDiv.textContent = msg;
                    errorDiv.style.display = 'block';
                    input.classList.add('error');
                    allValid = false;
                }
            });
            // DOB validation (must be before today)
            const dobInput = document.querySelector(`input[name="dob"]`);
            const dobError = dobInput.nextElementSibling;

            if (dobInput.value) {
                const enteredDOB = new Date(dobInput.value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                if (enteredDOB >= today) {
                    dobError.textContent = 'Date of Birth must be before today';
                    dobError.style.display = 'block';
                    dobInput.classList.add('error');
                    allValid = false;
                }
            }

            // Email validation
            const emailInput = document.querySelector(`input[name="email"]`);
            const emailError = emailInput.nextElementSibling;
            if (emailInput.value.trim() && !isValidEmail(emailInput.value)) {
                emailError.textContent = 'Please enter a valid email address';
                emailError.style.display = 'block';
                emailInput.classList.add('error');
                allValid = false;
            }

            // Date validation
            const startDate = document.querySelector(`input[name="travel_date_from"]`);
            const endDate = document.querySelector('input[name="travel_date_to"]');
            const startDateError = startDate.nextElementSibling;
            const endDateError = endDate.nextElementSibling;

            // Today's date (without time)
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            // Check if "Travel Date From" is in the past or today
            if (startDate.value && new Date(startDate.value) <= today) {
                startDateError.textContent = 'Travel start date must be after today';
                startDateError.style.display = 'block';
                startDate.classList.add('error');
                allValid = false;
            }

            if (startDate.value && endDate.value && new Date(endDate.value) <= new Date(startDate.value)) {
                endDateError.textContent = 'Return date must be after departure date';
                endDateError.style.display = 'block';
                endDate.classList.add('error');
                allValid = false;
            }

            // Validate additional travelers
            const numTravelers = parseInt(document.getElementById("numTravellers").value) || 1;
            for (let i = 2; i <= numTravelers; i++) {
                const dynamicFields = [
                    { name: `traveler_${i}_name`, msg: `Traveler ${i} name is required` },
                    { name: `traveler_${i}_relation`, msg: `Traveler ${i} relation is required` },
                    { name: `traveler_${i}_passport`, msg: `Traveler ${i} passport is required` },
                    { name: `traveler_${i}_dob`, msg: `Traveler ${i} date of birth is required` }
                ];

                dynamicFields.forEach(({ name, msg }) => {
                    const input = document.querySelector(`[name="${name}"]`);
                    if (input) {
                        let errorDiv = input.parentElement.parentElement.querySelector(".step4-error");
                        if (!errorDiv) {
                            errorDiv = document.createElement("div");
                            errorDiv.className = "step4-error text-danger small mt-1";
                            errorDiv.style.display = "none";
                            input.parentElement.parentElement.appendChild(errorDiv);
                        }

                        if (!input.value.trim()) {
                            errorDiv.textContent = msg;
                            errorDiv.style.display = "block";
                            input.classList.add("error");
                            allValid = false;
                        }
                        else {
                            // Extra DOB validation for additional travelers
                            if (name.includes("_dob")) {
                                const enteredDOB = new Date(input.value);
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);

                                if (enteredDOB >= today) {
                                    errorDiv.textContent = `Traveler ${i} Date of Birth must be before today`;
                                    errorDiv.style.display = "block";
                                    input.classList.add("error");
                                    allValid = false;
                                    return; // Skip removing error class
                                }
                            }

                            errorDiv.textContent = "";
                            errorDiv.style.display = "none";
                            input.classList.remove("error");
                        }
                    }
                });
            }

            // Proceed if valid
            if (allValid) {
                const step4Modal = bootstrap.Modal.getInstance(document.getElementById('step4Modal'));
                step4Modal.hide();
                const step5Modal = new bootstrap.Modal(document.getElementById('step5Modal'));
                step5Modal.show();
            }
        });

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    })();

    // ===== STEP 5 - REVIEW MODALS =====
    document.getElementById('step3Modal')?.addEventListener('show.bs.modal', function () {
        this.querySelector("#selectedPackageName").textContent = selectedPackageName;
        this.querySelector("#selectedPackagePrice").textContent = `Price: $${selectedPackagePrice} USD`;
    });

    document.getElementById('step4Modal')?.addEventListener('show.bs.modal', function () {
        this.querySelector(".text-danger").textContent = `$${selectedPackagePrice} USD`;
    });

    document.getElementById('step5Modal')?.addEventListener('show.bs.modal', function () {
        logApplicationData();
    });

    // ===== SUBMIT BUTTON (INITIAL) =====
    if (submitButton) {
        submitButton.addEventListener('click', () => {
            logApplicationData();

            const travelersData = [];

            travelersData.push({
                name: `${document.getElementById("firstName").value} ${document.getElementById("lastName").value}`.trim(),
                relation: "Customer",
                dob: document.getElementById("DOB")?.value || "",
                passport: document.getElementById("passportNumber")?.value || ""
            });

            const numTravelers = parseInt(document.getElementById("numTravellers").value) || 1;
            for (let i = 2; i <= numTravelers; i++) {
                travelersData.push({
                    name: document.querySelector(`[name="traveler_${i}_name"]`)?.value || "",
                    relation: document.querySelector(`[name="traveler_${i}_relation"]`)?.value || "Family",
                    dob: document.querySelector(`[name="traveler_${i}_dob"]`)?.value || "",
                    passport: document.querySelector(`[name="traveler_${i}_passport"]`)?.value || ""
                });
            }

            // Render traveler selection cards dynamically
            if (travelerCardsContainer) {
                travelerCardsContainer.innerHTML = `
                    <h2 class="section-title">Pick Who's Traveling</h2>
                    <p class="section-subtitle">Select the names of all individuals who will be traveling with you.</p>
                    <div class="row g-3">
                        ${travelersData.map((traveler, index) => {
                    const initial = traveler.name ? traveler.name.charAt(0).toUpperCase() : "?";
                    const gradientColors = [
                        "linear-gradient(135deg, #f093fb, #f5576c)",
                        "linear-gradient(135deg, #4facfe, #00f2fe)",
                        "linear-gradient(135deg, #43e97b, #38f9d7)"
                    ];
                    const bg = index === 0 ? "" : `style="background:${gradientColors[index % gradientColors.length]}"`;
                    return `
                            <div class="col-12 col-md-6 col-xl-4">
                                <div class="traveler-card" data-traveler="${traveler.name.toLowerCase().replace(/\s+/g, '')}">
                                    <div class="d-flex align-items-start gap-3">
                                        <div class="traveler-avatar" ${bg}>${initial}</div>
                                        <div class="flex-grow-1">
                                            <div class="d-flex align-items-center gap-2 mb-2">
                                                <span class="traveler-name">${traveler.name}</span>
                                                <span class="relation-badge">${traveler.relation}</span>
                                            </div>
                                            <div class="traveler-meta">
                                                <div>Date of birth: ${traveler.dob}</div>
                                                <div>Passport Number: ${traveler.passport}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                }).join('')}
                    </div>
                    <div class="border-top pt-4 mt-4">
                        <button class="btn btn-success btn-submit" id="finalSubmitBtn">
                            Submit Invitation
                        </button>
                    </div>
                `;
            }

            // Add event listener to dynamically created final submit button
            // const finalSubmitBtn = document.getElementById('finalSubmitBtn');
            // if (finalSubmitBtn) {
            //     finalSubmitBtn.addEventListener('click', () => {
            //         resetFormAndState();

            //         // Close any open modals
            //         document.querySelectorAll('.modal.show').forEach(modalEl => {
            //             const modalInstance = bootstrap.Modal.getInstance(modalEl);
            //             if (modalInstance) modalInstance.hide();
            //         });
            //         document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.remove());

            //         // Show success message
            //         successMessage.classList.add('show');
            //         setTimeout(() => successMessage.classList.remove('show'), 3000);

            //         console.log("Form reset and back to country selection.");
            //     });
            // }

            // Close modals triggered by submit (if any)
            document.querySelectorAll('.modal.show').forEach(modalEl => {
                const modalInstance = bootstrap.Modal.getInstance(modalEl);
                if (modalInstance) modalInstance.hide();
            });
            document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.remove());

            // Move user to traveler selection step tab
            switchStep('traveler');
        });
    }

    // ===== LOGGING FUNCTION =====
    function logApplicationData() {
        console.clear();
        console.log("=== Application Data Summary ===");
        console.log("Selected Country:", selectedCountry);
        console.log("Selected Package ID:", selectedPackage);
        console.log("Selected Package Name:", selectedPackageName);
        console.log("Package Price:", selectedPackagePrice);
        console.log("From Country:", selectedFromCountry);
        console.log("Live In Country:", selectedLiveInCountry);
        console.log("Selected Travelers:", selectedTravelers);
        console.log("Uploaded Documents:", uploadedDocuments);

        console.log("\n=== All Form Fields ===");
        document.querySelectorAll("input, select, textarea").forEach(el => {
            const name = el.name || "(no name)";
            let value;
            if (el.type === "checkbox" || el.type === "radio") {
                value = el.checked ? "Checked" : "Unchecked";
            } else {
                value = el.value || "(empty)";
            }
            console.log(`${name}: ${value}`);
        });

        console.log("================================");
    }

    // ===== FILE UPLOAD HANDLER HELPER =====
    function handleFileUpload(inputId, boxId, fileNameId) {
        const input = document.getElementById(inputId);
        const box = document.getElementById(boxId);
        const fileNameDisplay = document.getElementById(fileNameId);

        if (!input || !box || !fileNameDisplay) return;

        input.addEventListener("change", function () {
            if (this.files && this.files.length > 0) {
                const fileName = this.files[0].name;
                fileNameDisplay.textContent = fileName;
                box.classList.add("accepted");
            } else {
                fileNameDisplay.textContent = "Click to upload or drag and drop";
                box.classList.remove("accepted");
            }
        });
    }

    handleFileUpload("passportUpload", "passportBox", "passportFileName");
    handleFileUpload("headshotUpload", "headshotBox", "headshotFileName");

}); // DOMContentLoaded end


// Separate listener for step4NextBtn outside DOMContentLoaded to ensure element is loaded
document.getElementById("step4NextBtn")?.addEventListener("click", function () {
    document.querySelector(".review-plan-name").textContent = window.selectedPackageName || "";
    document.querySelector(".review-description").textContent = "Invitation processing time is 48 hours";
    document.querySelector(".review-duration").textContent = "96 Hours Valid";

    const firstName = document.getElementById("firstName").value || "";
    const lastName = document.getElementById("lastName").value || "";
    document.querySelector(".review-name").textContent = `${firstName} ${lastName}`.trim();
    document.querySelector(".review-contact").textContent = document.getElementById("phoneNumber").value || "";
    document.querySelector(".review-email").textContent = document.getElementById("emailAddress").value || "";

    document.querySelector(".review-from-country").textContent =
        document.getElementById("fromCountry").value || document.getElementById("fromCountry1")?.value || "";
    document.querySelector(".review-livein-country").textContent =
        document.getElementById("liveInCountry").value || document.getElementById("liveInCountry1")?.value || "";

    document.querySelector(".review-passport").textContent = document.getElementById("passportNumber").value || "";
    document.querySelector(".review-profession").textContent = document.getElementById("profession").value || "";

    document.querySelector(".review-travel-date").textContent = document.getElementById("travelDateFrom").value || "";
    document.querySelector(".review-return-date").textContent = document.getElementById("travelDateTo").value || "";
    document.querySelector(".review-dob").textContent = document.getElementById("DOB").value || "";

    document.querySelector(".review-purpose").textContent = document.getElementById("travelPurpose").value || "";
    document.querySelector(".review-num-travelers").textContent = document.getElementById("numTravellers").value || "";

    // ===== FULL ADDITIONAL TRAVELERS TABLE =====
    const additionalTravelersContainer = document.querySelector(".review-additional-travelers");
    additionalTravelersContainer.innerHTML = "";

    const travelers = [];
    const numTravelers = parseInt(document.getElementById("numTravellers").value) || 1;

    for (let i = 2; i <= numTravelers; i++) {
        travelers.push({
            name: document.querySelector(`[name="traveler_${i}_name"]`)?.value.trim() || "",
            relation: document.querySelector(`[name="traveler_${i}_relation"]`)?.value.trim() || "Family",
            dob: document.querySelector(`[name="traveler_${i}_dob"]`)?.value || "",
            passport: document.querySelector(`[name="traveler_${i}_passport"]`)?.value || ""
        });
    }

    if (travelers.length && travelers.some(t => t.name)) {
        const table = document.createElement("table");
        table.className = "table table-bordered table-sm";
        const thead = document.createElement("thead");
        thead.innerHTML = `
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Relation</th>
                <th>Date of Birth</th>
                <th>Passport Number</th>
            </tr>`;
        table.appendChild(thead);

        const tbody = document.createElement("tbody");
        travelers.forEach((traveler, index) => {
            if (traveler.name) {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${traveler.name}</td>
                    <td>${traveler.relation}</td>
                    <td>${traveler.dob}</td>
                    <td>${traveler.passport}</td>
                `;
                tbody.appendChild(row);
            }
        });
        table.appendChild(tbody);
        additionalTravelersContainer.appendChild(table);
    } else {
        additionalTravelersContainer.textContent = "None";
    }
});
document.querySelectorAll('.details-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault(); // stops reload
        // show modal or fetch data here
        console.log('Details button clicked');
    });
});
// document.addEventListener('DOMContentLoaded', function () {
//     document.getElementById('submitBtn').addEventListener('click', function (e) {
//         console.log("done");
//         e.preventDefault();

//         // Optional: client-side check before submit
//         const checkbox = document.querySelector('input[name="confirm_decision"]');
//         if (!checkbox.checked) {
//             alert('You must confirm your decision before submitting.');
//             return;
//         }

//         // Now submit the form manually
//         document.getElementById('visaForm').submit();
//     });
// });
document.getElementById('submitBtn').addEventListener('click', function () {
    const form = document.getElementById('visaForm');
    const formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'X-CSRF-TOKEN': document.querySelector('input[name="_token"]').value
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data); // Show in console
            // Or update HTML with response
        })
        .catch(err => console.error(err));
});


//BY Murk
// step 1 validation
const fromCountryEl = document.getElementById('fromCountry1');
const liveInCountryEl = document.getElementById('liveInCountry1');
const nextBtnStep1 = document.querySelector('#step1Modal #nextStep1Btn');

// Create error message containers
const fromError = document.createElement('div');
fromError.className = 'invalid-feedback d-block text-danger small';

const liveInError = document.createElement('div');
liveInError.className = 'invalid-feedback d-block text-danger small';

// Append error containers under the selects
if (fromCountryEl) fromCountryEl.parentNode.appendChild(fromError);
if (liveInCountryEl) liveInCountryEl.parentNode.appendChild(liveInError);

// Validation function
function validateStep1() {
    let valid = true;
    fromError.textContent = '';
    liveInError.textContent = '';

    fromCountryEl.classList.remove('is-invalid');
    liveInCountryEl.classList.remove('is-invalid');

    if (!fromCountryEl.value) {
        fromError.textContent = 'Please select your origin country';
        fromCountryEl.classList.add('is-invalid');
        valid = false;
    }

    if (!liveInCountryEl.value) {
        liveInError.textContent = 'Please select the country you live in';
        liveInCountryEl.classList.add('is-invalid');
        valid = false;
    }

    // if (fromCountryEl.value && liveInCountryEl.value && fromCountryEl.value === liveInCountryEl.value) {
    //    liveInError.textContent = 'Origin and destination countries must be different';
    //     liveInCountryEl.classList.add('is-invalid');
    //     valid = false; 
    // }

    return valid;
}
// Block "Next" button if validation fails
if (nextBtnStep1) {
    nextBtnStep1.addEventListener('click', function () {
        if (validateStep1()) {
            // If valid, close Step 1 and open Step 2 manually
            const step1Modal = bootstrap.Modal.getInstance(document.getElementById('step1Modal'));
            step1Modal.hide();

            const step2Modal = new bootstrap.Modal(document.getElementById('step2Modal'));
            step2Modal.show();
        }
        // If invalid, nothing happens except showing errors
    });
}

// step 1 validation end


//step 2 validation

(function () {
    const nextBtnStep2 = document.getElementById('nextStep2Btn');
    if (!nextBtnStep2) return;

    const requiredCheckboxes = [
        { id: 'confirmPassport', msg: 'Please confirm you have a valid passport' },
        { id: 'confirmPicture', msg: 'Please confirm you have a picture/headshot' },
        { id: 'confirmNoOtherVisa', msg: 'Please confirm no active application' },
        { id: 'confirmDecision', msg: 'Please acknowledge government discretion' }
    ];

    // Create error containers once
    requiredCheckboxes.forEach(({ id }) => {
        const cb = document.getElementById(id);
        if (!cb) return;
        const container = cb.closest('.form-check');
        if (!container.querySelector('.step2-error')) {
            const err = document.createElement('div');
            err.className = 'step2-error text-danger small mt-1';
            err.style.display = 'none';
            container.appendChild(err);
        }
        cb.addEventListener('change', () => {
            const err = container.querySelector('.step2-error');
            if (cb.checked) err.style.display = 'none';
        });
    });

    nextBtnStep2.addEventListener('click', () => {
        let allChecked = true;

        requiredCheckboxes.forEach(({ id, msg }) => {
            const cb = document.getElementById(id);
            const err = cb.closest('.form-check').querySelector('.step2-error');
            if (!cb.checked) {
                err.textContent = msg;
                err.style.display = 'block';
                allChecked = false;
            } else {
                err.style.display = 'none';
            }
        });

        if (allChecked) {
            const modal2 = bootstrap.Modal.getInstance(document.getElementById('step2Modal'));
            modal2.hide();
            new bootstrap.Modal(document.getElementById('step3Modal')).show();
        }
    });
})();

// step 2 validation end

function addPackage() {
    // Get form values
    const title = document.getElementById('packageTitle').value;
    const country = document.getElementById('packageCountry').value;
    const price = document.getElementById('packagePrice').value;
    const originalPrice = document.getElementById('originalPrice').value;
    const flag = document.getElementById('countryFlag').value;
    const features = document.getElementById('packageFeatures').value;
    const processingTime = document.getElementById('processingTime').value;
    const slug = document.getElementById('packageSlug').value;

    // Validate form
    if (!title || !country || !price || !originalPrice || !flag || !features || !processingTime || !slug) {
        alert('Please fill all fields');
        return;
    }

    // Create features array
    const featuresArray = features.split('\n').filter(f => f.trim());

    // 🚀 Send data to Laravel backend
    fetch("/packages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content")
        },
        body: JSON.stringify({
            title,
            country,
            price,
            original_price: originalPrice,
            flag,
            features: featuresArray,
            processing_time: processingTime,
            slug
        })
    })
        .then(async res => {
            if (!res.ok) {
                // Laravel validation error (422) or server error
                let errorText = await res.text();
                try {
                    let errorJson = JSON.parse(errorText);
                    if (errorJson.errors) {
                        // show first error
                        let firstError = Object.values(errorJson.errors)[0][0];
                        throw new Error("Validation error: " + firstError);
                    }
                } catch {
                    throw new Error("Server error: " + res.status + " " + res.statusText);
                }
            }
            return res.json();
        })
        .then(data => {
            if (data.success) {
                alert("✅ Package saved in database!");

                const savings = originalPrice - price;
                let featuresHTML = featuresArray.map(feature =>
                    `<li><span class="feature-icon">✓</span> ${feature.trim()}</li>`
                ).join("");

                const packageHTML = `
                <div class="col-12 col-lg-4">
                    <div class="package-card h-100" data-package="${slug}">
                        <div class="package-header mb-3">
                            <div class="package-title">${title}</div>
                            <div class="d-flex flex-wrap mt-2">
                                <span class="badge badge-flag">${flag}</span>
                                <span class="badge badge-package">Package For ${country}</span>
                            </div>
                        </div>

                        <div class="package-pricing mb-3">
                            <div class="price-main">$${price} USD</div>
                            <div class="d-flex align-items-center gap-2 mt-1">
                                <span class="price-original">$${originalPrice} USD</span>
                                <span class="price-savings">Save $${savings}</span>
                            </div>
                        </div>

                        <ul class="package-features">
                            ${featuresHTML}
                        </ul>

                        <div class="processing-time">
                            <span>⏱</span>
                            <span>${processingTime}</span>
                        </div>

                        <button class="btn btn-custom open-modal" data-bs-toggle="modal" data-bs-target="#step1Modal"
                            data-bs-dismiss="modal" data-package-name="${title}"
                            data-package-price="${price}">
                            Get Started <span>→</span>
                        </button>
                    </div>
                </div>
            `;

                const visaFormComponent = document.querySelector('x-visa-form-component');
                if (visaFormComponent) {
                    visaFormComponent.insertAdjacentHTML('beforebegin', packageHTML);
                } else {
                    document.getElementById('packages-container').insertAdjacentHTML('beforeend', packageHTML);
                }

                // Reset form
                document.getElementById('packageForm').reset();

                // Close modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('addPackageModal'));
                modal.hide();
            } else {
                alert("❌ Failed to save package!");
                console.log(data);
            }
        })
        .catch(err => {
            console.error("Error:", err);
            alert("⚠️ " + err.message);
        });
}

// Handle package selection for step1Modal
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('.btn-custom') || e.target.closest('.btn-custom')) {
        const button = e.target.classList.contains('.btn-custom') ? e.target : e.target.closest('.btn-custom');
        const packageName = button.getAttribute('data-package-name');
        const packagePrice = button.getAttribute('data-package-price');

        document.getElementById('selectedPackageName').textContent = packageName;
        document.getElementById('selectedPackagePrice').textContent = packagePrice;
    }
});

document.addEventListener("DOMContentLoaded", function () {
    fetch("/packages")
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("packages-container");

            data.forEach(pkg => {
                const savings = pkg.original_price - pkg.price;
                const featuresHTML = pkg.features.map(feature =>
                    `<li><span class="feature-icon">✓</span> ${feature.trim()}</li>`
                ).join("");

                const packageHTML = `
                <div class="col-12 col-lg-4">
                    <div class="package-card h-100" data-package="${pkg.slug}">
                        <div class="package-header mb-3">
                            <div class="package-title">${pkg.title}</div>
                            <div class="d-flex flex-wrap mt-2">
                                <span class="badge badge-flag">${pkg.flag}</span>
                                <span class="badge badge-package">Package For ${pkg.country}</span>
                            </div>
                        </div>

                        <div class="package-pricing mb-3">
                            <div class="price-main">$${pkg.price} USD</div>
                            <div class="d-flex align-items-center gap-2 mt-1">
                                <span class="price-original">$${pkg.original_price} USD</span>
                                <span class="price-savings">Save $${savings}</span>
                            </div>
                        </div>

                        <ul class="package-features">
                            ${featuresHTML}
                        </ul>

                        <div class="processing-time">
                            <span>⏱</span>
                            <span>${pkg.processing_time}</span>
                        </div>

                        <button class="btn btn-custom open-modal" data-bs-toggle="modal" data-bs-target="#step1Modal"
                            data-bs-dismiss="modal" data-package-name="${pkg.title}"
                            data-package-price="${pkg.price}">
                            Get Started <span>→</span>
                        </button>
                    </div>
                </div>
                `;

                // Insert before visa form if exists, else append
                const visaFormComponent = container.querySelector('x-visa-form-component');
                if (visaFormComponent) {
                    visaFormComponent.insertAdjacentHTML('beforebegin', packageHTML);
                } else {
                    container.insertAdjacentHTML('beforeend', packageHTML);
                }
            });
        })
        .catch(err => console.error("Error fetching packages:", err));
});
