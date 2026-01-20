import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { Textarea } from '@/Components/ui/textarea';
import { Label } from '@/Components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { useState } from 'react';
import { 
    UserCheck, 
    MapPin, 
    GraduationCap, 
    DollarSign,
    Calendar,
    CheckCircle,
    XCircle,
    Eye,
    FileText,
    Award
} from 'lucide-react';

export default function TutorVerifications({ auth, tutors, stats }) {
    const [selectedTutor, setSelectedTutor] = useState(null);
    const [showVerifyDialog, setShowVerifyDialog] = useState(false);
    const [showRejectDialog, setShowRejectDialog] = useState(false);

    const { data, setData, post, processing, reset } = useForm({
        verification_notes: '',
    });

    const handleVerify = (tutor) => {
        setSelectedTutor(tutor);
        setShowVerifyDialog(true);
    };

    const confirmVerify = () => {
        router.post(route('admin.tutors.verify', selectedTutor.id), {
            notes: data.verification_notes
        }, {
            onSuccess: () => {
                setShowVerifyDialog(false);
                setSelectedTutor(null);
                reset();
            }
        });
    };

    const handleReject = (tutor) => {
        setSelectedTutor(tutor);
        setShowRejectDialog(true);
    };

    const confirmReject = () => {
        router.post(route('admin.tutors.reject', selectedTutor.id), {
            notes: data.verification_notes
        }, {
            onSuccess: () => {
                setShowRejectDialog(false);
                setSelectedTutor(null);
                reset();
            }
        });
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            verified: 'bg-green-100 text-green-800 border-green-200',
            rejected: 'bg-red-100 text-red-800 border-red-200',
        };
        return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    const groupedTutors = {
        pending: tutors.filter(t => t.verification_status === 'pending'),
        verified: tutors.filter(t => t.verification_status === 'verified'),
        rejected: tutors.filter(t => t.verification_status === 'rejected'),
    };

    const TutorCard = ({ tutor }) => (
        <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
                <div className="flex gap-4">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={tutor.photo} />
                        <AvatarFallback>
                            {tutor.user?.name?.[0] || 'T'}
                        </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="font-semibold text-lg">
                                    {tutor.user?.name || 'N/A'}
                                </h3>
                                <p className="text-sm text-gray-600">{tutor.tutor_code}</p>
                                <p className="text-sm text-gray-600">{tutor.user?.email}</p>
                            </div>
                            <Badge variant="outline" className={getStatusColor(tutor.verification_status)}>
                                {tutor.verification_status}
                            </Badge>
                        </div>

                        <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <GraduationCap className="h-4 w-4" />
                                <span>{tutor.institution} - {tutor.education_level}</span>
                            </div>
                            {tutor.location && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <MapPin className="h-4 w-4" />
                                    <span>{tutor.location.city}</span>
                                </div>
                            )}
                            {tutor.hourly_rate && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <DollarSign className="h-4 w-4" />
                                    <span>৳{tutor.hourly_rate}/month</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Calendar className="h-4 w-4" />
                                <span>{tutor.experience_years} years experience</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Award className="h-4 w-4" />
                                <span>Profile: {tutor.profile_completion_percentage}% complete</span>
                            </div>
                        </div>

                        {tutor.subject_names && tutor.subject_names.length > 0 && (
                            <div className="mb-4">
                                <p className="text-xs text-gray-500 mb-2">Subjects:</p>
                                <div className="flex flex-wrap gap-1">
                                    {tutor.subject_names.map((subjectName, idx) => (
                                        <Badge key={idx} variant="secondary" className="text-xs">
                                            {subjectName}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {tutor.bio && (
                            <div className="p-3 bg-gray-50 rounded-lg mb-4">
                                <p className="text-xs text-gray-500 mb-1">Bio:</p>
                                <p className="text-sm text-gray-700 line-clamp-2">
                                    {tutor.bio}
                                </p>
                            </div>
                        )}

                        {tutor.verification_notes && (
                            <div className="p-3 bg-blue-50 rounded-lg mb-4 border border-blue-200">
                                <p className="text-xs text-blue-600 mb-1">Admin Notes:</p>
                                <p className="text-sm text-blue-800">
                                    {tutor.verification_notes}
                                </p>
                            </div>
                        )}

                        <div className="flex gap-2 pt-2">
                            <Button
                                variant="outline"
                                size="sm"
                                asChild
                            >
                                <Link href={route('admin.tutors.view', tutor.id)}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Profile
                                </Link>
                            </Button>

                            {tutor.verification_status === 'pending' && (
                                <>
                                    <Button
                                        size="sm"
                                        onClick={() => handleVerify(tutor)}
                                    >
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Verify
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleReject(tutor)}
                                    >
                                        <XCircle className="mr-2 h-4 w-4" />
                                        Reject
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <AuthenticatedLayout>
            <Head title="Tutor Verifications" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
                                    <div className="text-sm text-gray-600">Pending Verification</div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-green-600">{stats.verified}</div>
                                    <div className="text-sm text-gray-600">Verified Tutors</div>
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
                            <UserCheck className="h-8 w-8" />
                            Tutor Verifications
                        </h1>
                        <p className="text-gray-600">Review and verify tutor profiles</p>
                    </div>

                    {/* Tutors Tabs */}
                    <Tabs defaultValue="pending" className="space-y-4">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="pending">
                                Pending ({groupedTutors.pending.length})
                            </TabsTrigger>
                            <TabsTrigger value="verified">
                                Verified ({groupedTutors.verified.length})
                            </TabsTrigger>
                            <TabsTrigger value="rejected">
                                Rejected ({groupedTutors.rejected.length})
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="pending" className="space-y-4">
                            {groupedTutors.pending.length === 0 ? (
                                <Card>
                                    <CardContent className="pt-6 text-center py-12">
                                        <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No pending verifications</h3>
                                        <p className="text-gray-600">
                                            All tutor profiles have been reviewed
                                        </p>
                                    </CardContent>
                                </Card>
                            ) : (
                                groupedTutors.pending.map(tutor => (
                                    <TutorCard key={tutor.id} tutor={tutor} />
                                ))
                            )}
                        </TabsContent>

                        <TabsContent value="verified" className="space-y-4">
                            {groupedTutors.verified.length === 0 ? (
                                <Card>
                                    <CardContent className="pt-6 text-center py-12">
                                        <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No verified tutors</h3>
                                        <p className="text-gray-600">
                                            Verified tutors will appear here
                                        </p>
                                    </CardContent>
                                </Card>
                            ) : (
                                groupedTutors.verified.map(tutor => (
                                    <TutorCard key={tutor.id} tutor={tutor} />
                                ))
                            )}
                        </TabsContent>

                        <TabsContent value="rejected" className="space-y-4">
                            {groupedTutors.rejected.length === 0 ? (
                                <Card>
                                    <CardContent className="pt-6 text-center py-12">
                                        <XCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No rejected tutors</h3>
                                        <p className="text-gray-600">
                                            Rejected tutors will appear here
                                        </p>
                                    </CardContent>
                                </Card>
                            ) : (
                                groupedTutors.rejected.map(tutor => (
                                    <TutorCard key={tutor.id} tutor={tutor} />
                                ))
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            {/* Verify Dialog */}
            <Dialog open={showVerifyDialog} onOpenChange={setShowVerifyDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Verify Tutor</DialogTitle>
                        <DialogDescription>
                            Confirm verification for {selectedTutor?.first_name} {selectedTutor?.last_name}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="verification_notes">Verification Notes (Optional)</Label>
                            <Textarea
                                id="verification_notes"
                                placeholder="Add any notes about this verification..."
                                rows={3}
                                value={data.verification_notes}
                                onChange={(e) => setData('verification_notes', e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowVerifyDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={confirmVerify} disabled={processing}>
                            {processing ? 'Verifying...' : 'Verify Tutor'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Reject Dialog */}
            <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Reject Tutor</DialogTitle>
                        <DialogDescription>
                            Provide a reason for rejecting {selectedTutor?.first_name} {selectedTutor?.last_name}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="rejection_notes">Rejection Reason *</Label>
                            <Textarea
                                id="rejection_notes"
                                placeholder="Explain why this tutor is being rejected..."
                                rows={4}
                                value={data.verification_notes}
                                onChange={(e) => setData('verification_notes', e.target.value)}
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
                            disabled={processing || !data.verification_notes}
                        >
                            {processing ? 'Rejecting...' : 'Reject Tutor'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
