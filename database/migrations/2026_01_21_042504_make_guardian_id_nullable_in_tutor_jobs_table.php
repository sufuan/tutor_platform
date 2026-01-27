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
            // Drop the foreign key constraint first
            $table->dropForeign(['guardian_id']);
            
            // Make the column nullable
            $table->foreignId('guardian_id')->nullable()->change();
            
            // Re-add the foreign key constraint with onDelete('cascade')
            $table->foreign('guardian_id')->references('id')->on('guardians')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // For rollback, just keep the column as is to avoid data issues
        // The original state can be maintained in the initial migration
    }
};
