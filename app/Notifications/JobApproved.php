<?php

namespace App\Notifications;

use App\Models\Job;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class JobApproved extends Notification
{
    use Queueable;

    protected $job;

    public function __construct(Job $job)
    {
        $this->job = $job;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toArray($notifiable)
    {
        return [
            'title' => 'Job Approved',
            'message' => 'Your job posting "' . $this->job->title . '" has been approved and is now live.',
            'type' => 'success',
            'job_id' => $this->job->id,
        ];
    }
}
