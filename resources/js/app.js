document.addEventListener('DOMContentLoaded', () => {
    // ===== GLOBAL STATE =====
    const appState = {
        selectedCountry: null,
        selectedPackage: null,
        selectedPackageName: 'Selected Package',
        selectedPackagePrice: null,
        selectedFromCountry: '',
        selectedLiveInCountry: '',
        selectedTravelers: [],
        uploadedDocuments: {},
        personalDetails: {},
        isEditingPackage: false,
        editingPackageId: null
    };

    // Expose read-only properties to window
    Object.defineProperties(window, {
        selectedPackageName: {
            get: () => appState.selectedPackageName,
        },
        selectedPackagePrice: {
            get: () => appState.selectedPackagePrice,
        },
    });

    // ===== DOM REFERENCES =====
    const DOM = {
        stepTabs: document.querySelectorAll('.step-tab'),
        stepContents: document.querySelectorAll('.step-content'),
        countryCards: document.querySelectorAll('.country-card'),
        packageCards: document.querySelectorAll('.package-card'),
        travelerCardsContainer: document.getElementById('traveler-cards'),
        submitButton: document.getElementById('submitButton'),
        successMessage: document.getElementById('successMessage'),
        numberInput: document.getElementById('numTravellers'),
        additionalSection: document.getElementById('additionalTravelersSection')
    };

    // ===== UTILITY FUNCTIONS =====

    function switchStep(stepName) {
        console.log('[DEBUG] Switching to step:', stepName);

        DOM.stepTabs.forEach(tab =>
            tab.classList.toggle('active', tab.getAttribute('data-step') === stepName)
        );

        DOM.stepContents.forEach(content => {
            if (content.id === `${stepName}-step`) {
                content.classList.add('active');
                content.classList.remove('d-none');
                content.style.display = "block";
            } else {
                content.classList.remove('active');
                content.classList.add('d-none');
            }
        });

        console.log('Current package:', appState.selectedPackageName, appState.selectedPackagePrice);
    }

    function resetFormAndState() {
        // Reset forms
        document.querySelectorAll('form').forEach(form => form.reset());

        // Reset state
        Object.assign(appState, {
            selectedCountry: null,
            selectedPackage: null,
            selectedPackageName: 'Selected Package',
            selectedPackagePrice: null,
            selectedFromCountry: '',
            selectedLiveInCountry: '',
            selectedTravelers: [],
            uploadedDocuments: {},
            personalDetails: {},
            isEditingPackage: false,
            editingPackageId: null
        });

        // Reset UI
        document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));

        if (DOM.travelerCardsContainer) DOM.travelerCardsContainer.innerHTML = '';
        if (DOM.additionalSection) DOM.additionalSection.innerHTML = '';
    }

    function logApplicationData() {
        console.clear();
        console.log('=== Application Data Summary ===');
        Object.entries(appState).forEach(([key, value]) => {
            console.log(`${key}:`, value);
        });

        console.log('\n=== All Form Fields ===');
        document.querySelectorAll('input, select, textarea').forEach(el => {
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

    // ===== STEP NAVIGATION =====

    DOM.stepTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const step = tab.getAttribute('data-step');
            switchStep(step);
        });
    });

    // ===== STEP 1 - COUNTRY SELECTION =====

    DOM.countryCards.forEach(card => {
        card.addEventListener('click', () => {
            appState.selectedCountry = card.dataset.country;

            DOM.countryCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');

            const countryName = card.querySelector('.country-name').textContent.trim();
            const countryFlagImg = card.querySelector('.country-flag img').src;

            updateCountryReferences(countryName, countryFlagImg);
            loadPackagesForCountry(countryName, countryFlagImg);
            switchStep('package');
        });
    });

    function updateCountryReferences(countryName, countryFlagImg) {
        document.querySelectorAll('.badge-package').forEach(badge => {
            badge.textContent = `Package For ${countryName}`;
        });
        document.querySelectorAll('.visa-Selected').forEach(badge => {
            badge.textContent = `VISA FOR : ${countryName}`;
        });
        document.querySelectorAll('.selected-country').forEach(badge => {
            badge.textContent = countryName;
        });
        document.querySelectorAll('.badge-flag').forEach(flagBadge => {
            flagBadge.innerHTML = `<img src="${countryFlagImg}" alt="${countryName} Flag" style="width:30px;height:auto;">`;
        });
    }

    // ===== STEP 1 VALIDATION =====

    function setupStep1Validation() {
        const fromCountryEl = document.getElementById('fromCountry1');
        const liveInCountryEl = document.getElementById('liveInCountry1');
        const nextBtn = document.querySelector('#step1Modal #nextStep1Btn');

        if (!fromCountryEl || !liveInCountryEl || !nextBtn) return;

        const fromError = createErrorElement();
        const liveInError = createErrorElement();

        fromCountryEl.parentNode.appendChild(fromError);
        liveInCountryEl.parentNode.appendChild(liveInError);

        nextBtn.addEventListener('click', () => {
            if (validateStep1(fromCountryEl, liveInCountryEl, fromError, liveInError)) {
                closeModalAndOpenNext('step1Modal', 'step2Modal');
            }
        });
    }

    function createErrorElement() {
        const error = document.createElement('div');
        error.className = 'invalid-feedback d-block text-danger small';
        return error;
    }

    function validateStep1(fromEl, liveInEl, fromErr, liveInErr) {
        let valid = true;

        // Reset errors
        [fromErr, liveInErr].forEach(err => err.textContent = '');
        [fromEl, liveInEl].forEach(el => el.classList.remove('is-invalid'));

        if (!fromEl.value) {
            fromErr.textContent = 'Please select your origin country';
            fromEl.classList.add('is-invalid');
            valid = false;
        }

        if (!liveInEl.value) {
            liveInErr.textContent = 'Please select the country you live in';
            liveInEl.classList.add('is-invalid');
            valid = false;
        }

        return valid;
    }

    // ===== STEP 2 - PACKAGE SELECTION & VALIDATION =====

    document.querySelectorAll('.open-modal').forEach(button => {
        button.addEventListener('click', function () {
            appState.selectedPackage = this.getAttribute('data-package-id') || null;
            appState.selectedPackageName = this.getAttribute('data-package-name') || 'Selected Package';
            appState.selectedPackagePrice = this.getAttribute('data-package-price') || '0';

            updatePackageDisplay();
        });
    });

    function updatePackageDisplay() {
        const nameEl = document.getElementById('selectedPackageName');
        const priceEl = document.getElementById('selectedPackagePrice');
        if (nameEl) nameEl.textContent = appState.selectedPackageName;
        if (priceEl) priceEl.textContent = `$${appState.selectedPackagePrice}`;
    }

    function setupStep2Validation() {
        const nextBtn = document.getElementById('nextStep2Btn');
        if (!nextBtn) return;

        const requiredCheckboxes = [
            { id: 'confirmPassport', msg: 'Please confirm you have a valid passport' },
            { id: 'confirmPicture', msg: 'Please confirm you have a picture/headshot' },
            { id: 'confirmNoOtherVisa', msg: 'Please confirm no active application' },
            { id: 'confirmDecision', msg: 'Please acknowledge government discretion' }
        ];

        setupCheckboxValidation(requiredCheckboxes);

        nextBtn.addEventListener('click', () => {
            if (validateCheckboxes(requiredCheckboxes)) {
                closeModalAndOpenNext('step2Modal', 'step3Modal');
            }
        });
    }

    function setupCheckboxValidation(checkboxes) {
        checkboxes.forEach(({ id }) => {
            const cb = document.getElementById(id);
            if (!cb) return;

            const container = cb.closest('.form-check');
            if (container && !container.querySelector('.step2-error')) {
                const err = document.createElement('div');
                err.className = 'step2-error text-danger small mt-1';
                err.style.display = 'none';
                container.appendChild(err);
            }

            cb.addEventListener('change', () => {
                const err = cb.closest('.form-check').querySelector('.step2-error');
                if (cb.checked && err) err.style.display = 'none';
            });
        });
    }

    function validateCheckboxes(checkboxes) {
        let allChecked = true;

        checkboxes.forEach(({ id, msg }) => {
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

        return allChecked;
    }

    // ===== STEP 3 - DOCUMENT UPLOAD =====

    function setupDocumentUpload() {
        document.querySelectorAll('.document-upload').forEach(input => {
            input.addEventListener('change', function () {
                handleFileUpload(this);
            });
        });

        setupStep3Validation();
    }

    function handleFileUpload(input) {
        const file = input.files?.[0];
        const uploadArea = input.parentElement.querySelector('.upload-area-custom');
        const uploadContent = uploadArea.querySelector('.upload-content');
        const uploadPreview = uploadArea.querySelector('.upload-preview');
        const uploadFilename = uploadArea.querySelector('.upload-filename');
        const errorDiv = input.parentElement.querySelector('.step3-error');

        if (file) {
            appState.uploadedDocuments[input.name] = file.name;
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
            delete appState.uploadedDocuments[input.name];
        }
    }

    function setupStep3Validation() {
        const nextBtn = document.getElementById('nextStep3Btn');
        if (!nextBtn) return;

        const requiredUploads = [
            { name: 'passport', msg: 'Please upload your passport document' },
            { name: 'headshot', msg: 'Please upload your picture/headshot' }
        ];

        nextBtn.addEventListener('click', () => {
            if (validateUploads(requiredUploads)) {
                closeModalAndOpenNext('step3Modal', 'step4Modal');
            }
        });
    }

    function validateUploads(requiredUploads) {
        let allUploaded = true;

        document.querySelectorAll('.step3-error').forEach(err => {
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
            const uploadArea = colContainer.querySelector('.upload-area-custom');

            if (!inputEl.files || !inputEl.files[0]) {
                errorDiv.textContent = msg;
                errorDiv.style.display = 'block';
                if (uploadArea) uploadArea.classList.add('error');
                allUploaded = false;
            } else {
                if (uploadArea) uploadArea.classList.remove('error');
            }
        });

        return allUploaded;
    }

    // ===== STEP 4 - PERSONAL DETAILS & VALIDATION =====

    function setupStep4() {
        setupTravelerSelection();
        setupAdditionalTravelers();
        setupStep4Validation();
    }

    function setupTravelerSelection() {
        document.body.addEventListener('click', e => {
            const card = e.target.closest?.('.traveler-card');
            if (!card) return;

            const travelerId = card.getAttribute('data-traveler');
            if (card.classList.contains('selected')) {
                card.classList.remove('selected');
                appState.selectedTravelers = appState.selectedTravelers.filter(id => id !== travelerId);
            } else {
                card.classList.add('selected');
                appState.selectedTravelers.push(travelerId);
            }
        });
    }

    function setupAdditionalTravelers() {
        if (!DOM.numberInput || !DOM.additionalSection) return;

        DOM.numberInput.addEventListener('input', () => {
            const num = parseInt(DOM.numberInput.value) || 1;
            DOM.additionalSection.innerHTML = `<h5 class="fw-bold mb-4">Additional Travelers Information</h5>`;

            for (let i = 2; i <= num; i++) {
                const card = createTravelerCard(i);
                DOM.additionalSection.appendChild(card);
            }
        });
    }

    function createTravelerCard(index) {
        const card = document.createElement('div');
        card.className = 'card p-3 mb-3';
        card.style.backgroundColor = '#f1f6fc';
        card.innerHTML = `
            <h6 class="fw-bold mb-3">Traveler ${index}</h6>
            <div class="row g-3">
                <div class="col-md-6">
                    <label class="form-label">Full Name</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-person"></i></span>
                        <input type="text" class="form-control" name="traveler_${index}_name" placeholder="Full Name">
                    </div>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Relation</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-people"></i></span>
                        <input type="text" class="form-control" name="traveler_${index}_relation" placeholder="Relation">
                    </div>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Passport Number</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-passport"></i></span>
                        <input type="text" class="form-control" name="traveler_${index}_passport" placeholder="Passport Number">
                    </div>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Date Of Birth</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-calendar"></i></span>
                        <input type="date" class="form-control" name="traveler_${index}_dob">
                    </div>
                </div>
            </div>
        `;
        return card;
    }

    function setupStep4Validation() {
        const nextBtn = document.getElementById('step4NextBtn');
        if (!nextBtn) return;

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

        setupFieldValidation(requiredFields);

        nextBtn.addEventListener('click', e => {
            e.preventDefault();
            if (validateStep4(requiredFields)) {
                updateReviewSection();
                closeModalAndOpenNext('step4Modal', 'step5Modal');
            }
        });
    }

    function setupFieldValidation(fields) {
        fields.forEach(({ name }) => {
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
    }

    function validateStep4(requiredFields) {
        let allValid = true;

        // Reset errors
        document.querySelectorAll('#step4Modal .step4-error').forEach(err => {
            err.style.display = 'none';
        });
        document.querySelectorAll('#step4Modal .form-control').forEach(input => {
            input.classList.remove('error');
        });

        // Validate required fields
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

        // Special validations
        allValid &= validateDOB();
        allValid &= validateEmail();
        allValid &= validateDates();
        allValid &= validateAdditionalTravelers();

        return allValid;
    }

    function validateDOB() {
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
                return false;
            }
        }
        return true;
    }

    function validateEmail() {
        const emailInput = document.querySelector('input[name="email"]');
        const emailError = emailInput?.nextElementSibling;

        if (emailInput?.value.trim() && !/^([^\s@]+)@([^\s@]+)\.[^\s@]+$/.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            emailError.style.display = 'block';
            emailInput.classList.add('error');
            return false;
        }
        return true;
    }

    function validateDates() {
        const startDate = document.querySelector('input[name="travel_date_from"]');
        const endDate = document.querySelector('input[name="travel_date_to"]');
        const startDateError = startDate?.nextElementSibling;
        const endDateError = endDate?.nextElementSibling;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let valid = true;

        if (startDate?.value && new Date(startDate.value) <= today) {
            startDateError.textContent = 'Travel start date must be after today';
            startDateError.style.display = 'block';
            startDate.classList.add('error');
            valid = false;
        }

        if (startDate?.value && endDate?.value && new Date(endDate.value) <= new Date(startDate.value)) {
            endDateError.textContent = 'Return date must be after departure date';
            endDateError.style.display = 'block';
            endDate.classList.add('error');
            valid = false;
        }

        return valid;
    }

    function validateAdditionalTravelers() {
        const numTravelers = parseInt(document.getElementById('numTravellers')?.value) || 1;
        let valid = true;

        for (let i = 2; i <= numTravelers; i++) {
            const dynamicFields = [
                { name: `traveler_${i}_name`, msg: `Traveler ${i} name is required` },
                { name: `traveler_${i}_relation`, msg: `Traveler ${i} relation is required` },
                { name: `traveler_${i}_passport`, msg: `Traveler ${i} passport is required` },
                { name: `traveler_${i}_dob`, msg: `Traveler ${i} date of birth is required` }
            ];

            dynamicFields.forEach(({ name, msg }) => {
                const input = document.querySelector(`[name="${name}"]`);
                if (!input) return;

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
                    valid = false;
                } else {
                    if (name.includes('_dob')) {
                        const enteredDOB = new Date(input.value);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);

                        if (enteredDOB >= today) {
                            errorDiv.textContent = `Traveler ${i} Date of Birth must be before today`;
                            errorDiv.style.display = 'block';
                            input.classList.add('error');
                            valid = false;
                            return;
                        }
                    }
                    errorDiv.textContent = '';
                    errorDiv.style.display = 'none';
                    input.classList.remove('error');
                }
            });
        }

        return valid;
    }

    // ===== STEP 5 - REVIEW & SUBMISSION =====

    function updateReviewSection() {
        // Update review fields with form data
        const updates = [
            { selector: '.review-plan-name', value: appState.selectedPackageName },
            { selector: '.review-description', value: 'Invitation processing time is 48 hours' },
            { selector: '.review-duration', value: '96 Hours Valid' },
            { selector: '.review-name', value: getFullName() },
            { selector: '.review-contact', value: getFieldValue('phoneNumber') },
            { selector: '.review-email', value: getFieldValue('emailAddress') },
            { selector: '.review-from-country', value: getFromCountry() },
            { selector: '.review-livein-country', value: getLiveInCountry() },
            { selector: '.review-passport', value: getFieldValue('passportNumber') },
            { selector: '.review-profession', value: getFieldValue('profession') },
            { selector: '.review-travel-date', value: getFieldValue('travelDateFrom') },
            { selector: '.review-return-date', value: getFieldValue('travelDateTo') },
            { selector: '.review-dob', value: getFieldValue('DOB') },
            { selector: '.review-purpose', value: getFieldValue('travelPurpose') },
            { selector: '.review-num-travelers', value: getFieldValue('numTravellers') }
        ];

        updates.forEach(({ selector, value }) => {
            const element = document.querySelector(selector);
            if (element) element.textContent = value || '';
        });

        updateAdditionalTravelersReview();
    }

    function getFullName() {
        const firstName = getFieldValue('firstName');
        const lastName = getFieldValue('lastName');
        return `${firstName} ${lastName}`.trim();
    }

    function getFieldValue(fieldName) {
        const field = document.getElementById(fieldName);
        return field ? field.value : '';
    }

    function getFromCountry() {
        return getFieldValue('fromCountry') || getFieldValue('fromCountry1');
    }

    function getLiveInCountry() {
        return getFieldValue('liveInCountry') || getFieldValue('liveInCountry1');
    }

    function updateAdditionalTravelersReview() {
        const container = document.querySelector('.review-additional-travelers');
        if (!container) return;

        container.innerHTML = '';
        const travelers = getAdditionalTravelers();

        if (travelers.length && travelers.some(t => t.name)) {
            const table = createTravelersTable(travelers);
            container.appendChild(table);
        } else {
            container.textContent = 'None';
        }
    }

    function getAdditionalTravelers() {
        const numTravelers = parseInt(getFieldValue('numTravellers')) || 1;
        const travelers = [];

        for (let i = 2; i <= numTravelers; i++) {
            travelers.push({
                name: document.querySelector(`[name="traveler_${i}_name"]`)?.value.trim() || '',
                relation: document.querySelector(`[name="traveler_${i}_relation"]`)?.value.trim() || 'Family',
                dob: document.querySelector(`[name="traveler_${i}_dob"]`)?.value || '',
                passport: document.querySelector(`[name="traveler_${i}_passport"]`)?.value || ''
            });
        }

        return travelers;
    }

    function createTravelersTable(travelers) {
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
            </tr>
        `;
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
                    <td>${traveler.passport}</td>
                `;
                tbody.appendChild(row);
            }
        });
        table.appendChild(tbody);

        return table;
    }

    // ===== FORM SUBMISSION =====

    function setupFormSubmission() {
        // Setup initial submit button
        if (DOM.submitButton) {
            DOM.submitButton.addEventListener('click', handleInitialSubmit);
        }

        // Setup final submit button
        const submitBtn = document.getElementById('submitBtn');
        if (submitBtn) {
            submitBtn.addEventListener('click', handleFinalSubmit);
        }

        // Setup modal event listeners
        setupModalListeners();
    }

    function handleInitialSubmit() {
        logApplicationData();

        const travelersData = collectTravelersData();
        updateTravelerStep(travelersData);

        closeAllModals();

        const travelerTab = document.querySelector('.step-tab[data-step="traveler"]');
        if (travelerTab) travelerTab.click();
    }

    function collectTravelersData() {
        const travelersData = [];

        // Main traveler
        const firstName = getFieldValue('firstName');
        const lastName = getFieldValue('lastName');
        travelersData.push({
            name: `${firstName} ${lastName}`.trim(),
            relation: "Customer",
            dob: getFieldValue('DOB'),
            passport: getFieldValue('passportNumber')
        });

        // Additional travelers
        const numTravelers = parseInt(getFieldValue('numTravellers')) || 1;
        for (let i = 2; i <= numTravelers; i++) {
            travelersData.push({
                name: document.querySelector(`[name="traveler_${i}_name"]`)?.value || '',
                relation: document.querySelector(`[name="traveler_${i}_relation"]`)?.value || 'Family',
                dob: document.querySelector(`[name="traveler_${i}_dob"]`)?.value || '',
                passport: document.querySelector(`[name="traveler_${i}_passport"]`)?.value || ''
            });
        }

        return travelersData;
    }

    function updateTravelerStep(travelersData) {
        const container = DOM.travelerCardsContainer;
        if (!container) return;

        const gradientColors = [
            "linear-gradient(135deg, #f093fb, #f5576c)",
            "linear-gradient(135deg, #4facfe, #00f2fe)",
            "linear-gradient(135deg, #43e97b, #38f9d7)"
        ];

        container.innerHTML = `
            <div class="row g-3">
                ${travelersData.map((traveler, index) => {
            const initial = traveler.name ? traveler.name.charAt(0).toUpperCase() : "?";
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
        `;
    }

    async function handleFinalSubmit() {
        const submitBtn = document.getElementById('submitBtn');
        if (!submitBtn) return;

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Submitting...';

        try {
            const formData = createSubmissionFormData();
            const response = await submitToServer(formData);
            const result = await response.json();

            if (result.success) {
                handleSubmissionSuccess(result);
            } else {
                handleSubmissionError(result);
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Network error: Unable to submit application. Please check your connection and try again.');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Submit';
        }
    }

    function createSubmissionFormData() {
        const formData = new FormData();

        // Package information
        formData.append('package_name', appState.selectedPackageName);
        formData.append('package_price', appState.selectedPackagePrice);

        // Location information
        formData.append('from_country', appState.selectedFromCountry);
        formData.append('live_in_country', appState.selectedLiveInCountry);

        // Personal details
        const personalFields = [
            'firstName', 'lastName', 'phoneNumber', 'emailAddress',
            'passportNumber', 'DOB', 'profession', 'travelDateFrom',
            'travelDateTo', 'travelPurpose', 'numTravellers'
        ];

        personalFields.forEach(fieldName => {
            const mappedName = mapFieldName(fieldName);
            formData.append(mappedName, getFieldValue(fieldName));
        });

        // Documents
        const passportFile = document.getElementById('passportUpload')?.files[0];
        const headshotFile = document.getElementById('headshotUpload')?.files[0];

        if (passportFile) formData.append('passport', passportFile);
        if (headshotFile) formData.append('headshot', headshotFile);

        // Additional travelers
        const numTravelers = parseInt(getFieldValue('numTravellers')) || 1;
        for (let i = 2; i <= numTravelers; i++) {
            const travelerFields = ['name', 'relation', 'passport', 'dob'];
            travelerFields.forEach(field => {
                const value = document.querySelector(`[name="traveler_${i}_${field}"]`)?.value;
                if (value || field === 'relation') {
                    formData.append(`traveler_${i}_${field}`, value || 'Family');
                }
            });
        }

        return formData;
    }

    function mapFieldName(fieldName) {
        const fieldMapping = {
            'firstName': 'first_name',
            'lastName': 'last_name',
            'phoneNumber': 'phone_number',
            'emailAddress': 'email',
            'passportNumber': 'passport_number',
            'DOB': 'dob',
            'travelDateFrom': 'travel_date_from',
            'travelDateTo': 'travel_date_to',
            'travelPurpose': 'travel_purpose',
            'numTravellers': 'num_travellers'
        };
        return fieldMapping[fieldName] || fieldName;
    }

    async function submitToServer(formData) {
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ||
            document.querySelector('input[name="_token"]')?.value;

        return await fetch('/visa/submit', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRF-TOKEN': csrfToken,
                'Accept': 'application/json',
            }
        });
    }

    function handleSubmissionSuccess(result) {
        closeAllModals();
        resetFormAndState();
        switchStep('country');
    }

    function handleSubmissionError(result) {
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

    function setupModalListeners() {
        // Step 3 modal
        document.getElementById('step3Modal')?.addEventListener('show.bs.modal', function () {
            this.querySelector('#selectedPackageName').textContent = appState.selectedPackageName;
            this.querySelector('#selectedPackagePrice').textContent = `Price: ${appState.selectedPackagePrice} USD`;
        });

        // Step 4 modal
        document.getElementById('step4Modal')?.addEventListener('show.bs.modal', function () {
            const priceEl = this.querySelector('.text-danger');
            if (priceEl) priceEl.textContent = `${appState.selectedPackagePrice} USD`;
        });

        // Step 5 modal
        document.getElementById('step5Modal')?.addEventListener('show.bs.modal', function () {
            logApplicationData();
        });
    }

    // ===== UTILITY FUNCTIONS =====

    function closeModalAndOpenNext(currentModalId, nextModalId) {
        const currentModal = bootstrap.Modal.getInstance(document.getElementById(currentModalId));
        currentModal?.hide();
        new bootstrap.Modal(document.getElementById(nextModalId)).show();
    }

    function closeAllModals() {
        document.querySelectorAll('.modal.show').forEach(modalEl => {
            const modalInstance = bootstrap.Modal.getInstance(modalEl);
            if (modalInstance) modalInstance.hide();
        });
        document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.remove());
    }

    // ===== PACKAGE MANAGEMENT =====

    function loadPackagesForCountry(countryName, countryFlagImg) {
        fetch('/packages')
            .then(res => res.json())
            .then(data => {
                const container = document.getElementById('packages-container');
                if (!container) return;

                // Clear existing packages
                container.querySelectorAll('.col-12.col-lg-4').forEach(col => col.remove());

                // Filter by selected country
                const filteredData = data.filter(pkg =>
                    pkg.country.toLowerCase() === countryName.toLowerCase()
                );

                filteredData.forEach(pkg => {
                    const packageElement = createPackageElement(pkg, countryName, countryFlagImg);
                    insertPackageElement(container, packageElement);
                });
            })
            .catch(err => console.error('Error fetching packages:', err));
    }

    function createPackageElement(pkg, countryName, countryFlagImg) {
        const savings = pkg.original_price - pkg.price;
        const featuresHTML = pkg.features
            .map(feature => `<li><span class="feature-icon">✓</span> ${feature.trim()}</li>`)
            .join('');

        return `
            <div class="col-12 col-lg-4">
                <div class="package-card h-100" data-package="${pkg.slug}">
                    <div class="package-header mb-3">
                        <div class="package-title">${pkg.title}</div>
                        <div class="d-flex flex-wrap mt-2">
                            <span class="badge badge-flag">
                                <img src="${countryFlagImg}" alt="${pkg.country} Flag" style="width:30px;height:auto;">
                            </span>
                            <span class="badge badge-package">Package For ${pkg.country}</span>
                        </div>
                    </div>
                    <div class="package-pricing mb-3">
                        <div class="price-main">${pkg.price} USD</div>
                        <div class="d-flex align-items-center gap-2 mt-1">
                            <span class="price-original">${pkg.original_price} USD</span>
                            <span class="price-savings">Save ${savings}</span>
                        </div>
                    </div>
                    <ul class="package-features">${featuresHTML}</ul>
                    <div class="processing-time">
                        <span>⏱</span>
                        <span>${pkg.processing_time}</span>
                    </div>
                    <div class="package-actions mb-3">
                        ${createPackageActionButtons(pkg)}
                    </div>
                    <button type="button" class="btn btn-custom open-modal" 
                            data-bs-toggle="modal" 
                            data-bs-target="#step1Modal" 
                            data-bs-dismiss="modal" 
                            data-package-name="${pkg.title}" 
                            data-package-price="${pkg.price}">
                        Get Started <span>→</span>
                    </button>
                </div>
            </div>
        `;
    }

    function createPackageActionButtons(pkg) {
        return `
            <button type="button"
                class="btn btn-sm btn-outline-primary me-2 edit-package-btn"
                data-package-id="${pkg.id}"
                data-package-title="${pkg.title}"
                data-package-country="${pkg.country}"
                data-package-price="${pkg.price}"
                data-package-original-price="${pkg.original_price}"
                data-package-features='${JSON.stringify(pkg.features)}'
                data-package-processing-time="${pkg.processing_time}"
                data-package-slug="${pkg.slug}"
                data-bs-toggle="modal"
                data-bs-target="#addPackageModal">
                <i class="bi bi-pencil"></i> Edit
            </button>
            <button class="btn btn-sm btn-outline-danger delete-package-btn" 
                    data-package-id="${pkg.id}" 
                    data-package-title="${pkg.title}">
                <i class="bi bi-trash"></i> Delete
            </button>
        `;
    }

    function insertPackageElement(container, packageHTML) {
        const visaFormComponent = container.querySelector('x-visa-form-component');
        if (visaFormComponent) {
            visaFormComponent.insertAdjacentHTML('beforebegin', packageHTML);
        } else {
            container.insertAdjacentHTML('beforeend', packageHTML);
        }
    }

    // ===== PACKAGE CRUD OPERATIONS =====

    function setupPackageManagement() {
        setupPackageSelection();
        setupPackageEditing();
        setupPackageDeletion();
        setupPackageModal();
    }

    function setupPackageSelection() {
        document.addEventListener('click', function (e) {
            const button = e.target.closest('.open-modal, .btn-custom');
            if (!button) return;

            appState.selectedPackage = button.getAttribute('data-package-id') || null;
            appState.selectedPackageName = button.getAttribute('data-package-name') || 'Selected Package';
            appState.selectedPackagePrice = button.getAttribute('data-package-price') || '0';

            updatePackageDisplay();
        });
    }

    function setupPackageEditing() {
        document.addEventListener('click', function (e) {
            const editBtn = e.target.closest('.edit-package-btn');
            if (!editBtn) return;

            appState.isEditingPackage = true;
            appState.editingPackageId = editBtn.getAttribute('data-package-id');

            prefillPackageForm(editBtn);
            updateModalForEditing();
        });
    }

    function prefillPackageForm(editBtn) {
        const formFields = {
            'packageTitle': editBtn.getAttribute('data-package-title'),
            'packageCountry': editBtn.getAttribute('data-package-country'),
            'packagePrice': editBtn.getAttribute('data-package-price'),
            'originalPrice': editBtn.getAttribute('data-package-original-price'),
            'processingTime': editBtn.getAttribute('data-package-processing-time'),
            'packageSlug': editBtn.getAttribute('data-package-slug')
        };

        Object.entries(formFields).forEach(([fieldId, value]) => {
            const field = document.getElementById(fieldId);
            if (field) field.value = value || '';
        });

        // Handle features separately
        const features = JSON.parse(editBtn.getAttribute('data-package-features') || '[]');
        const featuresField = document.getElementById('packageFeatures');
        if (featuresField) featuresField.value = features.join('\n');
    }

    function updateModalForEditing() {
        const modalLabel = document.querySelector('#addPackageModalLabel');
        const saveBtn = document.querySelector('#savePackageBtn');

        if (modalLabel) modalLabel.textContent = "Edit Package";
        if (saveBtn) saveBtn.textContent = "Update Package";
    }

    function setupPackageDeletion() {
        document.addEventListener('click', function (e) {
            const deleteBtn = e.target.closest('.delete-package-btn');
            if (!deleteBtn) return;

            e.preventDefault();

            const packageId = deleteBtn.getAttribute('data-package-id');
            const packageTitle = deleteBtn.getAttribute('data-package-title') || 'this package';

            if (packageId) {
                deletePackage(packageId, packageTitle, deleteBtn);
            }
        });
    }

    function deletePackage(packageId, packageTitle, deleteBtn) {
        const confirmMessage = `Are you sure you want to delete "${packageTitle}"?\n\nThis action cannot be undone.`;
        if (!confirm(confirmMessage)) return;

        // Show loading state
        if (deleteBtn) {
            deleteBtn.disabled = true;
            deleteBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span><i class="bi bi-trash"></i> Deleting...';
        }

        fetch(`/packages/${packageId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': getCSRFToken(),
            }
        })
            .then(handleResponse)
            .then(data => {
                if (data.success) {
                    alert('✅ Package deleted successfully!');
                    removePackageFromDOM(packageId);
                } else {
                    throw new Error(data.message || 'Failed to delete package');
                }
            })
            .catch(err => {
                console.error('Delete error:', err);
                alert('❌ Error deleting package: ' + err.message);
                resetDeleteButton(deleteBtn);
            });
    }

    function removePackageFromDOM(packageId) {
        const packageCard = document.querySelector(`[data-package-id="${packageId}"]`)?.closest('.col-12, .col-lg-4');
        if (packageCard) {
            packageCard.remove();
        } else {
            location.reload(); // Fallback
        }
    }

    function resetDeleteButton(deleteBtn) {
        if (deleteBtn) {
            deleteBtn.disabled = false;
            deleteBtn.innerHTML = '<i class="bi bi-trash"></i> Delete';
        }
    }

    function setupPackageModal() {
        const modal = document.getElementById('addPackageModal');
        if (!modal) return;

        modal.addEventListener('hidden.bs.modal', function () {
            resetPackageModalState();
            document.getElementById('packageForm')?.reset();
        });
    }

    function resetPackageModalState() {
        appState.isEditingPackage = false;
        appState.editingPackageId = null;

        const modalLabel = document.querySelector('#addPackageModalLabel');
        const saveBtn = document.querySelector('#savePackageBtn');

        if (modalLabel) modalLabel.textContent = "Add New Package";
        if (saveBtn) saveBtn.textContent = "Add Package";
    }

    async function savePackage() {
        const packageData = collectPackageFormData();
        if (!validatePackageData(packageData)) return;

        try {
            const url = appState.isEditingPackage ? `/packages/${appState.editingPackageId}` : '/packages';
            const method = appState.isEditingPackage ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': getCSRFToken(),
                },
                body: JSON.stringify(packageData),
            });

            const data = await handleResponse(response);

            if (data.success) {
                const action = appState.isEditingPackage ? 'updated' : 'saved';
                alert(`✅ Package ${action} successfully!`);

                document.getElementById('packageForm')?.reset();
                resetPackageModalState();

                const modal = bootstrap.Modal.getInstance(document.getElementById('addPackageModal'));
                modal?.hide();

                location.reload(); // Simple approach to reflect changes
            } else {
                alert(`❌ Failed to ${appState.isEditingPackage ? 'update' : 'save'} package!`);
            }
        } catch (err) {
            console.error('Error:', err);
            alert('⚠️ ' + err.message);
        }
    }

    function collectPackageFormData() {
        const features = document.getElementById('packageFeatures')?.value
            .split('\n')
            .filter(f => f.trim());

        return {
            title: document.getElementById('packageTitle')?.value,
            country: document.getElementById('packageCountry')?.value,
            price: document.getElementById('packagePrice')?.value,
            original_price: document.getElementById('originalPrice')?.value,
            features: features || [],
            processing_time: document.getElementById('processingTime')?.value,
            slug: document.getElementById('packageSlug')?.value,
        };
    }

    function validatePackageData(data) {
        const required = ['title', 'country', 'price', 'original_price', 'features', 'processing_time', 'slug'];
        const missing = required.filter(field => !data[field] || (Array.isArray(data[field]) && data[field].length === 0));

        if (missing.length > 0) {
            alert('Please fill all fields');
            return false;
        }

        return true;
    }

    // ===== UTILITY FUNCTIONS =====

    async function handleResponse(response) {
        if (!response.ok) {
            const errorText = await response.text();
            try {
                const errorJson = JSON.parse(errorText);
                if (errorJson.errors) {
                    const firstError = Object.values(errorJson.errors)[0][0];
                    throw new Error('Validation error: ' + firstError);
                }
                throw new Error(errorJson.message || 'Server error');
            } catch {
                throw new Error('Server error: ' + response.status + ' ' + response.statusText);
            }
        }
        return response.json();
    }

    function getCSRFToken() {
        return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ||
            document.querySelector('input[name="_token"]')?.value || '';
    }

    // ===== COUNTRY DROPDOWN HANDLERS =====

    function setupCountryDropdowns() {
        const fromCountry1 = document.getElementById('fromCountry1');
        const liveInCountry1 = document.getElementById('liveInCountry1');

        fromCountry1?.addEventListener('change', function () {
            appState.selectedFromCountry = this.value;
            const fixed = document.getElementById('fromCountry');
            if (fixed) fixed.value = appState.selectedFromCountry;
        });

        liveInCountry1?.addEventListener('change', function () {
            appState.selectedLiveInCountry = this.value;
            const fixed = document.getElementById('liveInCountry');
            if (fixed) fixed.value = appState.selectedLiveInCountry;
        });
    }

    // ===== FILE UPLOAD HANDLERS =====

    function setupFileUploadHandlers() {
        handleFileUploadFor('passportUpload', 'passportBox', 'passportFileName');
        handleFileUploadFor('headshotUpload', 'headshotBox', 'headshotFileName');
    }

    function handleFileUploadFor(inputId, boxId, fileNameId) {
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

    // ===== MISC EVENT HANDLERS =====

    function setupMiscHandlers() {
        // Details button handler
        document.querySelectorAll('.details-btn').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                console.log('Details button clicked');
            });
        });
    }

    // ===== INITIALIZATION =====

    function initialize() {
        setupStep1Validation();
        setupStep2Validation();
        setupDocumentUpload();
        setupStep4();
        setupFormSubmission();
        setupPackageManagement();
        setupCountryDropdowns();
        setupFileUploadHandlers();
        setupMiscHandlers();
    }

    // ===== EXPOSE GLOBAL FUNCTIONS =====

    window.savePackage = savePackage;
    window.addPackage = savePackage; // Backward compatibility
    window.deletePackage = deletePackage;

    // ===== START APPLICATION =====

    initialize();
});