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
        Schema::create('tutor_jobs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('guardian_id')->constrained()->onDelete('cascade');
            $table->foreignId('student_id')->nullable()->constrained()->onDelete('set null');
            $table->string('job_code', 20)->unique();
            $table->enum('approval_status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->foreignId('approved_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('approved_at')->nullable();
            $table->text('rejection_reason')->nullable();
            $table->enum('status', ['open', 'closed', 'filled'])->default('open');
            $table->timestamp('filled_at')->nullable();
            $table->string('title', 200);
            $table->text('description');
            $table->json('subjects');
            $table->string('class_level', 50);
            $table->string('education_medium', 50);
            $table->enum('tuition_type', ['home', 'online', 'group', 'package', 'shadow']);
            $table->integer('days_per_week');
            $table->integer('duration_per_session');
            $table->decimal('salary', 10, 2);
            $table->foreignId('location_id')->constrained()->onDelete('cascade');
            $table->text('detailed_address');
            $table->enum('preferred_tutor_gender', ['male', 'female', 'any'])->default('any');
            $table->text('special_requirements')->nullable();
            $table->timestamps();
            $table->index(['approval_status', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tutor_jobs');
    }
};
