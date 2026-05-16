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
        return ['mail', 'database'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Update on Your Job Post — Tuition Barta')
            ->view('emails.notification', [
                'title' => 'Job Post Not Approved',
                'lines' => [
                    'We reviewed your job posting "<strong>' . $this->job->title . '</strong>", but unfortunately, it could not be approved at this time.',
                    '<strong>Reason for rejection:</strong>',
                    nl2br(e($this->reason)),
                    'You can review and update your job details to submit it again.'
                ],
                'actionText' => 'View Your Jobs',
                'actionUrl' => url('/guardian/jobs')
            ]);
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
