import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { Textarea } from '@/Components/ui/textarea';
import { Label } from '@/Components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { useState } from 'react';
import { 
    FileCheck, 
    MapPin, 
    Calendar,
    Clock,
    CheckCircle,
    XCircle,
    Eye,
    User,
    Briefcase
} from 'lucide-react';
import { CurrencyBangladeshiIcon } from '@/Components/icons/heroicons-currency-bangladeshi';

export default function JobApprovals({ auth, jobs, stats }) {
    const [selectedJob, setSelectedJob] = useState(null);
    const [showApproveDialog, setShowApproveDialog] = useState(false);
    const [showRejectDialog, setShowRejectDialog] = useState(false);

    const { data, setData, post, processing, reset } = useForm({
        rejection_reason: '',
    });

    const handleApprove = (job) => {
        setSelectedJob(job);
        setShowApproveDialog(true);
    };

    const confirmApprove = () => {
        const routeName = selectedJob.job_type === 'tutor' 
            ? 'admin.tutor-job-requests.approve' 
            : 'admin.jobs.approve';
        
        router.post(route(routeName, selectedJob.id), {}, {
            onSuccess: () => {
                setShowApproveDialog(false);
                setSelectedJob(null);
            }
        });
    };

    const handleReject = (job) => {
        setSelectedJob(job);
        setShowRejectDialog(true);
    };

    const confirmReject = () => {
        const routeName = selectedJob.job_type === 'tutor' 
            ? 'admin.tutor-job-requests.reject' 
            : 'admin.jobs.reject';
        
        router.post(route(routeName, selectedJob.id), {
            rejection_reason: data.rejection_reason
        }, {
            onSuccess: () => {
                setShowRejectDialog(false);
                setSelectedJob(null);
                reset();
            }
        });
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            approved: 'bg-green-100 text-green-800 border-green-200',
            rejected: 'bg-red-100 text-red-800 border-red-200',
        };
        return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    const groupedJobs = {
        pending: jobs.filter(j => j.approval_status === 'pending'),
        approved: jobs.filter(j => j.approval_status === 'approved'),
        rejected: jobs.filter(j => j.approval_status === 'rejected'),
    };

    const JobCard = ({ job }) => (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className={job.job_type === 'tutor' ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-purple-100 text-purple-800 border-purple-200'}>
                                {job.job_type === 'tutor' ? 'Tutor Request' : 'Guardian Post'}
                            </Badge>
                            <Badge variant="outline" className={getStatusColor(job.approval_status)}>
                                {job.approval_status}
                            </Badge>
                            {job.applications_count > 0 && (
                                <Badge variant="secondary">
                                    {job.applications_count} applications
                                </Badge>
                            )}
                        </div>
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <CardDescription>
                            {job.job_type === 'tutor' ? `Tutor Code: ${job.tutor?.tutor_code}` : `Job Code: ${job.job_code}`}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="h-4 w-4" />
                    <span>Posted by: {job.job_type === 'tutor' ? job.tutor?.user?.name : `${job.guardian?.first_name} ${job.guardian?.last_name}`}</span>
                </div>

                <p className="text-sm text-gray-600 line-clamp-3">{job.description}</p>

                <div className="grid grid-cols-2 gap-3 text-sm">
                    {job.job_type === 'guardian' && job.location?.name && (
                        <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location?.name}</span>
                        </div>
                    )}
                    {job.job_type === 'tutor' && (job.division || job.district) && (
                        <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>{job.district}, {job.division}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-600">
                        <CurrencyBangladeshiIcon size={16} className="" />
                        <span className="font-semibold text-green-600">
                            ৳{job.job_type === 'tutor' ? parseInt(job.monthly_salary) : parseInt(job.salary)}/month
                        </span>
                    </div>
                    {job.job_type === 'guardian' && job.days_per_week && (
                        <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>{job.days_per_week} days/week</span>
                        </div>
                    )}
                    {job.job_type === 'tutor' && job.available_days && (
                        <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>{Array.isArray(job.available_days) ? job.available_days.length : 0} days/week</span>
                        </div>
                    )}
                    {job.job_type === 'guardian' && job.duration_per_session && (
                        <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span>{job.duration_per_session} mins</span>
                        </div>
                    )}
                </div>

                <div>
                    <p className="text-xs text-gray-500 mb-2">Subjects:</p>
                    <div className="flex flex-wrap gap-1">
                        {(() => {
                            const subjects = job.subject_names || [];
                            return subjects.map((subject, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                    {subject}
                                </Badge>
                            ));
                        })()}
                    </div>
                </div>

                {job.job_type === 'guardian' && (
                    <div className="flex gap-2 items-center text-xs flex-wrap">
                        <Badge variant="outline" className="capitalize">
                            {job.education_medium === 'bangla' && 'Bangla Medium'}
                            {job.education_medium === 'english' && 'English Medium'}
                            {job.education_medium === 'english_version' && 'English Version'}
                            {!['bangla', 'english', 'english_version'].includes(job.education_medium) && job.education_medium}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                            {job.tuition_type === 'home' && 'Home Tuition'}
                            {job.tuition_type === 'online' && 'Online Tuition'}
                            {job.tuition_type === 'group' && 'Group Tuition'}
                            {!['home', 'online', 'group'].includes(job.tuition_type) && job.tuition_type}
                        </Badge>
                        <Badge variant="outline">{job.class_level}</Badge>
                        {job.preferred_tutor_gender !== 'any' && (
                            <Badge variant="outline" className="capitalize">{job.preferred_tutor_gender} Tutor Preferred</Badge>
                        )}
                    </div>
                )}

                {job.job_type === 'tutor' && (
                    <div className="flex gap-2 items-center text-xs flex-wrap">
                        <Badge variant="outline" className="capitalize">
                            {job.teaching_mode === 'home' && 'Home Tuition'}
                            {job.teaching_mode === 'online' && 'Online Tuition'}
                            {job.teaching_mode === 'both' && 'Home & Online'}
                            {!['home', 'online', 'both'].includes(job.teaching_mode) && job.teaching_mode}
                        </Badge>
                        {job.preferred_gender && (
                            <Badge variant="outline" className="capitalize">{job.preferred_gender} Students Preferred</Badge>
                        )}
                    </div>
                )}

                {job.special_requirements && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Special Requirements:</p>
                        <p className="text-sm text-gray-700 line-clamp-2">
                            {job.special_requirements}
                        </p>
                    </div>
                )}

                {job.rejection_reason && (
                    <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                        <p className="text-xs text-red-600 mb-1">Rejection Reason:</p>
                        <p className="text-sm text-red-800">
                            {job.rejection_reason}
                        </p>
                    </div>
                )}

                <div className="flex gap-2 pt-2 border-t">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                            if (job.job_type === 'tutor') {
                                window.open(`/admin/tutor-job-requests/${job.id}`, '_blank');
                            } else {
                                window.open(`/admin/jobs/${job.id}`, '_blank');
                            }
                        }}
                    >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                    </Button>

                    {job.approval_status === 'pending' && (
                        <>
                            <Button
                                size="sm"
                                onClick={() => handleApprove(job)}
                            >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Approve
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleReject(job)}
                            >
                                <XCircle className="mr-2 h-4 w-4" />
                                Reject
                            </Button>
                        </>
                    )}
                </div>
            </CardContent>
        </Card>
    );

    return (
        <AuthenticatedLayout>
            <Head title="Job Approvals" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
                                    <div className="text-sm text-gray-600">Pending Approval</div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-green-600">{stats.approved}</div>
                                    <div className="text-sm text-gray-600">Approved Jobs</div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-red-600">{stats.rejected}</div>
                                    <div className="text-sm text-gray-600">Rejected</div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <FileCheck className="h-8 w-8" />
                            Job Approvals
                        </h1>
                        <p className="text-gray-600">Review and approve job postings</p>
                    </div>

                    {/* Jobs Tabs */}
                    <Tabs defaultValue="pending" className="space-y-4">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="pending">
                                Pending ({groupedJobs.pending.length})
                            </TabsTrigger>
                            <TabsTrigger value="approved">
                                Approved ({groupedJobs.approved.length})
                            </TabsTrigger>
                            <TabsTrigger value="rejected">
                                Rejected ({groupedJobs.rejected.length})
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="pending" className="space-y-4">
                            {groupedJobs.pending.length === 0 ? (
                                <Card>
                                    <CardContent className="pt-6 text-center py-12">
                                        <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No pending jobs</h3>
                                        <p className="text-gray-600">
                                            All job postings have been reviewed
                                        </p>
                                    </CardContent>
                                </Card>
                            ) : (
                                <div className="grid gap-4 md:grid-cols-2">
                                    {groupedJobs.pending.map(job => (
                                        <JobCard key={job.id} job={job} />
                                    ))}
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="approved" className="space-y-4">
                            {groupedJobs.approved.length === 0 ? (
                                <Card>
                                    <CardContent className="pt-6 text-center py-12">
                                        <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No approved jobs</h3>
                                        <p className="text-gray-600">
                                            Approved jobs will appear here
                                        </p>
                                    </CardContent>
                                </Card>
                            ) : (
                                <div className="grid gap-4 md:grid-cols-2">
                                    {groupedJobs.approved.map(job => (
                                        <JobCard key={job.id} job={job} />
                                    ))}
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="rejected" className="space-y-4">
                            {groupedJobs.rejected.length === 0 ? (
                                <Card>
                                    <CardContent className="pt-6 text-center py-12">
                                        <XCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No rejected jobs</h3>
                                        <p className="text-gray-600">
                                            Rejected jobs will appear here
                                        </p>
                                    </CardContent>
                                </Card>
                            ) : (
                                <div className="grid gap-4 md:grid-cols-2">
                                    {groupedJobs.rejected.map(job => (
                                        <JobCard key={job.id} job={job} />
                                    ))}
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            {/* Approve Dialog */}
            <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Approve Job</DialogTitle>
                        <DialogDescription>
                            Confirm approval for "{selectedJob?.title}"
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <p className="text-sm text-gray-600">
                            This job will be published and visible to all tutors on the platform.
                        </p>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowApproveDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={confirmApprove} disabled={processing}>
                            {processing ? 'Approving...' : 'Approve Job'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Reject Dialog */}
            <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Reject Job</DialogTitle>
                        <DialogDescription>
                            Provide a reason for rejecting "{selectedJob?.title}"
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="rejection_reason">Rejection Reason *</Label>
                            <Textarea
                                id="rejection_reason"
                                placeholder="Explain why this job posting is being rejected..."
                                rows={4}
                                value={data.rejection_reason}
                                onChange={(e) => setData('rejection_reason', e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
                            Cancel
                        </Button>
                        <Button 
                            variant="destructive" 
                            onClick={confirmReject} 
                            disabled={processing || !data.rejection_reason}
                        >
                            {processing ? 'Rejecting...' : 'Reject Job'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}


