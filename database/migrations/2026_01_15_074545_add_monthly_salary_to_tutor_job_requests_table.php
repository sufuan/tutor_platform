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
            $table->decimal('monthly_salary', 10, 2)->nullable()->after('education_level');
            $table->json('available_days')->nullable()->after('availability');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tutor_job_requests', function (Blueprint $table) {
            $table->dropColumn(['monthly_salary', 'available_days']);
        });
    }
};
