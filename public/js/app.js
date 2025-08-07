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

    // Step tab navigation
    stepTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const step = tab.getAttribute('data-step');

            stepTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            stepContents.forEach(content => {
                if (content.id === `${step}-step`) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });

    // Country selection
    countryCards.forEach(card => {
        card.addEventListener('click', () => {
            countryCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedCountry = card.getAttribute('data-country');

            // Move to next step
            document.querySelector('.step-tab[data-step="package"]').click();
        });
    });

    // Package selection
    // packageCards.forEach(card => {
    //     card.addEventListener('click', () => {
    //         packageCards.forEach(c => c.classList.remove('selected'));
    //         card.classList.add('selected');
    //         selectedPackage = card.getAttribute('data-package');

    //         // Move to next step
    //         document.querySelector('.step-tab[data-step="traveler"]').click();
    //     });
    // });

    // Traveler selection (multiple)
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
    submitButton.addEventListener('click', () => {
        if (!selectedCountry || !selectedPackage || selectedTravelers.length === 0) {
            alert('Please complete all steps before submitting.');
            return;
        }

        // Show success message
        successMessage.classList.add('show');

        // Reset selections
        countryCards.forEach(c => c.classList.remove('selected'));
        packageCards.forEach(c => c.classList.remove('selected'));
        travelerCards.forEach(c => c.classList.remove('selected'));
        selectedCountry = null;
        selectedPackage = null;
        selectedTravelers = [];

        // Go back to first step
        document.querySelector('.step-tab[data-step="country"]').click();

        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 3000);
    });
});
