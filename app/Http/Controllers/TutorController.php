<?php

namespace App\Http\Controllers;

use App\Models\Tutor;
use App\Models\Job;
use App\Models\Application;
use App\Models\Location;
use App\Models\Subject;
use App\Models\TutorJobRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TutorController extends Controller
{
    public function profile()
    {
        $tutor = auth()->user()->tutor->load(['location', 'user']);
        $subjects = Subject::with('category')->orderBy('name')->get();
        $locations = Location::orderBy('city')->get();
        
        return Inertia::render('Tutor/Profile', [
            'tutor' => $tutor,
            'subjects' => $subjects,
            'locations' => $locations,
        ]);
    }

    public function profileUpdate(Request $request)
    {
        $tutor = auth()->user()->tutor;

        try {
            \Log::info('Profile update request', [
                'tutor_id' => $tutor->id,
                'request_data' => $request->except(['photo', 'cv_path']),
                'has_photo' => $request->hasFile('photo'),
                'has_cv' => $request->hasFile('cv_path'),
            ]);

            $validated = $request->validate([
                'name' => 'nullable|string|max:255',
                'phone' => 'nullable|string|max:20',
                'gender' => 'required|in:male,female,other',
                'address' => 'nullable|string|max:500',
                'institution' => 'nullable|string|max:255',
                'education_level' => 'nullable|string|max:50',
                'subjects' => 'nullable',
                'experience_years' => 'nullable|integer|min:0',
                'experience_details' => 'nullable|string|max:1000',
                'hourly_rate' => 'nullable|numeric|min:0',
                'bio' => 'nullable|string|max:1000',
                'location_id' => 'nullable|exists:locations,id',
                'photo' => 'nullable|image|max:2048',
                'available_days' => 'nullable|string|max:255',
                'available_time_from' => 'nullable|string|max:10',
                'available_time_to' => 'nullable|string|max:10',
                'preferred_locations' => 'nullable|string|max:500',
                'tutoring_styles' => 'nullable|string|max:255',
                'tutoring_method' => 'nullable|string|max:255',
                'preferred_categories' => 'nullable|array',
                'preferred_classes' => 'nullable|array',
                'place_of_tutoring' => 'nullable|string|max:255',
                'division' => 'nullable|string|max:255',
                'district' => 'nullable|string|max:255',
                'cv_path' => 'nullable|file|mimes:pdf|max:5120',
            ]);

            // Update user's name if provided
            if (isset($validated['name'])) {
                $tutor->user->update(['name' => $validated['name']]);
                unset($validated['name']); // Remove from tutor update
            }
            
            // Remove file fields from validated data initially
            unset($validated['photo'], $validated['cv_path']);
            
            // Handle photo upload
            if ($request->hasFile('photo')) {
                $path = $request->file('photo')->store('tutors', 'public');
                $validated['photo'] = $path;
            }

            // Handle CV upload
            if ($request->hasFile('cv_path')) {
                $path = $request->file('cv_path')->store('tutors/cvs', 'public');
                $validated['cv_path'] = $path;
            }
            
            // Ensure subjects is an array, even if empty (model cast will handle JSON encoding)
            if (!isset($validated['subjects'])) {
                $validated['subjects'] = [];
            } elseif (is_string($validated['subjects'])) {
                // If subjects comes as JSON string, convert to array
                $validated['subjects'] = json_decode($validated['subjects'], true) ?? [];
            }
            
            // Remove duplicate subject IDs and ensure they're unique
            if (is_array($validated['subjects'])) {
                $validated['subjects'] = array_values(array_unique($validated['subjects']));
            }
            
            // Note: Don't manually json_encode subjects - the model cast handles it
            
            // Ensure other array fields are arrays (model casts will handle JSON encoding)
            if (!isset($validated['preferred_categories'])) {
                $validated['preferred_categories'] = [];
            } elseif (is_string($validated['preferred_categories'])) {
                $validated['preferred_categories'] = json_decode($validated['preferred_categories'], true) ?? [];
            }
            
            if (!isset($validated['preferred_classes'])) {
                $validated['preferred_classes'] = [];
            } elseif (is_string($validated['preferred_classes'])) {
                $validated['preferred_classes'] = json_decode($validated['preferred_classes'], true) ?? [];
            }

            \Log::info('Updating tutor profile', ['tutor_id' => $tutor->id, 'data' => $validated]);
            
            $tutor->update($validated);

            // Refresh tutor to get updated values
            $tutor->refresh();

            \Log::info('Tutor profile updated', ['tutor' => $tutor->toArray()]);

            // Calculate profile completion percentage based on 4 tabs
            $tuitionFields = ['hourly_rate', 'location_id', 'available_days', 'available_time_from', 'available_time_to', 'tutoring_method', 'place_of_tutoring'];
            $educationFields = ['institution', 'education_level', 'subjects'];
            $personalFields = ['phone', 'gender', 'address', 'bio', 'experience_years', 'experience_details', 'photo'];
            $credentialFields = ['cv_path'];
            
            $tuitionComplete = collect($tuitionFields)->filter(fn($field) => !empty($tutor->$field))->count();
            $educationComplete = collect($educationFields)->filter(fn($field) => !empty($tutor->$field))->count();
            $personalComplete = collect($personalFields)->filter(fn($field) => !empty($tutor->$field))->count();
            $credentialComplete = collect($credentialFields)->filter(fn($field) => !empty($tutor->$field))->count();
            
            $tuitionPercent = (count($tuitionFields) > 0) ? ($tuitionComplete / count($tuitionFields)) * 25 : 0;
            $educationPercent = (count($educationFields) > 0) ? ($educationComplete / count($educationFields)) * 25 : 0;
            $personalPercent = (count($personalFields) > 0) ? ($personalComplete / count($personalFields)) * 25 : 0;
            $credentialPercent = (count($credentialFields) > 0) ? ($credentialComplete / count($credentialFields)) * 25 : 0;
            
            $totalCompletion = round($tuitionPercent + $educationPercent + $personalPercent + $credentialPercent);
            
            $tutor->update(['profile_completion_percentage' => $totalCompletion]);

            return redirect()->route('tutor.profile')
                ->with('success', 'Profile updated successfully!');

        } catch (\Exception $e) {
            \Log::error('Profile update failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return back()->withErrors(['error' => 'Failed to update profile: ' . $e->getMessage()]);
        }
    }

    public function dashboard()
    {
        $user = auth()->user();
        $tutor = $user->tutor;
        
        if (!$tutor) {
            \Log::error('User has no tutor record', ['user_id' => $user->id, 'email' => $user->email]);
            abort(403, 'No tutor profile found for this user.');
        }

        // Check if profile is at least 70% complete
        $profileCompletion = $tutor->profile_completion_percentage ?? 0;
        if ($profileCompletion < 70) {
            return redirect()->route('tutor.profile')
                ->with('warning', 'Please complete at least 70% of your profile to access the dashboard and other features.');
        }

        \Log::info('Tutor Dashboard Access', [
            'tutor_id' => $tutor->id,
            'tutor_code' => $tutor->tutor_code,
            'user_id' => $user->id,
            'user_email' => $user->email,
            'applications_count' => $tutor->applications()->count(),
            'applications_ids' => $tutor->applications()->pluck('id')->toArray(),
        ]);

        $stats = [
            'totalApplications' => $tutor->applications()->count(),
            'pendingApplications' => $tutor->applications()->where('status', 'pending')->count(),
            'shortlisted' => $tutor->applications()->where('status', 'shortlisted')->count(),
            'activeBookings' => $tutor->bookings()->where('status', 'active')->count(),
            'earningsThisMonth' => $tutor->bookings()
                ->where('status', 'active')
                ->whereMonth('created_at', now()->month)
                ->sum('total_amount') ?? 0,
        ];

        $recentApplications = $tutor->applications()
            ->with(['job.guardian', 'job.location'])
            ->latest()
            ->take(5)
            ->get();

        $availableJobs = Job::with(['location', 'guardian'])
            ->where('approval_status', 'approved')
            ->where('status', 'open')
            ->whereDoesntHave('applications', function ($q) use ($tutor) {
                $q->where('tutor_id', $tutor->id);
            })
            ->latest()
            ->take(6)
            ->get();

        $applicationUpdates = $tutor->applications()
            ->whereIn('status', ['shortlisted', 'accepted', 'rejected'])
            ->latest('status_updated_at')
            ->take(5)
            ->get();

        $earningsData = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $earningsData[] = [
                'date' => $date->format('M d'),
                'amount' => rand(0, 500) // Replace with actual earnings data
            ];
        }

        return Inertia::render('Tutor/Dashboard', [
            'stats' => $stats,
            'recentApplications' => $recentApplications,
            'recentJobs' => $availableJobs,
            'applicationUpdates' => $applicationUpdates,
            'earningsData' => $earningsData,
            'verificationStatus' => $tutor->verification_status,
        ]);
    }

    public function browseJobs(Request $request)
    {
        $tutor = auth()->user()->tutor;

        // Check if profile is at least 70% complete
        $profileCompletion = $tutor->profile_completion_percentage ?? 0;
        if ($profileCompletion < 70) {
            return redirect()->route('tutor.profile')
                ->with('warning', 'Please complete at least 70% of your profile to browse jobs.');
        }

        $query = Job::with(['location', 'guardian'])
            ->where('approval_status', 'approved')
            ->where('status', 'open');

        if ($request->location) {
            $query->where('location_id', $request->location);
        }

        if ($request->subject) {
            $query->whereJsonContains('subjects', $request->subject);
        }

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        $jobs = $query->latest()->get()->map(function ($job) use ($tutor) {
            $job->has_applied = $job->applications()->where('tutor_id', $tutor->id)->exists();
            return $job;
        });

        return Inertia::render('Tutor/BrowseJobs', [
            'jobs' => $jobs,
            'locations' => Location::orderBy('city')->get(),
            'subjects' => Subject::orderBy('name')->get(),
            'verificationStatus' => $tutor->verification_status,
            'tutorCv' => $tutor->cv_path,
        ]);
    }

    public function applyJob(Request $request, Job $job)
    {
        $tutor = auth()->user()->tutor;

        \Log::info('Job Application Attempt', [
            'tutor_id' => $tutor->id,
            'job_id' => $job->id,
            'verification_status' => $tutor->verification_status,
            'job_status' => $job->status,
            'job_approval' => $job->approval_status,
        ]);

        // Check if tutor is verified
        if ($tutor->verification_status !== 'verified') {
            \Log::warning('Application blocked - not verified', ['tutor_id' => $tutor->id]);
            return back()->with('error', 'You must be verified before applying to jobs. Please complete the verification process.');
        }

        // Check if already applied
        if ($job->applications()->where('tutor_id', $tutor->id)->exists()) {
            \Log::warning('Application blocked - already applied', ['tutor_id' => $tutor->id, 'job_id' => $job->id]);
            return back()->with('error', 'You have already applied for this job.');
        }

        // Check if job is still open
        if ($job->status !== 'open' || $job->approval_status !== 'approved') {
            \Log::warning('Application blocked - job not available', ['job_id' => $job->id, 'status' => $job->status, 'approval' => $job->approval_status]);
            return back()->with('error', 'This job is no longer available.');
        }

        $validated = $request->validate([
            'cover_letter' => 'required|string|min:50',
            'cv_path' => 'nullable|file|mimes:pdf|max:5120',
        ]);

        // Handle CV upload
        $cvPath = null;
        if ($request->hasFile('cv_path')) {
            $cvPath = $request->file('cv_path')->store('applications/cvs', 'public');
        } else {
            // Use tutor's existing CV if no new one uploaded
            $cvPath = $tutor->cv_path;
        }

        $application = Application::create([
            'job_id' => $job->id,
            'tutor_id' => $tutor->id,
            'cover_letter' => $validated['cover_letter'],
            'cv_path' => $cvPath,
            'status' => 'pending',
            'applied_at' => now(),
        ]);

        \Log::info('Application created successfully', [
            'application_id' => $application->id,
            'tutor_id' => $tutor->id,
            'job_id' => $job->id,
            'status' => $application->status,
        ]);

        return back()->with('success', 'Application submitted successfully!');
    }

    public function myApplications()
    {
        $tutor = auth()->user()->tutor;
        // Check if profile is at least 70% complete
        $profileCompletion = $tutor->profile_completion_percentage ?? 0;
        if ($profileCompletion < 70) {
            return redirect()->route('tutor.profile')
                ->with('warning', 'Please complete at least 70% of your profile to view applications.');
        }
        $applications = $tutor->applications()
            ->with(['job.guardian', 'job.location'])
            ->latest()
            ->get();

        $stats = [
            'total' => $applications->count(),
            'pending' => $applications->where('status', 'pending')->count(),
            'shortlisted' => $applications->where('status', 'shortlisted')->count(),
            'accepted' => $applications->where('status', 'accepted')->count(),
            'rejected' => $applications->where('status', 'rejected')->count(),
        ];

        return Inertia::render('Tutor/MyApplications', [
            'applications' => $applications,
            'stats' => $stats,
        ]);
    }

    public function verification()
    {
        $tutor = auth()->user()->tutor;

        return Inertia::render('Tutor/Verification', [
            'tutor' => $tutor,
            'verificationStatus' => $tutor->verification_status,
            'verificationNotes' => $tutor->verification_notes,
            'rejectionReason' => $tutor->verification_status === 'rejected' ? $tutor->verification_notes : null,
        ]);
    }

    public function submitVerification(Request $request)
    {
        $tutor = auth()->user()->tutor;

        $validated = $request->validate([
            'documents' => 'required|array',
            'documents.*' => 'required|file|mimes:pdf,jpg,jpeg,png|max:5120',
        ]);

        // Store documents and update verification status
        $tutor->update([
            'verification_status' => 'pending',
        ]);

        return redirect()->route('tutor.dashboard')
            ->with('success', 'Verification documents submitted successfully!');
    }

    public function jobShow(Job $job)
    {
        $tutor = auth()->user()->tutor;

        // Check if tutor is verified
        if ($tutor->verification_status !== 'verified') {
            return back()->with('error', 'You must be verified before viewing job details. Please complete the verification process.');
        }

        $job->load(['location', 'guardian']);

        return Inertia::render('Tutor/JobDetail', [
            'job' => $job,
            'auth' => [
                'user' => auth()->user(),
                'tutor' => $tutor,
            ],
        ]);
    }

    public function applicationShow(Application $application)
    {
        $this->authorize('view', $application);

        $application->load(['job.guardian', 'job.location']);

        return Inertia::render('Tutor/ApplicationDetail', [
            'application' => $application,
        ]);
    }

    public function createJobRequest()
    {
        $tutor = auth()->user()->tutor;
        $subjects = Subject::with('category')->orderBy('name')->get();
        
        // Education levels - hardcoded as there's no education_levels table
        $levels = [
            ['id' => 'primary', 'name' => 'Primary (Grade 1-5)'],
            ['id' => 'middle', 'name' => 'Middle (Grade 6-8)'],
            ['id' => 'secondary', 'name' => 'Secondary (Grade 9-10)'],
            ['id' => 'intermediate', 'name' => 'Intermediate (Grade 11-12)'],
            ['id' => 'undergraduate', 'name' => 'Undergraduate'],
            ['id' => 'graduate', 'name' => 'Graduate'],
        ];

        return Inertia::render('Tutor/CreateJobRequest', [
            'subjects' => $subjects,
            'levels' => $levels,
            'tutor' => $tutor,
        ]);
    }

    public function storeJobRequest(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|min:50',
            'subjects' => 'required|array|min:1',
            'subjects.*' => 'exists:subjects,id',
            'education_level' => 'required|string',
            'monthly_salary' => 'required|numeric|min:0',
            'available_days' => 'required|array|min:1',
            'available_days.*' => 'in:Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday',
            'division' => 'required|string|max:255',
            'district' => 'required|string|max:255',
            'teaching_mode' => 'required|in:online,in-person,hybrid',
        ]);

        $tutor = auth()->user()->tutor;

        // Automatically add tutor's gender as preferred gender
        $validated['preferred_gender'] = $tutor->gender;

        $jobRequest = $tutor->jobRequests()->create($validated);

        return redirect()->route('tutor.job-requests')
            ->with('success', 'Job request submitted! It will be reviewed by admin before being published.');
    }

    public function myJobRequests()
    {
        $tutor = auth()->user()->tutor;

        // Check if profile is at least 70% complete
        $profileCompletion = $tutor->profile_completion_percentage ?? 0;
        if ($profileCompletion < 70) {
            return redirect()->route('tutor.profile')
                ->with('warning', 'Please complete at least 70% of your profile to manage job requests.');
        }

        \Log::info('My Job Requests Page Access', [
            'tutor_id' => $tutor->id,
            'job_requests_count' => $tutor->jobRequests()->count(),
            'job_request_ids' => $tutor->jobRequests()->pluck('id')->toArray(),
        ]);

        $jobRequests = $tutor->jobRequests()
            ->with('tutor')
            ->latest()
            ->get();

        return Inertia::render('Tutor/MyJobRequests', [
            'jobRequests' => $jobRequests,
        ]);
    }

    public function viewJobRequest(TutorJobRequest $jobRequest)
    {
        // Increment view count
        $jobRequest->increment('views');
        
        return response()->json(['success' => true, 'views' => $jobRequest->views]);
    }
}