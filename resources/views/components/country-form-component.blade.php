<?php
$countries = [
    [
        'name' => 'Turkey',
        'slug' => 'turkey',
        'flag' => 'https://www.countryflags.com/wp-content/uploads/turkey-flag-png-large.png'
    ],
    [
        'name' => 'China',
        'slug' => 'china',
        'flag' => 'https://www.countryflags.com/wp-content/uploads/china-flag-png-large.png'
    ],
    [
        'name' => 'Albania',
        'slug' => 'albania',
        'flag' => 'https://www.countryflags.com/wp-content/uploads/albania-flag-png-large.png'
    ],
    [
        'name' => 'Kazakhstan',
        'slug' => 'kazakhstan',
        'flag' => 'https://www.countryflags.com/wp-content/uploads/kazakhstan-flag-png-large.png'
    ],
    [
        'name' => 'Dubai',
        'slug' => 'dubai',
        'flag' => 'https://www.countryflags.com/wp-content/uploads/united-arab-emirates-flag-png-large.png'
    ],
    [
        'name' => 'Portugal',
        'slug' => 'portugal',
        'flag' => 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg'
    ]
];
?>

<div class="step-content active" id="country-step">
    <h2 class="section-title">Select the country</h2>
    <p class="section-subtitle">Choose the country you want to go to</p>

    <div class="row g-3">
        <?php foreach ($countries as $country): ?>
        <div class="col-12 col-sm-6 col-lg-4">
            <div class="country-card" data-country="<?= htmlspecialchars($country['slug']) ?>">
                <div class="country-flag">
                    <img src="<?= htmlspecialchars($country['flag']) ?>"
                        alt="<?= htmlspecialchars($country['name']) ?> Flag" class="img-fluid" />
                </div>
                <div class="country-name"><?= htmlspecialchars($country['name']) ?></div>
            </div>
        </div>
        <?php endforeach; ?>
    </div>
</div>