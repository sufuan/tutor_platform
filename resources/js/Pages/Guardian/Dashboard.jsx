import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Progress } from '@/Components/ui/progress';
import { Badge } from '@/Components/ui/badge';
import { 
    Briefcase, 
    Users, 
    FileText, 
    CheckCircle, 
    Plus, 
    Eye, 
    Calendar,
    TrendingUp,
    AlertCircle,
    MessageSquare
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard({ 
    auth, 
    stats, 
    recentApplications, 
    profileComplete, 
    profilePercentage 
}) {
    const statCards = [
        {
            title: 'Total Jobs Posted',
            value: stats.totalJobs,
            icon: Briefcase,
            gradient: 'from-blue-500 to-blue-600',
            bgGradient: 'from-blue-50 to-blue-100',
        },
        {
            title: 'Active Jobs',
            value: stats.activeJobs,
            icon: TrendingUp,
            gradient: 'from-green-500 to-green-600',
            bgGradient: 'from-green-50 to-green-100',
        },
        {
            title: 'Applications Received',
            value: stats.applicationsReceived,
            icon: FileText,
            gradient: 'from-purple-500 to-purple-600',
            bgGradient: 'from-purple-50 to-purple-100',
        },
        {
            title: 'Hired Tutors',
            value: stats.hiredTutors,
            icon: CheckCircle,
            gradient: 'from-orange-500 to-orange-600',
            bgGradient: 'from-orange-50 to-orange-100',
        },
    ];

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            shortlisted: 'bg-blue-100 text-blue-800 border-blue-200',
            accepted: 'bg-green-100 text-green-800 border-green-200',
            rejected: 'bg-red-100 text-red-800 border-red-200',
        };
        return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    return (
        <AuthenticatedLayout
            user={auth}
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="font-semibold text-3xl text-gray-800 leading-tight">
                            Welcome back, {auth.name}! 👋
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Guardian Code: <span className="font-semibold">{auth.guardian?.guardian_code || 'Not Set'}</span>
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Guardian Dashboard" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Profile Completion Card */}
                    {!profileComplete && (
                        <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-amber-100 rounded-lg">
                                            <AlertCircle className="h-6 w-6 text-amber-600" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl">Complete Your Profile</CardTitle>
                                            <CardDescription className="text-gray-600">
                                                Unlock all features by completing your profile
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <Link href={route('guardian.profile.complete')}>
                                        <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                                            Complete Profile
                                        </Button>
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium text-gray-700">Profile Completion</span>
                                        <span className="font-bold text-amber-600">{profilePercentage}%</span>
                                    </div>
                                    <Progress value={profilePercentage} className="h-3" />
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {statCards.map((stat, index) => (
                            <Card 
                                key={index} 
                                className={`bg-gradient-to-br ${stat.bgGradient} border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer`}
                            >
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-700">
                                        {stat.title}
                                    </CardTitle>
                                    <div className={`p-2 bg-gradient-to-br ${stat.gradient} rounded-lg shadow-md`}>
                                        <stat.icon className="h-5 w-5 text-white" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Recent Applications Table */}
                    <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow duration-300">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-2xl">Recent Applications</CardTitle>
                                    <CardDescription>Latest tutor applications to your job posts</CardDescription>
                                </div>
                                <Link href={route('guardian.jobs.index')}>
                                    <Button variant="outline" className="hover:bg-gray-50">
                                        View All
                                    </Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {recentApplications && recentApplications.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 border-b-2 border-gray-200">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Job Title
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Tutor Name
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Applied Date
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {recentApplications.map((application) => (
                                                <tr key={application.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="font-medium text-gray-900">
                                                            {application.job_title}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold mr-3">
                                                                {application.tutor_name ? application.tutor_name.charAt(0) : 'T'}
                                                            </div>
                                                            <span className="text-gray-900">{application.tutor_name || 'Unknown Tutor'}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <Badge 
                                                            variant="outline" 
                                                            className={`${getStatusColor(application.status)} capitalize`}
                                                        >
                                                            {application.status}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                        <div className="flex items-center">
                                                            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                                                            {new Date(application.applied_date).toLocaleDateString()}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <Link href={route('guardian.job-applications', application.job_id)}>
                                                            <Button size="sm" variant="ghost" className="hover:bg-blue-50 hover:text-blue-600">
                                                                <Eye className="h-4 w-4 mr-1" />
                                                                View
                                                            </Button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-600">No applications yet</p>
                                    <p className="text-sm text-gray-500 mt-1">Applications will appear here once tutors apply to your jobs</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Quick Actions Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-blue-50 to-indigo-50 cursor-pointer">
                            <CardHeader>
                                <div className="flex items-center space-x-3">
                                    <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-md">
                                        <Plus className="h-6 w-6 text-white" />
                                    </div>
                                    <CardTitle className="text-lg">Post New Job</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600 mb-4">
                                    Create a new tutoring job and find the perfect tutor for your needs
                                </p>
                                <Link href={route('guardian.jobs.create')}>
                                    <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                                        Create Job
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-purple-50 to-pink-50 cursor-pointer">
                            <CardHeader>
                                <div className="flex items-center space-x-3">
                                    <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-md">
                                        <Users className="h-6 w-6 text-white" />
                                    </div>
                                    <CardTitle className="text-lg">Browse Applications</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600 mb-4">
                                    Review and manage applications from qualified tutors
                                </p>
                                <Link href={route('guardian.jobs.index')}>
                                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                                        View Applications
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-green-50 to-emerald-50 cursor-pointer">
                            <CardHeader>
                                <div className="flex items-center space-x-3">
                                    <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-md">
                                        <Calendar className="h-6 w-6 text-white" />
                                    </div>
                                    <CardTitle className="text-lg">View Bookings</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600 mb-4">
                                    Manage your active tutoring sessions and schedules
                                </p>
                                <Link href={route('guardian.jobs.index')}>
                                    <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                                        View Bookings
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-amber-50 to-orange-50 cursor-pointer">
                            <CardHeader>
                                <div className="flex items-center space-x-3">
                                    <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-md">
                                        <MessageSquare className="h-6 w-6 text-white" />
                                    </div>
                                    <CardTitle className="text-lg">Share Feedback</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600 mb-4">
                                    Share your experience and help others make informed decisions
                                </p>
                                <Link href={route('guardian.feedback.create')}>
                                    <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700">
                                        Give Feedback
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

