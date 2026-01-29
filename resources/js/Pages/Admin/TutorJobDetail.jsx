import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import {
    ArrowLeft,
    MapPin,
    Calendar,
    Clock,
    User,
    GraduationCap,
    BookOpen,
    Phone,
    Mail,
    Briefcase
} from 'lucide-react';
import { CurrencyBangladeshiIcon } from '@/Components/icons/heroicons-currency-bangladeshi';

export default function TutorJobDetail({ auth, jobRequest }) {
    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            approved: 'bg-green-100 text-green-800 border-green-200',
            rejected: 'bg-red-100 text-red-800 border-red-200',
        };
        return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`${jobRequest.title} - Tutor Job Request Details`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-6">
                        <Button variant="ghost" asChild className="mb-4">
                            <Link href={route('admin.jobs.approvals')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Job Approvals
                            </Link>
                        </Button>

                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">{jobRequest.title}</h1>
                                <div className="flex items-center gap-2 mt-2">
                                    <Badge variant="outline" className="bg-blue-100 text-blue-800">
                                        Tutor Job Request
                                    </Badge>
                                    <Badge variant="outline" className={getStatusColor(jobRequest.approval_status)}>
                                        {jobRequest.approval_status}
                                    </Badge>
                                    <Badge variant="outline" className="capitalize">
                                        Status: {jobRequest.status === 'active' ? 'Active' : jobRequest.status}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Description */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Job Description</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{jobRequest.description}</p>
                                </CardContent>
                            </Card>

                            {/* Subjects */}
                            {jobRequest.subject_names && jobRequest.subject_names.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <BookOpen className="h-5 w-5" />
                                            Subjects
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {jobRequest.subject_names.map((subject, idx) => (
                                                <Badge key={idx} variant="secondary">
                                                    {subject}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Job Requirements */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Job Requirements</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        {jobRequest.education_medium && (
                                            <div>
                                                <p className="text-sm text-gray-500">Education Medium</p>
                                                <p className="font-medium capitalize">{jobRequest.education_medium}</p>
                                            </div>
                                        )}
                                        {jobRequest.tuition_type && (
                                            <div>
                                                <p className="text-sm text-gray-500">Tuition Type</p>
                                                <p className="font-medium capitalize">{jobRequest.tuition_type}</p>
                                            </div>
                                        )}
                                        {jobRequest.class_level && (
                                            <div>
                                                <p className="text-sm text-gray-500">Class Level</p>
                                                <p className="font-medium">{jobRequest.class_level}</p>
                                            </div>
                                        )}
                                        {jobRequest.tutor_gender_preference && (
                                            <div>
                                                <p className="text-sm text-gray-500">Preferred Tutor Gender</p>
                                                <p className="font-medium capitalize">{jobRequest.tutor_gender_preference}</p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Availability */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Availability</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {jobRequest.available_days && jobRequest.available_days.length > 0 && (
                                            <div>
                                                <p className="text-sm text-gray-500 mb-2">Available Days</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {Array.isArray(jobRequest.available_days) ? (
                                                        jobRequest.available_days.map((day, idx) => (
                                                            <Badge key={idx} variant="outline">{day}</Badge>
                                                        ))
                                                    ) : (
                                                        <Badge variant="outline">{jobRequest.available_days}</Badge>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                        {jobRequest.teaching_mode && (
                                            <div>
                                                <p className="text-sm text-gray-500">Teaching Mode</p>
                                                <Badge variant="secondary" className="capitalize">{jobRequest.teaching_mode}</Badge>
                                            </div>
                                        )}
                                        {jobRequest.preferred_gender && (
                                            <div>
                                                <p className="text-sm text-gray-500">Tutor Gender</p>
                                                <Badge variant="secondary" className="capitalize">{jobRequest.preferred_gender} tutor</Badge>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Rejection Reason */}
                            {jobRequest.rejection_reason && (
                                <Card className="border-red-200 bg-red-50">
                                    <CardHeader>
                                        <CardTitle className="text-red-900">Rejection Reason</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-red-800">{jobRequest.rejection_reason}</p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Quick Info */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Quick Info</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <CurrencyBangladeshiIcon size={20} className=" text-green-600" />
                                        <div>
                                            <p className="text-sm text-gray-500">Salary</p>
                                            <p className="font-semibold text-green-600">
                                                {jobRequest.monthly_salary ? `${jobRequest.monthly_salary}/month` : 'Negotiable'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <MapPin className="h-5 w-5 text-slate-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Location</p>
                                            <p className="font-medium">
                                                {jobRequest.district || 'N/A'}, {jobRequest.division || 'N/A'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-5 w-5 text-slate-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Posted</p>
                                            <p className="font-medium">{new Date(jobRequest.created_at).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Posted By */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Posted By</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <User className="h-5 w-5 text-slate-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Name</p>
                                            <p className="font-medium">
                                                {jobRequest.tutor?.user?.name}
                                            </p>
                                        </div>
                                    </div>

                                    {jobRequest.tutor && (
                                        <div className="flex items-center gap-3">
                                            <Briefcase className="h-5 w-5 text-slate-500" />
                                            <div>
                                                <p className="text-sm text-gray-500">Tutor Code</p>
                                                <p className="font-medium">{jobRequest.tutor.tutor_code}</p>
                                            </div>
                                        </div>
                                    )}

                                    {jobRequest.tutor?.user && (
                                        <>
                                            <div className="flex items-center gap-3">
                                                <Mail className="h-5 w-5 text-slate-500" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Email</p>
                                                    <p className="font-medium text-sm break-words">{jobRequest.tutor.user.email}</p>
                                                </div>
                                            </div>

                                            {jobRequest.tutor.phone && (
                                                <div className="flex items-center gap-3">
                                                    <Phone className="h-5 w-5 text-slate-500" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Phone</p>
                                                        <p className="font-medium">{jobRequest.tutor.phone}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Actions */}
                            {jobRequest.approval_status === 'pending' && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Actions</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <Button
                                            className="w-full"
                                            onClick={() => {
                                                router.post(route('admin.tutor-job-requests.approve', jobRequest.id));
                                            }}
                                        >
                                            Approve Job
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            className="w-full"
                                            onClick={() => {
                                                const reason = prompt('Enter rejection reason:');
                                                if (reason) {
                                                    router.post(route('admin.tutor-job-requests.reject', jobRequest.id), {
                                                        rejection_reason: reason
                                                    });
                                                }
                                            }}
                                        >
                                            Reject Job
                                        </Button>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}