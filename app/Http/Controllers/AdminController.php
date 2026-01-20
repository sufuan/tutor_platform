<?php

namespace App\Http\Controllers;

use App\Models\Tutor;
use App\Models\Job;
use App\Models\Guardian;
use App\Models\User;
use App\Models\TutorJobRequest;
use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        $stats = [
            'totalUsers' => User::count(),
            'totalTutors' => Tutor::count(),
            'totalGuardians' => Guardian::count(),
            'pendingVerifications' => Tutor::where('verification_status', 'pending')->count(),
            'pendingJobs' => Job::where('approval_status', 'pending')->count(),
            'activeJobs' => Job::where('approval_status', 'approved')->where('status', 'open')->count(),
            'verifiedTutors' => Tutor::where('verification_status', 'verified')->count(),
            'totalBookings' => 0, // TODO: Implement booking count
            'totalRevenue' => 0, // TODO: Implement revenue calculation
            'newUsersThisWeek' => User::where('created_at', '>=', now()->subWeek())->count(),
            'newBookingsThisMonth' => 0, // TODO: Implement monthly bookings
            'revenueGrowth' => 0, // TODO: Implement revenue growth calculation
            'todaySignups' => User::whereDate('created_at', today())->count(),
            'weekJobs' => Job::where('created_at', '>=', now()->subWeek())->count(),
            'monthRevenue' => 0, // TODO: Implement monthly revenue
        ];

        $recentTutors = Tutor::with(['user', 'location'])
            ->where('verification_status', 'pending')
            ->latest()
            ->take(5)
            ->get();

        $recentJobs = Job::with(['guardian', 'location'])
            ->where('approval_status', 'pending')
            ->latest()
            ->take(5)
            ->get();

        // Get all tutors and guardians for lists
        $tutorsList = Tutor::with(['user', 'location'])
            ->latest()
            ->get();

        $guardiansList = Guardian::with(['user', 'location'])
            ->latest()
            ->get();

        // Chart data for user registrations over the last 7 days
        $chartData = collect(range(6, 0))->map(function ($daysAgo) {
            $date = now()->subDays($daysAgo);
            return [
                'date' => $date->format('M d'),
                'users' => User::whereDate('created_at', $date->toDateString())->count(),
                'tutors' => Tutor::whereDate('created_at', $date->toDateString())->count(),
                'guardians' => Guardian::whereDate('created_at', $date->toDateString())->count(),
            ];
        });

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'chartData' => $chartData,
            'pendingVerifications' => $recentTutors,
            'pendingJobs' => $recentJobs,
            'tutorsList' => $tutorsList,
            'guardiansList' => $guardiansList,
        ]);
    }

    public function tutorsList()
    {
        $tutors = Tutor::with(['user', 'location'])
            ->latest()
            ->get();

        $stats = [
            'total' => $tutors->count(),
            'verified' => $tutors->where('verification_status', 'verified')->count(),
            'pending' => $tutors->where('verification_status', 'pending')->count(),
            'rejected' => $tutors->where('verification_status', 'rejected')->count(),
        ];

        return Inertia::render('Admin/TutorsList', [
            'tutors' => $tutors,
            'stats' => $stats,
        ]);
    }

    public function guardiansList()
    {
        $guardians = Guardian::with(['user', 'location'])
            ->withCount('jobs')
            ->latest()
            ->get();

        $stats = [
            'total' => $guardians->count(),
            'activeJobs' => Job::where('approval_status', 'approved')->where('status', 'open')->count(),
            'totalJobs' => Job::count(),
        ];

        return Inertia::render('Admin/GuardiansList', [
            'guardians' => $guardians,
            'stats' => $stats,
        ]);
    }

    public function tutorVerifications()
    {
        $tutors = Tutor::with(['user', 'location'])
            ->latest()
            ->get();

        // Load subject names for each tutor
        $tutors->each(function ($tutor) {
            if ($tutor->subjects && is_array($tutor->subjects)) {
                $subjectIds = array_map('intval', $tutor->subjects);
                $tutor->subject_names = \App\Models\Subject::whereIn('id', $subjectIds)->pluck('name')->toArray();
            } else {
                $tutor->subject_names = [];
            }
        });

        $stats = [
            'pending' => $tutors->where('verification_status', 'pending')->count(),
            'verified' => $tutors->where('verification_status', 'verified')->count(),
            'rejected' => $tutors->where('verification_status', 'rejected')->count(),
        ];

        return Inertia::render('Admin/TutorVerifications', [
            'tutors' => $tutors,
            'stats' => $stats,
        ]);
    }

    public function verifyTutor(Request $request, Tutor $tutor)
    {
        $tutor->update([
            'verification_status' => 'verified',
            'verified_at' => now(),
            'verified_by' => auth()->id(),
            'verification_notes' => $request->notes,
        ]);

        // Send notification to tutor
        $tutor->user->notify(new \App\Notifications\TutorVerified());

        return back()->with('success', 'Tutor verified successfully.');
    }

    public function rejectTutor(Request $request, Tutor $tutor)
    {
        $request->validate([
            'notes' => 'required|string',
        ]);

        $tutor->update([
            'verification_status' => 'rejected',
            'verification_notes' => $request->notes,
        ]);

        // Send notification to tutor
        $tutor->user->notify(new \App\Notifications\TutorRejected($request->notes));

        return back()->with('success', 'Tutor rejected.');
    }

    public function viewTutor(Tutor $tutor)
    {
        $tutor->load(['user', 'location']);
        
        // Load subject names
        $subjectNames = [];
        if ($tutor->subjects && is_array($tutor->subjects)) {
            $subjectIds = array_map('intval', $tutor->subjects);
            $subjectNames = \App\Models\Subject::whereIn('id', $subjectIds)->pluck('name')->toArray();
        }

        return Inertia::render('Admin/TutorProfile', [
            'tutor' => $tutor,
            'subjectNames' => $subjectNames,
        ]);
    }

    public function jobApprovals()
    {
        // Get guardian job posts
        $guardianJobs = Job::with(['guardian', 'location', 'student'])
            ->withCount('applications')
            ->latest()
            ->get()
            ->map(function ($job) {
                $job->job_type = 'guardian';
                return $job;
            });

        // Get tutor job requests
        $tutorJobRequests = TutorJobRequest::with(['tutor.user'])
            ->latest()
            ->get()
            ->map(function ($job) {
                $job->job_type = 'tutor';
                return $job;
            });

        // Merge both collections
        $jobs = $guardianJobs->concat($tutorJobRequests)->sortByDesc('created_at')->values();

        $stats = [
            'pending' => $jobs->where('approval_status', 'pending')->count(),
            'approved' => $jobs->where('approval_status', 'approved')->count(),
            'rejected' => $jobs->where('approval_status', 'rejected')->count(),
        ];

        return Inertia::render('Admin/JobApprovals', [
            'jobs' => $jobs,
            'stats' => $stats,
        ]);
    }

    public function viewJob(Job $job)
    {
        $job->load(['guardian.user', 'location', 'student']);
        
        return Inertia::render('Admin/JobDetail', [
            'job' => $job,
            'jobType' => 'guardian',
        ]);
    }

    public function approveJob(Job $job)
    {
        $job->update([
            'approval_status' => 'approved',
            'approved_by' => auth()->id(),
            'approved_at' => now(),
        ]);

        // Send notification to guardian
        $job->guardian->user->notify(new \App\Notifications\JobApproved($job));

        return back()->with('success', 'Job approved successfully.');
    }

    public function rejectJob(Request $request, Job $job)
    {
        $request->validate([
            'rejection_reason' => 'required|string',
        ]);

        $job->update([
            'approval_status' => 'rejected',
            'rejection_reason' => $request->rejection_reason,
        ]);

        // Send notification to guardian
        $job->guardian->user->notify(new \App\Notifications\JobRejected($job, $request->rejection_reason));

        return back()->with('success', 'Job rejected.');
    }

    public function tutorJobRequests()
    {
        $jobRequests = TutorJobRequest::with(['tutor.user'])
            ->latest()
            ->get();

        $stats = [
            'pending' => $jobRequests->where('approval_status', 'pending')->count(),
            'approved' => $jobRequests->where('approval_status', 'approved')->count(),
            'rejected' => $jobRequests->where('approval_status', 'rejected')->count(),
        ];

        return Inertia::render('Admin/TutorJobRequests', [
            'jobRequests' => $jobRequests,
            'stats' => $stats,
        ]);
    }

    public function viewTutorJobRequest(TutorJobRequest $jobRequest)
    {
        $jobRequest->load(['tutor.user']);
        
        // Load subject names
        $subjectNames = [];
        if ($jobRequest->subjects && is_array($jobRequest->subjects)) {
            $subjectIds = array_map('intval', $jobRequest->subjects);
            $subjectNames = \App\Models\Subject::whereIn('id', $subjectIds)->pluck('name')->toArray();
        }
        
        $jobRequest->subject_names = $subjectNames;
        
        return Inertia::render('Admin/JobDetail', [
            'job' => $jobRequest,
            'jobType' => 'tutor',
        ]);
    }

    public function approveTutorJobRequest(TutorJobRequest $jobRequest)
    {
        $jobRequest->update([
            'approval_status' => 'approved',
            'status' => 'active',
            'approved_by' => auth()->id(),
            'approved_at' => now(),
        ]);

        return back()->with('success', 'Job request approved successfully.');
    }

    public function rejectTutorJobRequest(Request $request, TutorJobRequest $jobRequest)
    {
        $request->validate([
            'rejection_reason' => 'required|string',
        ]);

        $jobRequest->update([
            'approval_status' => 'rejected',
            'status' => 'inactive',
            'rejection_reason' => $request->rejection_reason,
        ]);

        return back()->with('success', 'Job request rejected.');
    }

    public function jobApplications()
    {
        $applications = Application::with(['tutor.user', 'job.guardian.user'])
            ->latest()
            ->get();

        $stats = [
            'total' => $applications->count(),
            'pending' => $applications->where('status', 'pending')->count(),
            'shortlisted' => $applications->where('status', 'shortlisted')->count(),
            'accepted' => $applications->where('status', 'accepted')->count(),
            'rejected' => $applications->where('status', 'rejected')->count(),
        ];

        return Inertia::render('Admin/JobApplications', [
            'applications' => $applications,
            'stats' => $stats,
        ]);
    }

    public function updateApplicationStatus(Request $request, Application $application)
    {
        $request->validate([
            'status' => 'required|in:pending,shortlisted,accepted,rejected',
        ]);

        $application->update([
            'status' => $request->status,
        ]);

        return back()->with('success', 'Application status updated successfully.');
    }
}
