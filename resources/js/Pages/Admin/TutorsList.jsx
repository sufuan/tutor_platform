import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { 
    Users, 
    UserCheck, 
    Clock,
    XCircle,
    Search,
    Building2,
    Mail,
    Phone,
    MapPin,
    Eye
} from 'lucide-react';
import { useState } from 'react';

export default function TutorsList({ auth, tutors, stats }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const filteredTutors = tutors?.filter(tutor => {
        const matchesSearch = tutor.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            tutor.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            tutor.institution?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesFilter = filterStatus === 'all' || tutor.verification_status === filterStatus;
        
        return matchesSearch && matchesFilter;
    }) || [];

    const statCards = [
        {
            title: 'Total Tutors',
            value: stats.total,
            icon: Users,
            gradient: 'from-blue-500 to-blue-600',
            bgGradient: 'from-blue-50 to-blue-100',
        },
        {
            title: 'Verified',
            value: stats.verified,
            icon: UserCheck,
            gradient: 'from-green-500 to-green-600',
            bgGradient: 'from-green-50 to-green-100',
        },
        {
            title: 'Pending',
            value: stats.pending,
            icon: Clock,
            gradient: 'from-amber-500 to-amber-600',
            bgGradient: 'from-amber-50 to-amber-100',
        },
        {
            title: 'Rejected',
            value: stats.rejected,
            icon: XCircle,
            gradient: 'from-red-500 to-red-600',
            bgGradient: 'from-red-50 to-red-100',
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth}
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="font-semibold text-3xl text-gray-800 leading-tight">
                            Tutors Management
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Manage all registered tutors
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Tutors List" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {statCards.map((stat, index) => (
                            <Card 
                                key={index} 
                                className={`bg-gradient-to-br ${stat.bgGradient} border-none shadow-lg hover:shadow-xl transition-all duration-300`}
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
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Search and Filter */}
                    <Card className="shadow-lg border-0">
                        <CardContent className="pt-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <Input
                                        placeholder="Search by name, email, or institution..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant={filterStatus === 'all' ? 'default' : 'outline'}
                                        onClick={() => setFilterStatus('all')}
                                    >
                                        All
                                    </Button>
                                    <Button
                                        variant={filterStatus === 'verified' ? 'default' : 'outline'}
                                        onClick={() => setFilterStatus('verified')}
                                        className={filterStatus === 'verified' ? 'bg-green-600' : ''}
                                    >
                                        Verified
                                    </Button>
                                    <Button
                                        variant={filterStatus === 'pending' ? 'default' : 'outline'}
                                        onClick={() => setFilterStatus('pending')}
                                        className={filterStatus === 'pending' ? 'bg-amber-600' : ''}
                                    >
                                        Pending
                                    </Button>
                                    <Button
                                        variant={filterStatus === 'rejected' ? 'default' : 'outline'}
                                        onClick={() => setFilterStatus('rejected')}
                                        className={filterStatus === 'rejected' ? 'bg-red-600' : ''}
                                    >
                                        Rejected
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tutors Table */}
                    <Card className="shadow-lg border-0">
                        <CardHeader>
                            <CardTitle className="text-2xl">All Tutors ({filteredTutors.length})</CardTitle>
                            <CardDescription>Complete list of registered tutors</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {filteredTutors.length > 0 ? (
                                <div className="space-y-3">
                                    {filteredTutors.map((tutor) => (
                                        <div 
                                            key={tutor.id} 
                                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                                        >
                                            <div className="flex items-center space-x-4 flex-1">
                                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                                                    {tutor.user?.name?.charAt(0) || 'T'}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-semibold text-gray-900 text-lg">
                                                            {tutor.user?.name || 'Unknown'}
                                                        </h4>
                                                        <Badge 
                                                            variant="outline" 
                                                            className={`${
                                                                tutor.verification_status === 'verified' 
                                                                    ? 'bg-green-100 text-green-800 border-green-200' 
                                                                    : tutor.verification_status === 'pending'
                                                                    ? 'bg-amber-100 text-amber-800 border-amber-200'
                                                                    : 'bg-red-100 text-red-800 border-red-200'
                                                            }`}
                                                        >
                                                            {tutor.verification_status}
                                                        </Badge>
                                                    </div>
                                                    
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                                                        <div className="flex items-center text-sm text-gray-600">
                                                            <Mail className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                                                            {tutor.user?.email || 'N/A'}
                                                        </div>
                                                        {tutor.phone && (
                                                            <div className="flex items-center text-sm text-gray-600">
                                                                <Phone className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                                                                {tutor.phone}
                                                            </div>
                                                        )}
                                                        {tutor.institution && (
                                                            <div className="flex items-center text-sm text-gray-600">
                                                                <Building2 className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                                                                {tutor.institution}
                                                            </div>
                                                        )}
                                                        {tutor.location && (
                                                            <div className="flex items-center text-sm text-gray-600">
                                                                <MapPin className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                                                                {tutor.location.city || 'N/A'}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {tutor.subjects && (
                                                        <div className="flex flex-wrap gap-1 mt-2">
                                                            {(typeof tutor.subjects === 'string' ? JSON.parse(tutor.subjects) : tutor.subjects).slice(0, 3).map((subject, idx) => (
                                                                <Badge key={idx} variant="secondary" className="text-xs">
                                                                    {subject}
                                                                </Badge>
                                                            ))}
                                                            {(typeof tutor.subjects === 'string' ? JSON.parse(tutor.subjects) : tutor.subjects).length > 3 && (
                                                                <Badge variant="secondary" className="text-xs">
                                                                    +{(typeof tutor.subjects === 'string' ? JSON.parse(tutor.subjects) : tutor.subjects).length - 3} more
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-4 flex-shrink-0 ml-4">
                                                <div className="text-right">
                                                    <p className="text-xs text-gray-500">Joined</p>
                                                    <p className="text-sm font-medium text-gray-700">
                                                        {new Date(tutor.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <Link href={route('tutors.show', tutor.id)}>
                                                    <Button size="sm" variant="outline" className="gap-2">
                                                        <Eye className="h-4 w-4" />
                                                        View
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                                    <p className="text-gray-600">No tutors found</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
