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

    // ✅ FIXED: Not nested anymore
    // const buttons = document.querySelectorAll(".open-modal");
    // buttons.forEach(button => {
    //     button.addEventListener("click", function () {
    //         // console.log("Get Started button clicked");

    //         const packageName = this.getAttribute("data-package-name") || "N/A";
    //         const packagePrice = this.getAttribute("data-package-price") || "0";

    //         // console.log("Package Name:", packageName);
    //         // console.log("Package Price:", packagePrice);

    //         // Update modal
    //         document.getElementById("selectedPackageName").textContent = packageName;
    //         document.getElementById("selectedPackagePrice").textContent = `$${packagePrice} USD`;

    //     });
    // });
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
});
