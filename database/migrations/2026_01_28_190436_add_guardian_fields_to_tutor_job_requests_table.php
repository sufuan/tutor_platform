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
        Schema::table('tutor_job_requests', function (Blueprint $table) {
            $table->string('class_level')->nullable()->after('education_level');
            $table->string('education_medium')->nullable()->after('class_level');
            $table->string('tuition_type')->nullable()->after('teaching_mode');
            $table->string('tutor_gender_preference')->default('any')->after('preferred_gender');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tutor_job_requests', function (Blueprint $table) {
            $table->dropColumn(['class_level', 'education_medium', 'tuition_type', 'tutor_gender_preference']);
        });
    }
};
