import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { 
    Users, 
    Briefcase,
    Search,
    Mail,
    Phone,
    MapPin,
    Eye,
    CheckCircle
} from 'lucide-react';
import { useState } from 'react';

export default function GuardiansList({ auth, guardians, stats }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredGuardians = guardians?.filter(guardian => {
        const matchesSearch = guardian.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            guardian.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    }) || [];

    const statCards = [
        {
            title: 'Total Guardians',
            value: stats.total,
            icon: Users,
            gradient: 'from-green-500 to-green-600',
            bgGradient: 'from-green-50 to-green-100',
        },
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
            icon: CheckCircle,
            gradient: 'from-purple-500 to-purple-600',
            bgGradient: 'from-purple-50 to-purple-100',
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth}
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="font-semibold text-3xl text-gray-800 leading-tight">
                            Guardians Management
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Manage all registered guardians
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Guardians List" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

                    {/* Search */}
                    <Card className="shadow-lg border-0">
                        <CardContent className="pt-6">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    placeholder="Search by name or email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Guardians Table */}
                    <Card className="shadow-lg border-0">
                        <CardHeader>
                            <CardTitle className="text-2xl">All Guardians ({filteredGuardians.length})</CardTitle>
                            <CardDescription>Complete list of registered guardians/parents</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {filteredGuardians.length > 0 ? (
                                <div className="space-y-3">
                                    {filteredGuardians.map((guardian) => (
                                        <div 
                                            key={guardian.id} 
                                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                                        >
                                            <div className="flex items-center space-x-4 flex-1">
                                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                                                    {guardian.user?.name?.charAt(0) || 'G'}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-gray-900 text-lg">
                                                        {guardian.user?.name || 'Unknown'}
                                                    </h4>
                                                    
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                                                        <div className="flex items-center text-sm text-gray-600">
                                                            <Mail className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                                                            {guardian.user?.email || 'N/A'}
                                                        </div>
                                                        {guardian.phone && (
                                                            <div className="flex items-center text-sm text-gray-600">
                                                                <Phone className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                                                                {guardian.phone}
                                                            </div>
                                                        )}
                                                        {guardian.location && (
                                                            <div className="flex items-center text-sm text-gray-600">
                                                                <MapPin className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                                                                {guardian.location.city || 'N/A'}
                                                            </div>
                                                        )}
                                                        {guardian.jobs_count !== undefined && (
                                                            <div className="flex items-center text-sm text-gray-600">
                                                                <Briefcase className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                                                                {guardian.jobs_count} job{guardian.jobs_count !== 1 ? 's' : ''} posted
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-4 flex-shrink-0 ml-4">
                                                <div className="text-right">
                                                    <p className="text-xs text-gray-500">Joined</p>
                                                    <p className="text-sm font-medium text-gray-700">
                                                        {new Date(guardian.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <Link href={route('admin.guardians.view', guardian.id)}>
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
                                    <p className="text-gray-600">No guardians found</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

