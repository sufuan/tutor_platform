<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\Tutor;
use App\Models\TutorJobRequest;
use App\Models\Location;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function home()
    {
        $featuredTutors = Tutor::with(['location', 'user'])
            ->where('verification_status', 'verified')
            ->where('profile_completion_percentage', '>=', 80)
            ->latest()
            ->take(6)
            ->get();

        $recentJobs = Job::with(['location', 'guardian'])
            ->where('approval_status', 'approved')
            ->where('status', 'open')
            ->latest()
            ->take(6)
            ->get();

        $stats = [
            'totalTutors' => Tutor::where('verification_status', 'verified')->count(),
            'totalJobs' => Job::where('approval_status', 'approved')->where('status', 'open')->count(),
            'totalGuardians' => \App\Models\Guardian::count(),
        ];

        return Inertia::render('Welcome', [
            'featuredTutors' => $featuredTutors,
            'recentJobs' => $recentJobs,
            'stats' => $stats,
        ]);
    }

    public function jobs(Request $request)
    {
        // Get guardian job posts
        $guardianJobs = Job::with(['location', 'guardian'])
            ->where('approval_status', 'approved')
            ->where('status', 'open');

        if ($request->location) {
            $guardianJobs->where('location_id', $request->location);
        }

        if ($request->subject) {
            $guardianJobs->whereJsonContains('subjects', $request->subject);
        }

        if ($request->search) {
            $guardianJobs->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        $guardianJobs = $guardianJobs->get()->map(function ($job) {
            $job->job_type = 'guardian';
            return $job;
        });

        // Get approved tutor job requests
        $tutorJobs = TutorJobRequest::with(['tutor.user'])
            ->where('approval_status', 'approved')
            ->where('status', 'active');

        if ($request->subject) {
            $tutorJobs->whereJsonContains('subjects', $request->subject);
        }

        if ($request->search) {
            $tutorJobs->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        $tutorJobs = $tutorJobs->get()->map(function ($job) {
            $job->job_type = 'tutor';
            return $job;
        });

        // Merge and paginate
        $allJobs = $guardianJobs->concat($tutorJobs)->sortByDesc('created_at')->values();
        
        // Manual pagination
        $page = $request->get('page', 1);
        $perPage = 12;
        $jobs = new \Illuminate\Pagination\LengthAwarePaginator(
            $allJobs->forPage($page, $perPage),
            $allJobs->count(),
            $perPage,
            $page,
            ['path' => $request->url(), 'query' => $request->query()]
        );

        return Inertia::render('Public/Jobs', [
            'jobs' => $jobs,
            'locations' => Location::orderBy('city')->get(),
            'subjects' => Subject::orderBy('name')->get(),
            'filters' => $request->only(['location', 'subject', 'search']),
        ]);
    }

    public function jobShow(Job $job)
    {
        $job->load(['location', 'guardian', 'student']);

        return Inertia::render('Public/JobDetails', [
            'job' => $job,
        ]);
    }

    public function tutorJobShow(TutorJobRequest $jobRequest)
    {
        $jobRequest->load(['tutor.user']);

        // Increment views
        $jobRequest->increment('views');

        return Inertia::render('Public/TutorJobDetails', [
            'job' => $jobRequest,
        ]);
    }

    public function tutors(Request $request)
    {
        $query = Tutor::with(['location', 'user'])
            ->where('verification_status', 'verified');

        if ($request->location) {
            $query->where('location_id', $request->location);
        }

        if ($request->subject) {
            $query->whereJsonContains('subjects', $request->subject);
        }

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('first_name', 'like', '%' . $request->search . '%')
                  ->orWhere('last_name', 'like', '%' . $request->search . '%')
                  ->orWhere('bio', 'like', '%' . $request->search . '%');
            });
        }

        $tutors = $query->latest()->paginate(12);

        return Inertia::render('Public/Tutors', [
            'tutors' => $tutors,
            'locations' => Location::orderBy('city')->get(),
            'subjects' => Subject::orderBy('name')->get(),
            'filters' => $request->only(['location', 'subject', 'search']),
        ]);
    }

    public function tutorShow(Tutor $tutor)
    {
        $tutor->load(['location', 'user']);
        
        // Get subject names for the subject IDs
        $subjectIds = $tutor->subjects ?? [];
        $subjectNames = [];
        if (is_array($subjectIds) && count($subjectIds) > 0) {
            $subjectNames = Subject::whereIn('id', $subjectIds)->pluck('name')->toArray();
        }

        return Inertia::render('Public/TutorProfile', [
            'tutor' => $tutor,
            'subjectNames' => $subjectNames,
        ]);
    }
}
