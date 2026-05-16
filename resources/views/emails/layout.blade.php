<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Tuition Barta</title>
    <style>
        /* Base */
        body, body *:not(html):not(style):not(br):not(tr):not(code) {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
            box-sizing: border-box;
        }
        body {
            background-color: #f8fafc;
            color: #334155;
            height: 100%;
            hyphens: auto;
            line-height: 1.6;
            margin: 0;
            -moz-osx-font-smoothing: grayscale;
            -webkit-font-smoothing: antialiased;
            padding: 0;
            width: 100% !important;
        }
        p, ul, ol, blockquote {
            line-height: 1.6;
            margin: 0 0 16px 0;
            font-size: 16px;
        }
        .wrapper {
            background-color: #f8fafc;
            margin: 0;
            padding: 40px 20px;
            width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            -premailer-width: 100%;
        }
        .content {
            margin: 0 auto;
            padding: 0;
            width: 100%;
            max-width: 600px;
        }
        /* Header */
        .header {
            padding: 25px 0;
            text-align: center;
        }
        .header a {
            color: #1e3a8a;
            font-size: 24px;
            font-weight: bold;
            text-decoration: none;
            display: inline-block;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        /* Body */
        .body-card {
            background-color: #ffffff;
            border-top: 5px solid #2563eb;
            border-radius: 12px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01);
            margin: 0;
            padding: 40px;
            width: 100%;
        }
        /* Elements */
        h2 {
            color: #0f172a;
            font-size: 22px;
            font-weight: 700;
            margin-top: 0;
            margin-bottom: 24px;
        }
        .button-wrap {
            text-align: center;
            margin: 35px 0;
        }
        .button {
            background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
            border-radius: 8px;
            color: #ffffff !important;
            display: inline-block;
            font-size: 16px;
            font-weight: 600;
            text-decoration: none;
            padding: 14px 32px;
            box-shadow: 0 4px 14px 0 rgba(37, 99, 235, 0.39);
        }
        /* Footer */
        .footer-wrap {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            border-bottom-left-radius: 12px;
            border-bottom-right-radius: 12px;
            padding: 40px 20px;
            text-align: center;
        }
        .footer p {
            color: #94a3b8;
            font-size: 13px;
            line-height: 1.6em;
            margin: 0 0 8px 0;
        }
        .footer-logo img {
            height: 40px;
            width: auto;
            margin-bottom: 20px;
            display: inline-block;
        }
        .social-links {
            margin: 24px 0;
        }
        .social-links a {
            color: #cbd5e1;
            text-decoration: none;
            margin: 0 10px;
            font-size: 14px;
        }
        @media only screen and (max-width: 600px) {
            .wrapper { padding: 20px 10px; }
            .body-card { padding: 24px; border-bottom-left-radius: 0; border-bottom-right-radius: 0; }
            .footer-wrap { padding: 30px 15px; }
            h2 { font-size: 20px; }
        }
    </style>
</head>
<body>
    <table class="wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
            <td align="center">
                <table class="content" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                    <!-- Header -->
                    <tr>
                        <td class="header">
                            <a href="{{ config('app.url') }}">
                                Tuition Barta
                            </a>
                        </td>
                    </tr>
                    
                    <!-- Body -->
                    <tr>
                        <td width="100%" cellpadding="0" cellspacing="0">
                            <table class="body-card" style="border-bottom-left-radius: 0; border-bottom-right-radius: 0;" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                    <td>
                                        @yield('content')
                                        
                                        <p style="margin-top: 32px; color: #64748b;">
                                            Best regards,<br>
                                            <strong>The Tuition Barta Team</strong>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Footer Attached to Body Card -->
                            <table class="footer-wrap" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                    <td class="footer">
                                        <div class="footer-logo">
                                            @if(isset($message))
                                                <img src="{{ $message->embed(public_path('assets/logo_white.png')) }}" alt="Tuition Barta Logo">
                                            @else
                                                <img src="{{ url('assets/logo_white.png') }}" alt="Tuition Barta Logo">
                                            @endif
                                        </div>
                                        <p style="color: #e2e8f0; font-weight: 500;">Connecting the best tutors with the right students.</p>
                                        <div class="social-links">
                                            <a href="{{ url('/') }}">Website</a> • 
                                            <a href="{{ url('/jobs') }}">Jobs</a> • 
                                            <a href="{{ url('/contact') }}">Contact Support</a>
                                        </div>
                                        <p style="color: #64748b;">&copy; {{ date('Y') }} Tuition Barta. All rights reserved.</p>
                                        <p style="color: #475569; font-size: 11px; margin-top: 16px;">This email was sent to you because you are registered on Tuition Barta.</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
