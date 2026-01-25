<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\GuardianController;
use App\Http\Controllers\TutorController;
use App\Http\Controllers\AdminController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Routes
Route::get('/', [PublicController::class, 'home'])->name('home');
Route::get('/jobs', [PublicController::class, 'jobs'])->name('jobs.index');
Route::get('/jobs/{job}', [PublicController::class, 'jobShow'])->name('jobs.show');
Route::get('/tutor-jobs/{jobRequest}', [PublicController::class, 'tutorJobShow'])->name('tutor-jobs.show');
Route::get('/tutors', [PublicController::class, 'tutors'])->name('tutors.index');
Route::get('/tutors/{tutor}', [PublicController::class, 'tutorShow'])->name('tutors.show');
Route::get('/blog', [PublicController::class, 'howItWorks'])->name('blog');
Route::get('/blog/{blog}', [PublicController::class, 'blogShow'])->name('blog.show');
Route::get('/contact', [PublicController::class, 'contact'])->name('contact');
Route::post('/contact', [PublicController::class, 'contactStore'])->name('contact.store');
Route::get('/terms', [PublicController::class, 'terms'])->name('terms');

// Dashboard Route - Role-based redirection handled by middleware
Route::get('/dashboard', function () {
    $user = auth()->user();
    
    if ($user->role === 'guardian') {
        return redirect()->route('guardian.dashboard');
    } elseif ($user->role === 'tutor') {
        return redirect()->route('tutor.dashboard');
    } elseif ($user->role === 'admin') {
        return redirect()->route('admin.dashboard');
    }
    
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Guardian Routes
Route::middleware(['auth', 'verified'])->prefix('guardian')->name('guardian.')->group(function () {
    Route::get('/dashboard', [GuardianController::class, 'dashboard'])->name('dashboard');
    
    // Profile completion route
    Route::get('/profile/complete', [GuardianController::class, 'profileComplete'])->name('profile.complete');
    Route::post('/profile/complete', [GuardianController::class, 'profileCompleteStore'])->name('profile.complete.store');
    
    // Job Management
    Route::get('/jobs', [GuardianController::class, 'jobsIndex'])->name('jobs.index');
    Route::get('/jobs/create', [GuardianController::class, 'jobsCreate'])->name('jobs.create');
    Route::post('/jobs', [GuardianController::class, 'jobsStore'])->name('jobs.store');
    Route::get('/jobs/{job}', [GuardianController::class, 'jobsShow'])->name('jobs.show');
    Route::delete('/jobs/{job}', [GuardianController::class, 'jobsDestroy'])->name('jobs.destroy');
    
    // Applications Management
    Route::get('/jobs/{job}/applications', [GuardianController::class, 'jobApplications'])->name('job-applications');
    Route::post('/applications/{application}/shortlist', [GuardianController::class, 'applicationShortlist'])->name('applications.shortlist');
    Route::post('/applications/{application}/hire', [GuardianController::class, 'applicationHire'])->name('applications.hire');
    Route::post('/applications/{application}/reject', [GuardianController::class, 'applicationReject'])->name('applications.reject');
    
    // Feedback Management
    Route::get('/feedback/create', [GuardianController::class, 'feedbackCreate'])->name('feedback.create');
    Route::post('/feedback', [GuardianController::class, 'feedbackStore'])->name('feedback.store');
});

// Tutor Routes
Route::middleware(['auth', 'verified'])->prefix('tutor')->name('tutor.')->group(function () {
    Route::get('/dashboard', [TutorController::class, 'dashboard'])->name('dashboard');
    
    // Profile & Verification
    Route::get('/profile', [TutorController::class, 'profile'])->name('profile');
    Route::post('/profile', [TutorController::class, 'profileUpdate'])->name('profile.update');
    Route::get('/verification', [TutorController::class, 'verification'])->name('verification');
    Route::post('/verification', [TutorController::class, 'submitVerification'])->name('verification.submit');
    
    // Job Browsing & Applications
    Route::get('/jobs', [TutorController::class, 'browseJobs'])->name('jobs.index');
    Route::get('/jobs/browse', [TutorController::class, 'browseJobs'])->name('jobs.browse');
    Route::get('/jobs/{job}', [TutorController::class, 'jobShow'])->name('jobs.show');
    Route::post('/jobs/{job}/apply', [TutorController::class, 'applyJob'])->name('jobs.apply');
    
    // Applications
    Route::get('/applications', [TutorController::class, 'myApplications'])->name('applications');
    Route::get('/applications/{application}', [TutorController::class, 'applicationShow'])->name('applications.show');
    
    // Job Requests (Tutors posting their availability)
    Route::get('/job-request/create', [TutorController::class, 'createJobRequest'])->name('job-request.create');
    Route::post('/job-request', [TutorController::class, 'storeJobRequest'])->name('job-request.store');
    Route::get('/job-requests', [TutorController::class, 'myJobRequests'])->name('job-requests');
    Route::post('/job-requests/{jobRequest}/view', [TutorController::class, 'viewJobRequest'])->name('job-requests.view');
    
    // Feedback
    Route::get('/feedback/create', [TutorController::class, 'feedbackCreate'])->name('feedback.create');
    Route::post('/feedback', [TutorController::class, 'feedbackStore'])->name('feedback.store');
});

// Admin Routes
Route::prefix('admin')->name('admin.')->group(function () {
    // Admin Login Routes (Guest only)
    Route::middleware('guest')->group(function () {
        Route::get('/login', [\App\Http\Controllers\Admin\AdminAuthController::class, 'create'])->name('login');
        Route::post('/login', [\App\Http\Controllers\Admin\AdminAuthController::class, 'store'])->name('login.store');
    });

    // Protected Admin Routes
    Route::middleware(['auth', 'verified'])->group(function () {
        // Redirect /admin to dashboard if authenticated
        Route::get('/', function () {
            if (auth()->check() && auth()->user()->role === 'admin') {
                return redirect()->route('admin.dashboard');
            }
            return redirect()->route('admin.login');
        });

        Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
        
        // Tutors Management
        Route::get('/tutors', [AdminController::class, 'tutorsList'])->name('tutors.index');
        Route::get('/tutors/verifications', [AdminController::class, 'tutorVerifications'])->name('tutors.verifications');
        Route::get('/tutors/{tutor}/view', [AdminController::class, 'viewTutor'])->name('tutors.view');
        Route::post('/tutors/{tutor}/verify', [AdminController::class, 'verifyTutor'])->name('tutors.verify');
        Route::post('/tutors/{tutor}/reject', [AdminController::class, 'rejectTutor'])->name('tutors.reject');
        
        // Guardians Management
        Route::get('/guardians', [AdminController::class, 'guardiansList'])->name('guardians.index');
        
        // Job Approvals
        Route::get('/jobs/approvals', [AdminController::class, 'jobApprovals'])->name('jobs.approvals');
        
        // Admin Post Job (must be before /jobs/{job} to avoid route conflict)
        Route::get('/jobs/create', [AdminController::class, 'jobsCreate'])->name('jobs.create');
        Route::post('/jobs', [AdminController::class, 'jobsStore'])->name('jobs.store');
        
        Route::get('/jobs/{job}', [AdminController::class, 'viewJob'])->name('jobs.view');
        Route::post('/jobs/{job}/approve', [AdminController::class, 'approveJob'])->name('jobs.approve');
        Route::post('/jobs/{job}/reject', [AdminController::class, 'rejectJob'])->name('jobs.reject');

        // Tutor Job Requests Management
        Route::get('/tutor-job-requests', [AdminController::class, 'tutorJobRequests'])->name('tutor-job-requests.index');
        Route::get('/tutor-job-requests/{jobRequest}', [AdminController::class, 'viewTutorJobRequest'])->name('tutor-job-requests.view');
        Route::post('/tutor-job-requests/{jobRequest}/approve', [AdminController::class, 'approveTutorJobRequest'])->name('tutor-job-requests.approve');
        Route::post('/tutor-job-requests/{jobRequest}/reject', [AdminController::class, 'rejectTutorJobRequest'])->name('tutor-job-requests.reject');

        // Job Applications Management
        Route::get('/job-applications', [AdminController::class, 'jobApplications'])->name('job-applications.index');
        Route::post('/applications/{application}/update-status', [AdminController::class, 'updateApplicationStatus'])->name('applications.update-status');

        // Blog Management
        Route::get('/blogs', [AdminController::class, 'blogsList'])->name('blogs.index');
        Route::get('/blogs/create', [AdminController::class, 'blogsCreate'])->name('blogs.create');
        Route::post('/blogs', [AdminController::class, 'blogsStore'])->name('blogs.store');
        Route::post('/blogs/upload-image', [AdminController::class, 'blogsUploadImage'])->name('blogs.upload-image');
        Route::get('/blogs/{blog}/edit', [AdminController::class, 'blogsEdit'])->name('blogs.edit');
        Route::put('/blogs/{blog}', [AdminController::class, 'blogsUpdate'])->name('blogs.update');
        Route::delete('/blogs/{blog}', [AdminController::class, 'blogsDestroy'])->name('blogs.destroy');

        // Contact Messages Management
        Route::get('/contacts', [AdminController::class, 'contactsList'])->name('contacts.index');
        Route::get('/contacts/{contact}', [AdminController::class, 'contactsShow'])->name('contacts.show');
        Route::post('/contacts/{contact}/update-status', [AdminController::class, 'contactsUpdateStatus'])->name('contacts.update-status');

        // Guardian Feedbacks Management
        Route::get('/feedbacks', [AdminController::class, 'feedbacksIndex'])->name('feedbacks.index');
        Route::post('/feedbacks/{feedback}/approve', [AdminController::class, 'feedbacksApprove'])->name('feedbacks.approve');
        Route::post('/feedbacks/{feedback}/reject', [AdminController::class, 'feedbacksReject'])->name('feedbacks.reject');
        Route::delete('/feedbacks/{feedback}', [AdminController::class, 'feedbacksDestroy'])->name('feedbacks.destroy');

        // Tutor Feedbacks Management
        Route::get('/tutor-feedbacks', [AdminController::class, 'tutorFeedbacksIndex'])->name('tutor-feedbacks.index');
        Route::post('/tutor-feedbacks/{tutorFeedback}/approve', [AdminController::class, 'tutorFeedbacksApprove'])->name('tutor-feedbacks.approve');
        Route::post('/tutor-feedbacks/{tutorFeedback}/reject', [AdminController::class, 'tutorFeedbacksReject'])->name('tutor-feedbacks.reject');
        Route::delete('/tutor-feedbacks/{tutorFeedback}', [AdminController::class, 'tutorFeedbacksDestroy'])->name('tutor-feedbacks.destroy');

        // Admin Logout
        Route::post('/logout', [\App\Http\Controllers\Admin\AdminAuthController::class, 'destroy'])->name('logout');
    });
});

// Profile Routes (Common for all users)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

