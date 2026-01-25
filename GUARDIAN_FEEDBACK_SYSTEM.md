# Guardian Feedback System Documentation

## Overview
The Guardian Feedback System allows guardians to submit testimonials/reviews about their experience with the platform. These feedbacks go through an admin approval process before being displayed on the homepage.

## Features
- ✅ Guardians can submit feedback with rating (1-5 stars)
- ✅ Admin approval workflow (Pending → Approved/Rejected)
- ✅ Only approved feedbacks display on homepage
- ✅ Dynamic testimonial carousel with auto-scroll
- ✅ Complete CRUD operations for admin management

## Database Structure

### Table: `guardian_feedbacks`
- `id` - Primary key
- `guardian_id` - Foreign key to users table (cascade on delete)
- `feedback` - Text field (max 1000 characters)
- `rating` - Integer (1-5)
- `status` - Enum: pending, approved, rejected
- `approved_at` - Timestamp (nullable)
- `approved_by` - Foreign key to users table (set null on delete)
- `created_at` - Timestamp
- `updated_at` - Timestamp

## Routes

### Guardian Routes
- `GET /guardian/feedback/create` - Show feedback submission form
- `POST /guardian/feedback` - Submit new feedback (creates with 'pending' status)

### Admin Routes
- `GET /admin/feedbacks` - List all feedbacks with pagination
- `POST /admin/feedbacks/{feedback}/approve` - Approve feedback
- `POST /admin/feedbacks/{feedback}/reject` - Reject feedback
- `DELETE /admin/feedbacks/{feedback}` - Delete feedback permanently

## Components

### Frontend Pages
1. **Guardian/FeedbackCreate.jsx**
   - Interactive star rating selector (1-5 stars with hover effects)
   - Textarea with character counter (max 1000 chars)
   - Success message display after submission
   - Brand color (#0675C1) styling

2. **Admin/Feedbacks/Index.jsx**
   - Table view with guardian name, email, feedback, rating, status, date
   - Action buttons: Approve (green), Reject (red), Delete
   - Status badges: Pending (yellow), Approved (green), Rejected (red)
   - Pagination support
   - Success flash messages

### Homepage Integration
- **Welcome.jsx** displays only approved feedbacks
- Fetches top 6 approved feedbacks ordered by approval date
- Dynamic star rendering based on rating value
- Auto-scrolling carousel (3 second delay)

## Workflow

### Guardian Submission
1. Guardian navigates to dashboard
2. Clicks "Share Feedback" card in Quick Actions
3. Selects rating (1-5 stars)
4. Writes feedback (up to 1000 characters)
5. Submits form
6. Feedback saved with status='pending'
7. Redirect with success message

### Admin Approval
1. Admin navigates to `/admin/feedbacks`
2. Views all feedbacks (pending, approved, rejected)
3. For pending feedbacks:
   - Click "Approve" → Sets status='approved', approved_at=now(), approved_by=admin_id
   - Click "Reject" → Sets status='rejected'
4. Can delete any feedback permanently
5. Success message displayed after action

### Homepage Display
1. PublicController fetches GuardianFeedback::where('status', 'approved')
2. Ordered by approved_at (latest first)
3. Limited to top 6 feedbacks
4. Mapped to array: {name, feedback, rating}
5. Displayed in carousel with auto-scroll

## Initial Data

### Seeded Feedbacks (3 approved)
1. **Sarah Ahmed** - 5 stars
   - "টিউশন বার্তা helped me find an excellent math tutor for my daughter. Her grades improved significantly!"

2. **Kamal Hassan** - 5 stars
   - "Professional service and verified tutors. Very satisfied with the English teacher we hired."

3. **Fatima Khan** - 5 stars
   - "Great platform for finding tutors. My son passed his admission test thanks to the tutor we found here!"

## Controllers

### GuardianController
```php
public function feedbackCreate()
- Returns Guardian/FeedbackCreate view

public function feedbackStore(Request $request)
- Validates: feedback (required, max 1000), rating (1-5)
- Creates feedback with status='pending'
- Redirects back with success message
```

### AdminController
```php
public function feedbacksIndex()
- Fetches all feedbacks with guardian relationship
- Paginates (default 15 per page)
- Returns Admin/Feedbacks/Index view

public function feedbacksApprove(GuardianFeedback $feedback)
- Updates status='approved', approved_at=now(), approved_by=auth_id
- Redirects back with success message

public function feedbacksReject(GuardianFeedback $feedback)
- Updates status='rejected'
- Redirects back with success message

public function feedbacksDestroy(GuardianFeedback $feedback)
- Deletes feedback permanently
- Redirects back with success message
```

### PublicController
```php
public function home()
- Fetches GuardianFeedback::with('guardian')
  ->where('status', 'approved')
  ->latest('approved_at')
  ->take(6)
- Maps to array with guardian name, feedback, rating
- Passes to Welcome.jsx as guardianTestimonials prop
```

## Model: GuardianFeedback

### Relationships
```php
public function guardian()
- BelongsTo User model

public function approvedBy()
- BelongsTo User model (admin who approved)
```

### Fillable Fields
- guardian_id
- feedback
- rating
- status
- approved_at
- approved_by

### Casts
- approved_at → datetime

## UI Features

### Guardian Feedback Form
- Modern gradient header (#0675C1 brand color)
- Interactive 10-pixel star rating (hover effects)
- Real-time character counter
- Info box explaining approval process
- Success message display

### Admin Management Panel
- Clean table layout with hover effects
- Color-coded status badges
- Guardian name and email display
- Truncated feedback preview
- Star icons for ratings
- Contextual action buttons (only show approve/reject for pending)
- Delete button always visible
- Pagination links

### Guardian Dashboard
- New "Share Feedback" quick action card
- Amber/Orange gradient styling
- MessageSquare icon
- Links to /guardian/feedback/create

## Testing Guide

### Test Guardian Submission
1. Login as guardian
2. Go to dashboard
3. Click "Share Feedback" card
4. Select 4 stars
5. Enter feedback text
6. Submit
7. Verify success message appears
8. Check database: status should be 'pending'

### Test Admin Approval
1. Login as admin
2. Go to /admin/feedbacks
3. Find pending feedback
4. Click "Approve"
5. Verify success message
6. Check homepage - feedback should appear in carousel

### Test Homepage Display
1. Visit homepage (/)
2. Scroll to "What Our Guardians Say" section
3. Verify only approved feedbacks display
4. Verify carousel auto-scrolls every 3 seconds
5. Check ratings display correctly (5 stars filled)

## Future Enhancements
- [ ] Bulk approve/reject functionality
- [ ] Search and filter feedbacks by guardian name
- [ ] Allow guardians to edit pending feedbacks
- [ ] Display guardian's own feedback history
- [ ] Email notification when feedback is approved/rejected
- [ ] Export feedbacks to CSV
- [ ] Add photos to testimonials
- [ ] Reply feature for admin responses
