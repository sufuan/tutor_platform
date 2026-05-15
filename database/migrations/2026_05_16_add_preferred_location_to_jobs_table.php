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
            if (!Schema::hasColumn('tutor_jobs', 'preferred_location')) {
                $table->string('preferred_location')->nullable()->after('district');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tutor_jobs', function (Blueprint $table) {
            if (Schema::hasColumn('tutor_jobs', 'preferred_location')) {
                $table->dropColumn('preferred_location');
            }
        });
    }
};
