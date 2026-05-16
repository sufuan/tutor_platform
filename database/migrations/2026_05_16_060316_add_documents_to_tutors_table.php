<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tutors', function (Blueprint $table) {
            $table->string('nid_card')->nullable()->after('cv_path');
            $table->string('student_id_card')->nullable()->after('nid_card');
            $table->string('ssc_certificate')->nullable()->after('student_id_card');
            $table->string('hsc_certificate')->nullable()->after('ssc_certificate');
        });
    }

    public function down(): void
    {
        Schema::table('tutors', function (Blueprint $table) {
            $table->dropColumn(['nid_card', 'student_id_card', 'ssc_certificate', 'hsc_certificate']);
        });
    }
};
