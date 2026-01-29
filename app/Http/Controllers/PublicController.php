<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\Tutor;
use App\Models\TutorJobRequest;
use App\Models\Location;
use App\Models\Subject;
use App\Models\Blog;
use App\Models\Contact;
use App\Models\GuardianFeedback;
use App\Models\TutorFeedback;
use App\Models\SiteSetting;
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

        $guardianTestimonials = GuardianFeedback::with('guardian')
            ->where('status', 'approved')
            ->latest('approved_at')
            ->take(6)
            ->get()
            ->map(function ($feedback) {
                return [
                    'name' => $feedback->guardian->name,
                    'feedback' => $feedback->feedback,
                    'rating' => $feedback->rating,
                ];
            });

        $tutorTestimonials = TutorFeedback::with('tutor')
            ->where('status', 'approved')
            ->latest('approved_at')
            ->take(6)
            ->get()
            ->map(function ($feedback) {
                return [
                    'name' => $feedback->tutor->name,
                    'feedback' => $feedback->feedback,
                    'rating' => $feedback->rating,
                ];
            });

        return Inertia::render('Welcome', [
            'featuredTutors' => $featuredTutors,
            'recentJobs' => $recentJobs,
            'stats' => $stats,
            'guardianTestimonials' => $guardianTestimonials,
            'tutorTestimonials' => $tutorTestimonials,
            'heroImage' => SiteSetting::get('hero_image', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop'),
            'promoBannerImage' => SiteSetting::get('promo_banner_image', ''),
            'showPromoBanner' => SiteSetting::get('show_promo_banner', '0') === '1',
            'heroTitle' => SiteSetting::get('hero_title', 'Find the Perfect Tutor'),
            'heroSubtitle' => SiteSetting::get('hero_subtitle', 'Connect with Bangladesh\'s finest verified tutors. Transform your learning journey with personalized education tailored to your needs.'),
            'statsTutors' => SiteSetting::get('stats_tutors', '850'),
            'statsJobs' => SiteSetting::get('stats_jobs', '1250'),
            'statsSuccessRate' => SiteSetting::get('stats_success_rate', '95'),
            'statsStudents' => SiteSetting::get('stats_students', '2400'),
            'tuitionTypes' => json_decode(SiteSetting::get('tuition_types', '[]'), true),
            'servingCategories' => json_decode(SiteSetting::get('serving_categories', '[]'), true),
            'howItWorks' => json_decode(SiteSetting::get('how_it_works', '[]'), true),
            'footerSettings' => [
                'contact_title' => SiteSetting::get('contact_title', 'Contact Us'),
                'contact_description' => SiteSetting::get('contact_description', 'Have any questions or need a tutor? We are here to help!'),
                'contact_address' => SiteSetting::get('contact_address', 'Salmanpur, Kotbari, Comilla, Bangladesh'),
                'contact_phone' => SiteSetting::get('contact_phone', '+880 1818 420012'),
                'contact_email' => SiteSetting::get('contact_email', 'tuitionbarta@gmail.com'),
                'contact_hours' => SiteSetting::get('contact_hours', 'Sat - Thu, 10:00 AM - 8:00 PM'),
                'social_facebook' => SiteSetting::get('social_facebook', 'https://facebook.com/tuitionbarta'),
                'social_linkedin' => SiteSetting::get('social_linkedin', 'https://linkedin.com/company/tuitionbarta'),
                'social_twitter' => SiteSetting::get('social_twitter', 'https://x.com/tuitionbarta'),
                'social_youtube' => SiteSetting::get('social_youtube', 'https://youtube.com/@tuitionbarta'),
                'social_whatsapp' => SiteSetting::get('social_whatsapp', 'https://wa.me/8801818420012'),
            ],
        ]);
    }

    public function jobs(Request $request)
    {
        $tutor = null;
        if (auth()->check() && auth()->user()->role === 'tutor') {
            $tutor = auth()->user()->tutor;
        }

        // Convert subject name to ID if filtering by subject
        $subjectId = null;
        if ($request->subject) {
            $subject = Subject::where('name', $request->subject)->first();
            $subjectId = $subject ? $subject->id : null;
        }

        // Get guardian job posts
        $guardianJobs = Job::with(['location', 'guardian'])
            ->where('approval_status', 'approved')
            ->where('status', 'open');

        if ($request->location) {
            $guardianJobs->where('district', $request->location);
        }

        if ($subjectId) {
            $guardianJobs->whereJsonContains('subjects', $subjectId);
        }

        if ($request->search) {
            $guardianJobs->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        $guardianJobs = $guardianJobs->get()->map(function ($job) use ($tutor) {
            $job->job_type = 'guardian';
            if ($tutor) {
                $job->has_applied = $job->applications()->where('tutor_id', $tutor->id)->exists();
            }
            return $job;
        });

        // Get approved tutor job requests
        $tutorJobs = TutorJobRequest::with(['tutor.user'])
            ->where('approval_status', 'approved')
            ->where('status', 'active');

        if ($request->location) {
            $tutorJobs->where('district', $request->location);
        }

        if ($subjectId) {
            $tutorJobs->whereJsonContains('subjects', $subjectId);
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

        // Get unique districts from both job types
        $districts = collect()
            ->merge(Job::where('approval_status', 'approved')->where('status', 'open')->whereNotNull('district')->pluck('district'))
            ->merge(TutorJobRequest::where('approval_status', 'approved')->where('status', 'active')->whereNotNull('district')->pluck('district'))
            ->unique()
            ->sort()
            ->values();

        return Inertia::render('Public/Jobs', [
            'jobs' => $jobs,
            'districts' => $districts,
            'subjects' => Subject::orderBy('name')->get(),
            'filters' => $request->only(['location', 'subject', 'search']),
        ]);
    }

    public function jobShow(Job $job)
    {
        $job->load(['location', 'guardian.user', 'student', 'approvedBy']);

        $tutorData = null;
        if (auth()->check() && auth()->user()->role === 'tutor') {
            $tutor = auth()->user()->tutor;
            $tutorData = [
                'verification_status' => $tutor->verification_status,
            ];
            $job->has_applied = $job->applications()->where('tutor_id', $tutor->id)->exists();
        }

        return Inertia::render('Public/JobDetails', [
            'job' => $job,
            'auth' => [
                'user' => auth()->user(),
                'tutor' => $tutorData,
            ],
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
        
        // Transform tutors to include subject names
        $tutors->getCollection()->transform(function ($tutor) {
            // Convert subject IDs to names if they're numeric
            if (is_array($tutor->subjects)) {
                $subjectIds = array_filter($tutor->subjects, 'is_numeric');
                if (!empty($subjectIds)) {
                    $subjectNames = Subject::whereIn('id', $subjectIds)->pluck('name')->toArray();
                    $tutor->subjects = $subjectNames;
                }
            }
            return $tutor;
        });

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

    public function howItWorks(Request $request)
    {
        $query = Blog::with('author')->published();

        // Filter by category
        if ($request->category && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        // Search
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('excerpt', 'like', '%' . $request->search . '%')
                  ->orWhere('content', 'like', '%' . $request->search . '%');
            });
        }

        // Sort by
        $sortBy = $request->sort ?? 'latest';
        if ($sortBy === 'popular') {
            $query->orderBy('views', 'desc');
        } else {
            $query->latest('published_at');
        }

        $blogs = $query->paginate(12);

        // Get popular blogs for sidebar
        $popularBlogs = Blog::published()
            ->orderBy('views', 'desc')
            ->take(5)
            ->get();

        // Get latest blogs for sidebar
        $latestBlogs = Blog::published()
            ->latest('published_at')
            ->take(5)
            ->get();

        return Inertia::render('Public/HowItWorks', [
            'blogs' => $blogs,
            'popularBlogs' => $popularBlogs,
            'latestBlogs' => $latestBlogs,
            'filters' => [
                'category' => $request->category ?? 'all',
                'search' => $request->search ?? '',
                'sort' => $sortBy,
            ],
        ]);
    }

    public function blogShow(Blog $blog)
    {
        // Only show published blogs
        if ($blog->status !== 'published' || $blog->published_at > now()) {
            abort(404);
        }

        // Increment views
        $blog->increment('views');

        // Get related blogs (same category, exclude current)
        $relatedBlogs = Blog::published()
            ->where('category', $blog->category)
            ->where('id', '!=', $blog->id)
            ->orderBy('views', 'desc')
            ->take(3)
            ->get();

        return Inertia::render('Public/BlogShow', [
            'blog' => $blog->load('author'),
            'relatedBlogs' => $relatedBlogs,
        ]);
    }

    public function contact()
    {
        return Inertia::render('Public/Contact');
    }

    public function contactStore(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:2000',
        ]);

        $validated['status'] = 'new';

        try {
            Contact::create($validated);

            return back()->with('success', 'Thank you for contacting us! We will get back to you soon.');
        } catch (\Exception $e) {
            return back()->withInput()->with('error', 'Error sending message. Please try again.');
        }
    }

    public function terms()
    {
        return Inertia::render('Public/Terms');
    }
}
