document.addEventListener('DOMContentLoaded', function () {
    const stepTabs = document.querySelectorAll('.step-tab');
    const stepContents = document.querySelectorAll('.step-content');
    const countryCards = document.querySelectorAll('.country-card');
    const packageCards = document.querySelectorAll('.package-card');
    const travelerCards = document.querySelectorAll('.traveler-card');
    const submitButton = document.getElementById('submitButton');
    const successMessage = document.getElementById('successMessage');

    let selectedCountry = null;
    let selectedPackage = null;
    let selectedTravelers = [];
    let selectedPackageName = "Selected Package";
    let selectedPackagePrice = "0";
    let selectedFromCountry = "";
    let selectedLiveInCountry = "";

    // Step tab navigation
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

    // Country selection
    countryCards.forEach(card => {
        card.addEventListener('click', () => {
            countryCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedCountry = card.getAttribute('data-country');

            document.querySelector('.step-tab[data-step="package"]').click();
        });
    });

    // Traveler selection
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

    // Submit button
    if (submitButton) {
        submitButton.addEventListener('click', () => {
            if (!selectedCountry || !selectedPackage || selectedTravelers.length === 0) {
                alert('Please complete all steps before submitting.');
                return;
            }

            successMessage.classList.add('show');

            countryCards.forEach(c => c.classList.remove('selected'));
            packageCards.forEach(c => c.classList.remove('selected'));
            travelerCards.forEach(c => c.classList.remove('selected'));

            selectedCountry = null;
            selectedPackage = null;
            selectedTravelers = [];

            document.querySelector('.step-tab[data-step="country"]').click();

            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 3000);
        });
    }

    // price and packages
    document.querySelectorAll(".open-modal").forEach(button => {
        button.addEventListener("click", function () {
            selectedPackageName = this.getAttribute("data-package-name") || "Selected Package";
            selectedPackagePrice = this.getAttribute("data-package-price") || "0";

            // Update Step 1 UI
            document.getElementById("selectedPackageName").textContent = selectedPackageName;
            document.getElementById("selectedPackagePrice").textContent = `$${selectedPackagePrice}`;
        });
    });

    // Update selected countries on Step 1 dropdown change
    document.getElementById("fromCountry1").addEventListener("change", function () {
        selectedFromCountry = this.value;
    });
    document.getElementById("liveInCountry1").addEventListener("change", function () {
        selectedLiveInCountry = this.value;
    });

    // Update Step 3 Modal on open
    document.getElementById('step3Modal').addEventListener('show.bs.modal', function () {
        this.querySelector("#selectedPackageName").textContent = selectedPackageName;
        this.querySelector("#selectedPackagePrice").textContent = `Price: $${selectedPackagePrice} USD`;

        const visaBadge = this.querySelector(".badge.bg-success");
    });

    // Update Step 4 Modal on open
    document.getElementById('step4Modal').addEventListener('show.bs.modal', function () {
        this.querySelector(".text-danger").textContent = `$${selectedPackagePrice} USD`;
    });

    // Optionally Update Step 5 (Review Modal)
    document.getElementById('step5Modal').addEventListener('show.bs.modal', function () {
        // You can populate summary info here using similar pattern
        console.log("Review step opened - show summary if needed");
    });
    
    // ✅ Dynamic Traveler Fields - BY MURK
    const numberInput = document.getElementById("numTravellers");
    const additionalSection = document.getElementById("additionalTravelersSection");

    if (numberInput && additionalSection) {
        numberInput.addEventListener("input", function () {
            const num = parseInt(numberInput.value) || 1;
            additionalSection.innerHTML = `
    <h5 class="fw-bold mb-4">Additional Travelers Information</h5>`;
            for (let i = 2; i <= num; i++) {
                const card = document.createElement('div');
                card.className = 'card p-3 mb-3';
                card.style.backgroundColor = '#f1f6fc'; // Light blue background

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

});
