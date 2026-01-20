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
        Schema::table('tutors', function (Blueprint $table) {
            $table->string('phone', 20)->nullable()->after('last_name');
            $table->text('address')->nullable()->after('phone');
            $table->text('experience_details')->nullable()->after('experience_years');
            
            // Availability fields
            $table->string('available_days')->nullable()->after('bio');
            $table->string('available_time_from', 10)->nullable()->after('available_days');
            $table->string('available_time_to', 10)->nullable()->after('available_time_from');
            $table->text('preferred_locations')->nullable()->after('available_time_to');
            
            // Tutoring preferences
            $table->string('tutoring_styles')->nullable()->after('preferred_locations');
            $table->string('tutoring_method')->nullable()->after('tutoring_styles');
            $table->json('preferred_categories')->nullable()->after('tutoring_method');
            $table->json('preferred_classes')->nullable()->after('preferred_categories');
            $table->string('place_of_tutoring')->nullable()->after('preferred_classes');
            
            // CV
            $table->string('cv_path')->nullable()->after('place_of_tutoring');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tutors', function (Blueprint $table) {
            $table->dropColumn([
                'phone',
                'address',
                'experience_details',
                'available_days',
                'available_time_from',
                'available_time_to',
                'preferred_locations',
                'tutoring_styles',
                'tutoring_method',
                'preferred_categories',
                'preferred_classes',
                'place_of_tutoring',
                'cv_path',
            ]);
        });
    }
};
