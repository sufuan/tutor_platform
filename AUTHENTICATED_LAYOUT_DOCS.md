# AuthenticatedLayout Component Documentation

## Overview
The AuthenticatedLayout component is a comprehensive, role-based sidebar layout built with ShadCN UI components following the sidebar-07 pattern. It provides a professional, responsive layout for authenticated users with role-specific navigation menus.

## Features

### ✨ Role-Specific Sidebars
- **Guardian**: Profile completion, job posting, application management
- **Tutor**: Job browsing, applications, reviews, verification status
- **Admin**: User management, verifications, approvals, reports

### 🎨 Professional Design
- Clean, modern interface matching CareTutors branding
- Responsive design with mobile slide-in sidebar
- Active route highlighting
- Badge notifications for important counts

### 🔔 Toast Notifications
- Automatic flash message handling (success, error, warning, info)
- Elegant toast UI with color-coded variants
- Auto-dismiss functionality

### 👤 User Experience
- User avatar with initials fallback
- User dropdown with profile settings and logout
- Collapsible sidebar with keyboard shortcuts (Ctrl/Cmd + B)
- Smooth animations and transitions

## Usage

### Basic Implementation

```jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold">Dashboard</h2>
            }
        >
            <Head title="Dashboard" />
            
            <div className="space-y-6">
                {/* Your page content */}
            </div>
        </AuthenticatedLayout>
    );
}
```

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | ReactNode | Yes | Main content to render |
| `header` | ReactNode | No | Optional header content |

### Required Inertia Props

The component expects the following props from Inertia (passed from backend):

```php
// In your controller
return Inertia::render('YourPage', [
    'auth' => [
        'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role, // 'guardian', 'tutor', or 'admin'
            'guardian' => $user->guardian, // If guardian
            'tutor' => $user->tutor, // If tutor (include verification_status)
        ],
    ],
    'badgeCounts' => [
        // Guardian counts
        'profileComplete' => true/false,
        'totalJobs' => 5,
        'unreadApplications' => 3,
        
        // Tutor counts
        'applicationUpdates' => 2,
        
        // Admin counts
        'pendingVerifications' => 4,
        'pendingJobs' => 7,
        
        // Common
        'unreadNotifications' => 10,
    ],
    'flash' => [
        'success' => 'Operation completed successfully!',
        'error' => 'Something went wrong.',
        'warning' => 'Please review this.',
        'info' => 'Here is some information.',
    ],
]);
```

## Guardian Sidebar Menu

```
├── Dashboard
├── Complete Profile (with ! badge if incomplete)
├── Post a Job (requires profile completion)
├── My Jobs (with total count badge)
├── Applications (with unread count badge)
├── Bookings
├── Notifications (with unread count badge)
└── Profile Settings
```

### Required Routes for Guardian:
- `dashboard`
- `guardian.profile.complete`
- `guardian.jobs.create`
- `guardian.jobs.index`
- `guardian.applications.index`
- `guardian.bookings.index`
- `notifications.index`
- `profile.edit`

## Tutor Sidebar Menu

```
├── Dashboard
├── Browse Jobs
├── My Applications (with updates badge)
├── Bookings
├── Reviews
├── Notifications (with unread count badge)
├── Profile Settings
└── Verification Status Badge (pending/verified/rejected)
```

### Required Routes for Tutor:
- `dashboard`
- `tutor.jobs.browse`
- `tutor.applications.index`
- `tutor.bookings.index`
- `tutor.reviews.index`
- `notifications.index`
- `profile.edit`

## Admin Sidebar Menu

```
├── Dashboard
├── Tutor Verifications (with pending count badge)
├── Job Approvals (with pending count badge)
├── All Users
├── All Jobs
├── Reports
└── Settings
```

### Required Routes for Admin:
- `admin.dashboard`
- `admin.tutors.verifications`
- `admin.jobs.approvals`
- `admin.users.index`
- `admin.jobs.index`
- `admin.reports.index`
- `admin.settings.index`

## Badge System

### Badge Counts Configuration

```php
// In AppServiceProvider or middleware
Inertia::share([
    'badgeCounts' => function () {
        $user = Auth::user();
        if (!$user) return [];

        $counts = [
            'unreadNotifications' => $user->unreadNotifications()->count(),
        ];

        if ($user->role === 'guardian') {
            $counts['profileComplete'] = $user->guardian?->isProfileComplete() ?? false;
            $counts['totalJobs'] = $user->guardian?->jobs()->count() ?? 0;
            $counts['unreadApplications'] = Application::whereHas('job', function ($q) use ($user) {
                $q->where('guardian_id', $user->guardian->id);
            })->where('read_at', null)->count();
        }

        if ($user->role === 'tutor') {
            $counts['applicationUpdates'] = $user->tutor?->applications()
                ->where('status_changed_at', '>', $user->tutor->last_checked_applications_at)
                ->count() ?? 0;
        }

        if ($user->role === 'admin') {
            $counts['pendingVerifications'] = Tutor::where('verification_status', 'pending')->count();
            $counts['pendingJobs'] = Job::where('status', 'pending')->count();
        }

        return $counts;
    },
]);
```

## Flash Messages

### Backend Usage

```php
// Success message
return redirect()->route('dashboard')
    ->with('success', 'Job posted successfully!');

// Error message
return back()->with('error', 'Failed to submit application.');

// Warning message
return back()->with('warning', 'Your profile is incomplete.');

// Info message
return back()->with('info', 'Your application is under review.');
```

### Toast Variants

- **Success**: Green background, used for successful operations
- **Error**: Red background, used for errors and failures
- **Warning**: Yellow background, used for warnings and alerts
- **Info**: Blue background, used for informational messages

## Customization

### Changing Brand Colors

Update [tailwind.config.js](tailwind.config.js):

```js
colors: {
    primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
        blue: '#1F3C88' // Your brand color
    }
}
```

### Adding New Menu Items

Edit [AuthenticatedLayout.jsx](resources/js/Layouts/AuthenticatedLayout.jsx) `getMenuItems()` function:

```jsx
{
    title: 'New Feature',
    url: route('feature.route'),
    icon: YourIcon, // Import from lucide-react
    badge: badgeCounts?.featureCount 
        ? { value: badgeCounts.featureCount, variant: 'default' }
        : null,
}
```

## Dependencies

All required packages are already installed:

- `lucide-react` - Icons
- `@radix-ui/react-*` - UI primitives
- `@inertiajs/react` - Laravel Inertia.js
- `class-variance-authority` - Styling utilities
- `tailwind-merge` - Tailwind class merging

## File Structure

```
resources/js/
├── Layouts/
│   └── AuthenticatedLayout.jsx       # Main layout component
├── Components/
│   ├── UserAvatar.jsx                 # User avatar component
│   └── ui/
│       ├── sidebar.jsx                # ShadCN sidebar components
│       ├── badge.jsx                  # Badge component
│       ├── button.jsx                 # Button component
│       ├── dropdown-menu.jsx          # Dropdown menu component
│       ├── separator.jsx              # Separator component
│       ├── toast.jsx                  # Toast component
│       └── toaster.jsx                # Toaster container
└── hooks/
    ├── use-mobile.jsx                 # Mobile detection hook
    └── use-toast.js                   # Toast management hook
```

## Keyboard Shortcuts

- `Ctrl/Cmd + B` - Toggle sidebar collapse

## Mobile Responsiveness

- **Desktop (≥768px)**: Full sidebar with collapsible functionality
- **Mobile (<768px)**: Slide-in sidebar drawer activated by hamburger menu

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Troubleshooting

### Routes not found
Ensure all required routes are defined in your Laravel routes file.

### Badge counts not showing
Check that `badgeCounts` is being shared via Inertia middleware.

### Icons not displaying
Verify `lucide-react` is installed: `npm list lucide-react`

### Toast not appearing
Ensure flash messages are being set in your controllers using `->with()`.

## Support

For issues or questions, please contact the development team or refer to:
- [Inertia.js Documentation](https://inertiajs.com/)
- [ShadCN UI Documentation](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
