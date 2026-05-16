<?php

namespace App\Notifications;

use App\Models\Application;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class ApplicationRejected extends Notification
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
            ->subject('Application Update — Tuition Barta')
            ->view('emails.notification', [
                'title' => 'Application Status Update',
                'lines' => [
                    'We wanted to let you know that your application for the job "<strong>' . $this->application->job->title . '</strong>" was not selected by the guardian.',
                    'Don\'t be discouraged! There are many other guardians looking for tutors just like you.',
                    'Keep applying to new opportunities on the platform.'
                ],
                'actionText' => 'Browse New Jobs',
                'actionUrl' => url('/tutor/jobs')
            ]);
    }

    public function toArray($notifiable)
    {
        return [
            'title' => 'Application Rejected',
            'message' => 'Your application for "' . $this->application->job->title . '" was not selected.',
            'type' => 'error',
            'application_id' => $this->application->id,
        ];
    }
}
