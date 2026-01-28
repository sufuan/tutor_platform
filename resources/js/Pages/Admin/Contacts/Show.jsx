import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { ArrowLeft, Mail, Phone, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactsShow({ auth, contact }) {
    const { data, setData, post, processing } = useForm({
        status: contact.status,
        admin_notes: contact.admin_notes || '',
    });

    const handleUpdate = (e) => {
        e.preventDefault();
        post(route('admin.contacts.update-status', contact.id), {
            preserveScroll: true,
        });
    };

    const getStatusBadge = (status) => {
        const badges = {
            new: <Badge className="bg-blue-100 text-blue-800 border-blue-200">New</Badge>,
            read: <Badge variant="outline" className="bg-slate-100 text-slate-800 border-slate-200">Read</Badge>,
            replied: <Badge className="bg-green-100 text-green-800 border-green-200">Replied</Badge>,
        };
        return badges[status] || badges.new;
    };

    return (
        <AuthenticatedLayout>
            <Head title="Contact Message Details" />

            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    {/* Success/Error Messages */}
                    {auth.flash?.success && (
                        <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
                            <CheckCircle2 className="h-4 w-4" />
                            <AlertDescription>{auth.flash.success}</AlertDescription>
                        </Alert>
                    )}
                    {auth.flash?.error && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{auth.flash.error}</AlertDescription>
                        </Alert>
                    )}

                    <div className="mb-4">
                        <Button variant="outline" asChild>
                            <Link href={route('admin.contacts.index')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Messages
                            </Link>
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Message Content */}
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <CardTitle className="text-2xl">{contact.subject}</CardTitle>
                                            <CardDescription className="mt-2">
                                                From: {contact.name}
                                            </CardDescription>
                                        </div>
                                        {getStatusBadge(contact.status)}
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-4 w-4 text-slate-500" />
                                            <div>
                                                <p className="text-xs text-slate-500">Email</p>
                                                <p className="font-medium">{contact.email}</p>
                                            </div>
                                        </div>
                                        {contact.phone && (
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-4 w-4 text-slate-500" />
                                                <div>
                                                    <p className="text-xs text-slate-500">Phone</p>
                                                    <p className="font-medium">{contact.phone}</p>
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-slate-500" />
                                            <div>
                                                <p className="text-xs text-slate-500">Received</p>
                                                <p className="font-medium">
                                                    {new Date(contact.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        {contact.replied_at && (
                                            <div className="flex items-center gap-2">
                                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                <div>
                                                    <p className="text-xs text-slate-500">Replied</p>
                                                    <p className="font-medium">
                                                        {new Date(contact.replied_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <h3 className="font-semibold mb-2">Message</h3>
                                        <div className="p-4 bg-slate-50 rounded-lg">
                                            <p className="whitespace-pre-wrap text-slate-700">{contact.message}</p>
                                        </div>
                                    </div>

                                    {contact.admin_notes && (
                                        <div>
                                            <h3 className="font-semibold mb-2">Admin Notes</h3>
                                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                                <p className="whitespace-pre-wrap text-slate-700">{contact.admin_notes}</p>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Update Status Sidebar */}
                        <div className="lg:col-span-1">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Update Status</CardTitle>
                                    <CardDescription>Change message status and add notes</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleUpdate} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="status">Status</Label>
                                            <Select
                                                value={data.status}
                                                onValueChange={(value) => setData('status', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="new">New</SelectItem>
                                                    <SelectItem value="read">Read</SelectItem>
                                                    <SelectItem value="replied">Replied</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="admin_notes">Admin Notes</Label>
                                            <Textarea
                                                id="admin_notes"
                                                placeholder="Add internal notes about this message..."
                                                rows={6}
                                                value={data.admin_notes}
                                                onChange={(e) => setData('admin_notes', e.target.value)}
                                            />
                                            <p className="text-xs text-slate-500">
                                                These notes are for internal use only
                                            </p>
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full"
                                        >
                                            {processing ? 'Saving...' : 'Update Status'}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

