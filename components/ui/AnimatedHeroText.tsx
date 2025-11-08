
import React from 'react';

interface AnimatedHeroTextProps {
    text: string;
    className?: string;
}

const AnimatedHeroText: React.FC<AnimatedHeroTextProps> = ({ text, className = '' }) => {
    return (
        <h1 className={`text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight ${className}`}>
            {text.split('').map((char, index) => (
                <span
                    key={index}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </h1>
    );
};

export default AnimatedHeroText;
