<?php

namespace App\Http\Controllers;

use App\Models\Tutor;
use App\Models\Job;
use App\Models\Application;
use App\Models\Location;
use App\Models\Subject;
use App\Models\TutorJobRequest;
use App\Models\TutorFeedback;
use App\Services\ProfileCompletionService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TutorController extends Controller
{
    public function profile()
    {
        $tutor = auth()->user()->tutor->load(['location', 'user']);
        $subjects = Subject::with('category')->orderBy('name')->get();
        $locations = Location::orderBy('city')->get();
        
        // Add storage URLs for CV and photo
        $cvUrl = $tutor->cv_path ? \Storage::url($tutor->cv_path) : null;
        $photoUrl = $tutor->photo ? \Storage::url($tutor->photo) : null;
        
        return Inertia::render('Tutor/Profile', [
            'tutor' => $tutor,
            'subjects' => $subjects,
            'locations' => $locations,
            'cvUrl' => $cvUrl,
            'photoUrl' => $photoUrl,
        ]);
    }

    public function updateProfilePhoto(Request $request)
    {
        $tutor = auth()->user()->tutor;

        $validated = $request->validate([
            'photo' => 'required|image|max:2048',
        ]);

        if ($tutor->photo && 
            !str_starts_with($tutor->photo, 'http') &&
            
            
            
            \Storage::disk('public')->exists($tutor->photo)) {
            \Storage::disk('public')->delete($tutor->photo);
        }

        $path = $request->file('photo')->store('tutors', 'public');
        $tutor->update(['photo' => $path]);

        return redirect()->route('tutor.profile')
            ->with('success', 'Profile photo updated successfully!');
    }

    public function profileUpdate(Request $request)
    {
        $tutor = auth()->user()->tutor;

        try {
            \Log::info('Profile update request', [
                'tutor_id' => $tutor->id,
                'activeTab' => $request->input('activeTab'),
                'request_all' => $request->all(),
            ]);

            // Get the active tab to determine which fields should be required
            $activeTab = $request->input('activeTab', 'personal');
            
            \Log::info('Active tab for validation', ['activeTab' => $activeTab]);

            // Build validation rules ONLY for the active tab
            // This ensures complete independence - only validate fields for the tab being edited
            $rules = ['activeTab' => 'nullable|string|in:personal,education,tuition,credential'];

            // Default to personal if activeTab is not set or empty
            if (empty($activeTab)) {
                $activeTab = 'personal';
            }

            switch ($activeTab) {
                case 'education':
                    // Education Tab: institution and department are required, others are optional
                    $rules['institution'] = 'required|string|max:255';
                    $rules['education_level'] = 'nullable|string|max:50';
                    $rules['department'] = 'required|string|max:255';
                    $rules['cgpa'] = 'nullable|numeric|min:0|max:4';
                    $rules['subjects'] = 'nullable';
                    break;
                case 'tuition':
                    // Tuition Tab: district is required, others are optional
                    $rules['available_days'] = 'nullable|array';
                    $rules['available_days.*'] = 'in:Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday';
                    $rules['available_time_from'] = 'nullable|string|max:10';
                    $rules['available_time_to'] = 'nullable|string|max:10';
                    $rules['hourly_rate'] = 'nullable|numeric|min:0';
                    $rules['tutoring_method'] = 'nullable|string|max:255';
                    $rules['division'] = 'nullable|string|max:255';
                    $rules['district'] = 'required|string|max:255';
                    $rules['preferred_locations'] = 'nullable|string|max:500';
                    break;
                case 'credential':
                    // Credential Tab: cv_path is required
                    $rules['cv_path'] = 'required|file|mimes:pdf|max:5120';
                    break;
                case 'personal':
                default:
                    // Personal Tab: phone and address are required, others are optional
                    $rules['name'] = 'nullable|string|max:255';
                    $rules['phone'] = 'required|string|max:20';
                    $rules['gender'] = 'nullable|in:male,female,other';
                    $rules['address'] = 'required|string|max:500';
                    $rules['bio'] = 'nullable|string|max:1000';
                    $rules['experience_years'] = 'nullable|integer|min:0';
                    $rules['experience_details'] = 'nullable|string|max:1000';
                    $rules['photo'] = 'nullable|image|max:2048';
                    break;
            }

            $validated = $request->validate($rules);

            // Update user's name if provided
            if (isset($validated['name'])) {
                $tutor->user->update(['name' => $validated['name']]);
                unset($validated['name']); // Remove from tutor update
            }
            
            // Remove activeTab from validated data (not a database field)
            unset($validated['activeTab']);
            
            // Handle photo upload (only for personal tab)
            if ($request->hasFile('photo')) {
                if ($tutor->photo && !str_starts_with($tutor->photo, 'http')) {
                    \Storage::disk('public')->delete($tutor->photo);
                }
                $path = $request->file('photo')->store('tutors', 'public');
                $validated['photo'] = $path;
            }

            // Handle CV upload (only for credential tab)
            if ($request->hasFile('cv_path')) {
                $path = $request->file('cv_path')->store('tutors/cvs', 'public');
                $validated['cv_path'] = $path;
            }
            
            // Handle subjects array (only for education tab)
            if (isset($validated['subjects'])) {
                if (is_string($validated['subjects'])) {
                    $validated['subjects'] = json_decode($validated['subjects'], true) ?? [];
                }
                if (is_array($validated['subjects'])) {
                    $validated['subjects'] = array_values(array_unique($validated['subjects']));
                }
            }
            
            // Handle available_days array (only for tuition tab)
            if (isset($validated['available_days'])) {
                if (is_string($validated['available_days'])) {
                    $validated['available_days'] = json_decode($validated['available_days'], true) ?? [];
                }
            }
            
            // Ensure other array fields are handled properly if they exist
            if (!isset($validated['preferred_categories'])) {
                if ($activeTab === 'tuition') {
                    $validated['preferred_categories'] = [];
                }
            } elseif (is_string($validated['preferred_categories'])) {
                $validated['preferred_categories'] = json_decode($validated['preferred_categories'], true) ?? [];
            }
            
            if (!isset($validated['preferred_classes'])) {
                if ($activeTab === 'tuition') {
                    $validated['preferred_classes'] = [];
                }
            } elseif (is_string($validated['preferred_classes'])) {
                $validated['preferred_classes'] = json_decode($validated['preferred_classes'], true) ?? [];
            }

            \Log::info('Updating tutor profile', ['tutor_id' => $tutor->id, 'data' => $validated]);
            
            $tutor->update($validated);

            // Refresh tutor to get updated values
            $tutor->refresh();

            \Log::info('Tutor profile updated', ['tutor' => $tutor->toArray()]);

            // Calculate profile completion percentage based on 4 tabs
            // Tuition Related Tab: 7 fields
            $tuitionFields = ['hourly_rate', 'available_days', 'available_time_from', 'available_time_to', 'tutoring_method', 'division', 'district'];
            // Educational Tab: 4 fields (institution, education_level, department, subjects)
            $educationFields = ['institution', 'education_level', 'department', 'subjects'];
            // Personal Tab: 6 fields (phone, gender, address, bio, experience_years, experience_details)
            $personalFields = ['phone', 'gender', 'address', 'bio', 'experience_years', 'experience_details'];
            // Credential Tab: 1 field
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

        // Convert subject name to ID if filtering by subject
        $subjectId = null;
        if ($request->subject) {
            $subject = Subject::where('name', $request->subject)->first();
            $subjectId = $subject ? $subject->id : null;
        }

        $query = Job::with(['location', 'guardian'])
            ->where('approval_status', 'approved')
            ->where('status', 'open');

        if ($request->location) {
            $query->where('district', $request->location);
        } elseif ($request->districts) {
            $districtList = array_filter(array_map('trim', explode(',', $request->districts)));
            if (!empty($districtList)) {
                $query->whereIn('district', $districtList);
            }
        }

        if ($subjectId) {
            $query->whereJsonContains('subjects', $subjectId);
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

        // All 64 Bangladesh districts grouped by division
        $divisions = [
            'Dhaka'      => ['Dhaka','Faridpur','Gazipur','Gopalganj','Kishoreganj','Madaripur','Manikganj','Munshiganj','Narayanganj','Narsingdi','Rajbari','Shariatpur','Tangail'],
            'Chittagong' => ['Bandarban','Brahmanbaria','Chandpur','Chittagong','Comilla','Cox\'s Bazar','Feni','Khagrachhari','Lakshmipur','Noakhali','Rangamati'],
            'Rajshahi'   => ['Bogra','Chapainawabganj','Joypurhat','Naogaon','Natore','Pabna','Rajshahi','Sirajganj'],
            'Khulna'     => ['Bagerhat','Chuadanga','Jessore','Jhenaidah','Khulna','Kushtia','Magura','Meherpur','Narail','Satkhira'],
            'Barisal'    => ['Barguna','Barisal','Bhola','Jhalokati','Patuakhali','Pirojpur'],
            'Sylhet'     => ['Habiganj','Moulvibazar','Sunamganj','Sylhet'],
            'Rangpur'    => ['Dinajpur','Gaibandha','Kurigram','Lalmonirhat','Nilphamari','Panchagarh','Rangpur','Thakurgaon'],
            'Mymensingh' => ['Jamalpur','Mymensingh','Netrokona','Sherpur'],
        ];

        return Inertia::render('Tutor/BrowseJobs', [
            'jobs'               => $jobs,
            'divisions'          => $divisions,
            'subjects'           => Subject::orderBy('name')->get(),
            'verificationStatus' => $tutor->verification_status,
            'tutorCv'            => $tutor->cv_path,
            'filters'            => $request->only(['location', 'subject', 'search', 'division', 'districts']),
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
        
        // Mark all unread application status updates as read
        Application::where('tutor_id', $tutor->id)
            ->where('status_read', false)
            ->update(['status_read' => true]);
        
        // Force fresh query without caching
        $applications = Application::where('tutor_id', $tutor->id)
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
        $user = auth()->user();

        $validated = $request->validate([
            'nid_card_front' => 'required|file|mimes:pdf,jpg,jpeg,png|max:5120',
            'nid_card_back' => 'required|file|mimes:pdf,jpg,jpeg,png|max:5120',
            'student_id_front' => 'required|file|mimes:pdf,jpg,jpeg,png|max:5120',
            'certificate' => 'required|file|mimes:pdf,jpg,jpeg,png|max:5120',
        ]);

        // Delete old documents if resubmitting
        if ($tutor->verification_status === 'rejected') {
            $oldDocuments = $user->documents;
            foreach ($oldDocuments as $oldDoc) {
                // Delete file from storage
                if (\Storage::exists($oldDoc->file_path)) {
                    \Storage::delete($oldDoc->file_path);
                }
                $oldDoc->delete();
            }
        }

        // Store new documents
        $documentTypes = [
            'nid_card_front' => 'nid_card_front',
            'nid_card_back' => 'nid_card_back',
            'student_id_front' => 'student_id_front',
            'certificate' => 'certificate'
        ];

        foreach ($documentTypes as $requestKey => $docType) {
            if ($request->hasFile($requestKey)) {
                $file = $request->file($requestKey);
                $path = $file->store('documents/verification', 'public');
                
                $user->documents()->create([
                    'type' => $docType,
                    'file_path' => $path,
                    'verified' => false,
                ]);
            }
        }

        // Update verification status
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
        
        // Check if tutor has already applied
        $job->has_applied = $job->applications()->where('tutor_id', $tutor->id)->exists();

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
            'class_level' => 'nullable|string',
            'education_medium' => 'nullable|string',
            'tuition_type' => 'nullable|string',
            'tutor_gender_preference' => 'nullable|string|in:any,male,female',
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

        // Load subject names for each job request
        $jobRequests->each(function ($jobRequest) {
            if ($jobRequest->subjects && is_array($jobRequest->subjects)) {
                $subjectIds = array_map('intval', $jobRequest->subjects);
                $jobRequest->subject_names = \App\Models\Subject::whereIn('id', $subjectIds)->pluck('name')->toArray();
            } else {
                $jobRequest->subject_names = [];
            }
        });

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

    public function editJobRequest(TutorJobRequest $jobRequest)
    {
        $tutor = auth()->user()->tutor;

        // Check if the job request belongs to the authenticated tutor
        if ($jobRequest->tutor_id !== $tutor->id) {
            abort(403, 'Unauthorized');
        }

        // Check if job request is approved - cannot edit approved requests
        if ($jobRequest->approval_status === 'approved') {
            return redirect()->route('tutor.job-requests')
                ->with('error', 'Cannot edit approved job requests.');
        }

        $subjects = \App\Models\Subject::orderBy('name')->get();
        $levels = \App\Models\Category::orderBy('name')->get();

        return Inertia::render('Tutor/CreateJobRequest', [
            'jobRequest' => $jobRequest,
            'subjects' => $subjects,
            'levels' => $levels,
            'tutor' => $tutor,
        ]);
    }

    public function updateJobRequest(Request $request, TutorJobRequest $jobRequest)
    {
        $tutor = auth()->user()->tutor;

        // Check if the job request belongs to the authenticated tutor
        if ($jobRequest->tutor_id !== $tutor->id) {
            abort(403, 'Unauthorized');
        }

        // Check if job request is approved - cannot edit approved requests
        if ($jobRequest->approval_status === 'approved') {
            return redirect()->route('tutor.job-requests')
                ->with('error', 'Cannot edit approved job requests.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|min:50',
            'subjects' => 'required|array|min:1',
            'subjects.*' => 'exists:subjects,id',
            'education_level' => 'required|string',
            'class_level' => 'nullable|string',
            'education_medium' => 'nullable|string',
            'tuition_type' => 'nullable|string',
            'tutor_gender_preference' => 'nullable|string|in:any,male,female',
            'monthly_salary' => 'required|numeric|min:0',
            'available_days' => 'required|array|min:1',
            'available_days.*' => 'in:Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday',
            'division' => 'required|string|max:255',
            'district' => 'required|string|max:255',
            'teaching_mode' => 'required|in:online,in-person,hybrid',
        ]);

        $validated['preferred_gender'] = $tutor->gender;
        $validated['approval_status'] = 'pending'; // Reset to pending after edit

        $jobRequest->update($validated);

        return redirect()->route('tutor.job-requests')
            ->with('success', 'Job request updated and submitted for review.');
    }

    public function destroyJobRequest(TutorJobRequest $jobRequest)
    {
        $tutor = auth()->user()->tutor;

        // Check if the job request belongs to the authenticated tutor
        if ($jobRequest->tutor_id !== $tutor->id) {
            abort(403, 'Unauthorized');
        }

        $jobRequest->delete();

        return redirect()->route('tutor.job-requests')
            ->with('success', 'Job request deleted successfully.');
    }

    public function feedbackCreate()
    {
        $tutor    = auth()->user()->tutor;
        $photoUrl = $tutor->photo ? \Storage::url($tutor->photo) : null;

        return Inertia::render('Tutor/FeedbackCreate', [
            'tutorInstitution' => $tutor->institution,
            'tutorPhotoUrl'    => $photoUrl,
        ]);
    }

    public function feedbackStore(Request $request)
    {
        $validated = $request->validate([
            'feedback' => 'required|string|max:1000',
            'rating'   => 'required|integer|min:1|max:5',
        ]);

        // Pull institution & photo from the tutor's own profile — not from the form
        $tutor    = auth()->user()->tutor;
        $photoUrl = $tutor->photo ? \Storage::url($tutor->photo) : null;

        // Guard: institution required
        if (empty($tutor->institution)) {
            return redirect()->route('tutor.feedback.create')
                ->withErrors(['institution' => 'Please add your Institution / University in your profile before submitting feedback.']);
        }

        TutorFeedback::create([
            'tutor_id'    => auth()->id(),
            'feedback'    => $validated['feedback'],
            'rating'      => $validated['rating'],
            'institution' => $tutor->institution,
            'photo_url'   => $photoUrl,
            'status'      => 'pending',
        ]);

        return redirect()->back()->with('success', 'Feedback submitted successfully! It will be visible after admin approval.');
    }
}