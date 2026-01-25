import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X, ChevronDown, UserCircle, LogOut, Phone, Mail } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/Components/ui/sheet';
import UserAvatar from '@/Components/UserAvatar';

export default function PublicNavbar() {
    const { auth } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Find Tutors', href: '/tutors' },
        { name: 'Find Jobs', href: '/jobs' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
    ];

    const getDashboardRoute = () => {
        if (!auth) return '/login';
        if (auth.role === 'admin') return '/admin/dashboard';
        if (auth.role === 'tutor') return '/tutor/dashboard';
        if (auth.role === 'guardian') return '/guardian/dashboard';
        return '/dashboard';
    };

    return (
        <>
            {/* Top Bar */}
            <div className="bg-[#0675C1] text-white">
                <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center text-sm">
                    <div className="flex items-center gap-4 text-sm">
                        <a href="tel:+8801234567890" className="flex items-center gap-1 hover:text-yellow-300 transition">
                            <Phone className="h-4 w-4" />
                            <span className="hidden md:inline">+880 1234-567890</span>
                        </a>
                        <a href="mailto:support@caretutors.com" className="flex items-center gap-1 hover:text-yellow-300 transition">
                            <Mail className="h-4 w-4" />
                            <span className="hidden md:inline">Support</span>
                        </a>
                    </div>
                </div>
            </div>
            
            {/* Main Navbar */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <img 
                            src="/assets/logo.png" 
                            alt="Tuition Barta Logo" 
                            className="h-[105px] w-auto"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#0675C1] hover:bg-gray-50 rounded-md transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-3">
                        {auth ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="flex items-center space-x-2">
                                        <UserAvatar user={auth} size="sm" />
                                        <span className="text-sm font-medium">{auth.name}</span>
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuItem asChild>
                                        <Link href={getDashboardRoute()} className="flex items-center cursor-pointer">
                                            <UserCircle className="mr-2 h-4 w-4" />
                                            Dashboard
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/logout" method="post" as="button" className="flex items-center w-full cursor-pointer">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Logout
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="ghost">Login</Button>
                                </Link>
                                <Link href="/tutor/signup">
                                    <Button className="bg-[#0675C1] hover:bg-[#0675C1]/90 text-white">
                                        Become a Tutor
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            <div className="flex flex-col space-y-4 mt-6">
                                {/* Mobile Auth Section */}
                                {auth ? (
                                    <div className="pb-4 border-b">
                                        <div className="flex items-center space-x-3 mb-4">
                                            <UserAvatar user={auth} size="lg" />
                                            <div>
                                                <p className="font-semibold">{auth.name}</p>
                                                <p className="text-sm text-gray-500">{auth.email}</p>
                                            </div>
                                        </div>
                                        <Link href={getDashboardRoute()} onClick={() => setMobileMenuOpen(false)}>
                                            <Button className="w-full mb-2" variant="outline">
                                                <UserCircle className="mr-2 h-4 w-4" />
                                                Dashboard
                                            </Button>
                                        </Link>
                                        <Link href="/logout" method="post" as="button" onClick={() => setMobileMenuOpen(false)}>
                                            <Button className="w-full" variant="ghost">
                                                <LogOut className="mr-2 h-4 w-4" />
                                                Logout
                                            </Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="pb-4 border-b space-y-2">
                                        <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                            <Button className="w-full" variant="outline">Login</Button>
                                        </Link>
                                        <Link href="/tutor/signup" onClick={() => setMobileMenuOpen(false)}>
                                            <Button className="w-full bg-[#0675C1] hover:bg-[#0675C1]/90 text-white">
                                                Become a Tutor
                                            </Button>
                                        </Link>
                                    </div>
                                )}

                                {/* Mobile Navigation Links */}
                                <nav className="flex flex-col space-y-2">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="px-3 py-2 text-base font-medium text-gray-700 hover:text-[#0675C1] hover:bg-gray-50 rounded-md transition-colors"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
        </>
    );
}
