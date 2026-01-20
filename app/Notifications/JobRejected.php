<?php

namespace App\Notifications;

use App\Models\Job;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class JobRejected extends Notification
{
    use Queueable;

    protected $job;
    protected $reason;

    public function __construct(Job $job, $reason)
    {
        $this->job = $job;
        $this->reason = $reason;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toArray($notifiable)
    {
        return [
            'title' => 'Job Rejected',
            'message' => 'Your job posting "' . $this->job->title . '" was rejected. Reason: ' . $this->reason,
            'type' => 'error',
            'job_id' => $this->job->id,
        ];
    }
}
