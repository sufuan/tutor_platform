import { Head, Link, router } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Input } from '@/Components/ui/input';
import { Calendar, User, ArrowRight, BookOpen, Search, TrendingUp, Clock, Eye } from 'lucide-react';
import { useState } from 'react';

export default function HowItWorks({ blogs, popularBlogs, latestBlogs, filters }) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    const categories = [
        { value: 'all', label: 'All Posts', icon: BookOpen },
        { value: 'academic', label: 'Academic', icon: BookOpen },
        { value: 'career', label: 'Career', icon: TrendingUp },
        { value: 'technologies', label: 'Technologies', icon: BookOpen },
        { value: 'skills', label: 'Skills', icon: BookOpen },
        { value: 'study_hacks', label: 'Study Hacks', icon: BookOpen },
    ];

    const handleCategoryChange = (category) => {
        router.get(route('how-it-works'), {
            category: category,
            search: filters.search,
            sort: filters.sort,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('how-it-works'), {
            category: filters.category,
            search: searchTerm,
            sort: filters.sort,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSortChange = (sort) => {
        router.get(route('how-it-works'), {
            category: filters.category,
            search: filters.search,
            sort: sort,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const getCategoryLabel = (category) => {
        return category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    return (
        <GuestLayout>
            <Head title="Blog" />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <BookOpen className="h-16 w-16 mx-auto mb-4" />
                        <h1 className="text-5xl font-bold mb-4">Our Blog</h1>
                        <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
                            Insights, tips, and guides to help you succeed in your academic journey
                        </p>
                        
                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                            <div className="relative">
                                <Input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="h-14 pl-12 pr-4 text-lg text-slate-900"
                                />
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Category Filter */}
            <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center gap-3 overflow-x-auto">
                        {categories.map((cat) => (
                            <Button
                                key={cat.value}
                                variant={filters.category === cat.value ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => handleCategoryChange(cat.value)}
                                className="whitespace-nowrap"
                            >
                                {cat.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="py-12 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Blog Posts - Main Column */}
                        <div className="lg:col-span-3">
                            {/* Sort Options */}
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">
                                    {filters.category === 'all' ? 'All Posts' : getCategoryLabel(filters.category)}
                                </h2>
                                <div className="flex gap-2">
                                    <Button
                                        variant={filters.sort === 'latest' ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => handleSortChange('latest')}
                                    >
                                        <Clock className="h-4 w-4 mr-1" />
                                        Latest
                                    </Button>
                                    <Button
                                        variant={filters.sort === 'popular' ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => handleSortChange('popular')}
                                    >
                                        <TrendingUp className="h-4 w-4 mr-1" />
                                        Popular
                                    </Button>
                                </div>
                            </div>

                            {blogs.data.length === 0 ? (
                                <Card className="text-center py-12">
                                    <CardContent>
                                        <BookOpen className="h-16 w-16 mx-auto text-slate-400 mb-4" />
                                        <p className="text-xl text-slate-600">No articles found</p>
                                        <p className="text-slate-500 mt-2">Try adjusting your search or filters</p>
                                    </CardContent>
                                </Card>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {blogs.data.map((blog) => (
                                            <Card key={blog.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                                                {blog.image && (
                                                    <div className="relative h-48 overflow-hidden">
                                                        <img
                                                            src={blog.image}
                                                            alt={blog.title}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                                        <Badge className="absolute top-3 left-3 bg-white/90 text-slate-900">
                                                            {getCategoryLabel(blog.category)}
                                                        </Badge>
                                                    </div>
                                                )}
                                                <CardHeader>
                                                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-2">
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="h-4 w-4" />
                                                            <span>{new Date(blog.published_at).toLocaleDateString('en-US', { 
                                                                month: 'short', 
                                                                day: 'numeric', 
                                                                year: 'numeric' 
                                                            })}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Eye className="h-4 w-4" />
                                                            <span>{blog.views || 0} views</span>
                                                        </div>
                                                    </div>
                                                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors line-clamp-2">
                                                        {blog.title}
                                                    </CardTitle>
                                                    {blog.excerpt && (
                                                        <CardDescription className="line-clamp-3 mt-2">
                                                            {blog.excerpt}
                                                        </CardDescription>
                                                    )}
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                                            <User className="h-4 w-4" />
                                                            <span>{blog.author?.name || 'Admin'}</span>
                                                        </div>
                                                        <Button variant="ghost" className="group/btn p-0 h-auto hover:bg-transparent">
                                                            <span className="text-blue-600 font-medium group-hover/btn:underline">
                                                                Read More
                                                            </span>
                                                            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {blogs.links.length > 3 && (
                                        <div className="flex justify-center gap-2 mt-8">
                                            {blogs.links.map((link, index) => {
                                                if (!link.url) {
                                                    return (
                                                        <Button
                                                            key={index}
                                                            variant="outline"
                                                            disabled
                                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                                        />
                                                    );
                                                }
                                                
                                                return (
                                                    <Button
                                                        key={index}
                                                        variant={link.active ? 'default' : 'outline'}
                                                        onClick={() => router.visit(link.url)}
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                );
                                            })}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="space-y-6 sticky top-24">
                                {/* Popular Posts */}
                                {popularBlogs.length > 0 && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <TrendingUp className="h-5 w-5 text-blue-600" />
                                                Popular Posts
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                {popularBlogs.map((blog) => (
                                                    <div key={blog.id} className="group cursor-pointer">
                                                        <h4 className="font-medium text-sm group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                                                            {blog.title}
                                                        </h4>
                                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                                            <Eye className="h-3 w-3" />
                                                            <span>{blog.views || 0} views</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Latest Posts */}
                                {latestBlogs.length > 0 && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <Clock className="h-5 w-5 text-green-600" />
                                                Latest Posts
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                {latestBlogs.map((blog) => (
                                                    <div key={blog.id} className="group cursor-pointer">
                                                        <h4 className="font-medium text-sm group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                                                            {blog.title}
                                                        </h4>
                                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                                            <Calendar className="h-3 w-3" />
                                                            <span>{new Date(blog.published_at).toLocaleDateString()}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Categories Card */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Categories</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            {categories.filter(cat => cat.value !== 'all').map((cat) => (
                                                <Button
                                                    key={cat.value}
                                                    variant="ghost"
                                                    className="w-full justify-start"
                                                    onClick={() => handleCategoryChange(cat.value)}
                                                >
                                                    {cat.label}
                                                </Button>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}