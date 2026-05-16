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
        // Drop the old ENUM constraint if possible, but in MySQL it's easiest to just execute an ALTER statement
        // or use Laravel's change() method.
        Schema::table('documents', function (Blueprint $table) {
            $table->string('type')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('documents', function (Blueprint $table) {
            // Can't reliably reverse an enum without data loss, but we can try to switch back to string or leave it.
            $table->string('type')->change();
        });
    }
};
