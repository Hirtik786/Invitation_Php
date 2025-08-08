document.addEventListener('DOMContentLoaded', function () {

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
    const travelerCards = document.querySelectorAll('.traveler-card');
    const submitButton = document.getElementById('submitButton');
    const successMessage = document.getElementById('successMessage');
    const numberInput = document.getElementById("numTravellers");
    const additionalSection = document.getElementById("additionalTravelersSection");

    // ===== STEP NAVIGATION =====
    stepTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const step = tab.getAttribute('data-step');

            stepTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            stepContents.forEach(content => {
                content.classList.toggle('active', content.id === `${step}-step`);
            });
        });
    });

    // ===== STEP 1 - COUNTRY SELECTION =====
    countryCards.forEach(card => {
        card.addEventListener('click', () => {
            selectedCountry = card.dataset.country;
            console.log("Country selected:", selectedCountry);

            countryCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');

            // Update package badges + flags
            let countryName = card.querySelector(".country-name").textContent.trim();
            let countryFlagImg = card.querySelector(".country-flag img").src;

            document.querySelectorAll(".badge-package").forEach(badge => {
                badge.textContent = `Package For ${countryName}`;
            });

            document.querySelectorAll(".visa-Selected").forEach(badge => {
                badge.textContent = `VISA FOR : ${countryName}`;
            });
            document.querySelectorAll(".selected-country").forEach(badge => {
                badge.textContent = `${countryName}`;
            });

            document.querySelectorAll(".badge-flag").forEach(flagBadge => {
                flagBadge.innerHTML = `<img src="${countryFlagImg}" alt="${countryName} Flag" style="width:30px;height:auto;">`;
            });

            document.querySelector('.step-tab[data-step="package"]').click();
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
    });
    document.getElementById("liveInCountry1")?.addEventListener("change", function () {
        selectedLiveInCountry = this.value;
    });

    // ===== STEP 3 - DOCUMENT UPLOAD =====
    document.querySelectorAll(".document-upload").forEach(input => {
        input.addEventListener("change", () => {
            uploadedDocuments[input.name] = input.files[0]?.name || null;
        });
    });

    // ===== STEP 4 - TRAVELER SELECTION =====
    travelerCards.forEach(card => {
        card.addEventListener('click', () => {
            const travelerId = card.getAttribute('data-traveler');
            if (card.classList.contains('selected')) {
                card.classList.remove('selected');
                selectedTravelers = selectedTravelers.filter(id => id !== travelerId);
            } else {
                card.classList.add('selected');
                selectedTravelers.push(travelerId);
            }
        });
    });

    // ===== DYNAMIC TRAVELER FIELDS =====
    if (numberInput && additionalSection) {
        numberInput.addEventListener("input", function () {
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
                            <label class="form-label">Phone Number</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="bi bi-telephone"></i></span>
                                <input type="text" class="form-control" name="traveler_${i}_phone" placeholder="Phone Number">
                            </div>
                        </div>
                    </div>
                `;
                additionalSection.appendChild(card);
            }
        });
    }

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

    // ===== SUBMIT BUTTON =====
    if (submitButton) {
        submitButton.addEventListener('click', () => {
            // 1️⃣ Log all selected form data
            logApplicationData();

            // 2️⃣ Validate before submit
            // if (!selectedCountry || !selectedPackage || selectedTravelers.length === 0) {
            //     alert('Please complete all steps before submitting.');
            //     return;
            // }

            // 3️⃣ Show success message
            successMessage.classList.add('show');

            // 4️⃣ Reset selections
            countryCards.forEach(c => c.classList.remove('selected'));
            packageCards.forEach(c => c.classList.remove('selected'));
            travelerCards.forEach(c => c.classList.remove('selected'));

            selectedCountry = null;
            selectedPackage = null;
            selectedTravelers = [];


            //traveler
            // Close all open modals
            document.querySelectorAll('.modal.show').forEach(modalEl => {
                const modalInstance = bootstrap.Modal.getInstance(modalEl);
                if (modalInstance) {
                    modalInstance.hide();
                }
            });

            // Remove leftover backdrops just in case
            document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.remove());

            // Now go to the step
            document.querySelector('.step-tab[data-step="traveler"]').click();



            // 7️⃣ Hide success message after delay
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 3000);
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
            let value = "";
            if (el.type === "checkbox" || el.type === "radio") {
                value = el.checked ? "Checked" : "Unchecked";
            } else {
                value = el.value || "(empty)";
            }
            console.log(`${name}: ${value}`);
        });

        console.log("================================");
    }

});
