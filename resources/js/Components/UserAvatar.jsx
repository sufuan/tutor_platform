import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';

export default function UserAvatar({ user, size = 'default', className = '' }) {
    const getInitials = (name) => {
        if (!name) return 'U';
        const parts = name.trim().split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    const sizeClasses = {
        sm: 'h-8 w-8 text-xs',
        default: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
        xl: 'h-16 w-16 text-lg',
        '2xl': 'h-24 w-24 text-2xl',
    };

    const photoUrl = user?.guardian?.photo || user?.tutor?.photo || user?.photo;

    return (
        <Avatar className={`${sizeClasses[size]} ${className}`}>
            {photoUrl && <AvatarImage src={photoUrl} alt={user?.name || 'User'} />}
            <AvatarFallback className="bg-primary-blue text-white font-semibold">
                {getInitials(user?.name)}
            </AvatarFallback>
        </Avatar>
    );
}

