<?php

namespace App\Http\Controllers;

use App\Models\Guardian;
use App\Models\Job;
use App\Models\Student;
use App\Models\Application;
use App\Models\Booking;
use App\Models\Location;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class GuardianController extends Controller
{
    public function dashboard()
    {
        $guardian = auth()->user()->guardian;

        if (!$guardian) {
            // Create guardian profile if it doesn't exist
            $guardian = Guardian::create([
                'user_id' => auth()->id(),
                'guardian_code' => '',
            ]);
        }

        $stats = [
            'totalJobs' => $guardian->jobs()->count(),
            'activeJobs' => $guardian->jobs()->where('status', 'open')->count(),
            'applicationsReceived' => Application::whereHas('job', function ($q) use ($guardian) {
                $q->where('guardian_id', $guardian->id);
            })->count(),
            'hiredTutors' => Booking::whereHas('application.job', function ($q) use ($guardian) {
                $q->where('guardian_id', $guardian->id);
            })->where('status', 'active')->count(),
        ];

        $recentApplications = Application::with(['tutor.user', 'job'])
            ->whereHas('job', function ($q) use ($guardian) {
                $q->where('guardian_id', $guardian->id);
            })
            ->latest()
            ->take(5)
            ->get();

        $profileComplete = $guardian->profile_completion_status === 'completed';
        $profilePercentage = $guardian->profile_completion_percentage;

        return Inertia::render('Guardian/Dashboard', [
            'stats' => $stats,
            'recentApplications' => $recentApplications,
            'profileComplete' => $profileComplete,
            'profilePercentage' => $profilePercentage,
        ]);
    }

    public function jobsIndex()
    {
        $guardian = auth()->user()->guardian;

        if (!$guardian) {
            $guardian = Guardian::create([
                'user_id' => auth()->id(),
                'guardian_code' => '',
            ]);
        }

        $jobs = Job::with(['location', 'student'])
            ->where('guardian_id', $guardian->id)
            ->withCount('applications')
            ->latest()
            ->get();

        $stats = [
            'total' => $jobs->count(),
            'pending' => $jobs->where('approval_status', 'pending')->count(),
            'approved' => $jobs->where('approval_status', 'approved')->where('status', 'open')->count(),
            'filled' => $jobs->where('status', 'filled')->count(),
        ];

        return Inertia::render('Guardian/MyJobs', [
            'jobs' => $jobs,
            'stats' => $stats,
        ]);
    }

    public function jobsCreate()
    {
        $guardian = auth()->user()->guardian;

        if (!$guardian) {
            $guardian = Guardian::create([
                'user_id' => auth()->id(),
                'guardian_code' => '',
            ]);
        }

        // Check if profile is complete
        if ($guardian->profile_completion_status !== 'completed') {
            return redirect()->route('guardian.profile.complete')
                ->with('error', 'Please complete your profile before posting a job.');
        }

        $students = $guardian->students ?? [];
        $locations = Location::orderBy('city')->get();
        $subjects = Subject::orderBy('name')->get();
        $categories = \App\Models\Category::orderBy('name')->get();

        return Inertia::render('Guardian/PostJob', [
            'students' => $students,
            'locations' => $locations,
            'subjects' => $subjects,
            'categories' => $categories,
        ]);
    }

    public function jobsStore(Request $request)
    {
        $guardian = auth()->user()->guardian;

        if (!$guardian) {
            $guardian = Guardian::create([
                'user_id' => auth()->id(),
                'guardian_code' => '',
            ]);
        }

        // Check if profile is complete
        if ($guardian->profile_completion_status !== 'completed') {
            return redirect()->route('guardian.profile.complete')
                ->with('error', 'Please complete your profile before posting a job.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'subjects' => 'required|array|min:1',
            'subjects.*' => 'exists:subjects,id',
            'class_level' => 'required|string',
            'education_medium' => 'required|in:bangla,english,english_version',
            'tuition_type' => 'required|in:home,online,group',
            'sessions_per_week' => 'required|integer|min:1|max:7',
            'session_duration' => 'required|integer|min:30|max:180',
            'salary' => 'required|numeric|min:0',
            'division' => 'required|string|max:255',
            'district' => 'required|string|max:255',
            'tutor_gender_preference' => 'nullable|in:any,male,female',
        ]);

        $validated['guardian_id'] = $guardian->id;
        $validated['job_code'] = 'JOB-' . strtoupper(uniqid());
        $validated['approval_status'] = 'pending';
        $validated['status'] = 'open';
        $validated['days_per_week'] = $validated['sessions_per_week'];
        $validated['duration_per_session'] = $validated['session_duration'];
        $validated['preferred_tutor_gender'] = $validated['tutor_gender_preference'] ?? 'any';
        $validated['detailed_address'] = '';
        
        unset($validated['sessions_per_week'], $validated['session_duration'], $validated['tutor_gender_preference']);

        $job = Job::create($validated);

        return redirect()->route('guardian.jobs.index')
            ->with('success', 'Job posted successfully and is pending admin approval.');
    }

    public function jobsShow(Job $job)
    {
        $this->authorize('view', $job);

        $job->load(['location', 'student', 'guardian']);

        return Inertia::render('Guardian/JobDetail', [
            'job' => $job,
        ]);
    }

    public function jobsDestroy(Job $job)
    {
        $this->authorize('delete', $job);

        if ($job->approval_status !== 'pending') {
            return back()->with('error', 'Only pending jobs can be deleted.');
        }

        $job->delete();

        return redirect()->route('guardian.jobs.index')
            ->with('success', 'Job deleted successfully.');
    }

    public function jobApplications(Job $job)
    {
        $this->authorize('view', $job);

        $applications = Application::with(['tutor.user', 'tutor.location'])
            ->where('job_id', $job->id)
            ->latest()
            ->get();

        return Inertia::render('Guardian/JobApplications', [
            'job' => $job,
            'applications' => $applications,
        ]);
    }

    public function applicationShortlist(Application $application)
    {
        $this->authorize('manage', $application->job);

        $application->update([
            'status' => 'shortlisted',
            'shortlisted_at' => now(),
            'status_updated_at' => now(),
        ]);

        return back()->with('success', 'Application shortlisted successfully.');
    }

    public function applicationHire(Application $application)
    {
        $this->authorize('manage', $application->job);

        DB::beginTransaction();
        try {
            // Update application
            $application->update([
                'status' => 'accepted',
                'status_updated_at' => now(),
            ]);

            // Create booking
            Booking::create([
                'job_id' => $application->job_id,
                'tutor_id' => $application->tutor_id,
                'guardian_id' => $application->job->guardian_id,
                'application_id' => $application->id,
                'status' => 'active',
                'start_date' => now(),
            ]);

            // Update job status
            $application->job->update([
                'status' => 'filled',
                'filled_at' => now(),
            ]);

            // Reject other applications
            Application::where('job_id', $application->job_id)
                ->where('id', '!=', $application->id)
                ->update([
                    'status' => 'rejected',
                    'status_updated_at' => now(),
                ]);

            DB::commit();

            return back()->with('success', 'Tutor hired successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Failed to hire tutor. Please try again.');
        }
    }

    public function applicationReject(Application $application)
    {
        $this->authorize('manage', $application->job);

        $application->update([
            'status' => 'rejected',
            'status_updated_at' => now(),
        ]);

        return back()->with('success', 'Application rejected.');
    }

    public function profileComplete()
    {
        $guardian = auth()->user()->guardian;

        if (!$guardian) {
            $guardian = Guardian::create([
                'user_id' => auth()->id(),
                'guardian_code' => '',
            ]);
        }

        $locations = Location::orderBy('city')->get();
        $subjects = Subject::orderBy('name')->get();

        return Inertia::render('Guardian/ProfileComplete', [
            'guardian' => $guardian,
            'locations' => $locations,
            'subjects' => $subjects,
        ]);
    }

    public function profileCompleteStore(Request $request)
    {
        $guardian = auth()->user()->guardian;

        if (!$guardian) {
            $guardian = Guardian::create([
                'user_id' => auth()->id(),
                'guardian_code' => '',
            ]);
        }

        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'division' => 'required|string|max:255',
            'district' => 'required|string|max:255',
            'detailed_address' => 'nullable|string',
            'preferred_subjects' => 'nullable|array',
            'preferred_class_levels' => 'nullable|array',
        ]);

        $guardian->update($validated);

        // Update profile completion status
        $guardian->updateProfileCompletion();

        return redirect()->route('guardian.dashboard')->with('success', 'Profile completed successfully!');
    }}