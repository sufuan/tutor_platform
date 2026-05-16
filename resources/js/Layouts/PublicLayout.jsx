import { Head } from '@inertiajs/react';
import PublicNavbar from '@/Components/PublicNavbar';
import PublicFooter from '@/Components/PublicFooter';

export default function PublicLayout({ 
    children, 
    title = 'Welcome',
    description = 'Connect with Bangladesh\'s finest verified tutors. Transform your learning journey with personalized education tailored to your needs.',
    keywords = 'tutor, tuition, online tutor, home tutor, bangladesh, learning',
    image = 'https://tuitionbarta.com/assets/logo.png',
    url = 'https://tuitionbarta.com'
}) {
    const pageTitle = `${title} | Tuition Barta`;
    
    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={url} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={image} />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={url} />
                <meta property="twitter:title" content={pageTitle} />
                <meta property="twitter:description" content={description} />
                <meta property="twitter:image" content={image} />
            </Head>
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

