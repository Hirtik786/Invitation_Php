<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('visa_applications', function (Blueprint $table) {
            $table->id();
            $table->string('package_name');
            $table->decimal('package_price', 10, 2);
            $table->string('from_country');
            $table->string('live_in_country');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('phone_number');
            $table->string('email');
            $table->string('passport_number');
            $table->date('dob');
            $table->string('profession');
            $table->date('travel_date_from');
            $table->date('travel_date_to');
            $table->string('travel_purpose');
            $table->integer('num_travellers')->default(1);
            $table->string('passport_document')->nullable();
            $table->string('headshot_document')->nullable();
            $table->json('additional_travelers')->nullable(); // Store additional travelers as JSON
            $table->enum('status', ['pending', 'processing', 'approved', 'rejected'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visa_applications');
    }
};