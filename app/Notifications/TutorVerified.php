<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class TutorVerified extends Notification
{
    use Queueable;

    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('🎉 Your Profile Has Been Verified — Tuition Barta')
            ->view('emails.notification', [
                'title' => 'Congratulations!',
                'lines' => [
                    'Your tutor profile has been successfully verified.',
                    'You can now apply for jobs and start teaching.'
                ],
                'actionText' => 'Browse Jobs',
                'actionUrl' => url('/jobs')
            ]);
    }

    public function toArray($notifiable)
    {
        return [
            'title' => 'Profile Verified',
            'message' => 'Congratulations! Your tutor profile has been verified. You can now apply for jobs.',
            'type' => 'success',
        ];
    }
}
