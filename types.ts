export enum UserRole {
    Client = 'Client',
    Freelancer = 'Freelancer',
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatarUrl: string;
    rating: number;
    reviews: number;
    tagline?: string;
    skills?: string[];
}

export interface GigPackage {
    name: 'Basic' | 'Standard' | 'Pro';
    price: number;
    deliveryTime: number; // in days
    revisions: number;
    description: string;
}

export interface Gig {
    id: string;
    freelancerId: string;
    title: string;
    category: string;
    rating: number;
    reviews: number;
    startingPrice: number;
    imageUrl: string;
    packages: GigPackage[];
    description?: string;
}

export enum JobType {
    Fixed = 'Fixed Price',
    Hourly = 'Hourly',
}

export interface Job {
    id: string;
    clientId: string;
    title: string;
    description: string;
    skills: string[];
    budget: {
        type: JobType;
        min: number;
        max: number;
    };
    proposals: number;
    createdAt: string;
}

export interface Proposal {
    id: string;
    jobId: string;
    freelancerId: string;
    coverLetter: string;
    bidAmount: number;
    timeline: string; // e.g., "2 weeks"
    status: 'sent' | 'viewed' | 'shortlisted';
}