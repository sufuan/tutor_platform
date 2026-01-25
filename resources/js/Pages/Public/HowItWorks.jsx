import { Head, Link, router } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
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
        router.get(route('blog'), {
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
        router.get(route('blog'), {
            category: filters.category,
            search: searchTerm,
            sort: filters.sort,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSortChange = (sort) => {
        router.get(route('blog'), {
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
        <PublicLayout>
            <Head title="Blog" />

            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-24 overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute inset-0" style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
                }}></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="inline-block p-3 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
                            <BookOpen className="h-12 w-12" />
                        </div>
                        <h1 className="text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                            Discover Our Blog
                        </h1>
                        <p className="text-2xl text-blue-50 max-w-3xl mx-auto mb-10 leading-relaxed">
                            Expert insights, study tips, and career guidance to help you excel in your academic journey
                        </p>
                        
                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
                            <div className="relative">
                                <Input
                                    type="text"
                                    placeholder="Search for articles, topics, or keywords..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="h-16 pl-14 pr-4 text-lg text-slate-900 bg-white rounded-full shadow-2xl border-0 focus:ring-4 focus:ring-white/30"
                                />
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-400" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Category Filter */}
            <div className="bg-white border-b sticky top-0 z-10 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-center gap-3 overflow-x-auto">
                        {categories.map((cat) => (
                            <Button
                                key={cat.value}
                                variant={filters.category === cat.value ? 'default' : 'outline'}
                                size="lg"
                                onClick={() => handleCategoryChange(cat.value)}
                                className={`whitespace-nowrap font-semibold ${
                                    filters.category === cat.value 
                                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700' 
                                        : ''
                                }`}
                            >
                                <cat.icon className="h-4 w-4 mr-2" />
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
                                    {/* Featured Post (First Post) */}
                                    {blogs.data.length > 0 && (
                                        <Link href={route('blog.show', blogs.data[0].id)}>
                                            <Card className="group hover:shadow-2xl transition-all duration-500 overflow-hidden mb-8 cursor-pointer border-2 hover:border-blue-500">
                                                <div className="grid md:grid-cols-2 gap-0">
                                                    {blogs.data[0].image && (
                                                        <div className="relative h-80 md:h-auto overflow-hidden">
                                                            <img
                                                                src={blogs.data[0].image}
                                                                alt={blogs.data[0].title}
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-transparent"></div>
                                                            <Badge className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 text-sm px-3 py-1">
                                                                ⭐ Featured
                                                            </Badge>
                                                            <Badge className="absolute top-4 right-4 bg-white/90 text-slate-900">
                                                                {getCategoryLabel(blogs.data[0].category)}
                                                            </Badge>
                                                        </div>
                                                    )}
                                                    <div className="p-8 flex flex-col justify-center">
                                                        <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                                                            <div className="flex items-center gap-2">
                                                                <Calendar className="h-4 w-4" />
                                                                <span>{new Date(blogs.data[0].published_at).toLocaleDateString('en-US', { 
                                                                    month: 'long', 
                                                                    day: 'numeric', 
                                                                    year: 'numeric' 
                                                                })}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Eye className="h-4 w-4" />
                                                                <span className="font-semibold">{blogs.data[0].views || 0} views</span>
                                                            </div>
                                                        </div>
                                                        <CardTitle className="text-3xl group-hover:text-blue-600 transition-colors mb-4 leading-tight">
                                                            {blogs.data[0].title}
                                                        </CardTitle>
                                                        {blogs.data[0].excerpt && (
                                                            <CardDescription className="text-base mb-6 line-clamp-3">
                                                                {blogs.data[0].excerpt}
                                                            </CardDescription>
                                                        )}
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                                <User className="h-5 w-5" />
                                                                <span className="font-medium">{blogs.data[0].author?.name || 'Admin'}</span>
                                                            </div>
                                                            <Button className="group/btn bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                                                                <span>Read Full Article</span>
                                                                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        </Link>
                                    )}

                                    {/* Regular Posts Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                        {blogs.data.slice(1).map((blog) => (
                                            <Link key={blog.id} href={route('blog.show', blog.id)}>
                                                <Card className="group hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col cursor-pointer border hover:border-blue-400">
                                                    {blog.image ? (
                                                        <div className="relative h-56 overflow-hidden">
                                                            <img
                                                                src={blog.image}
                                                                alt={blog.title}
                                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                                            <Badge className="absolute top-3 left-3 bg-white/95 text-slate-900 font-semibold">
                                                                {getCategoryLabel(blog.category)}
                                                            </Badge>
                                                        </div>
                                                    ) : (
                                                        <div className="relative h-56 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                                            <BookOpen className="h-20 w-20 text-white/30" />
                                                            <Badge className="absolute top-3 left-3 bg-white/95 text-slate-900 font-semibold">
                                                                {getCategoryLabel(blog.category)}
                                                            </Badge>
                                                        </div>
                                                    )}
                                                    <CardHeader className="flex-grow">
                                                        <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                                                            <div className="flex items-center gap-1">
                                                                <Calendar className="h-3.5 w-3.5" />
                                                                <span>{new Date(blog.published_at).toLocaleDateString('en-US', { 
                                                                    month: 'short', 
                                                                    day: 'numeric', 
                                                                    year: 'numeric' 
                                                                })}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Eye className="h-3.5 w-3.5" />
                                                                <span className="font-semibold">{blog.views || 0}</span>
                                                            </div>
                                                        </div>
                                                        <CardTitle className="text-xl group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-3">
                                                            {blog.title}
                                                        </CardTitle>
                                                        {blog.excerpt && (
                                                            <CardDescription className="line-clamp-3 text-sm">
                                                                {blog.excerpt}
                                                            </CardDescription>
                                                        )}
                                                    </CardHeader>
                                                    <CardContent className="pt-0">
                                                        <div className="flex items-center justify-between pt-4 border-t">
                                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                                                    {(blog.author?.name || 'Admin').charAt(0)}
                                                                </div>
                                                                <span className="font-medium">{blog.author?.name || 'Admin'}</span>
                                                            </div>
                                                            <Button variant="ghost" size="sm" className="group/btn text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                                                <span className="font-semibold">Read</span>
                                                                <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                                            </Button>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </Link>
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
                                                    <Link 
                                                        key={blog.id} 
                                                        href={route('blog.show', blog.id)}
                                                        className="block group cursor-pointer"
                                                    >
                                                        <h4 className="font-medium text-sm group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                                                            {blog.title}
                                                        </h4>
                                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                                            <Eye className="h-3 w-3" />
                                                            <span>{blog.views || 0} views</span>
                                                        </div>
                                                    </Link>
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
                                                    <Link 
                                                        key={blog.id} 
                                                        href={route('blog.show', blog.id)}
                                                        className="block group cursor-pointer"
                                                    >
                                                        <h4 className="font-medium text-sm group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                                                            {blog.title}
                                                        </h4>
                                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                                            <Calendar className="h-3 w-3" />
                                                            <span>{new Date(blog.published_at).toLocaleDateString()}</span>
                                                        </div>
                                                    </Link>
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
        </PublicLayout>
    );
}