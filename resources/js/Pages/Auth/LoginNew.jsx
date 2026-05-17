import { useState } from 'react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Checkbox } from '@/Components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/Components/ui/radio-group';
import { Head, Link, useForm } from '@inertiajs/react';
import { GraduationCap, Users, ArrowLeft, ArrowRight, CheckCircle2, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        role: 'tutor',
        email: '',
        password: '',
        remember: false,
    });

    const roles = [
        {
            value: 'tutor',
            label: 'Tutor',
            description: 'Sign in to manage tutoring services',
            icon: GraduationCap,
        },
        {
            value: 'guardian',
            label: 'Guardian',
            description: 'Sign in to manage tutoring needs',
            icon: Users,
        },
    ];

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Login" />
            
            <div className="min-h-screen flex">
                {/* LEFT SIDE - Branding */}
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#275AAA] via-[#1F4A92] to-[#183B73] p-12 flex-col justify-between relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#275AAA] rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-12">
                            <Link href={route('home')} className="h-12 w-12 bg-white rounded-xl flex items-center justify-center p-1.5">
                                <img src="/assets/logo.png" alt="Tuition Barta" className="h-full w-full object-contain" />
                            </Link>
                            <Link href={route('home')} className="text-white text-2xl font-bold">Tuition Barta</Link>
                        </div>

                        <div className="space-y-6">
                            <h1 className="text-5xl font-bold text-white leading-tight">
                                Join Our Growing<br />Education Community
                            </h1>
                            <p className="text-slate-300 text-lg max-w-md">
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
                                        <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                                            <CheckCircle2 className="h-5 w-5 text-[#275AAA]" />
                                        </div>
                                        <span className="text-slate-200">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 text-slate-400 text-sm">
                        © 2026 Tuition Barta. All rights reserved.
                    </div>
                </div>

                {/* RIGHT SIDE - Login Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#F6F8FC]">
                    <div className="w-full max-w-md">
                        <div className="flex items-center justify-between mb-4">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => {
                                    if (window.history.length > 1) {
                                        window.history.back();
                                    } else {
                                        window.location.href = route('home');
                                    }
                                }}
                                className="px-0 text-[#275AAA] hover:text-[#1F4A92] hover:bg-transparent"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back
                            </Button>
                        </div>

                        {/* Mobile Logo */}
                        <div className="lg:hidden flex justify-center mb-8">
                            <Link href={route('home')} className="h-20 w-auto flex items-center justify-center">
                                <img src="/assets/logo.png" alt="Tuition Barta" className="h-full w-full object-contain" />
                            </Link>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
                            <p className="mt-2 text-slate-600">Sign in to continue your journey</p>
                        </div>

                        {/* Status Message */}
                        {status && (
                            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
                                <CheckCircle2 className="h-5 w-5 mr-2" />
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-3">
                                <Label className="text-base font-semibold text-slate-900">Choose your role</Label>
                                <RadioGroup
                                    value={data.role}
                                    onValueChange={(value) => setData('role', value)}
                                    className="grid grid-cols-2 gap-4"
                                >
                                    {roles.map((role) => {
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
                                                            ? 'border-[#275AAA] bg-[#275AAA] text-white shadow-lg'
                                                            : 'border-slate-200 bg-white hover:border-[#275AAA]/40'
                                                    }`}
                                                >
                                                    <Icon
                                                        className={`h-10 w-10 mb-3 ${
                                                            data.role === role.value ? 'text-white' : 'text-[#275AAA]'
                                                        }`}
                                                    />
                                                    <span className="font-semibold text-sm">{role.label}</span>
                                                    <span className={`text-xs text-center mt-1 ${
                                                        data.role === role.value ? 'text-[#E4EDF9]' : 'text-slate-500'
                                                    }`}>
                                                        {role.description}
                                                    </span>
                                                </Label>
                                            </div>
                                        );
                                    })}
                                </RadioGroup>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-slate-900 font-medium">
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder={data.role === 'tutor' ? 'tutor@example.com' : 'guardian@example.com'}
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="pl-11 h-12 rounded-lg border-slate-300 focus-visible:border-[#275AAA] focus-visible:ring-[#275AAA]/20"
                                        required
                                    />
                                </div>
                                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-slate-900 font-medium">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="pl-11 pr-11 h-12 rounded-lg border-slate-300 focus-visible:border-[#275AAA] focus-visible:ring-[#275AAA]/20"
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => setShowPassword((current) => !current)}
                                        className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 p-0 text-slate-400 hover:text-[#275AAA] hover:bg-transparent"
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </Button>
                                </div>
                                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        checked={data.remember}
                                        onCheckedChange={(checked) => setData('remember', checked)}
                                    />
                                    <label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer">
                                        Remember me
                                    </label>
                                </div>
                                {canResetPassword && (
                                    <Link href={route('password.request')} className="text-sm text-[#275AAA] hover:text-[#1F4A92] font-medium">
                                        Forgot password?
                                    </Link>
                                )}
                            </div>

                            <Button type="submit" disabled={processing} className="w-full h-12 rounded-lg bg-[#275AAA] hover:bg-[#1F4A92] text-white font-semibold shadow-lg">
                                {processing ? `Signing in as ${data.role === 'tutor' ? 'Tutor' : 'Guardian'}...` : `Sign in as ${data.role === 'tutor' ? 'Tutor' : 'Guardian'}`}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </form>

                        {/* Register Link */}
                        <div className="text-center pt-6 border-t border-slate-200 mt-6">
                            <p className="text-slate-600">
                                Don't have an account?{' '}
                                <Link href={route('register')} className="text-[#275AAA] hover:text-[#1F4A92] font-semibold">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


