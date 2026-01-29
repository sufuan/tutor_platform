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

export default function JobDetail({ auth, job, jobType }) {
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
            <Head title={`${job.title} - Job Details`} />

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
                                <h1 className="text-3xl font-bold text-slate-900">{job.title}</h1>
                                <div className="flex items-center gap-2 mt-2">
                                    <Badge variant="outline" className={jobType === 'tutor' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}>
                                        {jobType === 'tutor' ? 'Tutor Job Request' : 'Guardian Job Post'}
                                    </Badge>
                                    <Badge variant="outline" className={getStatusColor(job.approval_status)}>
                                        {job.approval_status}
                                    </Badge>
                                    <Badge variant="outline" className="capitalize">
                                        Status: {job.status === 'active' ? 'Active' : job.status}
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
                                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{job.description}</p>
                                </CardContent>
                            </Card>

                            {/* Subjects */}
                            {((jobType === 'tutor' && job.subject_names) || (jobType === 'guardian' && job.subject_names)) && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <BookOpen className="h-5 w-5" />
                                            Subjects
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {job.subject_names.map((subject, idx) => (
                                                <Badge key={idx} variant="secondary">
                                                    {subject}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Additional Details */}
                            {jobType === 'guardian' && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Job Requirements</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            {job.education_medium && (
                                                <div>
                                                    <p className="text-sm text-gray-500">Education Medium</p>
                                                    <p className="font-medium capitalize">{job.education_medium}</p>
                                                </div>
                                            )}
                                            {job.tuition_type && (
                                                <div>
                                                    <p className="text-sm text-gray-500">Tuition Type</p>
                                                    <p className="font-medium capitalize">{job.tuition_type}</p>
                                                </div>
                                            )}
                                            {job.class_level && (
                                                <div>
                                                    <p className="text-sm text-gray-500">Class Level</p>
                                                    <p className="font-medium">{job.class_level}</p>
                                                </div>
                                            )}
                                            {job.preferred_tutor_gender && (
                                                <div>
                                                    <p className="text-sm text-gray-500">Preferred Tutor Gender</p>
                                                    <p className="font-medium capitalize">{job.preferred_tutor_gender}</p>
                                                </div>
                                            )}
                                        </div>
                                        {job.special_requirements && (
                                            <div>
                                                <p className="text-sm text-gray-500 mb-2">Special Requirements</p>
                                                <p className="text-slate-700">{job.special_requirements}</p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            )}

                            {jobType === 'tutor' && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Availability</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            {job.available_days && (
                                                <div>
                                                    <p className="text-sm text-gray-500 mb-2">Available Days</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {Array.isArray(job.available_days) ? (
                                                            job.available_days.map((day, idx) => (
                                                                <Badge key={idx} variant="outline">{day}</Badge>
                                                            ))
                                                        ) : (
                                                            <Badge variant="outline">{job.available_days}</Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                            {job.teaching_mode && (
                                                <div>
                                                    <p className="text-sm text-gray-500">Teaching Mode</p>
                                                    <Badge variant="secondary" className="capitalize">{job.teaching_mode}</Badge>
                                                </div>
                                            )}
                                            {job.preferred_gender && (
                                                <div>
                                                    <p className="text-sm text-gray-500">Tutor Gender</p>
                                                    <Badge variant="secondary" className="capitalize">{job.preferred_gender} tutor</Badge>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Rejection Reason */}
                            {job.rejection_reason && (
                                <Card className="border-red-200 bg-red-50">
                                    <CardHeader>
                                        <CardTitle className="text-red-900">Rejection Reason</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-red-800">{job.rejection_reason}</p>
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
                                                {jobType === 'tutor'
                                                    ? `৳${parseInt(job.monthly_salary)}/month`
                                                    : `৳${parseInt(job.salary)}/month`}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <MapPin className="h-5 w-5 text-slate-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Location</p>
                                            <p className="font-medium">
                                                {jobType === 'tutor' 
                                                    ? `${job.district || 'N/A'}, ${job.division || 'N/A'}`
                                                    : `${job.district || 'N/A'}, ${job.division || 'N/A'}`}
                                            </p>
                                        </div>
                                    </div>

                                    {jobType === 'guardian' && (
                                        <>
                                            <div className="flex items-center gap-3">
                                                <Calendar className="h-5 w-5 text-slate-500" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Sessions</p>
                                                    <p className="font-medium">{job.sessions_per_week || job.days_per_week} per week</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <Clock className="h-5 w-5 text-slate-500" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Duration</p>
                                                    <p className="font-medium">{job.session_duration || job.duration_per_session} mins</p>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-5 w-5 text-slate-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Posted</p>
                                            <p className="font-medium">{new Date(job.created_at).toLocaleDateString()}</p>
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
                                                {jobType === 'tutor' 
                                                    ? job.tutor?.user?.name
                                                    : `${job.guardian?.first_name} ${job.guardian?.last_name}`}
                                            </p>
                                        </div>
                                    </div>

                                    {jobType === 'tutor' && job.tutor && (
                                        <div className="flex items-center gap-3">
                                            <Briefcase className="h-5 w-5 text-slate-500" />
                                            <div>
                                                <p className="text-sm text-gray-500">Tutor Code</p>
                                                <p className="font-medium">{job.tutor.tutor_code}</p>
                                            </div>
                                        </div>
                                    )}

                                    {jobType === 'guardian' && job.guardian?.user && (
                                        <>
                                            <div className="flex items-center gap-3">
                                                <Mail className="h-5 w-5 text-slate-500" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Email</p>
                                                    <p className="font-medium text-sm break-words">{job.guardian.user.email}</p>
                                                </div>
                                            </div>

                                            {job.guardian.phone && (
                                                <div className="flex items-center gap-3">
                                                    <Phone className="h-5 w-5 text-slate-500" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Phone</p>
                                                        <p className="font-medium">{job.guardian.phone}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Actions */}
                            {job.approval_status === 'pending' && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Actions</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <Button 
                                            className="w-full" 
                                            onClick={() => {
                                                const routeName = jobType === 'tutor' 
                                                    ? 'admin.tutor-job-requests.approve' 
                                                    : 'admin.jobs.approve';
                                                router.post(route(routeName, job.id));
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
                                                    const routeName = jobType === 'tutor' 
                                                        ? 'admin.tutor-job-requests.reject' 
                                                        : 'admin.jobs.reject';
                                                    router.post(route(routeName, job.id), {
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


