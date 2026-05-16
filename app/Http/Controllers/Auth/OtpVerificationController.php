<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\EmailOtp;
use App\Models\User;
use App\Notifications\EmailOtpNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class OtpVerificationController extends Controller
{
    public function show(Request $request)
    {
        $email = $request->session()->get('verification_email');

        if (!$email) {
            return redirect()->route('register');
        }

        return Inertia::render('Auth/OtpVerification', [
            'email' => $email,
        ]);
    }

    public function verify(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'otp' => 'required|string|size:6',
        ]);

        $otpRecord = EmailOtp::where('email', $request->email)->latest()->first();

        if (!$otpRecord || !Hash::check($request->otp, $otpRecord->otp)) {
            return back()->withErrors(['otp' => 'Invalid OTP code provided.']);
        }

        if ($otpRecord->isExpired()) {
            return back()->withErrors(['otp' => 'The OTP code has expired. Please request a new one.']);
        }

        if ($otpRecord->isVerified()) {
            return back()->withErrors(['otp' => 'This OTP code has already been used.']);
        }

        // Mark OTP as verified
        $otpRecord->update(['verified_at' => now()]);

        // Verify User
        $user = User::where('email', $request->email)->first();
        if ($user && !$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
        }

        // Login user
        Auth::login($user);

        // Clear session
        $request->session()->forget('verification_email');

        return redirect()->intended(route('dashboard', absolute: false));
    }

    public function resend(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user->hasVerifiedEmail()) {
            return back()->with('info', 'Email is already verified.');
        }

        // Generate 6-digit OTP
        $otp = sprintf('%06d', mt_rand(100000, 999999));
        
        // Store OTP in database
        EmailOtp::create([
            'email' => $user->email,
            'otp' => Hash::make($otp),
            'expires_at' => now()->addMinutes(10),
        ]);

        // Send OTP email
        $user->notify(new EmailOtpNotification($otp, $user->name));

        return back()->with('status', 'A new OTP has been sent to your email address.');
    }
}
