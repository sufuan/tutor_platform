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
                    'tutorJobRequests' => \App\Services\BadgeCountService::getTutorJobRequestsCount(),
                    'jobApplications' => \App\Services\BadgeCountService::getJobApplicationsCount(),
                    'totalBlogs' => \App\Services\BadgeCountService::getTotalBlogsCount(),
                    'unreadContactMessages' => \App\Services\BadgeCountService::getUnreadContactMessagesCount(),
                    'pendingGuardianFeedbacks' => \App\Services\BadgeCountService::getPendingGuardianFeedbacksCount(),
                    'pendingTutorFeedbacks' => \App\Services\BadgeCountService::getPendingTutorFeedbacksCount(),
                ];
            }
        }

        return [
            ...parent::share($request),
            'auth' => $auth,
            'badgeCounts' => $badgeCounts,
            'csrf_token' => csrf_token(),
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
                'info' => $request->session()->get('info'),
                'warning' => $request->session()->get('warning'),
            ],
            'footerSettings' => [
                'contact_title' => \App\Models\SiteSetting::get('contact_title', 'Contact Us'),
                'contact_description' => \App\Models\SiteSetting::get('contact_description', 'Have any questions or need a tutor? We are here to help!'),
                'contact_address' => \App\Models\SiteSetting::get('contact_address', 'Salmanpur, Kotbari, Comilla, Bangladesh'),
                'contact_phone' => \App\Models\SiteSetting::get('contact_phone', '+880 1818 420012'),
                'contact_email' => \App\Models\SiteSetting::get('contact_email', 'tuitionbarta@gmail.com'),
                'contact_hours' => \App\Models\SiteSetting::get('contact_hours', 'Sat - Thu, 10:00 AM - 8:00 PM'),
                'social_facebook' => \App\Models\SiteSetting::get('social_facebook', 'https://facebook.com/tuitionbarta'),
                'social_linkedin' => \App\Models\SiteSetting::get('social_linkedin', 'https://linkedin.com/company/tuitionbarta'),
                'social_twitter' => \App\Models\SiteSetting::get('social_twitter', 'https://x.com/tuitionbarta'),
                'social_youtube' => \App\Models\SiteSetting::get('social_youtube', 'https://youtube.com/@tuitionbarta'),
                'social_whatsapp' => \App\Models\SiteSetting::get('social_whatsapp', 'https://wa.me/8801818420012'),
            ],
        ];
    }
}
