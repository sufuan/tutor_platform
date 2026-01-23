import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { usePage } from '@inertiajs/react';
import { 
    Bold, 
    Italic, 
    List, 
    ListOrdered, 
    Quote, 
    Undo, 
    Redo, 
    Link2, 
    Image as ImageIcon,
    Heading1,
    Heading2,
    Heading3,
    Code,
    Minus,
} from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { cn } from '@/lib/utils';

export default function RichTextEditor({ content, onChange, placeholder = 'Write something...' }) {
    const { props } = usePage();
    const csrfToken = props.csrf_token || document.querySelector('meta[name="csrf-token"]')?.content;
    
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Image,
            Placeholder.configure({
                placeholder: placeholder,
            }),
        ],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4 max-w-none',
            },
        },
    });

    if (!editor) {
        return null;
    }

    const addLink = () => {
        const url = window.prompt('Enter URL:');
        if (url) {
            editor.chain().focus().setLink({ href: url }).run();
        }
    };

    const addImage = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (file) {
                const formData = new FormData();
                formData.append('image', file);

                try {
                    const response = await fetch(route('admin.blogs.upload-image'), {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'X-CSRF-TOKEN': csrfToken,
                        },
                    });

                    const data = await response.json();
                    
                    if (!response.ok) {
                        throw new Error(data.error || data.message || 'Upload failed');
                    }
                    
                    if (data.url) {
                        editor.chain().focus().setImage({ src: data.url }).run();
                    } else {
                        throw new Error('No URL returned from server');
                    }
                } catch (error) {
                    console.error('Image upload failed:', error);
                    alert('Failed to upload image: ' + error.message);
                }
            }
        };
        input.click();
    };

    return (
        <div className="border rounded-lg overflow-hidden">
            {/* Toolbar */}
            <div className="border-b bg-slate-50 p-2 flex flex-wrap gap-1">
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={cn(editor.isActive('bold') && 'bg-slate-200')}
                >
                    <Bold className="h-4 w-4" />
                </Button>
                
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={cn(editor.isActive('italic') && 'bg-slate-200')}
                >
                    <Italic className="h-4 w-4" />
                </Button>

                <div className="w-px h-8 bg-slate-300 mx-1" />

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={cn(editor.isActive('heading', { level: 1 }) && 'bg-slate-200')}
                >
                    <Heading1 className="h-4 w-4" />
                </Button>

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={cn(editor.isActive('heading', { level: 2 }) && 'bg-slate-200')}
                >
                    <Heading2 className="h-4 w-4" />
                </Button>

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={cn(editor.isActive('heading', { level: 3 }) && 'bg-slate-200')}
                >
                    <Heading3 className="h-4 w-4" />
                </Button>

                <div className="w-px h-8 bg-slate-300 mx-1" />

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={cn(editor.isActive('bulletList') && 'bg-slate-200')}
                >
                    <List className="h-4 w-4" />
                </Button>

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={cn(editor.isActive('orderedList') && 'bg-slate-200')}
                >
                    <ListOrdered className="h-4 w-4" />
                </Button>

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={cn(editor.isActive('blockquote') && 'bg-slate-200')}
                >
                    <Quote className="h-4 w-4" />
                </Button>

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={cn(editor.isActive('codeBlock') && 'bg-slate-200')}
                >
                    <Code className="h-4 w-4" />
                </Button>

                <div className="w-px h-8 bg-slate-300 mx-1" />

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={addLink}
                    className={cn(editor.isActive('link') && 'bg-slate-200')}
                >
                    <Link2 className="h-4 w-4" />
                </Button>

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={addImage}
                >
                    <ImageIcon className="h-4 w-4" />
                </Button>

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                >
                    <Minus className="h-4 w-4" />
                </Button>

                <div className="flex-1" />

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                >
                    <Undo className="h-4 w-4" />
                </Button>

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                >
                    <Redo className="h-4 w-4" />
                </Button>
            </div>

            {/* Editor */}
            <EditorContent editor={editor} className="bg-white" />
        </div>
    );
}
