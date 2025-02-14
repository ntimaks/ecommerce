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
            className={`w-10 h-10 shadow-md rounded-full bg-smoke/50 text-black font-medium transition-colors border border-[#DEDBD5] flex items-center justify-center ${className || ''}`}
        >
            <Arrow className={` ${transform}`} color="#DEDBD5" />
        </button>
    );
}