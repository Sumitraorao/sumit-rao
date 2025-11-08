import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    // FIX: Add 'none' to allow cards without default padding.
    padding?: 'sm' | 'md' | 'lg' | 'none';
    onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', padding = 'md', onClick }) => {
    const paddingStyles = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        // FIX: Add 'none' to handle cards without default padding.
        none: '',
    };
    
    const classes = `bg-white border border-gray-200 rounded-lg shadow-sm ${paddingStyles[padding]} ${className}`;

    if (onClick) {
        return (
            <div className={classes} onClick={onClick}>
                {children}
            </div>
        );
    }

    return (
        <div className={classes}>
            {children}
        </div>
    );
};

export default Card;
