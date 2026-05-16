<?php

namespace App\Notifications;

use App\Models\Application;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ApplicationAccepted extends Notification
{
    use Queueable;

    protected $application;

    /**
     * Create a new notification instance.
     */
    public function __construct(Application $application)
    {
        $this->application = $application;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('🎊 You\'ve Been Hired! — Tuition Barta')
            ->view('emails.notification', [
                'title' => 'Congratulations, You\'re Hired!',
                'lines' => [
                    'Great news! Your application for the job "<strong>' . $this->application->job->title . '</strong>" has been accepted.',
                    'The guardian will contact you soon, or you can find their contact details on your dashboard.',
                    'Best of luck with your new tuition!'
                ],
                'actionText' => 'View Application Details',
                'actionUrl' => url('/tutor/applications/' . $this->application->id)
            ]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'title' => 'Application Accepted',
            'message' => 'Congratulations! Your application for "' . $this->application->job->title . '" has been accepted.',
            'type' => 'success',
            'application_id' => $this->application->id,
        ];
    }
}
