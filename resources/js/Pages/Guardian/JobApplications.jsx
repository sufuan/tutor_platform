import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { Textarea } from '@/Components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import {
    User,
    MapPin,
    Star,
    GraduationCap,
    Calendar,
    CheckCircle,
    XCircle,
    Eye,
    ArrowLeft,
    Mail,
    Phone,
    BookOpen,
    ThumbsUp,
    ThumbsDown
} from 'lucide-react';
import { CurrencyBangladeshiIcon } from '@/Components/icons/heroicons-currency-bangladeshi';

export default function JobApplications({ auth, job, applications }) {
    const { toast } = useToast();

    const groupedApplications = {
        pending: applications.filter(a => a.status === 'pending'),
        shortlisted: applications.filter(a => a.status === 'shortlisted'),
        accepted: applications.filter(a => a.status === 'accepted'),
        rejected: applications.filter(a => a.status === 'rejected'),
    };

    const handleShortlist = (applicationId) => {
        router.post(route('guardian.applications.shortlist', applicationId));
    };

    const handleRecommendHire = (applicationId) => {
        router.post(route('guardian.applications.recommend-hire', applicationId), {}, {
            onSuccess: () => {
                toast({
                    title: "Recommendation Sent",
                    description: "Your recommendation has been sent to the admin for review.",
                });
            }
        });
    };

    const handleRecommendReject = (applicationId) => {
        router.post(route('guardian.applications.recommend-reject', applicationId), {}, {
            onSuccess: () => {
                toast({
                    title: "Feedback Sent",
                    description: "Your feedback has been sent to the admin.",
                });
            }
        });
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

    const ApplicationCard = ({ application }) => {
        const tutor = application.tutor;
        
        return (
            <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                    <div className="flex gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={tutor.photo} />
                            <AvatarFallback>
                                {tutor.first_name?.[0]}{tutor.last_name?.[0]}
                            </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-semibold text-lg">
                                        {tutor.first_name} {tutor.last_name}
                                    </h3>
                                    <p className="text-sm text-gray-600">{tutor.tutor_code}</p>
                                </div>
                                <Badge variant="outline" className={getStatusColor(application.status)}>
                                    {application.status}
                                </Badge>
                            </div>

                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <GraduationCap className="h-4 w-4" />
                                    <span>{tutor.institution} - {tutor.education_level}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <MapPin className="h-4 w-4" />
                                    <span>{job.preferred_location && job.district
                                ? `${job.preferred_location}, ${job.district}`
                                : job.district || 'Not specified'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <CurrencyBangladeshiIcon size={16} className="" />
                                    <span>{tutor.hourly_rate}/hour</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Calendar className="h-4 w-4" />
                                    <span>{tutor.experience_years} years experience</span>
                                </div>
                            </div>

                            {tutor.subject_names && tutor.subject_names.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-4">
                                    {tutor.subject_names.slice(0, 4).map((subject, idx) => (
                                        <Badge key={idx} variant="secondary" className="text-xs">
                                            {subject}
                                        </Badge>
                                    ))}
                                    {tutor.subject_names.length > 4 && (
                                        <Badge variant="secondary" className="text-xs">
                                            +{tutor.subject_names.length - 4}
                                        </Badge>
                                    )}
                                </div>
                            )}

                            {application.cover_letter && (
                                <div className="p-3 bg-gray-50 rounded-lg mb-4">
                                    <p className="text-sm text-gray-700 line-clamp-3">
                                        {application.cover_letter}
                                    </p>
                                </div>
                            )}

                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    asChild
                                >
                                    <Link href={route('tutors.show', tutor.id)}>
                                        <Eye className="mr-2 h-4 w-4" />
                                        View Profile
                                    </Link>
                                </Button>

                                {application.status === 'pending' && (
                                    <>
                                       
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleRecommendHire(application.id)}
                                        >
                                            <ThumbsUp className="mr-2 h-4 w-4" />
                                            Recommend
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleRecommendReject(application.id)}
                                        >
                                            <ThumbsDown className="mr-2 h-4 w-4" />
                                            Not Interested
                                        </Button>
                                    </>
                                )}

                                {application.status === 'shortlisted' && (
                                    <>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleRecommendHire(application.id)}
                                        >
                                            <ThumbsUp className="mr-2 h-4 w-4" />
                                            Recommend
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleRecommendReject(application.id)}
                                        >
                                            <ThumbsDown className="mr-2 h-4 w-4" />
                                            Not Interested
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Applications for ${job.title}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <Button
                        variant="ghost"
                        asChild
                        className="mb-6"
                    >
                        <Link href={route('guardian.jobs.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to My Jobs
                        </Link>
                    </Button>

                    {/* Job Info */}
                    <Card className="mb-6">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-2xl">{job.title}</CardTitle>
                                    <CardDescription>
                                        Job Code: {job.job_code} • {applications.length} Applications
                                    </CardDescription>
                                </div>
                                <Badge variant="outline" className="text-lg">
                                    {job.salary}/month
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center p-3 bg-blue-50 rounded-lg">
                                    <div className="text-2xl font-bold text-blue-600">
                                        {groupedApplications.pending.length}
                                    </div>
                                    <div className="text-xs text-gray-600">Pending</div>
                                </div>
                                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                                    <div className="text-2xl font-bold text-yellow-600">
                                        {groupedApplications.shortlisted.length}
                                    </div>
                                    <div className="text-xs text-gray-600">Shortlisted</div>
                                </div>
                                <div className="text-center p-3 bg-green-50 rounded-lg">
                                    <div className="text-2xl font-bold text-green-600">
                                        {groupedApplications.accepted.length}
                                    </div>
                                    <div className="text-xs text-gray-600">Hired</div>
                                </div>
                                <div className="text-center p-3 bg-red-50 rounded-lg">
                                    <div className="text-2xl font-bold text-red-600">
                                        {groupedApplications.rejected.length}
                                    </div>
                                    <div className="text-xs text-gray-600">Rejected</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

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
                                Hired ({groupedApplications.accepted.length})
                            </TabsTrigger>
                            <TabsTrigger value="rejected">
                                Rejected ({groupedApplications.rejected.length})
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="pending" className="space-y-4">
                            {groupedApplications.pending.length === 0 ? (
                                <Card>
                                    <CardContent className="pt-6 text-center text-gray-500">
                                        No pending applications
                                    </CardContent>
                                </Card>
                            ) : (
                                groupedApplications.pending.map(application => (
                                    <ApplicationCard key={application.id} application={application} />
                                ))
                            )}
                        </TabsContent>

                        <TabsContent value="shortlisted" className="space-y-4">
                            {groupedApplications.shortlisted.length === 0 ? (
                                <Card>
                                    <CardContent className="pt-6 text-center text-gray-500">
                                        No shortlisted applications
                                    </CardContent>
                                </Card>
                            ) : (
                                groupedApplications.shortlisted.map(application => (
                                    <ApplicationCard key={application.id} application={application} />
                                ))
                            )}
                        </TabsContent>

                        <TabsContent value="accepted" className="space-y-4">
                            {groupedApplications.accepted.length === 0 ? (
                                <Card>
                                    <CardContent className="pt-6 text-center text-gray-500">
                                        No hired tutors yet
                                    </CardContent>
                                </Card>
                            ) : (
                                groupedApplications.accepted.map(application => (
                                    <ApplicationCard key={application.id} application={application} />
                                ))
                            )}
                        </TabsContent>

                        <TabsContent value="rejected" className="space-y-4">
                            {groupedApplications.rejected.length === 0 ? (
                                <Card>
                                    <CardContent className="pt-6 text-center text-gray-500">
                                        No rejected applications
                                    </CardContent>
                                </Card>
                            ) : (
                                groupedApplications.rejected.map(application => (
                                    <ApplicationCard key={application.id} application={application} />
                                ))
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}



