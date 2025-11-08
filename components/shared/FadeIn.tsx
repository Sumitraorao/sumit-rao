
import React, { useRef } from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

interface FadeInProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, className = '' }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const entry = useIntersectionObserver(ref, { freezeOnceVisible: true, threshold: 0.1 });
    const isVisible = !!entry?.isIntersecting;

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ${className} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

export default FadeIn;
