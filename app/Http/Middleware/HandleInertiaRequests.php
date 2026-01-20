<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        $auth = null;
        $badgeCounts = [];

        if ($user) {
            $auth = [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ];

            // Add role-specific data
            if ($user->role === 'guardian' && $user->guardian) {
                $auth['guardian'] = [
                    'id' => $user->guardian->id,
                    'guardian_code' => $user->guardian->guardian_code,
                    'first_name' => $user->guardian->first_name,
                    'last_name' => $user->guardian->last_name,
                    'phone' => $user->guardian->phone,
                    'photo' => $user->guardian->photo,
                    'profile_completion_status' => $user->guardian->profile_completion_status,
                    'profile_completion_percentage' => $user->guardian->profile_completion_percentage,
                ];

                $badgeCounts = [
                    'unreadApplications' => \App\Services\BadgeCountService::getGuardianUnreadApplicationsCount($user->guardian->id),
                    'totalJobs' => \App\Services\BadgeCountService::getGuardianTotalJobsCount($user->guardian->id),
                ];
            } elseif ($user->role === 'tutor' && $user->tutor) {
                $auth['tutor'] = [
                    'id' => $user->tutor->id,
                    'tutor_code' => $user->tutor->tutor_code,
                    'first_name' => $user->tutor->first_name,
                    'last_name' => $user->tutor->last_name,
                    'phone' => $user->tutor->phone,
                    'photo' => $user->tutor->photo,
                    'verification_status' => $user->tutor->verification_status,
                    'verified_at' => $user->tutor->verified_at,
                    'profile_completion_percentage' => $user->tutor->profile_completion_percentage,
                ];

                $badgeCounts = [
                    'applicationUpdates' => \App\Services\BadgeCountService::getTutorApplicationUpdatesCount($user->tutor->id),
                    'totalApplications' => \App\Services\BadgeCountService::getTutorTotalApplicationsCount($user->tutor->id),
                ];
            } elseif ($user->role === 'admin') {
                $badgeCounts = [
                    'pendingVerifications' => \App\Services\BadgeCountService::getPendingVerificationsCount(),
                    'pendingJobs' => \App\Services\BadgeCountService::getPendingJobsCount(),
                ];
            }
        }

        return [
            ...parent::share($request),
            'auth' => $auth,
            'badgeCounts' => $badgeCounts,
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
                'info' => $request->session()->get('info'),
                'warning' => $request->session()->get('warning'),
            ],
        ];
    }
}
