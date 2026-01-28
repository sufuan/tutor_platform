import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { 
    Users, 
    UserCheck, 
    Briefcase, 
    Calendar,
    TrendingUp,
    CheckCircle,
    XCircle,
    Eye,
    Clock,
    Building2,
    CalendarDays,
    Sparkles
} from 'lucide-react';
import { CurrencyBangladeshiIcon } from '@/Components/icons/heroicons-currency-bangladeshi';
import { 
    AreaChart, 
    Area, 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    Legend
} from 'recharts';

export default function Dashboard({ 
    auth, 
    stats, 
    chartData, 
    pendingVerifications, 
    pendingJobs,
    tutorsList,
    guardiansList
}) {
    const statCards = [
        {
            title: 'Total Users',
            value: stats.totalUsers,
            icon: Users,
            gradient: 'from-blue-500 to-blue-600',
            bgGradient: 'from-blue-50 to-blue-100',
            change: `+${stats.newUsersThisWeek} this week`,
        },
        {
            title: 'Total Tutors',
            value: stats.totalTutors,
            icon: UserCheck,
            gradient: 'from-purple-500 to-purple-600',
            bgGradient: 'from-purple-50 to-purple-100',
            change: `${stats.verifiedTutors} verified`,
        },
        {
            title: 'Total Guardians',
            value: stats.totalGuardians,
            icon: Users,
            gradient: 'from-green-500 to-green-600',
            bgGradient: 'from-green-50 to-green-100',
            change: 'Active parents',
        },
        {
            title: 'Pending Verifications',
            value: stats.pendingVerifications,
            icon: Clock,
            gradient: 'from-amber-500 to-orange-600',
            bgGradient: 'from-amber-50 to-orange-100',
            change: 'Requires action',
        },
        {
            title: 'Active Jobs',
            value: stats.activeJobs,
            icon: Briefcase,
            gradient: 'from-indigo-500 to-indigo-600',
            bgGradient: 'from-indigo-50 to-indigo-100',
            change: 'Open positions',
        },
    ];

    const quickStats = [
        {
            title: "Today's Sign-ups",
            value: stats.todaySignups,
            icon: Sparkles,
            color: 'from-pink-500 to-rose-500',
        },
        {
            title: "This Week's Jobs",
            value: stats.weekJobs,
            icon: Briefcase,
            color: 'from-indigo-500 to-purple-500',
        },
        {
            title: "This Month's Revenue",
            value: `$${stats.monthRevenue.toLocaleString()}`,
            icon: TrendingUp,
            color: 'from-green-500 to-emerald-500',
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth}
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="font-semibold text-3xl text-gray-800 leading-tight">
                            Admin Dashboard 🎯
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Comprehensive overview of platform activities
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Overview Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
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
                                    <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                                    <p className="text-xs text-gray-600 mt-1">{stat.change}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Quick Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {quickStats.map((stat, index) => (
                            <Card 
                                key={index}
                                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                            <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                        </div>
                                        <div className={`p-4 bg-gradient-to-br ${stat.color} rounded-xl shadow-lg`}>
                                            <stat.icon className="h-8 w-8 text-white" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* User Growth Chart */}
                        <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow duration-300">
                            <CardHeader>
                                <CardTitle className="text-2xl">User Growth</CardTitle>
                                <CardDescription>New users registered over the last 6 months</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {chartData?.userGrowth && chartData.userGrowth.length > 0 ? (
                                    <ResponsiveContainer width="100%" height={300}>
                                        <AreaChart data={chartData.userGrowth}>
                                            <defs>
                                                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
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
                                                dataKey="users" 
                                                stroke="#3b82f6" 
                                                strokeWidth={3}
                                                fill="url(#colorUsers)"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="text-center py-12 text-gray-500">No user growth data available</div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Jobs by Category Chart */}
                        <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow duration-300">
                            <CardHeader>
                                <CardTitle className="text-2xl">Jobs by Category</CardTitle>
                                <CardDescription>Distribution of jobs across categories</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {chartData?.jobsByCategory && chartData.jobsByCategory.length > 0 ? (
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={chartData.jobsByCategory}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                            <XAxis 
                                                dataKey="category" 
                                                stroke="#6b7280"
                                                style={{ fontSize: '11px' }}
                                                angle={-45}
                                                textAnchor="end"
                                                height={80}
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
                                            <Bar 
                                                dataKey="count" 
                                                fill="url(#colorBar)"
                                                radius={[8, 8, 0, 0]}
                                            />
                                            <defs>
                                                <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.9}/>
                                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.6}/>
                                                </linearGradient>
                                            </defs>
                                        </BarChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="text-center py-12 text-gray-500">No jobs data available</div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Pending Actions Tables */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Tutor Verifications */}
                        <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow duration-300">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-2xl">Pending Verifications</CardTitle>
                                        <CardDescription>Tutor profiles awaiting verification</CardDescription>
                                    </div>
                                    <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                                        {pendingVerifications?.length || 0} Pending
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {pendingVerifications && pendingVerifications.length > 0 ? (
                                    <div className="space-y-4">
                                        {pendingVerifications.slice(0, 5).map((verification) => (
                                            <div key={verification.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                                <div className="flex items-center space-x-3">
                                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                                                        {verification.user?.name?.charAt(0) || 'T'}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900">{verification.user?.name || 'Unknown'}</h4>
                                                        <div className="flex items-center text-xs text-gray-500 mt-1">
                                                            <Building2 className="h-3 w-3 mr-1" />
                                                            {verification.institution}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-xs text-gray-500">
                                                        {new Date(verification.created_at).toLocaleDateString()}
                                                    </span>
                                                    <div className="flex space-x-1">
                                                        <Link href={route('admin.tutors.verifications')}>
                                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600">
                                                                <Eye className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-green-50 hover:text-green-600">
                                                            <CheckCircle className="h-4 w-4" />
                                                        </Button>
                                                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600">
                                                            <XCircle className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {pendingVerifications.length > 5 && (
                                            <Link href={route('admin.tutors.verifications')}>
                                                <Button variant="outline" className="w-full mt-2">
                                                    View All {pendingVerifications.length} Verifications
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <UserCheck className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                                        <p className="text-gray-600 text-sm">No pending verifications</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Job Approvals */}
                        <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow duration-300">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-2xl">Pending Job Approvals</CardTitle>
                                        <CardDescription>Jobs awaiting admin approval</CardDescription>
                                    </div>
                                    <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                                        {pendingJobs?.length || 0} Pending
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {pendingJobs && pendingJobs.length > 0 ? (
                                    <div className="space-y-4">
                                        {pendingJobs.slice(0, 5).map((job) => (
                                            <div key={job.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">{job.job_title || 'Untitled Job'}</h4>
                                                    <div className="flex items-center space-x-3 mt-2">
                                                        <span className="text-xs text-gray-600">
                                                            by {job.guardian?.user?.name || 'Unknown Guardian'}
                                                        </span>
                                                        <div className="flex items-center text-xs text-gray-500">
                                                            <CalendarDays className="h-3 w-3 mr-1" />
                                                            {new Date(job.created_at).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex space-x-1">
                                                    <Link href={route('admin.jobs.approvals')}>
                                                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-green-50 hover:text-green-600">
                                                        <CheckCircle className="h-4 w-4" />
                                                    </Button>
                                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600">
                                                        <XCircle className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                        {pendingJobs.length > 5 && (
                                            <Link href={route('admin.jobs.index')}>
                                                <Button variant="outline" className="w-full mt-2">
                                                    View All {pendingJobs.length} Jobs
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <Briefcase className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                                        <p className="text-gray-600 text-sm">No pending job approvals</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Tutors & Guardians Lists */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Tutors List */}
                        <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow duration-300">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-2xl">All Tutors</CardTitle>
                                        <CardDescription>Complete list of registered tutors</CardDescription>
                                    </div>
                                    <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                                        {tutorsList?.length || 0} Total
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {tutorsList && tutorsList.length > 0 ? (
                                    <div className="space-y-3 max-h-96 overflow-y-auto">
                                        {tutorsList.map((tutor) => (
                                            <div key={tutor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                                <div className="flex items-center space-x-3">
                                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                                                        {tutor.user?.name?.charAt(0) || 'T'}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900">{tutor.user?.name || 'Unknown'}</h4>
                                                        <div className="flex items-center text-xs text-gray-500 mt-1 space-x-2">
                                                            <span>{tutor.institution || 'N/A'}</span>
                                                            {tutor.verification_status && (
                                                                <Badge 
                                                                    variant="outline" 
                                                                    className={`text-xs py-0 h-5 ${
                                                                        tutor.verification_status === 'verified' 
                                                                            ? 'bg-green-100 text-green-800 border-green-200' 
                                                                            : tutor.verification_status === 'pending'
                                                                            ? 'bg-amber-100 text-amber-800 border-amber-200'
                                                                            : 'bg-red-100 text-red-800 border-red-200'
                                                                    }`}
                                                                >
                                                                    {tutor.verification_status}
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {new Date(tutor.created_at).toLocaleDateString()}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <UserCheck className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                                        <p className="text-gray-600 text-sm">No tutors registered yet</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Guardians List */}
                        <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow duration-300">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-2xl">All Guardians</CardTitle>
                                        <CardDescription>Complete list of registered guardians</CardDescription>
                                    </div>
                                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                        {guardiansList?.length || 0} Total
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {guardiansList && guardiansList.length > 0 ? (
                                    <div className="space-y-3 max-h-96 overflow-y-auto">
                                        {guardiansList.map((guardian) => (
                                            <div key={guardian.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                                <div className="flex items-center space-x-3">
                                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white font-semibold">
                                                        {guardian.user?.name?.charAt(0) || 'G'}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900">{guardian.user?.name || 'Unknown'}</h4>
                                                        <div className="flex items-center text-xs text-gray-500 mt-1 space-x-2">
                                                            <span>{guardian.user?.email || 'N/A'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {new Date(guardian.created_at).toLocaleDateString()}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <Users className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                                        <p className="text-gray-600 text-sm">No guardians registered yet</p>
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


