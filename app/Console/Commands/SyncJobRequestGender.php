<?php

namespace App\Console\Commands;

use App\Models\TutorJobRequest;
use Illuminate\Console\Command;

class SyncJobRequestGender extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sync:job-request-gender';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync preferred_gender for existing tutor job requests from tutor gender';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Syncing preferred_gender for tutor job requests...');
        
        $jobRequests = TutorJobRequest::whereNull('preferred_gender')->with('tutor')->get();
        
        $updated = 0;
        $skipped = 0;
        
        foreach ($jobRequests as $jobRequest) {
            if ($jobRequest->tutor && $jobRequest->tutor->gender) {
                $jobRequest->update(['preferred_gender' => $jobRequest->tutor->gender]);
                $this->info("Updated job request #{$jobRequest->id} with gender: {$jobRequest->tutor->gender}");
                $updated++;
            } else {
                $this->warn("Skipped job request #{$jobRequest->id} - tutor has no gender set");
                $skipped++;
            }
        }
        
        $this->info("\nSync complete!");
        $this->info("Updated: {$updated}");
        $this->info("Skipped: {$skipped}");
        
        return Command::SUCCESS;
    }
}
