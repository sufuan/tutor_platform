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
        Schema::create('guardians', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('guardian_code', 20)->unique();
            $table->enum('profile_completion_status', ['incomplete', 'completed'])->default('incomplete');
            $table->integer('profile_completion_percentage')->default(0);
            $table->string('first_name', 50)->nullable();
            $table->string('last_name', 50)->nullable();
            $table->string('phone', 20)->nullable();
            $table->string('photo')->nullable();
            $table->foreignId('location_id')->nullable()->constrained()->onDelete('set null');
            $table->text('detailed_address')->nullable();
            $table->json('preferred_subjects')->nullable();
            $table->json('preferred_class_levels')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('guardians');
    }
};
