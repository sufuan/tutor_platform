import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogClose,
} from '@/Components/ui/dialog';

export default function PromotionalModal({ imageUrl, enabled }) {
    const [open, setOpen] = useState(false);
    const STORAGE_KEY = 'promo_modal_shown';

    useEffect(() => {
        // Only show modal if:
        // 1. Feature is enabled
        // 2. Image URL exists
        // 3. User hasn't seen it yet (localStorage check)
        if (enabled && imageUrl && !localStorage.getItem(STORAGE_KEY)) {
            // Small delay for better UX
            const timer = setTimeout(() => {
                setOpen(true);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [enabled, imageUrl]);

    const handleClose = () => {
        setOpen(false);
        // Mark as shown in localStorage
        localStorage.setItem(STORAGE_KEY, 'true');
    };

    // Don't render if not enabled or no image
    if (!enabled || !imageUrl) {
        return null;
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-4xl p-0 overflow-hidden border-0 bg-transparent shadow-2xl">
                <div className="relative">
                    {/* Close Button */}
                    <DialogClose asChild>
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 z-50 bg-white/90 backdrop-blur-sm hover:bg-white text-slate-800 rounded-full p-2 shadow-lg transition-all hover:scale-110"
                            aria-label="Close"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </DialogClose>

                    {/* Banner Image */}
                    <div className="relative">
                        <img
                            src={imageUrl}
                            alt="Promotional Banner"
                            className="w-full h-auto rounded-2xl object-cover max-h-[80vh]"
                        />
                        
                        {/* Gradient Overlay for better readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl pointer-events-none"></div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
