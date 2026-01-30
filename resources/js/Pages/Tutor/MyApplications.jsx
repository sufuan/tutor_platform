import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { 
    Briefcase, 
    MapPin, 
    Calendar, 
    Clock,
    Eye,
    FileText,
    CheckCircle,
    XCircle,
    AlertCircle,
    Plus
} from 'lucide-react';
import { CurrencyBangladeshiIcon } from '@/Components/icons/heroicons-currency-bangladeshi';

export default function MyApplications({ auth, applications, stats }) {
    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            shortlisted: 'bg-blue-100 text-blue-800 border-blue-200',
            accepted: 'bg-green-100 text-green-800 border-green-200',
            rejected: 'bg-red-100 text-red-800 border-red-200',
        };
        return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return <Clock className="h-4 w-4" />;
            case 'shortlisted':
                return <FileText className="h-4 w-4" />;
            case 'accepted':
                return <CheckCircle className="h-4 w-4" />;
            case 'rejected':
                return <XCircle className="h-4 w-4" />;
            default:
                return <AlertCircle className="h-4 w-4" />;
        }
    };

    const groupedApplications = {
        pending: applications.filter(a => a.status === 'pending'),
        shortlisted: applications.filter(a => a.status === 'shortlisted'),
        accepted: applications.filter(a => a.status === 'accepted'),
        rejected: applications.filter(a => a.status === 'rejected'),
    };

    const ApplicationCard = ({ application }) => {
        const job = application.job;
        const guardian = job.guardian;

        return (
            <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className={getStatusColor(application.status)}>
                                    <span className="flex items-center gap-1">
                                        {getStatusIcon(application.status)}
                                        {application.status}
                                    </span>
                                </Badge>
                                {!application.status_read && (
                                    <Badge variant="secondary">New Update</Badge>
                                )}
                            </div>
                            <CardTitle className="text-xl">{job.title}</CardTitle>
                            <CardDescription>
                                Applied on {new Date(application.applied_at).toLocaleDateString()}
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location?.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <CurrencyBangladeshiIcon size={16} className="" />
                            <span className="font-semibold text-green-600">{job.salary}/month</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>{job.days_per_week} days/week</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span>{job.duration_per_session} mins</span>
                        </div>
                    </div>

                    <div>
                        <div className="text-xs text-gray-500 mb-2">Subjects:</div>
                        <div className="flex flex-wrap gap-1">
                            {Array.isArray(job.subject_names) && job.subject_names.map((subject, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                    {subject}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {application.cover_letter && (
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">Your Cover Letter:</p>
                            <p className="text-sm text-gray-700 line-clamp-3">
                                {application.cover_letter}
                            </p>
                        </div>
                    )}

                    <div className="flex justify-between items-center pt-2 border-t">
                        <div className="text-sm text-gray-600">
                            Posted by: <span className="font-medium">{guardian?.first_name} {guardian?.last_name}</span>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            asChild
                        >
                            <Link href={route('jobs.show', job.id)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Job
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    };

    return (
        <AuthenticatedLayout>
            <Head title="My Applications" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
                                    <div className="text-sm text-gray-600">Total Applications</div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
                                    <div className="text-sm text-gray-600">Under Review</div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-purple-600">{stats.shortlisted}</div>
                                    <div className="text-sm text-gray-600">Shortlisted</div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-green-600">{stats.accepted}</div>
                                    <div className="text-sm text-gray-600">Accepted</div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
                            <p className="text-gray-600">Track all your job applications</p>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" asChild>
                                <Link href={route('tutor.job-request.create')}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Post Job Request
                                </Link>
                            </Button>
                            <Button asChild>
                                <Link href={route('tutor.jobs.browse')}>
                                    <Briefcase className="mr-2 h-4 w-4" />
                                    Browse Jobs
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Applications Tabs */}
                    <Tabs defaultValue="pending" className="space-y-4">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="pending">
                                Pending ({groupedApplications.pending.length})
                            </TabsTrigger>
                            <TabsTrigger value="shortlisted">
                                Shortlisted ({groupedApplications.shortlisted.length})
                            </TabsTrigger>
                            <TabsTrigger value="accepted">
                                Accepted ({groupedApplications.accepted.length})
                            </TabsTrigger>
                            <TabsTrigger value="rejected">
                                Rejected ({groupedApplications.rejected.length})
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="pending" className="space-y-4">
                            {groupedApplications.pending.length === 0 ? (
                                <Card>
                                    <CardContent className="pt-6 text-center py-12">
                                        <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No pending applications</h3>
                                        <p className="text-gray-600 mb-4">
                                            Browse available jobs and apply to get started
                                        </p>
                                        <Button asChild>
                                            <Link href={route('tutor.jobs.browse')}>
                                                Browse Jobs
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ) : (
                                <div className="grid gap-4 md:grid-cols-2">
                                    {groupedApplications.pending.map(application => (
                                        <ApplicationCard key={application.id} application={application} />
                                    ))}
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="shortlisted" className="space-y-4">
                            {groupedApplications.shortlisted.length === 0 ? (
                                <Card>
                                    <CardContent className="pt-6 text-center py-12">
                                        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No shortlisted applications</h3>
                                        <p className="text-gray-600">
                                            Applications that guardians are considering will appear here
                                        </p>
                                    </CardContent>
                                </Card>
                            ) : (
                                <div className="grid gap-4 md:grid-cols-2">
                                    {groupedApplications.shortlisted.map(application => (
                                        <ApplicationCard key={application.id} application={application} />
                                    ))}
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="accepted" className="space-y-4">
                            {groupedApplications.accepted.length === 0 ? (
                                <Card>
                                    <CardContent className="pt-6 text-center py-12">
                                        <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No accepted applications</h3>
                                        <p className="text-gray-600">
                                            Successfully hired positions will appear here
                                        </p>
                                    </CardContent>
                                </Card>
                            ) : (
                                <div className="grid gap-4 md:grid-cols-2">
                                    {groupedApplications.accepted.map(application => (
                                        <ApplicationCard key={application.id} application={application} />
                                    ))}
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="rejected" className="space-y-4">
                            {groupedApplications.rejected.length === 0 ? (
                                <Card>
                                    <CardContent className="pt-6 text-center py-12">
                                        <XCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No rejected applications</h3>
                                        <p className="text-gray-600">
                                            Rejected applications will appear here
                                        </p>
                                    </CardContent>
                                </Card>
                            ) : (
                                <div className="grid gap-4 md:grid-cols-2">
                                    {groupedApplications.rejected.map(application => (
                                        <ApplicationCard key={application.id} application={application} />
                                    ))}
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}



