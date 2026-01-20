import { Head } from '@inertiajs/react';
import PublicNavbar from '@/Components/PublicNavbar';
import PublicFooter from '@/Components/PublicFooter';

export default function PublicLayout({ children, title }) {
    return (
        <>
            <Head title={title} />
            <div className="min-h-screen flex flex-col bg-gray-50">
                <PublicNavbar />
                <main className="flex-grow">
                    {children}
                </main>
                <PublicFooter />
            </div>
        </>
    );
}
