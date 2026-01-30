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
        Schema::table('tutor_jobs', function (Blueprint $table) {
            // Add sessions_per_week as json to store array of days (e.g., ["Monday", "Tuesday"])
            // Note: preferred_location already exists in the table
            $table->json('sessions_per_week')->nullable()->after('tuition_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tutor_jobs', function (Blueprint $table) {
            // Remove sessions_per_week field
            $table->dropColumn('sessions_per_week');
        });
    }
};
