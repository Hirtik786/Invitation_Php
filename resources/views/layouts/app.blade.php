<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Travel Invitation</title>
    <link rel="stylesheet" href="{{ asset('css/index.css') }}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
</head>

<body>

    @yield('content') <!-- This is CRITICAL -->

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <!-- In your layout file -->
    <script src="https://cdn.jsdelivr.net/npm/i18n-iso-countries@7.0.0/index.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/i18n-iso-countries@7.0.0/langs/en.json"></script>
    <script src="{{ asset('js/app.js') }}"></script>

</body>

</html>