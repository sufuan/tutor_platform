import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { 
    User,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    ArrowLeft,
    Home,
    Calendar,
    BookOpen
} from 'lucide-react';

export default function GuardianView({ auth, guardian }) {
    return (
        <AuthenticatedLayout
            user={auth}
            header={
                <div className="flex items-center gap-4">
                    <Link href={route('admin.guardians.index')}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Guardians
                        </Button>
                    </Link>
                    <div>
                        <h2 className="font-semibold text-3xl text-gray-800 leading-tight">
                            Guardian Profile
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            View guardian details and posted jobs
                        </p>
                    </div>
                </div>
            }
        >
            <Head title={`Guardian - ${guardian.user?.name || 'Profile'}`} />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Profile Header Card */}
                    <Card className="shadow-lg">
                        <CardContent className="pt-6">
                            <div className="flex items-start gap-6">
                                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white font-semibold text-3xl flex-shrink-0">
                                    {guardian.user?.name?.charAt(0) || 'G'}
                                </div>
                                <div className="flex-1">
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        {guardian.user?.name || 'Unknown Guardian'}
                                    </h1>
                                    <p className="text-gray-600 mt-1">Guardian ID: G-{String(guardian.id).padStart(5, '0')}</p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                        <div className="flex items-center text-sm text-gray-700">
                                            <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                            <span className="font-medium">{guardian.user?.email || 'N/A'}</span>
                                        </div>
                                        {guardian.phone && (
                                            <div className="flex items-center text-sm text-gray-700">
                                                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                                <span className="font-medium">{guardian.phone}</span>
                                            </div>
                                        )}
                                        {(guardian.division || guardian.district) && (
                                            <div className="flex items-center text-sm text-gray-700">
                                                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                                                <span className="font-medium">
                                                    {guardian.district && guardian.division 
                                                        ? `${guardian.district}, ${guardian.division}` 
                                                        : guardian.location?.city || 'N/A'}
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex items-center text-sm text-gray-700">
                                            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                                            <span className="font-medium">
                                                Joined {new Date(guardian.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>

                                    {guardian.detailed_address && (
                                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-start text-sm">
                                                <Home className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                                                <div>
                                                    <p className="text-xs text-gray-500 mb-1">Detailed Address</p>
                                                    <p className="text-gray-700">{guardian.detailed_address}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Profile Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Profile Completion */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Profile Status</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-2">Profile Completion</p>
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-green-500 rounded-full transition-all"
                                                    style={{ width: `${guardian.profile_completion_percentage || 0}%` }}
                                                />
                                            </div>
                                            <span className="text-sm font-semibold text-gray-700">
                                                {guardian.profile_completion_percentage || 0}%
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-2">Status</p>
                                        <Badge variant={guardian.profile_completion_status === 'completed' ? 'default' : 'secondary'}>
                                            {guardian.profile_completion_status || 'Incomplete'}
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Preferences */}
                        {(guardian.preferred_subjects?.length > 0 || guardian.preferred_class_levels?.length > 0) && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <BookOpen className="h-5 w-5" />
                                        Preferences
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {guardian.preferred_subjects?.length > 0 && (
                                        <div>
                                            <p className="text-sm text-gray-600 mb-2">Preferred Subjects</p>
                                            <div className="flex flex-wrap gap-2">
                                                {guardian.preferred_subjects.map((subject, idx) => (
                                                    <Badge key={idx} variant="secondary">
                                                        {subject}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {guardian.preferred_class_levels?.length > 0 && (
                                        <div>
                                            <p className="text-sm text-gray-600 mb-2">Preferred Class Levels</p>
                                            <div className="flex flex-wrap gap-2">
                                                {guardian.preferred_class_levels.map((level, idx) => (
                                                    <Badge key={idx} variant="outline">
                                                        {level}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Posted Jobs */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Briefcase className="h-5 w-5" />
                                Posted Jobs ({guardian.jobs?.length || 0})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {guardian.jobs && guardian.jobs.length > 0 ? (
                                <div className="space-y-3">
                                    {guardian.jobs.map((job) => (
                                        <div 
                                            key={job.id}
                                            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-gray-900">{job.title}</h4>
                                                    <p className="text-sm text-gray-600 mt-1">Job Code: {job.job_code}</p>
                                                    <div className="flex items-center gap-3 mt-2">
                                                        <Badge variant={
                                                            job.approval_status === 'approved' ? 'default' : 
                                                            job.approval_status === 'rejected' ? 'destructive' : 
                                                            'secondary'
                                                        }>
                                                            {job.approval_status}
                                                        </Badge>
                                                        <Badge variant="outline">
                                                            {job.status}
                                                        </Badge>
                                                        <span className="text-sm text-gray-600">
                                                            {new Date(job.created_at).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <Link href={route('admin.jobs.view', job.id)}>
                                                    <Button size="sm" variant="outline">
                                                        View Job
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-600">
                                    <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                                    <p>No jobs posted yet</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

