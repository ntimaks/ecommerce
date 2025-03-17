import React, { ButtonHTMLAttributes } from 'react';
import Arrow from '../../public/icons/arrow';

interface ArrowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    direction?: 'left' | 'right';
}

export default function ArrowButton({ direction = 'right', className, ...props }: ArrowButtonProps) {
    const transform = direction === 'left' ? 'rotate-180' : '';
    return (
        <button
            {...props}
            className={`w-10 h-10 shadow-md rounded-full bg-smoke/50 text-smoke font-medium transition-colors border border-[#DEDBD5] hover:bg-lime/30 hover:text-lime hover:border-lime flex items-center justify-center ${className || ''}`}
        >
            <Arrow className={` ${transform}`} color="currentColor" />
        </button>
    );
}