import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import {
    ArrowLeft,
    MapPin,
    Calendar,
    Clock,
    BookOpen,
    User,
    GraduationCap,
    Users,
    Home
} from 'lucide-react';
import { CurrencyBangladeshiIcon } from '@/Components/icons/heroicons-currency-bangladeshi';

export default function JobDetail({ auth, job }) {
    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            approved: 'bg-green-100 text-green-800 border-green-200',
            rejected: 'bg-red-100 text-red-800 border-red-200',
        };
        return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    const getJobStatusColor = (status) => {
        const colors = {
            open: 'bg-blue-100 text-blue-800 border-blue-200',
            filled: 'bg-green-100 text-green-800 border-green-200',
            closed: 'bg-gray-100 text-gray-800 border-gray-200',
        };
        return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    return (
        <AuthenticatedLayout>
            <Head title={job.title} />

            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <Button
                        variant="ghost"
                        className="mb-4"
                        asChild
                    >
                        <Link href={route('guardian.jobs.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to My Jobs
                        </Link>
                    </Button>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Job Header */}
                            <Card>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Badge variant="outline" className={getStatusColor(job.approval_status)}>
                                                    {job.approval_status}
                                                </Badge>
                                                <Badge variant="outline" className={getJobStatusColor(job.status)}>
                                                    {job.status}
                                                </Badge>
                                            </div>
                                            <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                                            <CardDescription>
                                                Job Code: {job.job_code} • Posted on {new Date(job.created_at).toLocaleDateString()}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="flex items-center gap-2">
                                            <CurrencyBangladeshiIcon size={20} className=" text-slate-500" />
                                            <div>
                                                <p className="text-xs text-slate-500">Salary</p>
                                                <p className="font-semibold text-green-600">৳{parseInt(job.salary).toLocaleString()}/month</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-5 w-5 text-slate-500" />
                                            <div>
                                                <p className="text-xs text-slate-500">Days per Week</p>
                                                <p className="font-semibold">{job.days_per_week} days</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-5 w-5 text-slate-500" />
                                            <div>
                                                <p className="text-xs text-slate-500">Session Duration</p>
                                                <p className="font-semibold">{job.duration_per_session} mins</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-5 w-5 text-slate-500" />
                                            <div>
                                                <p className="text-xs text-slate-500">Location</p>
                                                {job.preferred_location && job.district
                                                    ? `${job.preferred_location}, ${job.district}`
                                                    : job.district || 'Not specified'}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Job Details */}
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-semibold mb-2">Description</h3>
                                            <p className="text-slate-700 leading-relaxed">{job.description}</p>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold mb-2">Required Subjects</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {Array.isArray(job.subject_names) && job.subject_names.map((subject, idx) => (
                                                    <Badge key={idx} variant="secondary">
                                                        {subject}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold mb-2">Job Details</h3>
                                            <div className="grid grid-cols-2 gap-3 text-sm">
                                                <div>
                                                    <p className="text-slate-500">Class Level</p>
                                                    <p className="font-medium">{job.class_level}</p>
                                                </div>
                                                <div>
                                                    <p className="text-slate-500">Education Medium</p>
                                                    <p className="font-medium">{job.education_medium}</p>
                                                </div>
                                                <div>
                                                    <p className="text-slate-500">Tuition Type</p>
                                                    <p className="font-medium">{job.tuition_type}</p>
                                                </div>
                                                <div>
                                                    <p className="text-slate-500">Gender Preference</p>
                                                    <p className="font-medium capitalize">{job.preferred_tutor_gender || 'Any'}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {job.additional_requirements && (
                                            <div>
                                                <h3 className="font-semibold mb-2">Additional Requirements</h3>
                                                <p className="text-slate-700">{job.additional_requirements}</p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <Card className="sticky top-6">
                                <CardHeader>
                                    <CardTitle>Student Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {job.student && (
                                        <>
                                            <div>
                                                <p className="text-sm text-slate-500">Student Name</p>
                                                <p className="font-medium">{job.student.name}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-slate-500">Age</p>
                                                <p className="font-medium">{job.student.age} years</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-slate-500">Gender</p>
                                                <p className="font-medium capitalize">{job.student.gender}</p>
                                            </div>
                                            {job.student.school_name && (
                                                <div>
                                                    <p className="text-sm text-slate-500">School</p>
                                                    <p className="font-medium">{job.student.school_name}</p>
                                                </div>
                                            )}
                                        </>
                                    )}

                                    <div className="pt-4 border-t">
                                        <Button
                                            className="w-full"
                                            asChild
                                        >
                                            <Link href={route('guardian.job-applications', job.id)}>
                                                <Users className="mr-2 h-4 w-4" />
                                                View Applications
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


