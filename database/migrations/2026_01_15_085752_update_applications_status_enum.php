<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // First, convert to string temporarily
        Schema::table('applications', function (Blueprint $table) {
            $table->string('status', 50)->default('pending')->change();
        });

        // Update any 'confirmed' status to 'accepted'
        DB::table('applications')
            ->where('status', 'confirmed')
            ->update(['status' => 'accepted']);

        // Then change to the new enum
        Schema::table('applications', function (Blueprint $table) {
            $table->enum('status', ['pending', 'shortlisted', 'accepted', 'rejected'])->default('pending')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('applications', function (Blueprint $table) {
            $table->enum('status', ['pending', 'shortlisted', 'rejected', 'confirmed'])->default('pending')->change();
        });
    }
};
