<!-- resources/views/components/traveler-form-component.blade.php -->
<div id="traveler-step" class="step-content">
  <h2 class="section-title">Pick Who's Traveling</h2>
  <p class="section-subtitle">Select the names of all individuals who will be traveling with you.</p>

  <!-- Traveler cards will be dynamically inserted here by JavaScript -->
  <div class="row g-3" id="traveler-cards">
    <!-- Dynamic content will be inserted here -->
  </div>

  <!-- Submit button -->
  <div class="border-top pt-4 mt-4">
    <button class="btn btn-success btn-submit" id="submitBtn" type="button">
      Submit Invitation
    </button>
  </div>
</div>