import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/Components/ui/radio-group';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { GraduationCap, Users, CheckCircle, Mail, Lock, User, Shield } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'guardian',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const roles = [
        {
            value: 'guardian',
            label: 'Guardian',
            description: 'Find qualified tutors for your children',
            icon: Users,
            color: 'bg-blue-50 border-blue-200 text-blue-900'
        },
        {
            value: 'tutor',
            label: 'Tutor',
            description: 'Offer your teaching services',
            icon: GraduationCap,
            color: 'bg-green-50 border-green-200 text-green-900'
        }
    ];

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="min-h-screen flex">
                {/* LEFT SIDE - Branding */}
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-12 flex-col justify-between relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-12">
                            <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center">
                                <GraduationCap className="h-7 w-7 text-slate-900" />
                            </div>
                            <span className="text-white text-2xl font-bold">TutorHub</span>
                        </div>

                        <div className="space-y-6">
                            <h1 className="text-5xl font-bold text-white leading-tight">
                                Join Our Growing<br />Education Community
                            </h1>
                            <p className="text-slate-300 text-lg">
                                Connect with thousands of students and tutors. Start your journey towards academic excellence today.
                            </p>

                            {/* Features */}
                            <div className="space-y-4 mt-12">
                                {[
                                    'Verified and qualified tutors',
                                    'Flexible scheduling options',
                                    'Secure payment processing',
                                    'Real-time progress tracking'
                                ].map((feature, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                                            <CheckCircle className="h-5 w-5 text-white" />
                                        </div>
                                        <span className="text-slate-200">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 text-slate-400 text-sm">
                        © 2026 TutorHub. All rights reserved.
                    </div>
                </div>

                {/* RIGHT SIDE - Registration Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
                    <div className="w-full max-w-md">
                        {/* Mobile Logo */}
                        <div className="lg:hidden flex justify-center mb-8">
                            <div className="h-14 w-14 bg-slate-900 rounded-xl flex items-center justify-center">
                                <GraduationCap className="h-8 w-8 text-white" />
                            </div>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-slate-900">Create Account</h2>
                            <p className="mt-2 text-slate-600">Get started with your free account</p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            {/* Role Selection */}
                            <div className="space-y-3">
                                <Label className="text-base font-semibold text-slate-900">Choose your role</Label>
                                <RadioGroup 
                                    value={data.role} 
                                    onValueChange={(value) => setData('role', value)}
                                    className="grid grid-cols-2 gap-4"
                                >
                                    {roles.map(role => {
                                        const Icon = role.icon;
                                        return (
                                            <div key={role.value}>
                                                <RadioGroupItem
                                                    value={role.value}
                                                    id={role.value}
                                                    className="peer sr-only"
                                                />
                                                <Label
                                                    htmlFor={role.value}
                                                    className={`flex flex-col items-center justify-center rounded-xl border-2 p-5 cursor-pointer transition-all hover:shadow-md ${
                                                        data.role === role.value
                                                            ? 'border-slate-900 bg-slate-900 text-white shadow-lg'
                                                            : 'border-slate-200 bg-white hover:border-slate-300'
                                                    }`}
                                                >
                                                    <Icon className={`h-10 w-10 mb-3 ${
                                                        data.role === role.value ? 'text-white' : 'text-slate-600'
                                                    }`} />
                                                    <span className="font-semibold text-sm">{role.label}</span>
                                                    <span className={`text-xs text-center mt-1 ${
                                                        data.role === role.value ? 'text-slate-200' : 'text-slate-500'
                                                    }`}>
                                                        {role.description}
                                                    </span>
                                                </Label>
                                            </div>
                                        );
                                    })}
                                </RadioGroup>
                                {errors.role && (
                                    <p className="text-sm text-red-500">{errors.role}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-slate-900 font-medium">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                    <Input
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        autoComplete="name"
                                        autoFocus
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="John Doe"
                                        className="pl-11 h-12 rounded-lg border-slate-300"
                                        required
                                    />
                                </div>
                                {errors.name && (
                                    <p className="text-sm text-red-500">{errors.name}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-slate-900 font-medium">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        autoComplete="username"
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="you@example.com"
                                        className="pl-11 h-12 rounded-lg border-slate-300"
                                        required
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-sm text-red-500">{errors.email}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-slate-900 font-medium">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="••••••••"
                                        className="pl-11 h-12 rounded-lg border-slate-300"
                                        required
                                    />
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-red-500">{errors.password}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password_confirmation" className="text-slate-900 font-medium">Confirm Password</Label>
                                <div className="relative">
                                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setData('password_confirmation', e.target.value)
                                        }
                                        placeholder="••••••••"
                                        className="pl-11 h-12 rounded-lg border-slate-300"
                                        required
                                    />
                                </div>
                                {errors.password_confirmation && (
                                    <p className="text-sm text-red-500">{errors.password_confirmation}</p>
                                )}
                            </div>

                            <Button 
                                type="submit" 
                                className="w-full h-12 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-lg" 
                                disabled={processing}
                            >
                                {processing ? 'Creating account...' : 'Create Account'}
                            </Button>

                            <div className="text-center pt-4">
                                <p className="text-sm text-slate-600">
                                    Already have an account?{' '}
                                    <Link
                                        href={route('login')}
                                        className="text-slate-900 hover:text-slate-700 font-semibold hover:underline"
                                    >
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
