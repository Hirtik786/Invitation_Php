document.addEventListener('DOMContentLoaded', () => {
    // ===== GLOBAL STATE =====
    let selectedCountry = null;
    let selectedPackage = null;
    let selectedPackageName = 'Selected Package';
    let selectedPackagePrice = null;
    let selectedFromCountry = '';
    let selectedLiveInCountry = '';
    let selectedTravelers = [];
    let uploadedDocuments = {};
    let personalDetails = {};

    // Expose a few read-only bits if other inline scripts need them
    Object.defineProperties(window, {
        selectedPackageName: {
            get: () => selectedPackageName,
        },
        selectedPackagePrice: {
            get: () => selectedPackagePrice,
        },
    });

    // ===== DOM REFERENCES =====
    const stepTabs = document.querySelectorAll('.step-tab');
    const stepContents = document.querySelectorAll('.step-content');
    const countryCards = document.querySelectorAll('.country-card');
    const packageCards = document.querySelectorAll('.package-card');
    const travelerCardsContainer = document.getElementById('traveler-cards');
    const submitButton = document.getElementById('submitButton');
    const successMessage = document.getElementById('successMessage');
    const numberInput = document.getElementById('numTravellers');
    const additionalSection = document.getElementById('additionalTravelersSection');

    // ===== HELPER: Switch Step =====
    // function switchStep(stepName) {
    //     stepTabs.forEach((tab) => tab.classList.toggle('active', tab.getAttribute('data-step') === stepName));
    //     stepContents.forEach((content) => content.classList.toggle('active', content.id === `${stepName}-step`));
    // }
    function switchStep(stepName) {
        console.log('[DEBUG] Switching to step:', stepName);

        stepTabs.forEach((tab) => tab.classList.toggle('active', tab.getAttribute('data-step') === stepName));
        stepContents.forEach((content) => {
            console.log('[DEBUG] Processing content:', content.id);
            if (content.id === `${stepName}-step`) {
                content.classList.add('active');
                content.classList.remove('d-none');
                content.style.display = "block";
                console.log('[DEBUG] Showing:', content.id);
            } else {
                content.classList.remove('active');
                content.classList.add('d-none');
            }
        });
        console.log(selectedPackageName);
        console.log(selectedPackagePrice);
    }


    // ===== RESET FORM & STATE =====
    function resetFormAndState() {
        document.querySelectorAll('form').forEach((form) => form.reset());

        selectedCountry = null;
        selectedPackage = null;
        selectedPackageName = 'Selected Package';
        selectedPackagePrice = null;
        selectedFromCountry = '';
        selectedLiveInCountry = '';
        selectedTravelers = [];
        uploadedDocuments = {};
        personalDetails = {};

        document.querySelectorAll('.selected').forEach((el) => el.classList.remove('selected'));

        if (travelerCardsContainer) travelerCardsContainer.innerHTML = '';
        if (additionalSection) additionalSection.innerHTML = '';

        // switchStep('country');
    }

    // ===== STEP NAVIGATION =====
    stepTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const step = tab.getAttribute('data-step');
            switchStep(step);
        });
    });

    // ===== STEP 1 - COUNTRY SELECTION =====
    countryCards.forEach((card) => {
        card.addEventListener('click', () => {
            selectedCountry = card.dataset.country;

            countryCards.forEach((c) => c.classList.remove('selected'));
            card.classList.add('selected');

            const countryName = card.querySelector('.country-name').textContent.trim();
            const countryFlagImg = card.querySelector('.country-flag img').src;

            document.querySelectorAll('.badge-package').forEach((badge) => {
                badge.textContent = `Package For ${countryName}`;
            });
            document.querySelectorAll('.visa-Selected').forEach((badge) => {
                badge.textContent = `VISA FOR : ${countryName}`;
            });
            document.querySelectorAll('.selected-country').forEach((badge) => {
                badge.textContent = countryName;
            });
            document.querySelectorAll('.badge-flag').forEach((flagBadge) => {
                flagBadge.innerHTML = `<img src="${countryFlagImg}" alt="${countryName} Flag" style="width:30px;height:auto;">`;
            });

            switchStep('package');
        });
    });

    // ===== STEP 2 - PACKAGE SELECTION =====
    document.querySelectorAll('.open-modal').forEach((button) => {
        button.addEventListener('click', function () {
            selectedPackage = this.getAttribute('data-package-id') || null;
            selectedPackageName = this.getAttribute('data-package-name') || 'Selected Package';
            selectedPackagePrice = this.getAttribute('data-package-price') || '0';


            const nameEl = document.getElementById('selectedPackageName');
            const priceEl = document.getElementById('selectedPackagePrice');
            if (nameEl) nameEl.textContent = selectedPackageName;
            if (priceEl) priceEl.textContent = `$${selectedPackagePrice}`;
        });
    });

    // ===== STEP 2.1 - DROPDOWNS =====
    document.getElementById('fromCountry1')?.addEventListener('change', function () {
        selectedFromCountry = this.value;
        const fixed = document.getElementById('fromCountry');
        if (fixed) fixed.value = selectedFromCountry;
    });

    document.getElementById('liveInCountry1')?.addEventListener('change', function () {
        selectedLiveInCountry = this.value;
        const fixed = document.getElementById('liveInCountry');
        if (fixed) fixed.value = selectedLiveInCountry;
    });

    // ===== STEP 3 - DOCUMENT UPLOAD =====
    document.querySelectorAll('.document-upload').forEach((input) => {
        input.addEventListener('change', function () {
            const file = this.files?.[0];
            const uploadArea = this.parentElement.querySelector('.upload-area-custom');
            const uploadContent = uploadArea.querySelector('.upload-content');
            const uploadPreview = uploadArea.querySelector('.upload-preview');
            const uploadFilename = uploadArea.querySelector('.upload-filename');
            const errorDiv = this.parentElement.querySelector('.step3-error');

            if (file) {
                uploadedDocuments[this.name] = file.name;
                uploadArea.classList.add('uploaded');
                uploadContent.style.display = 'none';
                uploadPreview.style.display = 'block';
                uploadFilename.textContent = file.name;
                if (errorDiv) errorDiv.style.display = 'none';
                uploadArea.classList.remove('error');
            } else {
                uploadArea.classList.remove('uploaded');
                uploadContent.style.display = 'block';
                uploadPreview.style.display = 'none';
                uploadFilename.textContent = '';
                delete uploadedDocuments[this.name];
            }
        });
    });

    // Step 3 modal next validation
    (function () {
        const nextBtnStep3 = document.getElementById('nextStep3Btn');
        if (!nextBtnStep3) return;

        const requiredUploads = [
            { name: 'passport', msg: 'Please upload your passport document' },
            { name: 'headshot', msg: 'Please upload your picture/headshot' },
        ];

        document.querySelectorAll('.document-upload').forEach((inputEl) => {
            inputEl.addEventListener('change', function () {
                if (this.files?.[0]) {
                    const colContainer = this.closest('.col-md-6');
                    const errorDiv = colContainer.querySelector('.step3-error');
                    if (errorDiv) errorDiv.style.display = 'none';
                }
            });
        });

        nextBtnStep3.addEventListener('click', function () {
            let allUploaded = true;

            document.querySelectorAll('.step3-error').forEach((err) => {
                err.style.display = 'none';
                err.textContent = '';
            });

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
                    if (uploadArea) uploadArea.classList.add('error');
                    allUploaded = false;
                } else {
                    const uploadArea = colContainer.querySelector('.upload-area-custom');
                    if (uploadArea) uploadArea.classList.remove('error');
                }
            });

            if (allUploaded) {
                const step3Modal = bootstrap.Modal.getInstance(document.getElementById('step3Modal'));
                step3Modal?.hide();
                new bootstrap.Modal(document.getElementById('step4Modal')).show();
            }
        });
    })();

    // ===== STEP 4 - TRAVELER SELECTION (delegation) =====
    document.body.addEventListener('click', (e) => {
        const card = e.target.closest?.('.traveler-card');
        if (!card) return;
        const travelerId = card.getAttribute('data-traveler');
        if (card.classList.contains('selected')) {
            card.classList.remove('selected');
            selectedTravelers = selectedTravelers.filter((id) => id !== travelerId);
        } else {
            card.classList.add('selected');
            selectedTravelers.push(travelerId);
        }
    });

    // ===== Additional TRAVELER FIELDS =====
    if (numberInput && additionalSection) {
        numberInput.addEventListener('input', () => {
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
            { name: 'travel_purpose', msg: 'Travel purpose is required' },
        ];

        requiredFields.forEach(({ name }) => {
            const input = document.querySelector(`input[name="${name}"]`);
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

            document.querySelectorAll('#step4Modal .step4-error').forEach((err) => {
                err.style.display = 'none';
            });
            document.querySelectorAll('#step4Modal .form-control').forEach((input) => {
                input.classList.remove('error');
            });

            requiredFields.forEach(({ name, msg }) => {
                const input = document.querySelector(`input[name="${name}"]`);
                const errorDiv = input?.nextElementSibling;
                if (input && !input.value.trim()) {
                    errorDiv.textContent = msg;
                    errorDiv.style.display = 'block';
                    input.classList.add('error');
                    allValid = false;
                }
            });

            // DOB must be before today
            const dobInput = document.querySelector('input[name="dob"]');
            const dobError = dobInput?.nextElementSibling;
            if (dobInput?.value) {
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
            const emailInput = document.querySelector('input[name="email"]');
            const emailError = emailInput?.nextElementSibling;
            if (emailInput?.value.trim() && !/^([^\s@]+)@([^\s@]+)\.[^\s@]+$/.test(emailInput.value)) {
                emailError.textContent = 'Please enter a valid email address';
                emailError.style.display = 'block';
                emailInput.classList.add('error');
                allValid = false;
            }

            // Date validation
            const startDate = document.querySelector('input[name="travel_date_from"]');
            const endDate = document.querySelector('input[name="travel_date_to"]');
            const startDateError = startDate?.nextElementSibling;
            const endDateError = endDate?.nextElementSibling;
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (startDate?.value && new Date(startDate.value) <= today) {
                startDateError.textContent = 'Travel start date must be after today';
                startDateError.style.display = 'block';
                startDate.classList.add('error');
                allValid = false;
            }

            if (startDate?.value && endDate?.value && new Date(endDate.value) <= new Date(startDate.value)) {
                endDateError.textContent = 'Return date must be after departure date';
                endDateError.style.display = 'block';
                endDate.classList.add('error');
                allValid = false;
            }

            // Validate additional travelers
            const numTravelers = parseInt(document.getElementById('numTravellers')?.value) || 1;
            for (let i = 2; i <= numTravelers; i++) {
                const dynamicFields = [
                    { name: `traveler_${i}_name`, msg: `Traveler ${i} name is required` },
                    { name: `traveler_${i}_relation`, msg: `Traveler ${i} relation is required` },
                    { name: `traveler_${i}_passport`, msg: `Traveler ${i} passport is required` },
                    { name: `traveler_${i}_dob`, msg: `Traveler ${i} date of birth is required` },
                ];

                dynamicFields.forEach(({ name, msg }) => {
                    const input = document.querySelector(`[name="${name}"]`);
                    if (input) {
                        let errorDiv = input.parentElement.parentElement.querySelector('.step4-error');
                        if (!errorDiv) {
                            errorDiv = document.createElement('div');
                            errorDiv.className = 'step4-error text-danger small mt-1';
                            errorDiv.style.display = 'none';
                            input.parentElement.parentElement.appendChild(errorDiv);
                        }

                        if (!input.value.trim()) {
                            errorDiv.textContent = msg;
                            errorDiv.style.display = 'block';
                            input.classList.add('error');
                            allValid = false;
                        } else {
                            if (name.includes('_dob')) {
                                const enteredDOB = new Date(input.value);
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                if (enteredDOB >= today) {
                                    errorDiv.textContent = `Traveler ${i} Date of Birth must be before today`;
                                    errorDiv.style.display = 'block';
                                    input.classList.add('error');
                                    allValid = false;
                                    return;
                                }
                            }
                            errorDiv.textContent = '';
                            errorDiv.style.display = 'none';
                            input.classList.remove('error');
                        }
                    }
                });
            }

            if (allValid) {
                const step4Modal = bootstrap.Modal.getInstance(document.getElementById('step4Modal'));
                step4Modal?.hide();
                new bootstrap.Modal(document.getElementById('step5Modal')).show();
            }
        });
    })();

    // ===== STEP 5 - REVIEW MODALS =====
    document.getElementById('step3Modal')?.addEventListener('show.bs.modal', function () {
        this.querySelector('#selectedPackageName').textContent = selectedPackageName;
        this.querySelector('#selectedPackagePrice').textContent = `Price: $${selectedPackagePrice} USD`;
    });

    document.getElementById('step4Modal')?.addEventListener('show.bs.modal', function () {
        const priceEl = this.querySelector('.text-danger');
        if (priceEl) priceEl.textContent = `$${selectedPackagePrice} USD`;
    });

    document.getElementById('step5Modal')?.addEventListener('show.bs.modal', function () {
        logApplicationData();
    });
    // ===== SUBMIT BUTTON (INITIAL) =====
    if (submitButton) {
        submitButton.addEventListener('click', () => {
            // 1. Log data
            logApplicationData();

            // 2. Collect traveler data
            const travelersData = [];

            // Main traveler
            const firstName = document.getElementById("firstName")?.value || '';
            const lastName = document.getElementById("lastName")?.value || '';
            travelersData.push({
                name: `${firstName} ${lastName}`.trim(),
                relation: "Customer",
                dob: document.getElementById("DOB")?.value || '',
                passport: document.getElementById("passportNumber")?.value || ''
            });

            // Additional travelers
            const numTravelers = parseInt(document.getElementById("numTravellers")?.value) || 1;
            for (let i = 2; i <= numTravelers; i++) {
                travelersData.push({
                    name: document.querySelector(`[name="traveler_${i}_name"]`)?.value || '',
                    relation: document.querySelector(`[name="traveler_${i}_relation"]`)?.value || 'Family',
                    dob: document.querySelector(`[name="traveler_${i}_dob"]`)?.value || '',
                    passport: document.querySelector(`[name="traveler_${i}_passport"]`)?.value || ''
                });
            }

            // 3. Build traveler step HTML (inject into existing traveler-step container)
            const travelerStepContainer = document.getElementById("traveler-step");
            if (travelerStepContainer) {
                travelerStepContainer.innerHTML = `
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
                }).join("")}
                </div>
                <div class="border-top pt-4 mt-4">
                    <button class="btn btn-success btn-submit" id="submitBtn">
                        Submit Invitation
                    </button>
                </div>
            `;
            }

            // 4. Close modals
            document.querySelectorAll('.modal.show').forEach(modalEl => {
                const modalInstance = bootstrap.Modal.getInstance(modalEl);
                if (modalInstance) modalInstance.hide();
            });
            document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.remove());

            // 5. Switch to traveler step using click (like your working code)
            const travelerTab = document.querySelector('.step-tab[data-step="traveler"]');
            if (travelerTab) {
                travelerTab.click();
            }
        });
    }

    // ===== LOGGING END =====

    // ===== LOGGING FUNCTION =====
    function logApplicationData() {
        console.clear();
        console.log('=== Application Data Summary ===');
        console.log('Selected Country:', selectedCountry);
        console.log('Selected Package ID:', selectedPackage);
        console.log('Selected Package Name:', selectedPackageName);
        console.log('Package Price:', selectedPackagePrice);
        console.log('From Country:', selectedFromCountry);
        console.log('Live In Country:', selectedLiveInCountry);
        console.log('Selected Travelers:', selectedTravelers);
        console.log('Uploaded Documents:', uploadedDocuments);
        console.log('\n=== All Form Fields ===');
        document.querySelectorAll('input, select, textarea').forEach((el) => {
            const name = el.name || '(no name)';
            let value;
            if (el.type === 'checkbox' || el.type === 'radio') {
                value = el.checked ? 'Checked' : 'Unchecked';
            } else {
                value = el.value || '(empty)';
            }
            console.log(`${name}: ${value}`);
        });
        console.log('================================');
    }

    // ===== FILE UPLOAD HANDLER HELPER =====
    function handleFileUpload(inputId, boxId, fileNameId) {
        const input = document.getElementById(inputId);
        const box = document.getElementById(boxId);
        const fileNameDisplay = document.getElementById(fileNameId);
        if (!input || !box || !fileNameDisplay) return;
        input.addEventListener('change', function () {
            if (this.files && this.files.length > 0) {
                const fileName = this.files[0].name;
                fileNameDisplay.textContent = fileName;
                box.classList.add('accepted');
            } else {
                fileNameDisplay.textContent = 'Click to upload or drag and drop';
                box.classList.remove('accepted');
            }
        });
    }
    handleFileUpload('passportUpload', 'passportBox', 'passportFileName');
    handleFileUpload('headshotUpload', 'headshotBox', 'headshotFileName');

    // ===== REVIEW (Step 4 Next -> fill review) =====
    document.getElementById('step4NextBtn')?.addEventListener('click', function () {
        const reviewPlan = document.querySelector('.review-plan-name');
        if (reviewPlan) reviewPlan.textContent = selectedPackageName || '';

        const reviewDesc = document.querySelector('.review-description');
        if (reviewDesc) reviewDesc.textContent = 'Invitation processing time is 48 hours';

        const reviewDur = document.querySelector('.review-duration');
        if (reviewDur) reviewDur.textContent = '96 Hours Valid';

        const firstName = document.getElementById('firstName')?.value || '';
        const lastName = document.getElementById('lastName')?.value || '';
        const reviewName = document.querySelector('.review-name');
        if (reviewName) reviewName.textContent = `${firstName} ${lastName}`.trim();

        const reviewContact = document.querySelector('.review-contact');
        if (reviewContact) reviewContact.textContent = document.getElementById('phoneNumber')?.value || '';

        const reviewEmail = document.querySelector('.review-email');
        if (reviewEmail) reviewEmail.textContent = document.getElementById('emailAddress')?.value || '';

        const fromVal = document.getElementById('fromCountry')?.value || document.getElementById('fromCountry1')?.value || '';
        const liveVal = document.getElementById('liveInCountry')?.value || document.getElementById('liveInCountry1')?.value || '';
        const reviewFrom = document.querySelector('.review-from-country');
        if (reviewFrom) reviewFrom.textContent = fromVal;
        const reviewLive = document.querySelector('.review-livein-country');
        if (reviewLive) reviewLive.textContent = liveVal;

        const setText = (sel, v) => {
            const el = document.querySelector(sel);
            if (el) el.textContent = v || '';
        };
        setText('.review-passport', document.getElementById('passportNumber')?.value || '');
        setText('.review-profession', document.getElementById('profession')?.value || '');
        setText('.review-travel-date', document.getElementById('travelDateFrom')?.value || '');
        setText('.review-return-date', document.getElementById('travelDateTo')?.value || '');
        setText('.review-dob', document.getElementById('DOB')?.value || '');
        setText('.review-purpose', document.getElementById('travelPurpose')?.value || '');
        setText('.review-num-travelers', document.getElementById('numTravellers')?.value || '');

        // Additional travelers table
        const additionalTravelersContainer = document.querySelector('.review-additional-travelers');
        if (!additionalTravelersContainer) return;
        additionalTravelersContainer.innerHTML = '';

        const travelers = [];
        const numTravelers = parseInt(document.getElementById('numTravellers')?.value) || 1;
        for (let i = 2; i <= numTravelers; i++) {
            travelers.push({
                name: document.querySelector(`[name="traveler_${i}_name"]`)?.value.trim() || '',
                relation: document.querySelector(`[name="traveler_${i}_relation"]`)?.value.trim() || 'Family',
                dob: document.querySelector(`[name="traveler_${i}_dob"]`)?.value || '',
                passport: document.querySelector(`[name="traveler_${i}_passport"]`)?.value || '',
            });
        }

        if (travelers.length && travelers.some((t) => t.name)) {
            const table = document.createElement('table');
            table.className = 'table table-bordered table-sm';
            const thead = document.createElement('thead');
            thead.innerHTML = `
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Relation</th>
          <th>Date of Birth</th>
          <th>Passport Number</th>
        </tr>`;
            table.appendChild(thead);

            const tbody = document.createElement('tbody');
            travelers.forEach((traveler, index) => {
                if (traveler.name) {
                    const row = document.createElement('tr');
                    row.innerHTML = `
            <td>${index + 1}</td>
            <td>${traveler.name}</td>
            <td>${traveler.relation}</td>
            <td>${traveler.dob}</td>
            <td>${traveler.passport}</td>`;
                    tbody.appendChild(row);
                }
            });
            table.appendChild(tbody);
            additionalTravelersContainer.appendChild(table);
        } else {
            additionalTravelersContainer.textContent = 'None';
        }
    });

    // ===== Details button (prevent default) =====
    document.querySelectorAll('.details-btn').forEach((btn) => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('Details button clicked');
        });
    });

    // ===== Form submit via fetch (if present) =====
    const submitBtn = document.getElementById('submitButton');
    // Updated submit button handler for database submission
    if (submitButton) {
        submitButton.addEventListener('click', async () => {
            // Show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Submitting...';

            try {
                // Create FormData object
                const formData = new FormData();

                // // Add package information
                formData.append('package_name', selectedPackageName);
                formData.append('package_price', selectedPackagePrice);

                // Add location information
                formData.append('from_country', selectedFromCountry);
                formData.append('live_in_country', selectedLiveInCountry);

                // Add personal details
                formData.append('first_name', document.getElementById('firstName')?.value || '');
                formData.append('last_name', document.getElementById('lastName')?.value || '');
                formData.append('phone_number', document.getElementById('phoneNumber')?.value || '');
                formData.append('email', document.getElementById('emailAddress')?.value || '');
                formData.append('passport_number', document.getElementById('passportNumber')?.value || '');
                formData.append('dob', document.getElementById('DOB')?.value || '');
                formData.append('profession', document.getElementById('profession')?.value || '');
                formData.append('travel_date_from', document.getElementById('travelDateFrom')?.value || '');
                formData.append('travel_date_to', document.getElementById('travelDateTo')?.value || '');
                formData.append('travel_purpose', document.getElementById('travelPurpose')?.value || '');
                formData.append('num_travellers', document.getElementById('numTravellers')?.value || '1');

                // Add uploaded documents
                const passportFile = document.getElementById('passportUpload')?.files[0];
                const headshotFile = document.getElementById('headshotUpload')?.files[0];

                if (passportFile) {
                    formData.append('passport', passportFile);
                }
                if (headshotFile) {
                    formData.append('headshot', headshotFile);
                }

                // Add additional travelers
                const numTravelers = parseInt(document.getElementById('numTravellers')?.value) || 1;
                for (let i = 2; i <= numTravelers; i++) {
                    const travelerName = document.querySelector(`[name="traveler_${i}_name"]`)?.value;
                    const travelerRelation = document.querySelector(`[name="traveler_${i}_relation"]`)?.value;
                    const travelerPassport = document.querySelector(`[name="traveler_${i}_passport"]`)?.value;
                    const travelerDob = document.querySelector(`[name="traveler_${i}_dob"]`)?.value;

                    if (travelerName) {
                        formData.append(`traveler_${i}_name`, travelerName);
                        formData.append(`traveler_${i}_relation`, travelerRelation || 'Family');
                        formData.append(`traveler_${i}_passport`, travelerPassport);
                        formData.append(`traveler_${i}_dob`, travelerDob);
                    }
                }

                // Get CSRF token
                const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ||
                    document.querySelector('input[name="_token"]')?.value;

                // Submit to server
                const response = await fetch('/visa/submit', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-CSRF-TOKEN': csrfToken,
                        'Accept': 'application/json',
                    }
                });

                const result = await response.json();

                if (result.success) {
                    // Close all modals
                    document.querySelectorAll('.modal.show').forEach(modalEl => {
                        const modalInstance = bootstrap.Modal.getInstance(modalEl);
                        if (modalInstance) modalInstance.hide();
                    });
                    document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.remove());

                    // Show success message
                    const successMessage = document.getElementById('successMessage');
                    if (successMessage) {
                        successMessage.style.display = 'block';
                        successMessage.innerHTML = `
                        <div class="alert alert-success">
                            <h4 class="alert-heading">Success!</h4>
                            <p>${result.message}</p>
                            <p class="mb-0"><strong>Application ID:</strong> ${result.application_id}</p>
                        </div>
                    `;
                    }

                    // Optional: Reset form after successful submission
                    setTimeout(() => {
                        resetFormAndState();
                        switchStep('country');
                    }, 3000);

                } else {
                    // Handle validation errors
                    let errorMessage = 'Please correct the following errors:\n';
                    if (result.errors) {
                        Object.keys(result.errors).forEach(field => {
                            errorMessage += `• ${result.errors[field][0]}\n`;
                        });
                    } else {
                        errorMessage = result.message || 'An error occurred while submitting your application.';
                    }

                    alert(errorMessage);
                }

            } catch (error) {
                console.error('Submission error:', error);
                alert('Network error: Unable to submit application. Please check your connection and try again.');
            } finally {
                // Reset button state
                submitButton.disabled = false;
                submitButton.innerHTML = 'Submit';
            }
        });
    }

    // ===== Step 1 validation =====
    const fromCountryEl = document.getElementById('fromCountry1');
    const liveInCountryEl = document.getElementById('liveInCountry1');
    const nextBtnStep1 = document.querySelector('#step1Modal #nextStep1Btn');

    const fromError = document.createElement('div');
    fromError.className = 'invalid-feedback d-block text-danger small';
    const liveInError = document.createElement('div');
    liveInError.className = 'invalid-feedback d-block text-danger small';

    if (fromCountryEl && !fromCountryEl.parentNode.querySelector('.invalid-feedback')) fromCountryEl.parentNode.appendChild(fromError);
    if (liveInCountryEl && !liveInCountryEl.parentNode.querySelector('.invalid-feedback')) liveInCountryEl.parentNode.appendChild(liveInError);

    function validateStep1() {
        let valid = true;
        fromError.textContent = '';
        liveInError.textContent = '';
        fromCountryEl?.classList.remove('is-invalid');
        liveInCountryEl?.classList.remove('is-invalid');

        if (fromCountryEl && !fromCountryEl.value) {
            fromError.textContent = 'Please select your origin country';
            fromCountryEl.classList.add('is-invalid');
            valid = false;
        }
        if (liveInCountryEl && !liveInCountryEl.value) {
            liveInError.textContent = 'Please select the country you live in';
            liveInCountryEl.classList.add('is-invalid');
            valid = false;
        }
        return valid;
    }

    if (nextBtnStep1) {
        nextBtnStep1.addEventListener('click', function () {
            if (validateStep1()) {
                const step1Modal = bootstrap.Modal.getInstance(document.getElementById('step1Modal'));
                step1Modal?.hide();
                new bootstrap.Modal(document.getElementById('step2Modal')).show();
            }
        });
    }

    // ===== Step 2 validation =====
    (function () {
        const nextBtnStep2 = document.getElementById('nextStep2Btn');
        if (!nextBtnStep2) return;

        const requiredCheckboxes = [
            { id: 'confirmPassport', msg: 'Please confirm you have a valid passport' },
            { id: 'confirmPicture', msg: 'Please confirm you have a picture/headshot' },
            { id: 'confirmNoOtherVisa', msg: 'Please confirm no active application' },
            { id: 'confirmDecision', msg: 'Please acknowledge government discretion' },
        ];

        requiredCheckboxes.forEach(({ id }) => {
            const cb = document.getElementById(id);
            if (!cb) return;
            const container = cb.closest('.form-check');
            if (container && !container.querySelector('.step2-error')) {
                const err = document.createElement('div');
                err.className = 'step2-error text-danger small mt-1';
                err.style.display = 'none';
                container.appendChild(err);
            }
            cb?.addEventListener('change', () => {
                const err = cb.closest('.form-check').querySelector('.step2-error');
                if (cb.checked && err) err.style.display = 'none';
            });
        });

        nextBtnStep2.addEventListener('click', () => {
            let allChecked = true;
            requiredCheckboxes.forEach(({ id, msg }) => {
                const cb = document.getElementById(id);
                const err = cb?.closest('.form-check')?.querySelector('.step2-error');
                if (cb && !cb.checked) {
                    if (err) {
                        err.textContent = msg;
                        err.style.display = 'block';
                    }
                    allChecked = false;
                } else if (err) {
                    err.style.display = 'none';
                }
            });

            if (allChecked) {
                const modal2 = bootstrap.Modal.getInstance(document.getElementById('step2Modal'));
                modal2?.hide();
                new bootstrap.Modal(document.getElementById('step3Modal')).show();
            }
        });
    })();

    // ===== Package add (admin) =====
    function addPackage() {
        const title = document.getElementById('packageTitle')?.value;
        const country = document.getElementById('packageCountry')?.value;
        const price = document.getElementById('packagePrice')?.value;
        const originalPrice = document.getElementById('originalPrice')?.value;
        const flag = document.getElementById('countryFlag')?.value;
        const features = document.getElementById('packageFeatures')?.value;
        const processingTime = document.getElementById('processingTime')?.value;
        const slug = document.getElementById('packageSlug')?.value;

        if (!title || !country || !price || !originalPrice || !flag || !features || !processingTime || !slug) {
            alert('Please fill all fields');
            return;
        }

        const featuresArray = features.split('\n').filter((f) => f.trim());

        fetch('/packages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            },
            body: JSON.stringify({
                title,
                country,
                price,
                original_price: originalPrice,
                flag,
                features: featuresArray,
                processing_time: processingTime,
                slug,
            }),
        })
            .then(async (res) => {
                if (!res.ok) {
                    let errorText = await res.text();
                    try {
                        let errorJson = JSON.parse(errorText);
                        if (errorJson.errors) {
                            let firstError = Object.values(errorJson.errors)[0][0];
                            throw new Error('Validation error: ' + firstError);
                        }
                    } catch {
                        throw new Error('Server error: ' + res.status + ' ' + res.statusText);
                    }
                }
                return res.json();
            })
            .then((data) => {
                if (data.success) {
                    alert('✅ Package saved in database!');
                    const savings = originalPrice - price;
                    let featuresHTML = featuresArray.map((feature) => `<li><span class="feature-icon">✓</span> ${feature.trim()}</li>`).join('');

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
                <ul class="package-features">${featuresHTML}</ul>
                <div class="processing-time"><span>⏱</span><span>${processingTime}</span></div>
                <button class="btn btn-custom open-modal" data-bs-toggle="modal" data-bs-target="#step1Modal" data-bs-dismiss="modal" data-package-name="${title}" data-package-price="${price}">Get Started <span>→</span></button>
              </div>
            </div>`;

                    const visaFormComponent = document.querySelector('x-visa-form-component');
                    if (visaFormComponent) {
                        visaFormComponent.insertAdjacentHTML('beforebegin', packageHTML);
                    } else {
                        document.getElementById('packages-container')?.insertAdjacentHTML('beforeend', packageHTML);
                    }

                    document.getElementById('packageForm')?.reset();
                    const modal = bootstrap.Modal.getInstance(document.getElementById('addPackageModal'));
                    modal?.hide();
                } else {
                    alert('❌ Failed to save package!');
                    console.log(data);
                }
            })
            .catch((err) => {
                console.error('Error:', err);
                alert('⚠️ ' + err.message);
            });
    }
    // Attach globally if needed elsewhere
    window.addPackage = addPackage;

    // Handle package selection for step1Modal (fix contains usage)
    document.addEventListener('click', function (e) {
        const button = e.target.closest('.open-modal, .btn-custom');
        if (!button) return;

        // Update global variables
        selectedPackage = button.getAttribute('data-package-id') || null;
        selectedPackageName = button.getAttribute('data-package-name') || 'Selected Package';
        selectedPackagePrice = button.getAttribute('data-package-price') || '0';

        // Update DOM elements
        const nameEl = document.getElementById('selectedPackageName');
        const priceEl = document.getElementById('selectedPackagePrice');
        if (nameEl) nameEl.textContent = selectedPackageName;
        if (priceEl) priceEl.textContent = `$${selectedPackagePrice}`;

        console.log('Package selected:', selectedPackageName, selectedPackagePrice); // Debug line
    });

    // Load packages
    fetch('/packages')
        .then((res) => res.json())
        .then((data) => {
            const container = document.getElementById('packages-container');
            if (!container) return;
            data.forEach((pkg) => {
                const savings = pkg.original_price - pkg.price;
                const featuresHTML = pkg.features.map((feature) => `<li><span class="feature-icon">✓</span> ${feature.trim()}</li>`).join('');
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
              <ul class="package-features">${featuresHTML}</ul>
              <div class="processing-time"><span>⏱</span><span>${pkg.processing_time}</span></div>
              <button class="btn btn-custom open-modal" data-bs-toggle="modal" data-bs-target="#step1Modal" data-bs-dismiss="modal" data-package-name="${pkg.title}" data-package-price="${pkg.price}">Get Started <span>→</span></button>
            
              </div>
          </div>`;

                const visaFormComponent = container.querySelector('x-visa-form-component');
                if (visaFormComponent) {
                    visaFormComponent.insertAdjacentHTML('beforebegin', packageHTML);
                } else {
                    container.insertAdjacentHTML('beforeend', packageHTML);
                }
            });
        })
        .catch((err) => console.error('Error fetching packages:', err));
});
