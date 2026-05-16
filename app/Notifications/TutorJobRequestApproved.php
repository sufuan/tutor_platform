<?php

namespace App\Notifications;

use App\Models\TutorJobRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class TutorJobRequestApproved extends Notification
{
    use Queueable;

    protected $jobRequest;

    public function __construct(TutorJobRequest $jobRequest)
    {
        $this->jobRequest = $jobRequest;
    }

    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('✅ Your Job Request Is Now Active — Tuition Barta')
            ->view('emails.notification', [
                'title' => 'Job Request Approved',
                'lines' => [
                    'Great news! Your job request "<strong>' . $this->jobRequest->title . '</strong>" has been approved.',
                    'It is now live on our platform and visible to guardians searching for tutors.',
                    'Make sure your profile is fully updated to attract the best opportunities.'
                ],
                'actionText' => 'View Your Job Request',
                'actionUrl' => url('/tutor/job-requests')
            ]);
    }

    public function toArray($notifiable)
    {
        return [
            'title' => 'Job Request Approved',
            'message' => 'Your job request "' . $this->jobRequest->title . '" has been approved and is now active.',
            'type' => 'success',
            'job_request_id' => $this->jobRequest->id,
        ];
    }
}
