import GuestLayout from '@/Layouts/GuestLayout';
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
    Home,
    Briefcase
} from 'lucide-react';
import { CurrencyBangladeshiIcon } from '@/Components/icons/heroicons-currency-bangladeshi';

export default function TutorJobDetails({ job }) {
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
            active: 'bg-blue-100 text-blue-800 border-blue-200',
            inactive: 'bg-gray-100 text-gray-800 border-gray-200',
            closed: 'bg-red-100 text-red-800 border-red-200',
        };
        return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    return (
        <GuestLayout>
            <Head title={job.title} />

            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <Button 
                        variant="ghost" 
                        className="mb-4"
                        asChild
                    >
                        <Link href={route('jobs.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Jobs
                        </Link>
                    </Button>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Job Header */}
                            <Card>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                                                    TUTOR REQUEST
                                                </Badge>
                                                <Badge variant="outline" className={getJobStatusColor(job.status)}>
                                                    {job.status}
                                                </Badge>
                                            </div>
                                            <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                                            <CardDescription>
                                                Posted on {new Date(job.created_at).toLocaleDateString()} • {job.views} views
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="flex items-center gap-2">
                                            <CurrencyBangladeshiIcon size={20} className=" text-slate-500" />
                                            <div>
                                                <p className="text-xs text-slate-500">Expected Salary</p>
                                                <p className="font-semibold text-green-600">৳{parseInt(job.monthly_salary).toLocaleString()}/month</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-5 w-5 text-slate-500" />
                                            <div>
                                                <p className="text-xs text-slate-500">Location</p>
                                                <p className="font-semibold">
                                                    {job.district}, {job.division}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Home className="h-5 w-5 text-slate-500" />
                                            <div>
                                                <p className="text-xs text-slate-500">Teaching Mode</p>
                                                <p className="font-semibold capitalize">{job.teaching_mode}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Job Details */}
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-semibold mb-2">About This Opportunity</h3>
                                            <p className="text-slate-700 leading-relaxed">{job.description}</p>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold mb-2">Subjects Offered</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {Array.isArray(job.subject_names) && job.subject_names.map((subject, idx) => (
                                                    <Badge key={idx} variant="secondary">
                                                        {subject}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        {job.available_days && Array.isArray(job.available_days) && job.available_days.length > 0 && (
                                            <div>
                                                <h3 className="font-semibold mb-2">Available Days</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {job.available_days.map((day, idx) => (
                                                        <Badge key={idx} variant="outline">
                                                            {day}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {job.preferred_gender && (
                                            <div>
                                                <h3 className="font-semibold mb-2">Tutor Gender</h3>
                                                <Badge variant="secondary" className="capitalize">
                                                    {job.preferred_gender} tutor
                                                </Badge>
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
                                    <CardTitle>Tutor Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {job.tutor && (
                                        <>
                                            <div className="text-center pb-4 border-b">
                                                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
                                                    {job.tutor.user?.name?.charAt(0).toUpperCase() || 'T'}
                                                </div>
                                                <p className="font-semibold text-lg">{job.tutor.user?.name || 'Unknown'}</p>
                                                <p className="text-sm text-slate-500">{job.tutor.tutor_code}</p>
                                            </div>

                                            {job.tutor.institution && (
                                                <div>
                                                    <p className="text-sm text-slate-500">Institution</p>
                                                    <p className="font-medium">{job.tutor.institution}</p>
                                                </div>
                                            )}

                                            {job.tutor.education_level && (
                                                <div>
                                                    <p className="text-sm text-slate-500">Education Level</p>
                                                    <p className="font-medium capitalize">{job.tutor.education_level}</p>
                                                </div>
                                            )}

                                            {job.tutor.experience_years && (
                                                <div>
                                                    <p className="text-sm text-slate-500">Experience</p>
                                                    <p className="font-medium">{job.tutor.experience_years} years</p>
                                                </div>
                                            )}

                                            {job.tutor.verification_status && (
                                                <div>
                                                    <p className="text-sm text-slate-500 mb-1">Verification Status</p>
                                                    <Badge 
                                                        variant="outline" 
                                                        className={
                                                            job.tutor.verification_status === 'verified' 
                                                                ? 'bg-green-50 text-green-700 border-green-200' 
                                                                : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                                        }
                                                    >
                                                        {job.tutor.verification_status}
                                                    </Badge>
                                                </div>
                                            )}

                                            <div className="pt-4 space-y-2">
                                                <Button className="w-full" size="lg" asChild>
                                                    <Link href={`/tutors/${job.tutor.id}`}>
                                                        View Full Profile
                                                    </Link>
                                                </Button>
                                                <Button variant="outline" className="w-full" size="lg" asChild>
                                                    <Link href={route('login')}>
                                                        Contact Tutor
                                                    </Link>
                                                </Button>
                                                <p className="text-xs text-center text-slate-500">
                                                    Login to contact this tutor
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}


