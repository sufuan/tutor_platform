import { useState } from 'react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Checkbox } from '@/Components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Head, Link, useForm } from '@inertiajs/react';
import { GraduationCap, Users, ArrowRight, BookOpen, Award, TrendingUp, Shield, CheckCircle2 } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const [activeTab, setActiveTab] = useState('guardian');

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

    const features = [
        { icon: BookOpen, title: 'Quality Education', desc: 'Verified tutors with proven track records' },
        { icon: Award, title: 'Easy Matching', desc: 'Find the perfect tutor for your needs' },
        { icon: TrendingUp, title: 'Track Progress', desc: 'Monitor learning outcomes in real-time' },
    ];

    return (
        <>
            <Head title="Login" />
            
            <div className="min-h-screen flex">
                {/* Left Side - Branding & Features */}
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-12 flex-col justify-between relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
                    </div>

                    <div className="relative z-10">
                        {/* Logo */}
                        <div className="flex items-center space-x-3 mb-16">
                            <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center">
                                <GraduationCap className="h-8 w-8 text-blue-600" />
                            </div>
                            <span className="text-3xl font-bold text-white">TutorHub</span>
                        </div>

                        {/* Headline */}
                        <div className="space-y-6">
                            <h1 className="text-5xl font-bold text-white leading-tight">
                                Connect with the<br />
                                <span className="text-blue-200">Best Tutors</span><br />
                                Near You
                            </h1>
                            <p className="text-xl text-blue-100 max-w-md">
                                Join thousands of guardians and tutors making education accessible and effective
                            </p>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="relative z-10 space-y-6">
                        {features.map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                                <div key={idx} className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                    <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Icon className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold text-lg">{feature.title}</h3>
                                        <p className="text-blue-100 text-sm">{feature.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Stats */}
                    <div className="relative z-10 grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
                        <div>
                            <div className="text-3xl font-bold text-white">5000+</div>
                            <div className="text-blue-200 text-sm">Active Tutors</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white">15k+</div>
                            <div className="text-blue-200 text-sm">Students</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white">98%</div>
                            <div className="text-blue-200 text-sm">Satisfaction</div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
                    <div className="w-full max-w-md space-y-8">
                        {/* Mobile Logo */}
                        <div className="lg:hidden flex justify-center">
                            <div className="flex items-center space-x-3">
                                <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center">
                                    <GraduationCap className="h-8 w-8 text-white" />
                                </div>
                                <span className="text-2xl font-bold text-gray-900">TutorHub</span>
                            </div>
                        </div>

                        {/* Welcome Text */}
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                            <p className="mt-2 text-gray-600">Sign in to continue your journey</p>
                        </div>

                        {/* Status Message */}
                        {status && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
                                <CheckCircle2 className="h-5 w-5 mr-2" />
                                {status}
                            </div>
                        )}

                        {/* Login Tabs */}
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-8">
                                <TabsTrigger value="guardian" className="flex items-center space-x-2">
                                    <Users className="h-4 w-4" />
                                    <span>Guardian</span>
                                </TabsTrigger>
                                <TabsTrigger value="tutor" className="flex items-center space-x-2">
                                    <GraduationCap className="h-4 w-4" />
                                    <span>Tutor</span>
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="guardian" className="space-y-6">
                                <form onSubmit={submit} className="space-y-5">
                                    <div className="space-y-2">
                                        <Label htmlFor="guardian-email" className="text-sm font-medium text-gray-700">
                                            Email Address
                                        </Label>
                                        <Input
                                            id="guardian-email"
                                            type="email"
                                            placeholder="guardian@example.com"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="h-11"
                                            required
                                        />
                                        {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="guardian-password" className="text-sm font-medium text-gray-700">
                                            Password
                                        </Label>
                                        <Input
                                            id="guardian-password"
                                            type="password"
                                            placeholder="••••••••"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            className="h-11"
                                            required
                                        />
                                        {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="guardian-remember"
                                                checked={data.remember}
                                                onCheckedChange={(checked) => setData('remember', checked)}
                                            />
                                            <label htmlFor="guardian-remember" className="text-sm text-gray-600 cursor-pointer">
                                                Remember me
                                            </label>
                                        </div>
                                        {canResetPassword && (
                                            <Link href={route('password.request')} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                                Forgot password?
                                            </Link>
                                        )}
                                    </div>

                                    <Button type="submit" disabled={processing} className="w-full h-11 bg-blue-600 hover:bg-blue-700">
                                        {processing ? 'Signing in...' : 'Sign in as Guardian'}
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </form>
                            </TabsContent>

                            <TabsContent value="tutor" className="space-y-6">
                                <form onSubmit={submit} className="space-y-5">
                                    <div className="space-y-2">
                                        <Label htmlFor="tutor-email" className="text-sm font-medium text-gray-700">
                                            Email Address
                                        </Label>
                                        <Input
                                            id="tutor-email"
                                            type="email"
                                            placeholder="tutor@example.com"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="h-11"
                                            required
                                        />
                                        {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="tutor-password" className="text-sm font-medium text-gray-700">
                                            Password
                                        </Label>
                                        <Input
                                            id="tutor-password"
                                            type="password"
                                            placeholder="••••••••"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            className="h-11"
                                            required
                                        />
                                        {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="tutor-remember"
                                                checked={data.remember}
                                                onCheckedChange={(checked) => setData('remember', checked)}
                                            />
                                            <label htmlFor="tutor-remember" className="text-sm text-gray-600 cursor-pointer">
                                                Remember me
                                            </label>
                                        </div>
                                        {canResetPassword && (
                                            <Link href={route('password.request')} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                                Forgot password?
                                            </Link>
                                        )}
                                    </div>

                                    <Button type="submit" disabled={processing} className="w-full h-11 bg-green-600 hover:bg-green-700">
                                        {processing ? 'Signing in...' : 'Sign in as Tutor'}
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </form>
                            </TabsContent>
                        </Tabs>

                        {/* Register Link */}
                        <div className="text-center pt-6 border-t border-gray-200">
                            <p className="text-gray-600">
                                Don't have an account?{' '}
                                <Link href={route('register')} className="text-blue-600 hover:text-blue-700 font-semibold">
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

