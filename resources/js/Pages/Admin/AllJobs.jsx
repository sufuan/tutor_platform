import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import {
    MoreVertical,
    Eye,
    Trash2,
    Briefcase,
    Users,
    CheckCircle,
    Clock,
    ListFilter,
    UserX
} from 'lucide-react';
import { CurrencyBangladeshiIcon } from '@/Components/icons/heroicons-currency-bangladeshi';

export default function AllJobs({ auth, jobs }) {
    const [processingId, setProcessingId] = useState(null);

    const handleDelete = (type, id, title) => {
        if (confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
            setProcessingId(id);
            router.delete(route('admin.all-jobs.delete', { type, id }), {
                preserveScroll: true,
                onFinish: () => setProcessingId(null),
            });
        }
    };

    const handleUnassignTutor = (id, title) => {
        if (confirm(`Are you sure you want to unassign the tutor from "${title}"? The job will be reopened for applications.`)) {
            setProcessingId(id);
            router.post(route('admin.all-jobs.unassign', id), {}, {
                preserveScroll: true,
                onFinish: () => setProcessingId(null),
            });
        }
    };

    const handleViewDetails = (type, id) => {
        if (type === 'guardian' || type === 'admin') {
            router.visit(route('admin.jobs.view', id));
        } else if (type === 'tutor') {
            // Navigate to tutor job request view
            router.visit(route('tutor-jobs.show', id));
        }
    };

    const getStatusBadge = (status) => {
        const variants = {
            open: 'bg-green-100 text-green-800 border-green-200',
            closed: 'bg-gray-100 text-gray-800 border-gray-200',
            filled: 'bg-blue-100 text-blue-800 border-blue-200',
        };
        return variants[status] || variants.open;
    };

    const getApprovalBadge = (approval) => {
        const variants = {
            approved: 'bg-green-100 text-green-800 border-green-200',
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            rejected: 'bg-red-100 text-red-800 border-red-200',
        };
        return variants[approval] || variants.pending;
    };

    const getRoleBadge = (role) => {
        const variants = {
            Guardian: 'bg-blue-100 text-blue-800',
            Tutor: 'bg-purple-100 text-purple-800',
            Admin: 'bg-indigo-100 text-indigo-800',
        };
        return variants[role] || variants.Guardian;
    };

    return (
        <AuthenticatedLayout user={auth}>
            <Head title="All Jobs" />

            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">All Jobs</h1>
                        <p className="text-gray-600 mt-1">
                            Manage all jobs posted by guardians, tutors, and admin
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-lg py-2 px-4">
                            <Briefcase className="h-5 w-5 mr-2" />
                            Total: {jobs.length}
                        </Badge>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Guardian Jobs
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">
                                {jobs.filter(j => j.type === 'guardian').length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Admin Jobs
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-indigo-600">
                                {jobs.filter(j => j.type === 'admin').length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Tutor Requests
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-600">
                                {jobs.filter(j => j.type === 'tutor').length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Total Applications
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {jobs.reduce((sum, j) => sum + (j.pending_count + j.shortlisted_count + j.accepted_count), 0)}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Jobs Table */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Briefcase className="h-5 w-5" />
                            Jobs List
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Job Code</TableHead>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Posted By</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Salary</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-center">Applications</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {jobs.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                                                No jobs found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        jobs.map((job) => (
                                            <TableRow key={`${job.type}-${job.id}`}>
                                                <TableCell className="font-mono text-sm">
                                                    {job.job_code}
                                                </TableCell>
                                                <TableCell>
                                                    <div>
                                                        <div className="font-medium">{job.title}</div>
                                                        <div className="text-xs text-gray-500">
                                                            {new Date(job.created_at).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="outline" className={getRoleBadge(job.posted_by_role)}>
                                                            {job.posted_by_role}
                                                        </Badge>
                                                        <span className="text-sm">{job.posted_by}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-sm">
                                                    {job.location !== 'N/A' 
                                                        ? job.location 
                                                        : (job.district && job.division 
                                                            ? `${job.district}, ${job.division}` 
                                                            : 'N/A')
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-1 text-green-600 font-semibold">
                                                        <CurrencyBangladeshiIcon size={16} />
                                                        {job.salary}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="space-y-1">
                                                        <Badge variant="outline" className={getStatusBadge(job.status)}>
                                                            {job.status}
                                                        </Badge>
                                                        <Badge variant="outline" className={getApprovalBadge(job.approval_status)}>
                                                            {job.approval_status}
                                                        </Badge>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col gap-1 text-xs">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-gray-600">Pending:</span>
                                                            <Badge variant="outline" className="bg-yellow-50">
                                                                {job.pending_count}
                                                            </Badge>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-gray-600">Shortlisted:</span>
                                                            <Badge variant="outline" className="bg-blue-50">
                                                                {job.shortlisted_count}
                                                            </Badge>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-gray-600">Accepted:</span>
                                                            <Badge variant="outline" className="bg-green-50">
                                                                {job.accepted_count}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleViewDetails(job.type, job.id)}
                                                        >
                                                            <Eye className="h-4 w-4 mr-1" />
                                                            View
                                                        </Button>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button 
                                                                    variant="ghost" 
                                                                    size="sm"
                                                                    disabled={processingId === job.id}
                                                                >
                                                                    <MoreVertical className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                {job.status === 'filled' && job.accepted_count > 0 && (job.type === 'guardian' || job.type === 'admin') && (
                                                                    <DropdownMenuItem
                                                                        onClick={() => handleUnassignTutor(job.id, job.title)}
                                                                        className="text-blue-600 focus:text-blue-600"
                                                                    >
                                                                        <UserX className="h-4 w-4 mr-2" />
                                                                        Unassign Tutor
                                                                    </DropdownMenuItem>
                                                                )}
                                                                <DropdownMenuItem
                                                                    onClick={() => handleDelete(job.type, job.id, job.title)}
                                                                    className="text-red-600 focus:text-red-600"
                                                                >
                                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                                    Delete Job
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
