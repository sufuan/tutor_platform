import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Card, CardContent } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Calendar, User, ArrowLeft, Eye, Clock, Share2 } from 'lucide-react';

export default function BlogShow({ blog, relatedBlogs }) {
    const getCategoryLabel = (category) => {
        return category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    return (
        <PublicLayout>
            <Head title={blog.title} />

            {/* Hero Section with Image */}
            <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
                {blog.image && (
                    <>
                        <div 
                            className="absolute inset-0 bg-cover bg-center" 
                            style={{ 
                                backgroundImage: `url(${blog.image})`,
                                filter: 'blur(8px)',
                                transform: 'scale(1.1)'
                            }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-blue-900/70 to-indigo-900/80"></div>
                    </>
                )}
                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <Link href={route('blog')}>
                        <Button variant="outline" className="mb-8 text-white border-white/30 hover:bg-white/10 backdrop-blur-sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Blog
                        </Button>
                    </Link>
                    
                    <div className="max-w-4xl">
                        <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 text-sm px-4 py-1.5">
                            {getCategoryLabel(blog.category)}
                        </Badge>
                        
                        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                            {blog.title}
                        </h1>
                        
                        {blog.excerpt && (
                            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                                {blog.excerpt}
                            </p>
                        )}
                        
                        <div className="flex flex-wrap items-center gap-6 text-blue-100">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg">
                                    {(blog.author?.name || 'Admin').charAt(0)}
                                </div>
                                <div>
                                    <div className="font-semibold text-white">{blog.author?.name || 'Admin'}</div>
                                    <div className="text-sm text-blue-200">Author</div>
                                </div>
                            </div>
                            <div className="h-8 w-px bg-white/20"></div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                <span className="font-medium">
                                    {new Date(blog.published_at).toLocaleDateString('en-US', { 
                                        month: 'long', 
                                        day: 'numeric', 
                                        year: 'numeric' 
                                    })}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Eye className="h-5 w-5" />
                                <span className="font-semibold">{blog.views} views</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                <span>{Math.ceil(blog.content.split(' ').length / 200)} min read</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="py-16 bg-gradient-to-b from-slate-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Article Content */}
                        <div className="lg:col-span-8">
                            <Card className="overflow-hidden shadow-2xl border-0">
                                {blog.image && (
                                    <div className="relative h-[500px] overflow-hidden">
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                                    </div>
                                )}
                                <CardContent className="p-10 md:p-14">
                                    <article className="prose prose-slate prose-lg max-w-none
                                        prose-headings:font-bold prose-headings:text-slate-900 prose-headings:tracking-tight
                                        prose-h1:text-5xl prose-h1:mb-6 
                                        prose-h2:text-4xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-l-4 prose-h2:border-blue-600 prose-h2:pl-6
                                        prose-h3:text-3xl prose-h3:mt-10 prose-h3:mb-4
                                        prose-p:text-slate-700 prose-p:leading-relaxed prose-p:text-lg prose-p:mb-6
                                        prose-a:text-blue-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                                        prose-strong:text-slate-900 prose-strong:font-bold
                                        prose-ul:my-6 prose-ol:my-6
                                        prose-li:text-slate-700 prose-li:my-2 prose-li:text-lg
                                        prose-blockquote:border-l-8 prose-blockquote:border-blue-500 
                                        prose-blockquote:bg-blue-50 prose-blockquote:py-4
                                        prose-blockquote:pl-6 prose-blockquote:pr-6 prose-blockquote:italic prose-blockquote:text-slate-700
                                        prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono
                                        prose-pre:bg-slate-800 prose-pre:text-white
                                        prose-img:rounded-2xl prose-img:shadow-2xl prose-img:my-8">
                                        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                                    </article>

                                    {/* Tags/Topics Section */}
                                    <div className="mt-12 pt-8 border-t-2 border-slate-200">
                                        <div className="flex flex-wrap gap-2">
                                            <Badge variant="outline" className="text-sm px-4 py-2">
                                                #{getCategoryLabel(blog.category)}
                                            </Badge>
                                            <Badge variant="outline" className="text-sm px-4 py-2">
                                                #Education
                                            </Badge>
                                            <Badge variant="outline" className="text-sm px-4 py-2">
                                                #Learning
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Share Section */}
                                    <div className="mt-8 pt-8 border-t-2 border-slate-200">
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                            <div className="flex items-center gap-3 text-slate-600">
                                                <Share2 className="h-6 w-6 text-blue-600" />
                                                <span className="font-semibold text-lg">Share this article</span>
                                            </div>
                                            <div className="flex gap-3">
                                                <Button className="bg-blue-500 hover:bg-blue-600">
                                                    Twitter
                                                </Button>
                                                <Button className="bg-blue-700 hover:bg-blue-800">
                                                    Facebook
                                                </Button>
                                                <Button className="bg-blue-600 hover:bg-blue-700">
                                                    LinkedIn
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4">
                            <div className="space-y-8 sticky top-24">
                                {/* Author Card */}
                                <Card className="overflow-hidden border-0 shadow-xl">
                                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white">
                                        <div className="text-center">
                                            <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center text-blue-600 text-3xl font-bold shadow-2xl">
                                                {(blog.author?.name || 'Admin').charAt(0)}
                                            </div>
                                            <h3 className="font-bold text-2xl mb-1">{blog.author?.name || 'Admin'}</h3>
                                            <p className="text-blue-100">Content Author</p>
                                        </div>
                                    </div>
                                    <CardContent className="p-6 text-center">
                                        <p className="text-slate-600 mb-4">
                                            Expert in education and student success strategies
                                        </p>
                                        <Button variant="outline" className="w-full">
                                            View Profile
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Related Posts */}
                                {relatedBlogs && relatedBlogs.length > 0 && (
                                    <Card className="border-0 shadow-xl">
                                        <CardContent className="pt-6">
                                            <h3 className="font-bold text-2xl mb-6 flex items-center gap-2">
                                                <BookOpen className="h-6 w-6 text-blue-600" />
                                                Related Articles
                                            </h3>
                                            <div className="space-y-6">
                                                {relatedBlogs.map((relatedBlog) => (
                                                    <Link 
                                                        key={relatedBlog.id} 
                                                        href={route('blog.show', relatedBlog.id)}
                                                        className="block group"
                                                    >
                                                        <div className="flex gap-4">
                                                            {relatedBlog.image ? (
                                                                <img 
                                                                    src={relatedBlog.image} 
                                                                    alt={relatedBlog.title}
                                                                    className="w-24 h-24 object-cover rounded-lg group-hover:shadow-lg transition-shadow"
                                                                />
                                                            ) : (
                                                                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                                                    <BookOpen className="h-8 w-8 text-white" />
                                                                </div>
                                                            )}
                                                            <div className="flex-1">
                                                                <h4 className="font-semibold text-sm group-hover:text-blue-600 transition-colors line-clamp-2 mb-2 leading-snug">
                                                                    {relatedBlog.title}
                                                                </h4>
                                                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                                                    <Eye className="h-3 w-3" />
                                                                    <span className="font-semibold">{relatedBlog.views} views</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Back to Blog Button */}
                                <Link href={route('blog')}>
                                    <Button className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
                                        <ArrowLeft className="mr-2 h-5 w-5" />
                                        View All Posts
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
