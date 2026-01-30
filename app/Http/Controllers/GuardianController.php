<?php

namespace App\Http\Controllers;

use App\Models\Guardian;
use App\Models\Job;
use App\Models\Student;
use App\Models\Application;
use App\Models\Booking;
use App\Models\Location;
use App\Models\Subject;
use App\Models\GuardianFeedback;
use App\Models\GuardianRecommendation;
use App\Models\User;
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
            return back()->with('error', 'Please complete your profile before posting a job.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'subjects' => 'required|array|min:1',
            'subjects.*' => 'exists:subjects,id',
            'class_level' => 'required|string',
            'education_medium' => 'required|in:bangla,english,english_version',
            'tuition_type' => 'required|in:home,online,group',
            'sessions_per_week' => 'required|array|min:1',
            'sessions_per_week.*' => 'in:Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday',
            'session_duration' => 'required|integer|min:30|max:180',
            'salary' => 'required|numeric|min:0',
            'division' => 'required|string|max:255',
            'district' => 'required|string|max:255',
            'preferred_location' => 'nullable|string|max:500',
            'tutor_gender_preference' => 'nullable|in:any,male,female',
        ]);

        $validated['guardian_id'] = $guardian->id;
        $validated['job_code'] = 'JOB-' . strtoupper(uniqid());
        $validated['approval_status'] = 'pending';
        $validated['status'] = 'open';
        $validated['days_per_week'] = count($validated['sessions_per_week']); // Store count for backward compatibility
        $validated['duration_per_session'] = $validated['session_duration'];
        $validated['preferred_tutor_gender'] = $validated['tutor_gender_preference'] ?? 'any';
        $validated['detailed_address'] = '';

        unset($validated['session_duration'], $validated['tutor_gender_preference']);

        try {
            $job = Job::create($validated);

            return redirect()->route('guardian.jobs.index')
                ->with('success', 'Job posted successfully and is pending admin approval.');
        } catch (\Exception $e) {
            return back()->withInput()->with('error', 'Error creating job: ' . $e->getMessage());
        }
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
        // Ensure guardian exists
        $guardian = auth()->user()->guardian;

        if (!$guardian) {
            \Log::error('Guardian not found for user', [
                'user_id' => auth()->id(),
                'user_email' => auth()->user()->email,
                'user_role' => auth()->user()->role,
            ]);

            return redirect()->route('guardian.jobs.index')
                ->with('error', 'Guardian profile not found. Please contact support.');
        }

        // Check if this job belongs to the guardian (use loose comparison to handle type differences)
        if ($job->guardian_id != $guardian->id) {
            \Log::warning('Unauthorized job access attempt', [
                'user_id' => auth()->id(),
                'guardian_id' => $guardian->id,
                'job_id' => $job->id,
                'job_guardian_id' => $job->guardian_id,
            ]);

            abort(403, 'This action is unauthorized.');
        }

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

    public function recommendHire(Application $application)
    {
        $this->authorize('manage', $application->job);

        // Check if recommendation already exists
        $existingRecommendation = GuardianRecommendation::where('application_id', $application->id)
            ->where('guardian_id', auth()->user()->guardian->id)
            ->first();

        if ($existingRecommendation) {
            return back()->with('info', 'You have already submitted a recommendation for this tutor.');
        }

        // Create recommendation
        GuardianRecommendation::create([
            'application_id' => $application->id,
            'guardian_id' => auth()->user()->guardian->id,
            'job_id' => $application->job_id,
            'tutor_id' => $application->tutor_id,
            'recommendation_type' => 'hire',
            'message' => 'Guardian recommends hiring this tutor for job: ' . $application->job->title,
        ]);

        // Notify all admin users
        $admins = User::where('role', 'admin')->get();
        foreach ($admins as $admin) {
            $admin->notify(new \App\Notifications\GuardianRecommendation($application, 'hire'));
        }

        return back()->with('success', 'Your recommendation has been sent to the admin for review.');
    }

    public function recommendReject(Application $application)
    {
        $this->authorize('manage', $application->job);

        // Check if recommendation already exists
        $existingRecommendation = GuardianRecommendation::where('application_id', $application->id)
            ->where('guardian_id', auth()->user()->guardian->id)
            ->first();

        if ($existingRecommendation) {
            return back()->with('info', 'You have already submitted a recommendation for this tutor.');
        }

        // Create recommendation
        GuardianRecommendation::create([
            'application_id' => $application->id,
            'guardian_id' => auth()->user()->guardian->id,
            'job_id' => $application->job_id,
            'tutor_id' => $application->tutor_id,
            'recommendation_type' => 'reject',
            'message' => 'Guardian is not interested in this tutor for job: ' . $application->job->title,
        ]);

        // Notify all admin users
        $admins = User::where('role', 'admin')->get();
        foreach ($admins as $admin) {
            $admin->notify(new \App\Notifications\GuardianRecommendation($application, 'reject'));
        }

        return back()->with('info', 'Your feedback has been sent to the admin.');
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
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'division' => 'required|string|max:255',
            'district' => 'required|string|max:255',
            'detailed_address' => 'required|string',
            'preferred_subjects' => 'required|array',
            'preferred_class_levels' => 'required|array',
        ]);

        // Update user's name
        auth()->user()->update(['name' => $validated['name']]);

        // Store name in first_name field for backwards compatibility
        $guardianData = $validated;
        $guardianData['first_name'] = $validated['name'];
        unset($guardianData['name']);

        $guardian->update($guardianData);

        // Update profile completion status
        $guardian->updateProfileCompletion();

        return redirect()->route('guardian.dashboard')->with('success', 'Profile completed successfully!');
    }

    public function feedbackCreate()
    {
        return Inertia::render('Guardian/FeedbackCreate');
    }

    public function feedbackStore(Request $request)
    {
        $validated = $request->validate([
            'feedback' => 'required|string|max:1000',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        GuardianFeedback::create([
            'guardian_id' => auth()->id(),
            'feedback' => $validated['feedback'],
            'rating' => $validated['rating'],
            'status' => 'pending',
        ]);

        return redirect()->back()->with('success', 'Feedback submitted successfully! It will be visible after admin approval.');
    }
}