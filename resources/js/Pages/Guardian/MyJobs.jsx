import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { useState } from 'react';
import { 
    Briefcase, 
    MapPin, 
    Calendar, 
    Eye, 
    Edit, 
    Trash2,
    Clock,
    FileText,
    CheckCircle,
    XCircle,
    Plus,
    Search,
    User
} from 'lucide-react';
import { CurrencyBangladeshiIcon } from '@/Components/icons/heroicons-currency-bangladeshi';

export default function MyJobs({ auth, jobs, stats }) {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

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

    const handleDelete = (jobId) => {
        if (confirm('Are you sure you want to delete this job?')) {
            router.delete(route('guardian.jobs.destroy', jobId));
        }
    };

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) ||
                            job.job_code.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const groupedJobs = {
        pending: filteredJobs.filter(j => j.approval_status === 'pending'),
        approved: filteredJobs.filter(j => j.approval_status === 'approved' && j.status === 'open'),
        filled: filteredJobs.filter(j => j.status === 'filled'),
        rejected: filteredJobs.filter(j => j.approval_status === 'rejected'),
    };

    const JobCard = ({ job }) => (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className={getStatusColor(job.approval_status)}>
                                {job.approval_status}
                            </Badge>
                            <Badge variant="outline" className={getJobStatusColor(job.status)}>
                                {job.status}
                            </Badge>
                            {job.applications_count > 0 && (
                                <Badge variant="secondary">
                                    {job.applications_count} applications
                                </Badge>
                            )}
                        </div>
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <CardDescription>
                            Job Code: {job.job_code}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>

                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>
                            {job.preferred_location && job.district
                                ? `${job.preferred_location}, ${job.district}`
                                : job.district || 'Not specified'}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <CurrencyBangladeshiIcon size={16} className="" />
                        <span>{parseFloat(job.salary).toLocaleString()}/month</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{job.days_per_week} days/week</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{job.duration_per_session} mins</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <User className="h-4 w-4" />
                        <span className="capitalize">{job.preferred_tutor_gender || 'Any'}</span>
                    </div>
                </div>

                <div>
                    <p className="text-xs text-gray-500 mb-1">Required Subjects:</p>
                    <div className="flex flex-wrap gap-1">
                        {Array.isArray(job.subject_names) && job.subject_names.length > 0 ? (
                            <>
                                {job.subject_names.slice(0, 3).map((subject, idx) => (
                                    <Badge key={idx} variant="secondary" className="text-xs">
                                        {subject}
                                    </Badge>
                                ))}
                                {job.subject_names.length > 3 && (
                                    <Badge variant="secondary" className="text-xs">
                                        +{job.subject_names.length - 3} more
                                    </Badge>
                                )}
                            </>
                        ) : (
                            <span className="text-xs text-gray-500">No subjects specified</span>
                        )}
                    </div>
                </div>

                {job.approval_status === 'rejected' && job.rejection_reason && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-800">
                            <strong>Rejection Reason:</strong> {job.rejection_reason}
                        </p>
                    </div>
                )}

                <div className="flex gap-2 pt-2">
                    <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="flex-1"
                    >
                        <Link href={route('guardian.jobs.show', job.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                        </Link>
                    </Button>
                    {job.applications_count > 0 && (
                        <Button
                            size="sm"
                            asChild
                            className="flex-1"
                        >
                            <Link href={route('guardian.job-applications', job.id)}>
                                <FileText className="mr-2 h-4 w-4" />
                                View Applications
                            </Link>
                        </Button>
                    )}
                    {job.approval_status === 'pending' && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(job.id)}
                        >
                            <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );

    return (
        <AuthenticatedLayout>
            <Head title="My Jobs" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
                                    <div className="text-sm text-gray-600">Total Jobs</div>
                                </div>
                            </CardContent>
                        </Card>
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
                                    <div className="text-sm text-gray-600">Active Jobs</div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-purple-600">{stats.filled}</div>
                                    <div className="text-sm text-gray-600">Filled Jobs</div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">My Jobs</h1>
                            <p className="text-gray-600">Manage all your posted jobs</p>
                        </div>
                        <Button asChild>
                            <Link href={route('guardian.jobs.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                Post New Job
                            </Link>
                        </Button>
                    </div>

                    {/* Search and Filters */}
                    <Card className="mb-6">
                        <CardContent className="pt-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Search by job title or code..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="pl-9"
                                    />
                                </div>
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="w-full md:w-48">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="open">Open</SelectItem>
                                        <SelectItem value="filled">Filled</SelectItem>
                                        <SelectItem value="closed">Closed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Jobs Tabs */}
                    <Tabs defaultValue="approved" className="space-y-4">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="pending" className="relative">
                                Pending
                                {groupedJobs.pending.length > 0 && (
                                    <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                                        {groupedJobs.pending.length}
                                    </Badge>
                                )}
                            </TabsTrigger>
                            <TabsTrigger value="approved" className="relative">
                                Active
                                {groupedJobs.approved.length > 0 && (
                                    <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                                        {groupedJobs.approved.length}
                                    </Badge>
                                )}
                            </TabsTrigger>
                            <TabsTrigger value="filled" className="relative">
                                Filled
                                {groupedJobs.filled.length > 0 && (
                                    <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                                        {groupedJobs.filled.length}
                                    </Badge>
                                )}
                            </TabsTrigger>
                            <TabsTrigger value="rejected" className="relative">
                                Rejected
                                {groupedJobs.rejected.length > 0 && (
                                    <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                                        {groupedJobs.rejected.length}
                                    </Badge>
                                )}
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="pending" className="space-y-4">
                            {groupedJobs.pending.length === 0 ? (
                                <Card>
                                    <CardContent className="pt-6 text-center text-gray-500">
                                        No pending jobs
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
                                    <CardContent className="pt-6 text-center text-gray-500">
                                        No active jobs
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

                        <TabsContent value="filled" className="space-y-4">
                            {groupedJobs.filled.length === 0 ? (
                                <Card>
                                    <CardContent className="pt-6 text-center text-gray-500">
                                        No filled jobs
                                    </CardContent>
                                </Card>
                            ) : (
                                <div className="grid gap-4 md:grid-cols-2">
                                    {groupedJobs.filled.map(job => (
                                        <JobCard key={job.id} job={job} />
                                    ))}
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="rejected" className="space-y-4">
                            {groupedJobs.rejected.length === 0 ? (
                                <Card>
                                    <CardContent className="pt-6 text-center text-gray-500">
                                        No rejected jobs
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
        </AuthenticatedLayout>
    );
}


