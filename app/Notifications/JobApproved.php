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
        return ['mail', 'database'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('✅ Your Job Post Is Now Live — Tuition Barta')
            ->view('emails.notification', [
                'title' => 'Job Approved!',
                'lines' => [
                    'Great news! Your job posting "<strong>' . $this->job->title . '</strong>" has been approved by our team.',
                    'It is now live on our platform and visible to all verified tutors.',
                    'We will notify you as soon as tutors start applying for this job.'
                ],
                'actionText' => 'View Your Job',
                'actionUrl' => url('/guardian/jobs/' . $this->job->id)
            ]);
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
