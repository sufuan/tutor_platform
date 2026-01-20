import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { useState } from 'react';
import { 
    MapPin, 
    DollarSign, 
    Calendar,
    Clock,
    User,
    Briefcase,
    FileText,
    Mail,
    Phone,
    Eye,
    ExternalLink,
    CheckCircle,
    XCircle,
    ThumbsUp
} from 'lucide-react';

export default function JobApplications({ auth, applications, stats }) {
    const [processingId, setProcessingId] = useState(null);

    const handleStatusChange = (applicationId, status) => {
        if (confirm(`Are you sure you want to ${status} this application?`)) {
            setProcessingId(applicationId);
            router.post(route('admin.applications.update-status', applicationId), {
                status: status
            }, {
                preserveScroll: true,
                onFinish: () => setProcessingId(null)
            });
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            shortlisted: 'bg-blue-100 text-blue-800 border-blue-200',
            accepted: 'bg-green-100 text-green-800 border-green-200',
            rejected: 'bg-red-100 text-red-800 border-red-200',
        };
        return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    const groupedApplications = {
        pending: applications.filter(a => a.status === 'pending'),
        shortlisted: applications.filter(a => a.status === 'shortlisted'),
        accepted: applications.filter(a => a.status === 'accepted'),
        rejected: applications.filter(a => a.status === 'rejected'),
    };

    const ApplicationCard = ({ application }) => {
        const tutor = application.tutor;
        const job = application.job;
        const guardian = job?.guardian;

        return (
            <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className={getStatusColor(application.status)}>
                            {application.status}
                        </Badge>
                        <Badge variant="secondary">
                            {new Date(application.applied_at).toLocaleDateString()}
                        </Badge>
                    </div>
                    <CardTitle className="text-lg">Application #{application.id}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Tutor Details */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-sm text-blue-600 border-b pb-2">
                                <User className="inline h-4 w-4 mr-1" />
                                Tutor Details
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div>
                                    <span className="text-gray-600">Name:</span>{' '}
                                    <span className="font-medium">
                                        {tutor?.user?.first_name} {tutor?.user?.last_name}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-600">Email:</span>{' '}
                                    <span className="font-medium">{tutor?.user?.email}</span>
                                </div>
                                {tutor?.phone && (
                                    <div>
                                        <span className="text-gray-600">Phone:</span>{' '}
                                        <span className="font-medium">{tutor.phone}</span>
                                    </div>
                                )}
                                {tutor?.hourly_rate && (
                                    <div>
                                        <span className="text-gray-600">Hourly Rate:</span>{' '}
                                        <span className="font-medium text-green-600">৳{tutor.hourly_rate}/hr</span>
                                    </div>
                                )}
                                {tutor?.education && (
                                    <div>
                                        <span className="text-gray-600">Education:</span>{' '}
                                        <span className="font-medium">{tutor.education}</span>
                                    </div>
                                )}
                                <div>
                                    <span className="text-gray-600">Verification:</span>{' '}
                                    <Badge variant="outline" className="ml-1 text-xs">
                                        {tutor?.verification_status}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        {/* Job Details */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-sm text-green-600 border-b pb-2">
                                <Briefcase className="inline h-4 w-4 mr-1" />
                                Job Details
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div>
                                    <span className="text-gray-600">Title:</span>{' '}
                                    <span className="font-medium">{job?.title}</span>
                                </div>
                                <div>
                                    <span className="text-gray-600">Code:</span>{' '}
                                    <span className="font-medium">{job?.job_code}</span>
                                </div>
                                <div>
                                    <span className="text-gray-600">Salary:</span>{' '}
                                    <span className="font-medium text-green-600">৳{job?.salary}/month</span>
                                </div>
                                <div>
                                    <span className="text-gray-600">Location:</span>{' '}
                                    <span className="font-medium">{job?.location?.name}</span>
                                </div>
                                {guardian && (
                                    <div>
                                        <span className="text-gray-600">Guardian:</span>{' '}
                                        <span className="font-medium">
                                            {guardian.user?.first_name} {guardian.user?.last_name}
                                        </span>
                                    </div>
                                )}
                                {guardian?.user?.email && (
                                    <div>
                                        <span className="text-gray-600">Guardian Email:</span>{' '}
                                        <span className="font-medium">{guardian.user.email}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Cover Letter */}
                    {application.cover_letter && (
                        <div className="mt-4 pt-4 border-t">
                            <h4 className="text-sm font-semibold mb-2">Cover Letter</h4>
                            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                                {application.cover_letter}
                            </p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    {application.status === 'pending' && (
                        <div className="mt-4 pt-4 border-t flex gap-2">
                            <Button 
                                size="sm" 
                                variant="outline"
                                className="text-blue-600 border-blue-600 hover:bg-blue-50"
                                onClick={() => handleStatusChange(application.id, 'shortlisted')}
                                disabled={processingId === application.id}
                            >
                                <ThumbsUp className="h-4 w-4 mr-2" />
                                Shortlist
                            </Button>
                            <Button 
                                size="sm" 
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleStatusChange(application.id, 'accepted')}
                                disabled={processingId === application.id}
                            >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Accept
                            </Button>
                            <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleStatusChange(application.id, 'rejected')}
                                disabled={processingId === application.id}
                            >
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                            </Button>
                        </div>
                    )}
                    {application.status === 'shortlisted' && (
                        <div className="mt-4 pt-4 border-t flex gap-2">
                            <Button 
                                size="sm" 
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleStatusChange(application.id, 'accepted')}
                                disabled={processingId === application.id}
                            >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Accept
                            </Button>
                            <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleStatusChange(application.id, 'rejected')}
                                disabled={processingId === application.id}
                            >
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                            </Button>
                        </div>
                    )}

                    {/* CV */}
                    {application.cv_path && (
                        <div className="mt-3">
                            <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => window.open(`/storage/${application.cv_path}`, '_blank')}
                            >
                                <FileText className="h-4 w-4 mr-2" />
                                View CV
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        );
    };

    return (
        <AuthenticatedLayout>
            <Head title="Job Applications" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Job Applications</h1>
                        <p className="text-gray-600">View all tutor applications to guardian jobs</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium text-gray-600">Total</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.total}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium text-gray-600">Shortlisted</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-blue-600">{stats.shortlisted}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium text-gray-600">Accepted</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-600">{stats.accepted}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium text-gray-600">Rejected</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Tabs */}
                    <Tabs defaultValue="pending" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="pending" className="relative">
                                Pending
                                {stats.pending > 0 && (
                                    <Badge className="ml-2 bg-yellow-500">{stats.pending}</Badge>
                                )}
                            </TabsTrigger>
                            <TabsTrigger value="shortlisted">
                                Shortlisted
                            </TabsTrigger>
                            <TabsTrigger value="accepted">
                                Accepted
                            </TabsTrigger>
                            <TabsTrigger value="rejected">
                                Rejected
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="pending" className="space-y-4">
                            {groupedApplications.pending.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4">
                                    {groupedApplications.pending.map((application) => (
                                        <ApplicationCard key={application.id} application={application} />
                                    ))}
                                </div>
                            ) : (
                                <Card>
                                    <CardContent className="text-center py-12 text-gray-500">
                                        No pending applications
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        <TabsContent value="shortlisted" className="space-y-4">
                            {groupedApplications.shortlisted.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4">
                                    {groupedApplications.shortlisted.map((application) => (
                                        <ApplicationCard key={application.id} application={application} />
                                    ))}
                                </div>
                            ) : (
                                <Card>
                                    <CardContent className="text-center py-12 text-gray-500">
                                        No shortlisted applications
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        <TabsContent value="accepted" className="space-y-4">
                            {groupedApplications.accepted.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4">
                                    {groupedApplications.accepted.map((application) => (
                                        <ApplicationCard key={application.id} application={application} />
                                    ))}
                                </div>
                            ) : (
                                <Card>
                                    <CardContent className="text-center py-12 text-gray-500">
                                        No accepted applications
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        <TabsContent value="rejected" className="space-y-4">
                            {groupedApplications.rejected.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4">
                                    {groupedApplications.rejected.map((application) => (
                                        <ApplicationCard key={application.id} application={application} />
                                    ))}
                                </div>
                            ) : (
                                <Card>
                                    <CardContent className="text-center py-12 text-gray-500">
                                        No rejected applications
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
