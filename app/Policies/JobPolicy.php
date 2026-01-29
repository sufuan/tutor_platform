<?php

namespace App\Policies;

use App\Models\Job;
use App\Models\User;

class JobPolicy
{
    /**
     * Determine if the user can view the job.
     */
    public function view(User $user, Job $job): bool
    {
        if ($user->role !== 'guardian') {
            return false;
        }

        // Ensure guardian relationship exists
        if (!$user->guardian) {
            return false;
        }

        return $job->guardian_id === $user->guardian->id;
    }

    /**
     * Determine if the user can update the job.
     */
    public function update(User $user, Job $job): bool
    {
        if ($user->role !== 'guardian') {
            return false;
        }

        // Ensure guardian relationship exists
        if (!$user->guardian) {
            return false;
        }

        return $job->guardian_id === $user->guardian->id;
    }

    /**
     * Determine if the user can delete the job.
     */
    public function delete(User $user, Job $job): bool
    {
        if ($user->role !== 'guardian') {
            return false;
        }

        // Ensure guardian relationship exists
        if (!$user->guardian) {
            return false;
        }

        return $job->guardian_id === $user->guardian->id;
    }

    /**
     * Determine if the user can manage applications for the job.
     */
    public function manage(User $user, Job $job): bool
    {
        if ($user->role !== 'guardian') {
            return false;
        }

        // Ensure guardian relationship exists
        if (!$user->guardian) {
            return false;
        }

        return $job->guardian_id === $user->guardian->id;
    }
}
