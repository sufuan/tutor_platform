import { Link, usePage, router } from '@inertiajs/react';
import { useEffect } from 'react';
import {
    Home,
    User,
    Briefcase,
    PlusCircle,
    Inbox,
    Calendar,
    Bell,
    Settings,
    Search,
    FileText,
    Star,
    UserCheck,
    FileCheck,
    Users,
    BarChart,
    ChevronUp,
    LogOut,
    BookOpen,
    Mail,
} from 'lucide-react';
import UserAvatar from '@/Components/UserAvatar';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuBadge,
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
    SidebarRail,
} from '@/Components/ui/sidebar';
import { Separator } from '@/Components/ui/separator';
import { Toaster } from '@/Components/ui/toaster';
import { useToast } from '@/hooks/use-toast';

export default function AuthenticatedLayout({ children, header }) {
    const { auth, badgeCounts = {}, flash } = usePage().props;
    const user = auth;
    const { toast } = useToast();

    // Handle flash messages
    useEffect(() => {
        if (flash?.success) {
            toast({
                variant: 'success',
                title: 'Success',
                description: flash.success,
            });
        }
        if (flash?.error) {
            toast({
                variant: 'error',
                title: 'Error',
                description: flash.error,
            });
        }
        if (flash?.warning) {
            toast({
                variant: 'warning',
                title: 'Warning',
                description: flash.warning,
            });
        }
        if (flash?.info) {
            toast({
                variant: 'info',
                title: 'Info',
                description: flash.info,
            });
        }
    }, [flash]);

    const getMenuItems = () => {
        const role = user.role;

        if (role === 'guardian') {
            const profileComplete = badgeCounts?.profileComplete ?? true;
            return [
                {
                    title: 'Dashboard',
                    url: route('dashboard'),
                    icon: Home,
                    isActive: route().current('dashboard'),
                },
                {
                    title: 'Complete Profile',
                    url: route('guardian.profile.complete'),
                    icon: User,
                    badge: !profileComplete ? { value: '!', variant: 'destructive' } : null,
                },
                {
                    title: 'Post a Job',
                    url: route('guardian.jobs.create'),
                    icon: PlusCircle,
                    requiresProfile: true,
                },
                {
                    title: 'My Jobs',
                    url: route('guardian.jobs.index'),
                    icon: Briefcase,
                    badge: badgeCounts?.totalJobs ? { value: badgeCounts.totalJobs } : null,
                },
            ];
        }

        if (role === 'tutor') {
            const verificationStatus = user.tutor?.verification_status || 'pending';
            const profileCompletion = user.tutor?.profile_completion_percentage || 0;
            const isProfileComplete = profileCompletion >= 70;
            const statusColors = {
                pending: 'bg-yellow-500',
                verified: 'bg-green-500',
                rejected: 'bg-red-500',
            };

            return [
                {
                    title: 'Dashboard',
                    url: route('dashboard'),
                    icon: Home,
                    isActive: route().current('dashboard'),
                },
                {
                    title: 'Browse Jobs',
                    url: route('tutor.jobs.browse'),
                    icon: Search,
                    disabled: !isProfileComplete,
                },
                {
                    title: 'My Applications',
                    url: route('tutor.applications'),
                    icon: FileText,
                    badge: badgeCounts?.applicationUpdates
                        ? { value: badgeCounts.applicationUpdates, variant: 'default' }
                        : null,
                    disabled: !isProfileComplete,
                },
                {
                    title: 'My Job Requests',
                    url: route('tutor.job-requests'),
                    icon: Briefcase,
                    disabled: !isProfileComplete,
                },
                {
                    title: 'My Profile',
                    url: route('tutor.profile'),
                    icon: User,
                },
                {
                    type: 'status-badge',
                    status: verificationStatus,
                    statusColor: statusColors[verificationStatus],
                },
            ];
        }

        if (role === 'admin') {
            return [
                {
                    title: 'Dashboard',
                    url: route('admin.dashboard'),
                    icon: Home,
                    isActive: route().current('admin.dashboard'),
                },
                {
                    title: 'All Tutors',
                    url: route('admin.tutors.index'),
                    icon: Users,
                    isActive: route().current('admin.tutors.index'),
                },
                {
                    title: 'All Guardians',
                    url: route('admin.guardians.index'),
                    icon: Users,
                    isActive: route().current('admin.guardians.index'),
                },
                {
                    title: 'Tutor Verifications',
                    url: route('admin.tutors.verifications'),
                    icon: UserCheck,
                    badge: badgeCounts?.pendingVerifications
                        ? { value: badgeCounts.pendingVerifications, variant: 'default' }
                        : null,
                },
                {
                    title: 'Job Approvals',
                    url: route('admin.jobs.approvals'),
                    icon: FileCheck,
                    badge: badgeCounts?.pendingJobs
                        ? { value: badgeCounts.pendingJobs, variant: 'default' }
                        : null,
                },
                {
                    title: 'Post New Job',
                    url: route('admin.jobs.create'),
                    icon: PlusCircle,
                },
                {
                    title: 'Tutor Job Requests',
                    url: route('admin.tutor-job-requests.index'),
                    icon: Briefcase,
                },
                {
                    title: 'Job Applications',
                    url: route('admin.job-applications.index'),
                    icon: FileText,
                },                {
                    title: 'Blogs',
                    url: route('admin.blogs.index'),
                    icon: BookOpen,
                },
                {
                    title: 'Contact Messages',
                    url: route('admin.contacts.index'),
                    icon: Mail,
                },            ];
        }

        return [];
    };

    const menuItems = getMenuItems();

    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <Sidebar collapsible="offcanvas">
                    <SidebarHeader className="border-b border-sidebar-border">
                        <div className="flex items-center gap-2 px-2 py-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-blue text-white font-bold text-lg">
                                CT
                            </div>
                            <div className="flex flex-col flex-1 min-w-0">
                                <span className="font-bold text-base truncate">CareTutors</span>
                                <span className="text-xs text-muted-foreground capitalize truncate">
                                    {user.role} Portal
                                </span>
                            </div>
                        </div>
                    </SidebarHeader>

                    <SidebarContent>
                        <SidebarMenu className="gap-2 p-2">
                            {menuItems.map((item, index) => {
                                if (item.type === 'status-badge') {
                                    return (
                                        <div
                                            key={index}
                                            className="mx-2 mt-2 mb-1 px-3 py-2 rounded-md bg-sidebar-accent"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className={`h-2 w-2 rounded-full ${item.statusColor}`}
                                                />
                                                <span className="text-xs font-medium">
                                                    Status:{' '}
                                                    <span className="capitalize">{item.status}</span>
                                                </span>
                                            </div>
                                        </div>
                                    );
                                }

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild={!item.disabled}
                                            isActive={
                                                item.isActive !== undefined
                                                    ? item.isActive
                                                    : route().current(item.url)
                                            }
                                            tooltip={item.disabled ? "Complete your profile (70%+) to unlock" : item.title}
                                            disabled={item.disabled}
                                            className={item.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                                        >
                                            {item.disabled ? (
                                                <div className="flex items-center gap-2 w-full">
                                                    <item.icon className="h-4 w-4" />
                                                    <span>{item.title}</span>
                                                </div>
                                            ) : (
                                                <Link href={item.url}>
                                                    <item.icon className="h-4 w-4" />
                                                    <span>{item.title}</span>
                                                </Link>
                                            )}
                                        </SidebarMenuButton>
                                        {item.badge && !item.disabled && (
                                            <SidebarMenuBadge>
                                                <Badge
                                                    variant={item.badge.variant || 'secondary'}
                                                    className="h-5 min-w-5 flex items-center justify-center text-xs"
                                                >
                                                    {item.badge.value}
                                                </Badge>
                                            </SidebarMenuBadge>
                                        )}
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarContent>

                    <SidebarFooter className="border-t border-sidebar-border">
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuButton
                                            size="lg"
                                            className="data-[state=open]:bg-sidebar-accent"
                                        >
                                            <UserAvatar user={user} size="default" />
                                            <div className="flex flex-col flex-1 min-w-0 text-left">
                                                <span className="text-sm font-semibold truncate">
                                                    {user.name}
                                                </span>
                                                <span className="text-xs text-muted-foreground truncate">
                                                    {user.email}
                                                </span>
                                            </div>
                                            <ChevronUp className="ml-auto h-4 w-4" />
                                        </SidebarMenuButton>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        side="top"
                                        align="start"
                                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56"
                                    >
                                        <DropdownMenuLabel className="font-normal">
                                            <div className="flex items-center gap-2">
                                                <UserAvatar user={user} size="sm" />
                                                <div className="flex flex-col space-y-1">
                                                    <p className="text-sm font-medium leading-none">
                                                        {user.name}
                                                    </p>
                                                    <p className="text-xs leading-none text-muted-foreground">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <Link href={route('profile.edit')} className="cursor-pointer">
                                                <Settings className="mr-2 h-4 w-4" />
                                                Profile Settings
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={handleLogout}
                                            className="cursor-pointer text-red-600 focus:text-red-600"
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Log out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarFooter>
                    <SidebarRail />
                </Sidebar>

                <SidebarInset className="flex flex-col flex-1">
                    <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        {header && <div className="flex-1">{header}</div>}
                    </header>
                    <main className="flex-1 overflow-auto">
                        <div className="container mx-auto p-4 md:p-6 lg:p-8">{children}</div>
                    </main>
                </SidebarInset>
            </div>
            <Toaster />
        </SidebarProvider>
    );
}
