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

            const travelerStepContainer = document.getElementById("traveler-step");
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
            // After updating innerHTML with new submitBtn:
            const newSubmitBtn = document.getElementById('submitBtn');
            newSubmitBtn.addEventListener("click", () => {
                // Reset all forms on the page
                document.querySelectorAll("form").forEach(form => form.reset());

                // Clear any selections in your script's state variables if needed
                selectedCountry = null;
                selectedPackage = null;
                selectedPackageName = "Selected Package";
                selectedPackagePrice = null;
                selectedFromCountry = "";
                selectedLiveInCountry = "";
                selectedTravelers = [];
                uploadedDocuments = {};
                personalDetails = {};

                // Reset selected classes
                document.querySelectorAll(".selected").forEach(el => el.classList.remove("selected"));

                // Show the country selection step (step 1)
                stepTabs.forEach(t => t.classList.remove("active"));
                document.querySelector('.step-tab[data-step="country"]').classList.add("active");

                stepContents.forEach(content => {
                    content.classList.toggle("active", content.id === "country-step");
                });
                console.log("done");
            });


            document.querySelectorAll('.modal.show').forEach(modalEl => {
                const modalInstance = bootstrap.Modal.getInstance(modalEl);
                if (modalInstance) modalInstance.hide();
            });
            document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.remove());

            document.querySelector('.step-tab[data-step="traveler"]').click();
            successMessage.classList.add('show');
            setTimeout(() => successMessage.classList.remove('show'), 3000);
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

    let travelers = [];
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
        let table = document.createElement("table");
        table.className = "table table-bordered table-sm";
        let thead = document.createElement("thead");
        thead.innerHTML = `
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Relation</th>
                <th>Date of Birth</th>
                <th>Passport Number</th>
            </tr>`;
        table.appendChild(thead);

        let tbody = document.createElement("tbody");
        travelers.forEach((traveler, index) => {
            if (traveler.name) {
                let row = document.createElement("tr");
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

function handleFileUpload(inputId, boxId, fileNameId) {
    const input = document.getElementById(inputId);
    const box = document.getElementById(boxId);
    const fileNameDisplay = document.getElementById(fileNameId);

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
