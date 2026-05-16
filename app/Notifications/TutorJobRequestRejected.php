<?php

namespace App\Notifications;

use App\Models\TutorJobRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class TutorJobRequestRejected extends Notification
{
    use Queueable;

    protected $jobRequest;
    protected $reason;

    public function __construct(TutorJobRequest $jobRequest, $reason)
    {
        $this->jobRequest = $jobRequest;
        $this->reason = $reason;
    }

    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Update on Your Job Request — Tuition Barta')
            ->view('emails.notification', [
                'title' => 'Job Request Not Approved',
                'lines' => [
                    'We reviewed your job request "<strong>' . $this->jobRequest->title . '</strong>", but unfortunately, it could not be approved at this time.',
                    '<strong>Reason for rejection:</strong>',
                    nl2br(e($this->reason)),
                    'You can review and update your job request details to submit it again.'
                ],
                'actionText' => 'View Your Job Requests',
                'actionUrl' => url('/tutor/job-requests')
            ]);
    }

    public function toArray($notifiable)
    {
        return [
            'title' => 'Job Request Rejected',
            'message' => 'Your job request "' . $this->jobRequest->title . '" was rejected. Reason: ' . $this->reason,
            'type' => 'error',
            'job_request_id' => $this->jobRequest->id,
        ];
    }
}
