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
        return ['database'];
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
