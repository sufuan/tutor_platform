<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tutors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('tutor_code', 20)->unique();
            $table->enum('verification_status', ['unverified', 'pending', 'verified', 'rejected'])->default('unverified');
            $table->timestamp('verified_at')->nullable();
            $table->foreignId('verified_by')->nullable()->constrained('users')->onDelete('set null');
            $table->text('verification_notes')->nullable();
            $table->integer('profile_completion_percentage')->default(0);
            $table->string('photo')->nullable();
            $table->string('first_name', 50)->nullable();
            $table->string('last_name', 50)->nullable();
            $table->string('institution', 100)->nullable();
            $table->string('education_level', 50)->nullable();
            $table->json('subjects')->nullable();
            $table->integer('experience_years')->nullable();
            $table->decimal('hourly_rate', 8, 2)->nullable();
            $table->text('bio')->nullable();
            $table->foreignId('location_id')->nullable()->constrained()->onDelete('set null');
            $table->timestamps();
            $table->index('verification_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tutors');
    }
};
