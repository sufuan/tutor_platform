<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class TutorRejected extends Notification
{
    use Queueable;

    protected $reason;

    public function __construct($reason)
    {
        $this->reason = $reason;
    }

    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Action Required: Your Profile Verification — Tuition Barta')
            ->view('emails.notification', [
                'title' => 'Profile Verification Update',
                'lines' => [
                    'We reviewed your tutor profile, but unfortunately, it could not be verified at this time.',
                    '<strong>Reason for rejection:</strong>',
                    nl2br(e($this->reason)),
                    'Please update your profile with the required information and submit it again for verification.'
                ],
                'actionText' => 'Update Profile',
                'actionUrl' => url('/tutor/profile')
            ]);
    }

    public function toArray($notifiable)
    {
        return [
            'title' => 'Profile Verification Rejected',
            'message' => 'Your tutor profile verification was rejected. Reason: ' . $this->reason,
            'type' => 'error',
        ];
    }
}
