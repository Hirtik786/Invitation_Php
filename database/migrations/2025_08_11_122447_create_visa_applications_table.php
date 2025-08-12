<?php
// database/migrations/xxxx_xx_xx_create_visa_applications_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('visa_applications', function (Blueprint $table) {
            $table->id();

            $table->string('from_country');
            $table->string('live_in_country');
            $table->boolean('confirm_passport')->default(false);
            $table->boolean('confirm_picture')->default(false);
            $table->boolean('confirm_no_other_visa')->default(false);
            $table->boolean('confirm_decision')->default(false);

            $table->string('first_name');
            $table->string('last_name');
            $table->string('phone_number', 20);
            $table->string('email');
            $table->string('passport_number');
            $table->date('dob');
            $table->string('profession');

            $table->date('travel_date_from');
            $table->date('travel_date_to');
            $table->string('travel_purpose');
            $table->integer('num_travellers');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('visa_applications');
    }
};
