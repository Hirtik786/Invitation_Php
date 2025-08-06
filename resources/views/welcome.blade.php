<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Travel Invitation System</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background-color: #f5f7fa;
            line-height: 1.6;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 30px;
            margin-bottom: 20px;
        }

        .header {
            margin-bottom: 30px;
        }

        .header h1 {
            font-size: 2.5rem;
            color: #2d3748;
            margin-bottom: 10px;
        }

        .breadcrumb {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 30px;
            font-size: 14px;
        }

        .breadcrumb a {
            color: #3182ce;
            text-decoration: none;
        }

        .breadcrumb a:hover {
            text-decoration: underline;
        }

        .breadcrumb .separator {
            color: #a0aec0;
        }

        .step-nav {
            display: flex;
            border-bottom: 1px solid #e2e8f0;
            margin-bottom: 30px;
            overflow-x: auto;
        }

        .step-tab {
            padding: 15px 25px;
            background: none;
            border: none;
            cursor: pointer;
            font-size: 16px;
            font-weight: 500;
            color: #718096;
            border-bottom: 3px solid transparent;
            white-space: nowrap;
            transition: all 0.3s ease;
        }

        .step-tab.active {
            color: #3182ce;
            border-bottom-color: #3182ce;
            background-color: #ebf8ff;
        }

        .step-tab:hover:not(.active) {
            color: #4a5568;
        }

        .step-content {
            display: none;
        }

        .step-content.active {
            display: block;
            animation: fadeIn 0.3s ease-in;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .section-title {
            font-size: 1.5rem;
            color: #2d3748;
            margin-bottom: 8px;
        }

        .section-subtitle {
            color: #718096;
            margin-bottom: 25px;
        }

        .countries-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .country-card {
            /* border: 2px solid #e2e8f0; */
            /* border-radius: 12px; */
            padding: 20px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            background: white;
        }

        .country-flag {
            width: 100%;
            height: 80%;
            margin: 0 auto 15px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: bold;
            color: white;
        }

        .country-flag img {
            width: 100%;
            height: 100%;
            border-radius: 5px;
        }

        .country-name {
            font-weight: 600;
            color: #2d3748;
            background-color: #f8f8f8;
            padding: 8px 16px;
            border-radius: 10px;
            transition: all 0.3s ease;
        }

        .country-card.selected .country-name {
            background: #3182ce;
            color: white;
        }

        .packages-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 25px;
            margin-bottom: 30px;
        }

        .package-card {
            border: 1px solid #f8f8f8;
            border-radius: 12px;
            padding: 25px;
            background: #f8f8f8;
            transition: all 0.3s ease;
        }

        .package-card:hover {
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
            transform: translateY(-3px);
        }

        .package-header {
            margin-bottom: 20px;
        }

        .package-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 10px;
        }

        .package-badges {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
        }

        .badge {
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
        }

        .badge-flag {
            background: #e53e3e;
            color: white;
        }

        .badge-package {
            background: #3182ce;
            color: white;
        }

        .package-pricing {
            margin-bottom: 20px;
        }

        .price-main {
            font-size: 2rem;
            font-weight: bold;
            color: #2d3748;
        }

        .price-details {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-top: 5px;
        }

        .price-original {
            color: #a0aec0;
            text-decoration: line-through;
            font-size: 14px;
        }

        .price-savings {
            color: #38a169;
            font-weight: 600;
            font-size: 14px;
        }

        .package-features {
            list-style: none;
            margin-bottom: 20px;
        }

        .package-features li {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 5px 0;
            color: #4a5568;
            font-size: 14px;
        }

        .feature-icon {
            width: 16px;
            height: 16px;
            background: #48bb78;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 10px;
        }

        .processing-time {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #718096;
            font-size: 14px;
            margin-bottom: 20px;
        }

        .btn-primary {
            width: 100%;
            padding: 12px 20px;
            background: white;
            color: #3182ce;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }

        .btn-primary:hover {
            background: #2c5aa0;
            color: white;
            transform: translateY(-1px);
        }

        .travelers-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .traveler-card {
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            padding: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            background: white;
        }

        .traveler-card:hover {
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .traveler-card.selected {
            border-color: #3182ce;
            background: #ebf8ff;
        }

        .traveler-info {
            display: flex;
            align-items: flex-start;
            gap: 15px;
        }

        .traveler-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea, #764ba2);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 18px;
            flex-shrink: 0;
        }

        .traveler-details {
            flex: 1;
        }

        .traveler-name-row {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 8px;
        }

        .traveler-name {
            font-weight: 600;
            color: #2d3748;
        }

        .relation-badge {
            padding: 2px 8px;
            background: #c6f6d5;
            color: #22543d;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 500;
        }

        .traveler-meta {
            color: #718096;
            font-size: 13px;
            line-height: 1.4;
        }

        .submit-section {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
        }

        .btn-submit {
            background: #48bb78;
            padding: 15px 30px;
            font-size: 16px;
        }

        .btn-submit:hover {
            background: #38a169;
        }

        .btn-submit:disabled {
            background: #a0aec0;
            cursor: not-allowed;
            transform: none;
        }

        .success-message {
            background: #c6f6d5;
            color: #22543d;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            display: none;
        }

        @media (max-width: 768px) {
            .container {
                padding: 15px;
            }

            .card {
                padding: 20px;
            }

            .header h1 {
                font-size: 2rem;
            }

            .countries-grid {
                grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
                gap: 15px;
            }

            .packages-grid {
                grid-template-columns: 1fr;
            }

            .travelers-grid {
                grid-template-columns: 1fr;
            }

            .step-nav {
                flex-wrap: wrap;
            }

            .step-tab {
                padding: 12px 20px;
                font-size: 14px;
            }
        }

        @media (max-width: 480px) {
            .countries-grid {
                grid-template-columns: repeat(2, 1fr);
            }

            .country-flag {
                width: 48px;
                height: 36px;
                font-size: 18px;
            }

            .price-main {
                font-size: 1.5rem;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="card">
            <div class="header">
                <h1>Invitation</h1>
                <div class="breadcrumb">
                    <a href="#">Dashboard</a>
                    <span class="separator">></span>
                    <span>Invitation</span>
                </div>
            </div>

            <div class="step-nav">
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

                <div class="countries-grid">
                    <div class="country-card" data-country="turkey">
                        <div class="country-flag">
                            <img src="https://www.countryflags.com/wp-content/uploads/turkey-flag-png-large.png"
                                alt="Turkey Flag" />
                        </div>
                        <div class="country-name">Turkey</div>
                    </div>

                    <div class="country-card" data-country="china">
                        <div class="country-flag">
                            <img src="https://www.countryflags.com/wp-content/uploads/china-flag-png-large.png"
                                alt="China Flag" />
                        </div>
                        <div class="country-name">China</div>
                    </div>

                    <div class="country-card" data-country="kazakhstan">
                        <div class="country-flag">
                            <img src="https://www.countryflags.com/wp-content/uploads/kazakhstan-flag-png-large.png"
                                alt="Kazakhstan Flag" />
                        </div>
                        <div class="country-name">Kazakhstan</div>
                    </div>


                </div>
            </div>


            <!-- Package Selection Step -->
            <div class="step-content" id="package-step">
                <h2 class="section-title">Select a Service Package</h2>
                <p class="section-subtitle">Choose from our comprehensive service packages designed to make your travel
                    dreams</p>

                <div class="packages-grid">
                    <div class="package-card" data-package="invitation-visa">
                        <div class="package-header">
                            <div class="package-title">Invitation + Visa Documentation</div>
                            <div class="package-badges">
                                <span class="badge badge-flag">🇹🇷</span>
                                <span class="badge badge-package">Package For Turkey</span>
                            </div>
                        </div>

                        <div class="package-pricing">
                            <div class="price-main">$499 USD</div>
                            <div class="price-details">
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

                        <button class="btn-primary">
                            Get Started
                            <span>→</span>
                        </button>
                    </div>

                    <div class="package-card" data-package="invitation">
                        <div class="package-header">
                            <div class="package-title">Invitation</div>
                            <div class="package-badges">
                                <span class="badge badge-flag">🇹🇷</span>
                                <span class="badge badge-package">Package For Turkey</span>
                            </div>
                        </div>

                        <div class="package-pricing">
                            <div class="price-main">$475 USD</div>
                            <div class="price-details">
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

                        <button class="btn-primary">
                            Get Started
                            <span>→</span>
                        </button>
                    </div>

                    <div class="package-card" data-package="visa">
                        <div class="package-header">
                            <div class="package-title">Visa Documentation</div>
                            <div class="package-badges">
                                <span class="badge badge-flag">🇹🇷</span>
                                <span class="badge badge-package">Package For Turkey</span>
                            </div>
                        </div>

                        <div class="package-pricing">
                            <div class="price-main">$75 USD</div>
                            <div class="price-details">
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

                        <button class="btn-primary">
                            Get Started
                            <span>→</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Traveler Selection Step -->
            <div class="step-content" id="traveler-step">
                <h2 class="section-title">Pick Who's Traveling</h2>
                <p class="section-subtitle">Select the names of all individuals who will be traveling with you.</p>

                <div class="travelers-grid">
                    <div class="traveler-card" data-traveler="danish">
                        <div class="traveler-info">
                            <div class="traveler-avatar">D</div>
                            <div class="traveler-details">
                                <div class="traveler-name-row">
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

                    <div class="traveler-card" data-traveler="hina">
                        <div class="traveler-info">
                            <div class="traveler-avatar" style="background: linear-gradient(135deg, #f093fb, #f5576c);">
                                H</div>
                            <div class="traveler-details">
                                <div class="traveler-name-row">
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

                    <div class="traveler-card" data-traveler="zara">
                        <div class="traveler-info">
                            <div class="traveler-avatar" style="background: linear-gradient(135deg, #4facfe, #00f2fe);">
                                Z</div>
                            <div class="traveler-details">
                                <div class="traveler-name-row">
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

                <div class="submit-section">
                    <button class="btn-primary btn-submit" id="submitBtn" disabled>
                        Submit Invitation
                    </button>
                </div>
            </div>
        </div>
    </div>

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
                document.querySelectorAll('.package-card .btn-primary').forEach(btn => {
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
                    card.style.borderColor = '#e2e8f0';
                    card.style.boxShadow = 'none';
                });

                // Add selection to clicked card
                packageCard.style.borderColor = '#3182ce';
                packageCard.style.boxShadow = '0 0 0 3px rgba(49, 130, 206, 0.1)';

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
                    card.style.borderColor = '#e2e8f0';
                    card.style.boxShadow = 'none';
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