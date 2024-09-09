import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { Loader2 } from "lucide-react";

const spinnerVariants = cva('flex-col items-center justify-center', {
    variants: {
        show: {
            true: 'flex',
            false: 'hidden',
        },
    },
    defaultVariants: {
        show: true,
    },
});

const loaderVariants = cva('animate-spin text-black', { // Veranderd naar text-black
    variants: {
        size: {
            small: 'w-6 h-6',
            medium: 'w-8 h-8',
            large: 'w-12 h-12',
        },
    },
    defaultVariants: {
        size: 'medium',
    },
});

interface SpinnerContentProps
    extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof loaderVariants> {
    className?: string;
    children?: React.ReactNode;
}

export function Spinner({ size, show, children, className }: SpinnerContentProps) {
    return (
        <span className={cn('flex items-center justify-center', spinnerVariants({ show }))}>
            <Loader2 className={cn(loaderVariants({ size }), 'animate-spin', className)} /> {/* animate-spin hier toegevoegd */}
            {children}
        </span>
    );
}
