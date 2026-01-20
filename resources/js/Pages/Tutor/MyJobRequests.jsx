import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { 
    Plus,
    MapPin,
    DollarSign,
    Calendar,
    Eye,
    Edit,
    Trash2,
    Users
} from 'lucide-react';

export default function MyJobRequests({ auth, jobRequests }) {
    const getStatusColor = (status) => {
        switch(status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'inactive': return 'bg-gray-100 text-gray-800';
            case 'closed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getApprovalColor = (status) => {
        switch(status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'approved': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getModeColor = (mode) => {
        switch(mode) {
            case 'online': return 'bg-blue-100 text-blue-800';
            case 'in-person': return 'bg-purple-100 text-purple-800';
            case 'hybrid': return 'bg-indigo-100 text-indigo-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="My Job Requests" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">My Job Requests</h1>
                            <p className="text-gray-600">Manage your tutoring service advertisements</p>
                        </div>
                        <Button asChild>
                            <Link href={route('tutor.job-request.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                Post New Request
                            </Link>
                        </Button>
                    </div>

                    {/* Job Requests List */}
                    {jobRequests.length === 0 ? (
                        <Card>
                            <CardContent className="py-12 text-center">
                                <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No job requests yet</h3>
                                <p className="text-gray-600 mb-6">
                                    Start advertising your tutoring services to attract guardians
                                </p>
                                <Button asChild>
                                    <Link href={route('tutor.job-request.create')}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Create Your First Request
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-6">
                            {jobRequests.map((request) => (
                                <Card key={request.id}>
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <CardTitle className="text-xl">{request.title}</CardTitle>
                                                    <Badge className={getStatusColor(request.status)}>
                                                        {request.status}
                                                    </Badge>
                                                    <Badge className={getApprovalColor(request.approval_status)}>
                                                        {request.approval_status}
                                                    </Badge>
                                                </div>
                                                <CardDescription className="line-clamp-2">
                                                    {request.description}
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {/* Subjects */}
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-700 mb-2">Subjects</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {Array.isArray(request.subject_names) && request.subject_names.map((subject, index) => (
                                                        <Badge key={index} variant="secondary">
                                                            {subject}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Details Grid */}
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                                                <div>
                                                    <div className="flex items-center text-sm text-gray-600 mb-1">
                                                        <DollarSign className="h-4 w-4 mr-1" />
                                                        Monthly Salary
                                                    </div>
                                                    <div className="font-semibold">৳{request.monthly_salary}/mo</div>
                                                </div>
                                                <div>
                                                    <div className="flex items-center text-sm text-gray-600 mb-1">
                                                        <MapPin className="h-4 w-4 mr-1" />
                                                        Location
                                                    </div>
                                                    <div className="font-semibold text-sm">
                                                        {request.district && request.division 
                                                            ? `${request.district}, ${request.division}`
                                                            : request.district || request.division || 'Not specified'}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex items-center text-sm text-gray-600 mb-1">
                                                        <Calendar className="h-4 w-4 mr-1" />
                                                        Available Days
                                                    </div>
                                                    <div className="font-semibold text-sm">
                                                        {Array.isArray(request.available_days) ? request.available_days.join(', ') : 'Not set'}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex items-center text-sm text-gray-600 mb-1">
                                                        <Eye className="h-4 w-4 mr-1" />
                                                        Views
                                                    </div>
                                                    <div className="font-semibold">{request.views || 0}</div>
                                                </div>
                                            </div>

                                            {/* Badges */}
                                            <div className="flex items-center gap-2 pt-2">
                                                <Badge className={getModeColor(request.teaching_mode)}>
                                                    {request.teaching_mode}
                                                </Badge>
                                                <Badge variant="outline">
                                                    {request.education_level}
                                                </Badge>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex justify-end gap-2 pt-4 border-t">
                                                <Button variant="outline" size="sm">
                                                    <Edit className="h-4 w-4 mr-2" />
                                                    Edit
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
