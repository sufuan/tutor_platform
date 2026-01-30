import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { ArrowLeft, Save, Eye, AlertCircle, CheckCircle2 } from 'lucide-react';
import RichTextEditor from '@/Components/RichTextEditor';

export default function CreateEdit({ auth, blog }) {
    const isEdit = !!blog;
    const [showPreview, setShowPreview] = useState(false);

    const { data, setData, post, put, processing, errors } = useForm({
        title: blog?.title || '',
        excerpt: blog?.excerpt || '',
        content: blog?.content || '',
        image: blog?.image || '',
        status: blog?.status || 'draft',
        category: blog?.category || 'academic',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isEdit) {
            put(route('admin.blogs.update', blog.id));
        } else {
            post(route('admin.blogs.store'));
        }
    };

    if (showPreview) {
        return (
            <AuthenticatedLayout>
                <Head title="Preview Blog" />
                
                {/* Preview matches frontend BlogShow.jsx design */}
                <div className="py-12 bg-slate-50">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-6">
                            <Button
                                variant="outline"
                                onClick={() => setShowPreview(false)}
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Edit
                            </Button>
                        </div>

                        {/* Hero Section */}
                        <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white rounded-lg overflow-hidden mb-8">
                            <div className="absolute inset-0 bg-black/20"></div>
                            {data.image && (
                                <div 
                                    className="absolute inset-0 bg-cover bg-center opacity-20" 
                                    style={{ backgroundImage: `url(${data.image})` }}
                                ></div>
                            )}
                            <div className="relative px-8 py-12">
                                <div className="inline-block px-3 py-1 bg-white text-blue-600 rounded-full text-sm font-medium mb-4">
                                    {data.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </div>
                                
                                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                    {data.title || 'Untitled Blog Post'}
                                </h1>
                                
                                {data.excerpt && (
                                    <p className="text-xl text-blue-100 mb-6 max-w-3xl">
                                        {data.excerpt}
                                    </p>
                                )}
                                
                                <div className="flex flex-wrap items-center gap-6 text-blue-100">
                                    <div className="flex items-center gap-2">
                                        <User className="h-5 w-5" />
                                        <span className="font-medium">{auth.name || 'Admin'}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5" />
                                        <span>
                                            {new Date().toLocaleDateString('en-US', { 
                                                month: 'long', 
                                                day: 'numeric', 
                                                year: 'numeric' 
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Eye className="h-5 w-5" />
                                        <span>0 views</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Article Content */}
                        <Card className="overflow-hidden">
                            {data.image && (
                                <div className="relative h-96 overflow-hidden">
                                    <img
                                        src={data.image}
                                        alt={data.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <CardContent className="p-8">
                                <article className="prose prose-slate prose-lg max-w-none
                                    prose-headings:font-bold prose-headings:text-slate-900
                                    prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
                                    prose-p:text-slate-700 prose-p:leading-relaxed
                                    prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                                    prose-strong:text-slate-900 prose-strong:font-semibold
                                    prose-ul:list-disc prose-ol:list-decimal
                                    prose-li:text-slate-700
                                    prose-blockquote:border-l-4 prose-blockquote:border-blue-500 
                                    prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-slate-600
                                    prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1 prose-code:rounded
                                    prose-img:rounded-lg prose-img:shadow-lg">
                                    {data.content ? (
                                        <div dangerouslySetInnerHTML={{ __html: data.content }} />
                                    ) : (
                                        <p className="text-slate-400">No content yet...</p>
                                    )}
                                </article>
                                
                                {/* Preview Badge */}
                                <div className="mt-8 pt-8 border-t border-slate-200">
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                                        <p className="text-blue-800 font-medium">
                                            📝 This is a preview of how your blog post will appear on the frontend
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout>
            <Head title={isEdit ? 'Edit Blog Post' : 'Create Blog Post'} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    {/* Error/Success Messages */}
                    {auth.flash?.error && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{auth.flash.error}</AlertDescription>
                        </Alert>
                    )}
                    {auth.flash?.success && (
                        <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
                            <CheckCircle2 className="h-4 w-4" />
                            <AlertDescription>{auth.flash.success}</AlertDescription>
                        </Alert>
                    )}

                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-2xl">
                                        {isEdit ? 'Edit Blog Post' : 'Create New Blog Post'}
                                    </CardTitle>
                                    <CardDescription>
                                        {isEdit ? 'Update your blog post' : 'Create a new blog post for the how-it-works page'}
                                    </CardDescription>
                                </div>
                                <Button variant="outline" asChild>
                                    <Link href={route('admin.blogs.index')}>
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Back
                                    </Link>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Title */}
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title *</Label>
                                    <Input
                                        id="title"
                                        placeholder="Enter blog post title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                    />
                                    {errors.title && (
                                        <p className="text-sm text-red-500">{errors.title}</p>
                                    )}
                                </div>

                                {/* Image URL */}
                                <div className="space-y-2">
                                    <Label htmlFor="image">Featured Image URL</Label>
                                    <Input
                                        id="image"
                                        type="url"
                                        placeholder="https://example.com/image.jpg"
                                        value={data.image}
                                        onChange={(e) => setData('image', e.target.value)}
                                    />
                                    {errors.image && (
                                        <p className="text-sm text-red-500">{errors.image}</p>
                                    )}
                                    {data.image && (
                                        <div className="mt-2">
                                            <img
                                                src={data.image}
                                                alt="Preview"
                                                className="w-full h-48 object-cover rounded-lg"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Excerpt */}
                                <div className="space-y-2">
                                    <Label htmlFor="excerpt">Excerpt</Label>
                                    <Textarea
                                        id="excerpt"
                                        placeholder="Brief summary of the blog post (optional)"
                                        rows={3}
                                        value={data.excerpt}
                                        onChange={(e) => setData('excerpt', e.target.value)}
                                    />
                                    <p className="text-xs text-slate-500">
                                        {data.excerpt.length}/500 characters
                                    </p>
                                    {errors.excerpt && (
                                        <p className="text-sm text-red-500">{errors.excerpt}</p>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="space-y-2">
                                    <Label htmlFor="content">Content *</Label>
                                    <RichTextEditor
                                        content={data.content}
                                        onChange={(html) => setData('content', html)}
                                        placeholder="Write your blog post content here..."
                                    />
                                    {errors.content && (
                                        <p className="text-sm text-red-500">{errors.content}</p>
                                    )}
                                </div>

                                {/* Category */}
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category *</Label>
                                    <Select
                                        value={data.category}
                                        onValueChange={(value) => setData('category', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="academic">Academic</SelectItem>
                                            <SelectItem value="career">Career</SelectItem>
                                            <SelectItem value="technologies">Technologies</SelectItem>
                                            <SelectItem value="skills">Skills</SelectItem>
                                            <SelectItem value="study_hacks">Study Hacks</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.category && (
                                        <p className="text-sm text-red-500">{errors.category}</p>
                                    )}
                                </div>

                                {/* Status */}
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status *</Label>
                                    <Select
                                        value={data.status}
                                        onValueChange={(value) => setData('status', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">Draft</SelectItem>
                                            <SelectItem value="published">Published</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && (
                                        <p className="text-sm text-red-500">{errors.status}</p>
                                    )}
                                    <p className="text-xs text-slate-500">
                                        Published posts will appear on the how-it-works page
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowPreview(true)}
                                        disabled={processing}
                                    >
                                        <Eye className="mr-2 h-4 w-4" />
                                        Preview
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1"
                                    >
                                        <Save className="mr-2 h-4 w-4" />
                                        {processing ? 'Saving...' : isEdit ? 'Update Post' : 'Create Post'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


