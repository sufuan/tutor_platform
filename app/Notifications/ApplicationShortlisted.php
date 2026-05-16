<?php

namespace App\Notifications;

use App\Models\Application;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class ApplicationShortlisted extends Notification
{
    use Queueable;

    protected $application;

    public function __construct(Application $application)
    {
        $this->application = $application;
    }

    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('You\'ve Been Shortlisted! 👍 — Tuition Barta')
            ->view('emails.notification', [
                'title' => 'Application Shortlisted',
                'lines' => [
                    'Good news! Your application for the job "<strong>' . $this->application->job->title . '</strong>" has been shortlisted by the guardian.',
                    'This means you are among the top candidates they are considering for this tuition.',
                    'The guardian may contact you soon for further discussion or to finalize the hiring process.'
                ],
                'actionText' => 'View Application',
                'actionUrl' => url('/tutor/applications/' . $this->application->id)
            ]);
    }

    public function toArray($notifiable)
    {
        return [
            'title' => 'Application Shortlisted',
            'message' => 'Your application for "' . $this->application->job->title . '" has been shortlisted.',
            'type' => 'info',
            'application_id' => $this->application->id,
        ];
    }
}
