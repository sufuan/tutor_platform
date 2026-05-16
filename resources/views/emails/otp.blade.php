@extends('emails.layout')

@section('content')
<h2>Verify Your Email Address</h2>
<p>Hello <strong>{{ $name }}</strong>,</p>
<p>Thank you for registering with Tuition Barta. Please use the following One-Time Password (OTP) to verify your email address and complete your registration:</p>

<div style="background: linear-gradient(to right, #eff6ff, #f8fafc); border: 1px solid #bfdbfe; border-radius: 12px; padding: 30px; text-align: center; margin: 35px 0; box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.02);">
    <p style="font-size: 36px; font-weight: 800; letter-spacing: 12px; color: #1e3a8a; margin: 0; font-family: monospace;">{{ $otp }}</p>
</div>

<p style="color: #64748b; font-size: 14px;">This code will expire in <strong>10 minutes</strong>. If you did not request this code, please ignore this email.</p>
@endsection
