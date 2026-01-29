<?php

namespace App\Notifications;

use App\Models\Application;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class GuardianRecommendation extends Notification
{
    use Queueable;

    protected $application;
    protected $type;

    public function __construct(Application $application, $type)
    {
        $this->application = $application;
        $this->type = $type;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toArray($notifiable)
    {
        $tutor = $this->application->tutor;
        $job = $this->application->job;
        $guardian = $this->application->job->guardian;

        $message = $this->type === 'hire'
            ? "Guardian {$guardian->first_name} {$guardian->last_name} recommends hiring {$tutor->first_name} {$tutor->last_name} for job: {$job->title}"
            : "Guardian {$guardian->first_name} {$guardian->last_name} is not interested in {$tutor->first_name} {$tutor->last_name} for job: {$job->title}";

        return [
            'title' => $this->type === 'hire' ? 'Guardian Recommends Hire' : 'Guardian Not Interested',
            'message' => $message,
            'type' => $this->type === 'hire' ? 'info' : 'warning',
            'application_id' => $this->application->id,
            'job_id' => $job->id,
            'tutor_id' => $tutor->id,
            'guardian_id' => $guardian->id,
        ];
    }
}
