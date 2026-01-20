import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import { 
    FileText, 
    ListChecks, 
    Calendar, 
    DollarSign, 
    MapPin,
    BookOpen,
    TrendingUp,
    AlertCircle,
    CheckCircle,
    XCircle,
    Clock,
    Eye,
    Send
} from 'lucide-react';
import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    Area,
    AreaChart
} from 'recharts';

export default function Dashboard({ 
    auth, 
    stats, 
    verificationStatus, 
    recentJobs, 
    applicationUpdates, 
    earningsData 
}) {
    const statCards = [
        {
            title: 'Total Applications',
            value: stats.totalApplications,
            icon: FileText,
            gradient: 'from-blue-500 to-blue-600',
            bgGradient: 'from-blue-50 to-blue-100',
        },
        {
            title: 'Shortlisted',
            value: stats.shortlisted,
            icon: ListChecks,
            gradient: 'from-purple-500 to-purple-600',
            bgGradient: 'from-purple-50 to-purple-100',
        },
        {
            title: 'Active Bookings',
            value: stats.activeBookings,
            icon: Calendar,
            gradient: 'from-green-500 to-green-600',
            bgGradient: 'from-green-50 to-green-100',
        },
        {
            title: 'Earnings This Month',
            value: `$${stats.earningsThisMonth}`,
            icon: DollarSign,
            gradient: 'from-orange-500 to-orange-600',
            bgGradient: 'from-orange-50 to-orange-100',
        },
    ];

    const getVerificationAlert = () => {
        if (verificationStatus === 'verified') return null;
        
        const configs = {
            pending: {
                icon: Clock,
                title: 'Verification Pending',
                description: 'Your profile is under review. We\'ll notify you once it\'s approved.',
                bgColor: 'bg-gradient-to-r from-yellow-50 to-amber-50',
                borderColor: 'border-yellow-200',
                iconBg: 'bg-yellow-100',
                iconColor: 'text-yellow-600',
                buttonColor: 'from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600',
            },
            rejected: {
                icon: XCircle,
                title: 'Verification Rejected',
                description: 'Your verification was rejected. Please update your documents and resubmit.',
                bgColor: 'bg-gradient-to-r from-red-50 to-rose-50',
                borderColor: 'border-red-200',
                iconBg: 'bg-red-100',
                iconColor: 'text-red-600',
                buttonColor: 'from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600',
            },
            unverified: {
                icon: AlertCircle,
                title: 'Complete Verification',
                description: 'Submit your documents to get verified and start applying for jobs.',
                bgColor: 'bg-gradient-to-r from-yellow-50 to-amber-50',
                borderColor: 'border-yellow-200',
                iconBg: 'bg-yellow-100',
                iconColor: 'text-yellow-600',
                buttonColor: 'from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600',
            },
        };

        const config = configs[verificationStatus] || configs.unverified;

        return (
            <Card className={`${config.bgColor} ${config.borderColor} border shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                            <div className={`p-2 ${config.iconBg} rounded-lg`}>
                                <config.icon className={`h-6 w-6 ${config.iconColor}`} />
                            </div>
                            <div>
                                <CardTitle className="text-xl">{config.title}</CardTitle>
                                <CardDescription className="text-gray-600 mt-1">
                                    {config.description}
                                </CardDescription>
                            </div>
                        </div>
                        {verificationStatus !== 'pending' && (
                            <Link href={route('tutor.verification')}>
                                <Button className={`bg-gradient-to-r ${config.buttonColor}`}>
                                    {verificationStatus === 'rejected' ? 'Resubmit' : 'Verify Now'}
                                </Button>
                            </Link>
                        )}
                    </div>
                </CardHeader>
            </Card>
        );
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

    return (
        <AuthenticatedLayout
            user={auth}
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="font-semibold text-3xl text-gray-800 leading-tight">
                            Welcome back, {auth.name}! 🎓
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Tutor Code: <span className="font-semibold">{auth.tutor?.tutor_code || 'Not Set'}</span>
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Tutor Dashboard" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Verification Status Alert */}
                    {getVerificationAlert()}

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

                    {/* Recent Job Matches */}
                    <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow duration-300">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-2xl">Recent Job Matches</CardTitle>
                                    <CardDescription>Jobs that match your profile and expertise</CardDescription>
                                </div>
                                <Link href={route('tutor.jobs.index')}>
                                    <Button variant="outline" className="hover:bg-gray-50">
                                        Browse All Jobs
                                    </Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {recentJobs && recentJobs.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {recentJobs.map((job) => (
                                        <Card key={job.id} className="border-2 border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                                            <CardHeader>
                                                <CardTitle className="text-lg flex items-start justify-between">
                                                    <span className="text-gray-900">{job.title}</span>
                                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                        ${job.salary}/hr
                                                    </Badge>
                                                </CardTitle>
                                                <CardDescription>
                                                    <div className="flex items-center text-sm text-gray-600 mt-2">
                                                        <MapPin className="h-4 w-4 mr-1" />
                                                        {job.location?.city || job.location?.name || 'N/A'}
                                                    </div>
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {Array.isArray(job.subject_names) && job.subject_names.slice(0, 3).map((subject, idx) => (
                                                        <Badge key={idx} variant="secondary" className="bg-blue-100 text-blue-700">
                                                            <BookOpen className="h-3 w-3 mr-1" />
                                                            {subject}
                                                        </Badge>
                                                    ))}
                                                    {Array.isArray(job.subject_names) && job.subject_names.length > 3 && (
                                                        <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                                                            +{job.subject_names.length - 3} more
                                                        </Badge>
                                                    )}
                                                </div>
                                                <Link href={route('tutor.jobs.show', job.id)}>
                                                    <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                                                        <Send className="h-4 w-4 mr-2" />
                                                        Apply Now
                                                    </Button>
                                                </Link>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-600">No job matches available</p>
                                    <p className="text-sm text-gray-500 mt-1">Complete your profile to see relevant job opportunities</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Application Updates */}
                        <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow duration-300">
                            <CardHeader>
                                <CardTitle className="text-2xl">Application Updates</CardTitle>
                                <CardDescription>Track your application status</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {applicationUpdates && applicationUpdates.length > 0 ? (
                                    <div className="space-y-4">
                                        {applicationUpdates.map((application) => (
                                            <div key={application.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-gray-900">{application.job_title}</h4>
                                                    <div className="flex items-center space-x-4 mt-2">
                                                        <Badge 
                                                            variant="outline" 
                                                            className={`${getStatusColor(application.status)} capitalize`}
                                                        >
                                                            {application.status}
                                                        </Badge>
                                                        <span className="text-xs text-gray-500">
                                                            Updated: {new Date(application.last_update).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <Link href={route('tutor.applications.show', application.id)}>
                                                    <Button size="sm" variant="ghost" className="hover:bg-blue-50 hover:text-blue-600">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <FileText className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                                        <p className="text-gray-600 text-sm">No application updates</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Earnings Chart */}
                        <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow duration-300">
                            <CardHeader>
                                <CardTitle className="text-2xl">Earnings Overview</CardTitle>
                                <CardDescription>Your monthly earnings trend</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {earningsData && earningsData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height={250}>
                                        <AreaChart data={earningsData}>
                                            <defs>
                                                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                            <XAxis 
                                                dataKey="month" 
                                                stroke="#6b7280"
                                                style={{ fontSize: '12px' }}
                                            />
                                            <YAxis 
                                                stroke="#6b7280"
                                                style={{ fontSize: '12px' }}
                                            />
                                            <Tooltip 
                                                contentStyle={{ 
                                                    backgroundColor: 'white', 
                                                    border: '1px solid #e5e7eb',
                                                    borderRadius: '8px',
                                                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                                                }}
                                            />
                                            <Area 
                                                type="monotone" 
                                                dataKey="earnings" 
                                                stroke="#10b981" 
                                                strokeWidth={3}
                                                fill="url(#colorEarnings)"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="text-center py-12">
                                        <TrendingUp className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                                        <p className="text-gray-600 text-sm">No earnings data available</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
