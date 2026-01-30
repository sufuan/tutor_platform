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
        // First, convert existing string data to JSON format
        DB::table('tutors')->whereNotNull('available_days')->orderBy('id')->each(function ($tutor) {
            if ($tutor->available_days && !is_array(json_decode($tutor->available_days, true))) {
                // If it's a string, convert it to an array
                $days = array_map('trim', explode(',', $tutor->available_days));
                DB::table('tutors')
                    ->where('id', $tutor->id)
                    ->update(['available_days' => json_encode($days)]);
            }
        });

        // Then change the column type
        Schema::table('tutors', function (Blueprint $table) {
            $table->json('available_days')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tutors', function (Blueprint $table) {
            $table->string('available_days')->nullable()->change();
        });
    }
};

