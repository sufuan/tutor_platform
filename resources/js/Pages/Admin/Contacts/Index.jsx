import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table';
import { Mail, MailOpen, CheckCircle, Eye, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactsIndex({ auth, contacts, newCount }) {
    const getStatusBadge = (contact) => {
        if (contact.status === 'new') {
            return (
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    <Mail className="h-3 w-3 mr-1" />
                    New
                </Badge>
            );
        } else if (contact.status === 'replied') {
            return (
                <Badge className="bg-green-100 text-green-800 border-green-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Replied
                </Badge>
            );
        } else {
            return (
                <Badge variant="outline" className="bg-slate-100 text-slate-800 border-slate-200">
                    <MailOpen className="h-3 w-3 mr-1" />
                    Read
                </Badge>
            );
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Contact Messages" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
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

                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle className="text-2xl">Contact Messages</CardTitle>
                                    <CardDescription>
                                        Manage contact form submissions
                                        {newCount > 0 && (
                                            <Badge className="ml-2 bg-red-500 text-white">
                                                {newCount} new
                                            </Badge>
                                        )}
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Subject</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {contacts.data.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                                                    No contact messages yet
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            contacts.data.map((contact) => (
                                                <TableRow 
                                                    key={contact.id}
                                                    className={contact.status === 'new' ? 'bg-blue-50/50' : ''}
                                                >
                                                    <TableCell className="font-medium">
                                                        {contact.name}
                                                        {contact.status === 'new' && (
                                                            <span className="ml-2 inline-block h-2 w-2 rounded-full bg-blue-500"></span>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>{contact.email}</TableCell>
                                                    <TableCell className="max-w-xs truncate">
                                                        {contact.subject}
                                                    </TableCell>
                                                    <TableCell>
                                                        {getStatusBadge(contact)}
                                                    </TableCell>
                                                    <TableCell>
                                                        {new Date(contact.created_at).toLocaleDateString()}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            asChild
                                                        >
                                                            <Link href={route('admin.contacts.show', contact.id)}>
                                                                <Eye className="h-4 w-4 mr-1" />
                                                                View
                                                            </Link>
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Pagination */}
                            {contacts.links.length > 3 && (
                                <div className="flex justify-center gap-2 mt-4">
                                    {contacts.links.map((link, index) => (
                                        <Button
                                            key={index}
                                            variant={link.active ? 'default' : 'outline'}
                                            size="sm"
                                            disabled={!link.url}
                                            onClick={() => link.url && router.visit(link.url)}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


