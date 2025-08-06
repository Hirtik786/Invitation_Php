<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Travel Invitation System</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../css/index.css">
</head>

<body>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-12 col-xl-10">
                <div class="card main-card">
                    <div class="header">
                        <h1>Invitation</h1>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Invitation</li>
                            </ol>
                        </nav>
                    </div>

                    <div class="step-nav d-flex flex-wrap">
                        <button class="step-tab active" data-step="country">Country</button>
                        <button class="step-tab" data-step="package">Package</button>
                        <button class="step-tab" data-step="traveler">Traveller</button>
                    </div>

                    <div class="success-message" id="successMessage">
                        🎉 Invitation submitted successfully! Your booking has been processed.
                    </div>

                    <!-- Country Selection Step -->
                    <div class="step-content active" id="country-step">
                        <h2 class="section-title">Select the country</h2>
                        <p class="section-subtitle">Choose the country you want to go to</p>

                        <div class="row g-3">
                            <div class="col-12 col-sm-6 col-lg-4">
                                <div class="country-card" data-country="turkey">
                                    <div class="country-flag">
                                        <img src="https://www.countryflags.com/wp-content/uploads/turkey-flag-png-large.png"
                                            alt="Turkey Flag" class="img-fluid" />
                                    </div>
                                    <div class="country-name">Turkey</div>
                                </div>
                            </div>

                            <div class="col-12 col-sm-6 col-lg-4">
                                <div class="country-card" data-country="china">
                                    <div class="country-flag">
                                        <img src="https://www.countryflags.com/wp-content/uploads/china-flag-png-large.png"
                                            alt="China Flag" class="img-fluid" />
                                    </div>
                                    <div class="country-name">China</div>
                                </div>
                            </div>

                            <div class="col-12 col-sm-6 col-lg-4">
                                <div class="country-card" data-country="kazakhstan">
                                    <div class="country-flag">
                                        <img src="https://www.countryflags.com/wp-content/uploads/kazakhstan-flag-png-large.png"
                                            alt="Kazakhstan Flag" class="img-fluid" />
                                    </div>
                                    <div class="country-name">Kazakhstan</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Package Selection Step -->
                    <div class="step-content" id="package-step">
                        <h2 class="section-title">Select a Service Package</h2>
                        <p class="section-subtitle">Choose from our comprehensive service packages designed to make your travel dreams</p>

                        <div class="row g-4">
                            <div class="col-12 col-lg-4">
                                <div class="package-card h-100" data-package="invitation-visa">
                                    <div class="package-header mb-3">
                                        <div class="package-title">Invitation + Visa Documentation</div>
                                        <div class="d-flex gap-2 flex-wrap mt-2">
                                            <span class="badge badge-flag">🇹🇷</span>
                                            <span class="badge badge-package">Package For Turkey</span>
                                        </div>
                                    </div>

                                    <div class="package-pricing mb-3">
                                        <div class="price-main">$499 USD</div>
                                        <div class="d-flex align-items-center gap-2 mt-1">
                                            <span class="price-original">$599 USD</span>
                                            <span class="price-savings">Save $100</span>
                                        </div>
                                    </div>

                                    <ul class="package-features">
                                        <li><span class="feature-icon">✓</span> Fast Processing</li>
                                        <li><span class="feature-icon">✓</span> 96 Hours Valid</li>
                                        <li><span class="feature-icon">✓</span> Airport Transit</li>
                                    </ul>

                                    <div class="processing-time">
                                        <span>⏱</span>
                                        <span>Invitation processing time is 48 hours</span>
                                    </div>

                                    <button class="btn btn-custom">
                                        Get Started
                                        <span>→</span>
                                    </button>
                                </div>
                            </div>

                            <div class="col-12 col-lg-4">
                                <div class="package-card h-100" data-package="invitation">
                                    <div class="package-header mb-3">
                                        <div class="package-title">Invitation</div>
                                        <div class="d-flex gap-2 flex-wrap mt-2">
                                            <span class="badge badge-flag">🇹🇷</span>
                                            <span class="badge badge-package">Package For Turkey</span>
                                        </div>
                                    </div>

                                    <div class="package-pricing mb-3">
                                        <div class="price-main">$475 USD</div>
                                        <div class="d-flex align-items-center gap-2 mt-1">
                                            <span class="price-original">$550 USD</span>
                                            <span class="price-savings">Save $75</span>
                                        </div>
                                    </div>

                                    <ul class="package-features">
                                        <li><span class="feature-icon">✓</span> Fast Processing</li>
                                        <li><span class="feature-icon">✓</span> 96 Hours Valid</li>
                                        <li><span class="feature-icon">✓</span> Airport Transit</li>
                                    </ul>

                                    <div class="processing-time">
                                        <span>⏱</span>
                                        <span>Invitation processing time is 48 hours</span>
                                    </div>

                                    <button class="btn btn-custom">
                                        Get Started
                                        <span>→</span>
                                    </button>
                                </div>
                            </div>

                            <div class="col-12 col-lg-4">
                                <div class="package-card h-100" data-package="visa">
                                    <div class="package-header mb-3">
                                        <div class="package-title">Visa Documentation</div>
                                        <div class="d-flex gap-2 flex-wrap mt-2">
                                            <span class="badge badge-flag">🇹🇷</span>
                                            <span class="badge badge-package">Package For Turkey</span>
                                        </div>
                                    </div>

                                    <div class="package-pricing mb-3">
                                        <div class="price-main">$75 USD</div>
                                        <div class="d-flex align-items-center gap-2 mt-1">
                                            <span class="price-original">$115 USD</span>
                                            <span class="price-savings">Save $40</span>
                                        </div>
                                    </div>

                                    <ul class="package-features">
                                        <li><span class="feature-icon">✓</span> Fast Processing</li>
                                        <li><span class="feature-icon">✓</span> 96 Hours Valid</li>
                                        <li><span class="feature-icon">✓</span> Airport Transit</li>
                                    </ul>

                                    <div class="processing-time">
                                        <span>⏱</span>
                                        <span>Invitation processing time is 48 hours</span>
                                    </div>

                                    <button class="btn btn-custom">
                                        Get Started
                                        <span>→</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Traveler Selection Step -->
                    <div class="step-content" id="traveler-step">
                        <h2 class="section-title">Pick Who's Traveling</h2>
                        <p class="section-subtitle">Select the names of all individuals who will be traveling with you.</p>

                        <div class="row g-3">
                            <div class="col-12 col-md-6 col-xl-4">
                                <div class="traveler-card" data-traveler="danish">
                                    <div class="d-flex align-items-start gap-3">
                                        <div class="traveler-avatar">D</div>
                                        <div class="flex-grow-1">
                                            <div class="d-flex align-items-center gap-2 mb-2">
                                                <span class="traveler-name">Danish Malik</span>
                                                <span class="relation-badge">Customer</span>
                                            </div>
                                            <div class="traveler-meta">
                                                <div>Date of birth: 27 July 1998</div>
                                                <div>Passport Number: A1234567</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-12 col-md-6 col-xl-4">
                                <div class="traveler-card" data-traveler="hina">
                                    <div class="d-flex align-items-start gap-3">
                                        <div class="traveler-avatar" style="background: linear-gradient(135deg, #f093fb, #f5576c);">H</div>
                                        <div class="flex-grow-1">
                                            <div class="d-flex align-items-center gap-2 mb-2">
                                                <span class="traveler-name">Hina Qureshi</span>
                                                <span class="relation-badge">Wife</span>
                                            </div>
                                            <div class="traveler-meta">
                                                <div>Date of birth: 05 Nov 1999</div>
                                                <div>Passport Number: L2468135</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-12 col-md-6 col-xl-4">
                                <div class="traveler-card" data-traveler="zara">
                                    <div class="d-flex align-items-start gap-3">
                                        <div class="traveler-avatar" style="background: linear-gradient(135deg, #4facfe, #00f2fe);">Z</div>
                                        <div class="flex-grow-1">
                                            <div class="d-flex align-items-center gap-2 mb-2">
                                                <span class="traveler-name">Zara Malik</span>
                                                <span class="relation-badge">Sister</span>
                                            </div>
                                            <div class="traveler-meta">
                                                <div>Date of birth: 12 March 2000</div>
                                                <div>Passport Number: A1234567</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="border-top pt-4 mt-4">
                            <button class="btn btn-success btn-submit" id="submitBtn" disabled>
                                Submit Invitation
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        class TravelInvitationApp {
            constructor() {
                this.selectedCountry = null;
                this.selectedPackage = null;
                this.selectedTravelers = new Set();
                this.currentStep = 'country';

                this.initializeEventListeners();
            }

            initializeEventListeners() {
                // Step navigation
                document.querySelectorAll('.step-tab').forEach(tab => {
                    tab.addEventListener('click', (e) => {
                        const step = e.target.dataset.step;
                        if (this.canNavigateToStep(step)) {
                            this.navigateToStep(step);
                        }
                    });
                });

                // Country selection
                document.querySelectorAll('.country-card').forEach(card => {
                    card.addEventListener('click', (e) => {
                        this.selectCountry(e.currentTarget);
                    });
                });

                // Package selection
                document.querySelectorAll('.package-card .btn-custom').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.selectPackage(e.target.closest('.package-card'));
                    });
                });

                // Traveler selection
                document.querySelectorAll('.traveler-card').forEach(card => {
                    card.addEventListener('click', (e) => {
                        this.toggleTraveler(e.currentTarget);
                    });
                });

                // Submit button
                document.getElementById('submitBtn').addEventListener('click', () => {
                    this.submitInvitation();
                });
            }

            canNavigateToStep(step) {
                switch (step) {
                    case 'country':
                        return true;
                    case 'package':
                        return this.selectedCountry !== null;
                    case 'traveler':
                        return this.selectedCountry !== null && this.selectedPackage !== null;
                    default:
                        return false;
                }
            }

            navigateToStep(step) {
                // Update tabs
                document.querySelectorAll('.step-tab').forEach(tab => {
                    tab.classList.remove('active');
                });
                document.querySelector(`[data-step="${step}"]`).classList.add('active');

                // Update content
                document.querySelectorAll('.step-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(`${step}-step`).classList.add('active');

                this.currentStep = step;
            }

            selectCountry(countryCard) {
                // Remove previous selection
                document.querySelectorAll('.country-card').forEach(card => {
                    card.classList.remove('selected');
                });

                // Add selection to clicked card
                countryCard.classList.add('selected');
                this.selectedCountry = countryCard.dataset.country;

                // Auto-navigate to package step after short delay
                setTimeout(() => {
                    this.navigateToStep('package');
                }, 500);
            }

            selectPackage(packageCard) {
                // Remove previous selection
                document.querySelectorAll('.package-card').forEach(card => {
                    card.classList.remove('selected');
                });

                // Add selection to clicked card
                packageCard.classList.add('selected');
                this.selectedPackage = packageCard.dataset.package;

                // Auto-navigate to traveler step after short delay
                setTimeout(() => {
                    this.navigateToStep('traveler');
                }, 500);
            }

            toggleTraveler(travelerCard) {
                const travelerId = travelerCard.dataset.traveler;

                if (this.selectedTravelers.has(travelerId)) {
                    this.selectedTravelers.delete(travelerId);
                    travelerCard.classList.remove('selected');
                } else {
                    this.selectedTravelers.add(travelerId);
                    travelerCard.classList.add('selected');
                }

                // Update submit button state
                const submitBtn = document.getElementById('submitBtn');
                submitBtn.disabled = this.selectedTravelers.size === 0;
            }

            submitInvitation() {
                if (this.selectedCountry && this.selectedPackage && this.selectedTravelers.size > 0) {
                    // Show success message
                    const successMessage = document.getElementById('successMessage');
                    successMessage.style.display = 'block';

                    // Scroll to top to show message
                    window.scrollTo({ top: 0, behavior: 'smooth' });

                    // Reset form after showing success
                    setTimeout(() => {
                        this.resetForm();
                        successMessage.style.display = 'none';
                    }, 3000);

                    // Log the submission data
                    console.log('Invitation submitted:', {
                        country: this.selectedCountry,
                        package: this.selectedPackage,
                        travelers: Array.from(this.selectedTravelers)
                    });
                }
            }

            resetForm() {
                // Reset selections
                this.selectedCountry = null;
                this.selectedPackage = null;
                this.selectedTravelers.clear();

                // Reset UI
                document.querySelectorAll('.country-card').forEach(card => {
                    card.classList.remove('selected');
                });

                document.querySelectorAll('.package-card').forEach(card => {
                    card.classList.remove('selected');
                });

                document.querySelectorAll('.traveler-card').forEach(card => {
                    card.classList.remove('selected');
                });

                document.getElementById('submitBtn').disabled = true;

                // Navigate back to first step
                this.navigateToStep('country');
            }
        }

        // Initialize the application when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new TravelInvitationApp();
        });
    </script>
</body>
</html>