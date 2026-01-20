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
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_id')->constrained('tutor_jobs')->onDelete('cascade');
            $table->foreignId('tutor_id')->constrained()->onDelete('cascade');
            $table->enum('status', ['pending', 'shortlisted', 'rejected', 'confirmed'])->default('pending');
            $table->text('cover_letter')->nullable();
            $table->timestamp('applied_at')->useCurrent();
            $table->timestamp('shortlisted_at')->nullable();
            $table->boolean('is_read')->default(false);
            $table->timestamp('status_updated_at')->nullable();
            $table->boolean('status_read')->default(false);
            $table->timestamps();
            $table->unique(['job_id', 'tutor_id']);
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
