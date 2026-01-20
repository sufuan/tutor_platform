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
        Schema::create('tutor_job_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tutor_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('description');
            $table->json('subjects'); // array of subject IDs
            $table->string('education_level', 50);
            $table->decimal('hourly_rate', 10, 2);
            $table->string('availability');
            $table->string('division')->nullable();
            $table->string('district')->nullable();
            $table->enum('teaching_mode', ['online', 'in-person', 'hybrid'])->default('hybrid');
            $table->enum('status', ['active', 'inactive', 'closed'])->default('active');
            $table->integer('views')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tutor_job_requests');
    }
};
