<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register', [
            'defaultRole' => 'tutor',
        ]);
    }

    /**
     * Display the tutor registration view.
     */
    public function createTutor(): Response
    {
        return Inertia::render('Auth/Register', [
            'defaultRole' => 'tutor',
            'tutorOnly' => true,
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|in:guardian,tutor',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        // Create role-specific profile
        if ($request->role === 'guardian') {
            \App\Models\Guardian::create([
                'user_id' => $user->id,
                'guardian_code' => 'GRD-' . strtoupper(uniqid()),
            ]);
        } elseif ($request->role === 'tutor') {
            \App\Models\Tutor::create([
                'user_id' => $user->id,
                'tutor_code' => 'TUT-' . strtoupper(uniqid()),
            ]);
        }

        // Generate 6-digit OTP
        $otp = sprintf('%06d', mt_rand(100000, 999999));
        
        // Store OTP in database
        \App\Models\EmailOtp::create([
            'email' => $user->email,
            'otp' => \Illuminate\Support\Facades\Hash::make($otp),
            'expires_at' => now()->addMinutes(10),
        ]);

        // Send OTP email
        $user->notify(new \App\Notifications\EmailOtpNotification($otp, $user->name));

        // Notify admins of new registration (Skipped as per user feedback)

        // Store email in session for OTP verification page
        $request->session()->put('verification_email', $user->email);

        return redirect()->route('verification.otp');
    }
}
