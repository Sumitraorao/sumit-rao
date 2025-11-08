
import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, className = '' }) => {
    const classes = `inline-block bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full ${className}`;
    return <span className={classes}>{children}</span>;
};

export default Badge;
