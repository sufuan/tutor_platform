<?php

namespace App\Observers;

use App\Models\Job;

class JobObserver
{
    public function created(Job $job): void
    {
        $job->update([
            'job_code' => 'JOB-' . str_pad($job->id, 5, '0', STR_PAD_LEFT)
        ]);
    }
}
