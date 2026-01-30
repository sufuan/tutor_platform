import { Head, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Contact({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('contact.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <GuestLayout>
            <Head title="Contact Us" />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Mail className="h-16 w-16 mx-auto mb-4" />
                    <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>
            </div>

            {/* Contact Section */}
            <div className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Contact Information Cards */}
                        <div className="lg:col-span-1 space-y-6">
                            <Card className="border-none shadow-lg">
                                <CardContent className="pt-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-blue-100 rounded-lg">
                                            <Mail className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                                            <p className="text-slate-600">support@tutorplatform.com</p>
                                            <p className="text-slate-600">info@tutorplatform.com</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-lg">
                                <CardContent className="pt-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-green-100 rounded-lg">
                                            <Phone className="h-6 w-6 text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg mb-1">Call Us</h3>
                                            <p className="text-slate-600">+880 1234-567890</p>
                                            <p className="text-slate-600">+880 1234-567891</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-lg">
                                <CardContent className="pt-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-purple-100 rounded-lg">
                                            <MapPin className="h-6 w-6 text-purple-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg mb-1">Visit Us</h3>
                                            <p className="text-slate-600">123 Main Street</p>
                                            <p className="text-slate-600">Dhaka, Bangladesh</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-lg">
                                <CardContent className="pt-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-orange-100 rounded-lg">
                                            <Clock className="h-6 w-6 text-orange-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg mb-1">Business Hours</h3>
                                            <p className="text-slate-600">Monday - Friday: 9AM - 6PM</p>
                                            <p className="text-slate-600">Saturday: 10AM - 4PM</p>
                                            <p className="text-slate-600">Sunday: Closed</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <Card className="border-none shadow-xl">
                                <CardHeader>
                                    <CardTitle className="text-3xl">Send us a Message</CardTitle>
                                    <CardDescription className="text-base">
                                        Fill out the form below and we'll get back to you within 24 hours
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {/* Success/Error Messages */}
                                    {auth?.flash?.success && (
                                        <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
                                            <CheckCircle2 className="h-4 w-4" />
                                            <AlertDescription>{auth.flash.success}</AlertDescription>
                                        </Alert>
                                    )}
                                    {auth?.flash?.error && (
                                        <Alert variant="destructive" className="mb-6">
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertDescription>{auth.flash.error}</AlertDescription>
                                        </Alert>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Your Name *</Label>
                                                <Input
                                                    id="name"
                                                    placeholder="John Doe"
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    className="h-12"
                                                />
                                                {errors.name && (
                                                    <p className="text-sm text-red-500">{errors.name}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email Address *</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="john@example.com"
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    className="h-12"
                                                />
                                                {errors.email && (
                                                    <p className="text-sm text-red-500">{errors.email}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number (Optional)</Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                placeholder="+880 1234-567890"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                className="h-12"
                                            />
                                            {errors.phone && (
                                                <p className="text-sm text-red-500">{errors.phone}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="subject">Subject *</Label>
                                            <Input
                                                id="subject"
                                                placeholder="How can we help you?"
                                                value={data.subject}
                                                onChange={(e) => setData('subject', e.target.value)}
                                                className="h-12"
                                            />
                                            {errors.subject && (
                                                <p className="text-sm text-red-500">{errors.subject}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="message">Message *</Label>
                                            <Textarea
                                                id="message"
                                                placeholder="Tell us more about your inquiry..."
                                                rows={8}
                                                value={data.message}
                                                onChange={(e) => setData('message', e.target.value)}
                                            />
                                            <p className="text-xs text-slate-500">
                                                {data.message.length}/2000 characters
                                            </p>
                                            {errors.message && (
                                                <p className="text-sm text-red-500">{errors.message}</p>
                                            )}
                                        </div>

                                        <Button
                                            type="submit"
                                            size="lg"
                                            disabled={processing}
                                            className="w-full"
                                        >
                                            {processing ? (
                                                'Sending...'
                                            ) : (
                                                <>
                                                    <Send className="mr-2 h-5 w-5" />
                                                    Send Message
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Section (Optional) */}
            <div className="bg-slate-100 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold mb-2">Find Us on the Map</h2>
                        <p className="text-slate-600">Visit our office for in-person assistance</p>
                    </div>
                    <div className="rounded-lg overflow-hidden shadow-lg h-96 bg-slate-200">
                        {/* You can embed Google Maps here */}
                        <div className="w-full h-full flex items-center justify-center text-slate-500">
                            <MapPin className="h-12 w-12 mb-2" />
                            <p>Map integration coming soon</p>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}


