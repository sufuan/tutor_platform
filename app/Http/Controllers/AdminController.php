<?php

namespace App\Http\Controllers;

use App\Models\Tutor;
use App\Models\Job;
use App\Models\Guardian;
use App\Models\User;
use App\Models\TutorJobRequest;
use App\Models\Application;
use App\Models\Location;
use App\Models\Subject;
use App\Models\Category;
use App\Models\Blog;
use App\Models\Contact;
use App\Models\GuardianFeedback;
use App\Models\TutorFeedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
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

        // Add photo URLs for each tutor
        $tutors->each(function ($tutor) {
            if ($tutor->photo) {
                $tutor->photo_url = Storage::url($tutor->photo);
            }
        });

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

        // Load subject names and photo URLs for each tutor
        $tutors->each(function ($tutor) {
            if ($tutor->subjects && is_array($tutor->subjects)) {
                $subjectIds = array_map('intval', $tutor->subjects);
                $tutor->subject_names = \App\Models\Subject::whereIn('id', $subjectIds)->pluck('name')->toArray();
            } else {
                $tutor->subject_names = [];
            }
            
            if ($tutor->photo) {
                $tutor->photo_url = Storage::url($tutor->photo);
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
        $tutor->load(['user.documents', 'location']);
        
        // Load subject names
        $subjectNames = [];
        if ($tutor->subjects && is_array($tutor->subjects)) {
            $subjectIds = array_map('intval', $tutor->subjects);
            $subjectNames = \App\Models\Subject::whereIn('id', $subjectIds)->pluck('name')->toArray();
        }

        // Add document URLs
        $documents = [];
        if ($tutor->user && $tutor->user->documents) {
            $documents = $tutor->user->documents->map(function ($doc) {
                return [
                    'id' => $doc->id,
                    'type' => $doc->type,
                    'file_path' => $doc->file_path,
                    'document_url' => \Storage::url($doc->file_path),
                    'verified' => $doc->verified,
                    'created_at' => $doc->created_at,
                ];
            });
        }

        return Inertia::render('Admin/TutorProfile', [
            'tutor' => $tutor,
            'subjectNames' => $subjectNames,
            'documents' => $documents,
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

    public function jobsCreate()
    {
        $locations = Location::orderBy('city')->get();
        $subjects = Subject::orderBy('name')->get();
        $categories = Category::orderBy('name')->get();

        return Inertia::render('Admin/PostJob', [
            'locations' => $locations,
            'subjects' => $subjects,
            'categories' => $categories,
        ]);
    }

    public function jobsStore(Request $request)
    {
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

        // Admin jobs don't need a guardian_id, so we set it to null or a placeholder
        $validated['guardian_id'] = null; // or you could create a system guardian
        $validated['job_code'] = 'ADM-' . strtoupper(uniqid());
        $validated['approval_status'] = 'approved'; // Admin jobs are auto-approved
        $validated['status'] = 'open';
        $validated['days_per_week'] = $validated['sessions_per_week'];
        $validated['duration_per_session'] = $validated['session_duration'];
        $validated['preferred_tutor_gender'] = $validated['tutor_gender_preference'] ?? 'any';
        $validated['detailed_address'] = '';
        
        unset($validated['sessions_per_week'], $validated['session_duration'], $validated['tutor_gender_preference']);

        try {
            $job = Job::create($validated);

            return redirect()->route('admin.jobs.approvals')
                ->with('success', 'Job posted successfully.');
        } catch (\Exception $e) {
            return back()->withInput()->with('error', 'Error creating job: ' . $e->getMessage());
        }
    }

    // Blog Management Methods
    public function blogsList()
    {
        $blogs = Blog::with('author')->latest()->paginate(20);

        return Inertia::render('Admin/Blogs/Index', [
            'blogs' => $blogs,
        ]);
    }

    public function blogsCreate()
    {
        return Inertia::render('Admin/Blogs/CreateEdit', [
            'blog' => null,
        ]);
    }

    public function blogsStore(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string|max:500',
            'content' => 'required|string',
            'image' => 'nullable|string',
            'status' => 'required|in:draft,published',
            'category' => 'required|in:academic,career,technologies,skills,study_hacks',
        ]);

        $validated['author_id'] = auth()->id();
        $validated['slug'] = Str::slug($validated['title']);
        
        if ($validated['status'] === 'published') {
            $validated['published_at'] = now();
        }

        try {
            $blog = Blog::create($validated);

            return redirect()->route('admin.blogs.index')
                ->with('success', 'Blog post created successfully.');
        } catch (\Exception $e) {
            return back()->withInput()->with('error', 'Error creating blog: ' . $e->getMessage());
        }
    }

    public function blogsEdit(Blog $blog)
    {
        return Inertia::render('Admin/Blogs/CreateEdit', [
            'blog' => $blog,
        ]);
    }

    public function blogsUpdate(Request $request, Blog $blog)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string|max:500',
            'content' => 'required|string',
            'image' => 'nullable|string',
            'status' => 'required|in:draft,published',
            'category' => 'required|in:academic,career,technologies,skills,study_hacks',
        ]);

        $validated['slug'] = Str::slug($validated['title']);
        
        if ($validated['status'] === 'published' && !$blog->published_at) {
            $validated['published_at'] = now();
        }

        try {
            $blog->update($validated);

            return redirect()->route('admin.blogs.index')
                ->with('success', 'Blog post updated successfully.');
        } catch (\Exception $e) {
            return back()->withInput()->with('error', 'Error updating blog: ' . $e->getMessage());
        }
    }

    public function blogsDestroy(Blog $blog)
    {
        try {
            $blog->delete();

            return redirect()->route('admin.blogs.index')
                ->with('success', 'Blog post deleted successfully.');
        } catch (\Exception $e) {
            return back()->with('error', 'Error deleting blog: ' . $e->getMessage());
        }
    }

    public function blogsUploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        try {
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $filename = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                
                // Store in public/storage/blog-images
                $path = $image->storeAs('blog-images', $filename, 'public');
                
                return response()->json([
                    'url' => asset('storage/' . $path),
                ]);
            }

            return response()->json(['error' => 'No image file uploaded'], 400);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Upload failed: ' . $e->getMessage()], 500);
        }
    }

    // Contact Messages Management Methods
    public function contactsList()
    {
        $contacts = Contact::latest()->paginate(20);
        $newCount = Contact::where('status', 'new')->count();

        return Inertia::render('Admin/Contacts/Index', [
            'contacts' => $contacts,
            'newCount' => $newCount,
        ]);
    }

    public function contactsShow(Contact $contact)
    {
        // Mark as read if it's new
        if ($contact->status === 'new') {
            $contact->update([
                'status' => 'read',
                'read_at' => now(),
            ]);
        }

        return Inertia::render('Admin/Contacts/Show', [
            'contact' => $contact,
        ]);
    }

    public function contactsUpdateStatus(Request $request, Contact $contact)
    {
        $validated = $request->validate([
            'status' => 'required|in:new,read,replied',
            'admin_notes' => 'nullable|string',
        ]);

        if ($validated['status'] === 'replied') {
            $validated['replied_at'] = now();
        }

        $contact->update($validated);

        return back()->with('success', 'Contact status updated successfully.');
    }

    public function feedbacksIndex()
    {
        $feedbacks = GuardianFeedback::with('guardian')
            ->latest()
            ->paginate(20);

        return Inertia::render('Admin/Feedbacks/Index', [
            'feedbacks' => $feedbacks,
        ]);
    }

    public function feedbacksApprove(GuardianFeedback $feedback)
    {
        $feedback->update([
            'status' => 'approved',
            'approved_at' => now(),
            'approved_by' => auth()->id(),
        ]);

        return back()->with('success', 'Feedback approved successfully.');
    }

    public function feedbacksReject(GuardianFeedback $feedback)
    {
        $feedback->update([
            'status' => 'rejected',
        ]);

        return back()->with('success', 'Feedback rejected successfully.');
    }

    public function feedbacksDestroy(GuardianFeedback $feedback)
    {
        $feedback->delete();

        return back()->with('success', 'Feedback deleted successfully.');
    }

    public function tutorFeedbacksIndex()
    {
        $feedbacks = TutorFeedback::with('tutor')
            ->latest()
            ->paginate(15);

        return Inertia::render('Admin/TutorFeedbacks/Index', [
            'feedbacks' => $feedbacks,
        ]);
    }

    public function tutorFeedbacksApprove(TutorFeedback $tutorFeedback)
    {
        $tutorFeedback->update([
            'status' => 'approved',
            'approved_at' => now(),
            'approved_by' => auth()->id(),
        ]);

        return back()->with('success', 'Feedback approved successfully.');
    }

    public function tutorFeedbacksReject(TutorFeedback $tutorFeedback)
    {
        $tutorFeedback->update([
            'status' => 'rejected',
        ]);

        return back()->with('success', 'Feedback rejected successfully.');
    }

    public function tutorFeedbacksDestroy(TutorFeedback $tutorFeedback)
    {
        $tutorFeedback->delete();

        return back()->with('success', 'Feedback deleted successfully.');
    }
}