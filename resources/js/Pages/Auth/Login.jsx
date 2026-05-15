import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Checkbox } from '@/Components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { GraduationCap, Users, Shield, CheckCircle, ArrowLeft, Eye, EyeOff } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full">
                    <div className="mb-4 flex items-center justify-between">
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

                    {/* Logo/Header */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <Link href={route('home')} className="h-16 w-16 bg-[#275AAA] rounded-full flex items-center justify-center">
                                <GraduationCap className="h-10 w-10 text-white" />
                            </Link>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                        <p className="mt-2 text-gray-600">Sign in to your account</p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>
                                Enter your credentials to access your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {status && (
                                <Alert className="mb-4" variant="success">
                                    <CheckCircle className="h-4 w-4" />
                                    <AlertDescription>{status}</AlertDescription>
                                </Alert>
                            )}

                            <form onSubmit={submit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        autoComplete="username"
                                        autoFocus
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="you@example.com"
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-500">{errors.email}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={data.password}
                                            autoComplete="current-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="••••••••"
                                            className="pr-11"
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
                                    {errors.password && (
                                        <p className="text-sm text-red-500">{errors.password}</p>
                                    )}
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="remember"
                                            checked={data.remember}
                                            onCheckedChange={(checked) => setData('remember', checked)}
                                        />
                                        <Label htmlFor="remember" className="cursor-pointer font-normal">
                                            Remember me
                                        </Label>
                                    </div>

                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-sm text-[#275AAA] hover:text-[#1F4A92] hover:underline"
                                        >
                                            Forgot password?
                                        </Link>
                                    )}
                                </div>

                                <Button type="submit" className="w-full bg-[#275AAA] hover:bg-[#1F4A92]" disabled={processing}>
                                    {processing ? 'Signing in...' : 'Sign In'}
                                </Button>

                                <div className="text-center pt-4 border-t">
                                    <p className="text-sm text-gray-600">
                                        Don't have an account?{' '}
                                        <Link
                                            href={route('register')}
                                            className="text-[#275AAA] hover:text-[#1F4A92] font-semibold hover:underline"
                                        >
                                            Register here
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Role Info */}
                    <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-white rounded-lg shadow-sm">
                            <Users className="h-6 w-6 mx-auto mb-1 text-[#275AAA]" />
                            <p className="text-xs text-gray-600">Guardian</p>
                        </div>
                        <div className="p-3 bg-white rounded-lg shadow-sm">
                            <GraduationCap className="h-6 w-6 mx-auto mb-1 text-[#275AAA]" />
                            <p className="text-xs text-gray-600">Tutor</p>
                        </div>
                        <div className="p-3 bg-white rounded-lg shadow-sm">
                            <Shield className="h-6 w-6 mx-auto mb-1 text-[#275AAA]" />
                            <p className="text-xs text-gray-600">Admin</p>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}


