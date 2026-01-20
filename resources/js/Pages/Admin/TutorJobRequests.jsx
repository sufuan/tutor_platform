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
    DollarSign, 
    Calendar,
    Eye,
    User,
    Briefcase,
    CheckCircle,
    XCircle,
    Clock
} from 'lucide-react';

export default function TutorJobRequests({ auth, jobRequests, stats }) {
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showApproveDialog, setShowApproveDialog] = useState(false);
    const [showRejectDialog, setShowRejectDialog] = useState(false);

    const { data, setData, post, processing, reset } = useForm({
        rejection_reason: '',
    });

    const handleApprove = (request) => {
        setSelectedRequest(request);
        setShowApproveDialog(true);
    };

    const confirmApprove = () => {
        router.post(route('admin.tutor-job-requests.approve', selectedRequest.id), {}, {
            onSuccess: () => {
                setShowApproveDialog(false);
                setSelectedRequest(null);
            }
        });
    };

    const handleReject = (request) => {
        setSelectedRequest(request);
        setShowRejectDialog(true);
    };

    const confirmReject = () => {
        router.post(route('admin.tutor-job-requests.reject', selectedRequest.id), {
            rejection_reason: data.rejection_reason
        }, {
            onSuccess: () => {
                setShowRejectDialog(false);
                setSelectedRequest(null);
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

    const groupedRequests = {
        pending: jobRequests.filter(r => r.approval_status === 'pending'),
        approved: jobRequests.filter(r => r.approval_status === 'approved'),
        rejected: jobRequests.filter(r => r.approval_status === 'rejected'),
    };

    const RequestCard = ({ request }) => (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className={getStatusColor(request.approval_status)}>
                                {request.approval_status}
                            </Badge>
                            <Badge variant="secondary">
                                <Eye className="h-3 w-3 mr-1" />
                                {request.views} views
                            </Badge>
                        </div>
                        <CardTitle className="text-xl">{request.title}</CardTitle>
                        <CardDescription>
                            Posted on {new Date(request.created_at).toLocaleDateString()}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-slate-500" />
                    <span className="font-medium">
                        {request.tutor?.user?.first_name} {request.tutor?.user?.last_name}
                    </span>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2">{request.description}</p>

                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{request.district}, {request.division}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <DollarSign className="h-4 w-4" />
                        <span className="font-semibold text-green-600">
                            ৳{request.monthly_salary}/month
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{request.available_days?.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <Briefcase className="h-4 w-4" />
                        <span className="capitalize">{request.teaching_mode}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-1">
                    {request.subject_names?.map((subject, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                            {subject}
                        </Badge>
                    ))}
                </div>

                {request.rejection_reason && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-800">
                        <strong>Rejection Reason:</strong> {request.rejection_reason}
                    </div>
                )}

                {request.approval_status === 'pending' && (
                    <div className="flex gap-2 pt-2">
                        <Button 
                            size="sm" 
                            variant="outline"
                            className="flex-1 border-green-500 text-green-600 hover:bg-green-50"
                            onClick={() => handleApprove(request)}
                        >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                        </Button>
                        <Button 
                            size="sm" 
                            variant="outline"
                            className="flex-1 border-red-500 text-red-600 hover:bg-red-50"
                            onClick={() => handleReject(request)}
                        >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );

    return (
        <AuthenticatedLayout>
            <Head title="Tutor Job Requests" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Tutor Job Requests</h1>
                        <p className="text-gray-600">Review and approve tutor service listings</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium text-gray-600">Approved</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-green-600">{stats.approved}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium text-gray-600">Rejected</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-red-600">{stats.rejected}</div>
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
                            <TabsTrigger value="approved">
                                Approved
                            </TabsTrigger>
                            <TabsTrigger value="rejected">
                                Rejected
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="pending" className="space-y-4">
                            {groupedRequests.pending.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {groupedRequests.pending.map((request) => (
                                        <RequestCard key={request.id} request={request} />
                                    ))}
                                </div>
                            ) : (
                                <Card>
                                    <CardContent className="text-center py-12 text-gray-500">
                                        No pending requests
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        <TabsContent value="approved" className="space-y-4">
                            {groupedRequests.approved.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {groupedRequests.approved.map((request) => (
                                        <RequestCard key={request.id} request={request} />
                                    ))}
                                </div>
                            ) : (
                                <Card>
                                    <CardContent className="text-center py-12 text-gray-500">
                                        No approved requests
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        <TabsContent value="rejected" className="space-y-4">
                            {groupedRequests.rejected.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {groupedRequests.rejected.map((request) => (
                                        <RequestCard key={request.id} request={request} />
                                    ))}
                                </div>
                            ) : (
                                <Card>
                                    <CardContent className="text-center py-12 text-gray-500">
                                        No rejected requests
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            {/* Approve Dialog */}
            <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Approve Job Request</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to approve "{selectedRequest?.title}"?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowApproveDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={confirmApprove} disabled={processing}>
                            Approve
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Reject Dialog */}
            <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Reject Job Request</DialogTitle>
                        <DialogDescription>
                            Provide a reason for rejecting "{selectedRequest?.title}"
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="rejection_reason">Rejection Reason *</Label>
                            <Textarea
                                id="rejection_reason"
                                rows={4}
                                value={data.rejection_reason}
                                onChange={(e) => setData('rejection_reason', e.target.value)}
                                placeholder="Explain why this request is being rejected..."
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => {
                            setShowRejectDialog(false);
                            reset();
                        }}>
                            Cancel
                        </Button>
                        <Button 
                            variant="destructive" 
                            onClick={confirmReject} 
                            disabled={processing || !data.rejection_reason}
                        >
                            Reject
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
