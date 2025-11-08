import { Gig, Job, Proposal, JobType, User, UserRole } from '../types';

export const clientUser: User = {
    id: 'user-client-01',
    name: 'Acme Inc.',
    email: 'client@acme.com',
    role: UserRole.Client,
    avatarUrl: 'https://i.pravatar.cc/150?u=client@acme.com',
    rating: 4.9,
    reviews: 120,
    tagline: 'Building the future of business.',
};

export const freelancerUser: User = {
    id: 'user-freelancer-01',
    name: 'Jane Doe',
    email: 'jane.doe@freelance.com',
    role: UserRole.Freelancer,
    avatarUrl: 'https://i.pravatar.cc/150?u=jane.doe@freelance.com',
    rating: 4.8,
    reviews: 45,
    tagline: 'Expert React & TypeScript Developer',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
};

const freelancerUser2: User = {
    id: 'user-freelancer-02', name: 'John Smith', email: 'john@design.co', role: UserRole.Freelancer, avatarUrl: 'https://i.pravatar.cc/150?u=john@design.co', rating: 5.0, reviews: 250, tagline: 'Modern Logo & Brand Designer'
};
const freelancerUser3: User = {
    id: 'user-freelancer-03', name: 'Maria Garcia', email: 'maria@content.io', role: UserRole.Freelancer, avatarUrl: 'https://i.pravatar.cc/150?u=maria@content.io', rating: 4.8, reviews: 88, tagline: 'SEO & Content Strategist'
};
const freelancerUser4: User = {
    id: 'user-freelancer-04', name: 'Chen Wei', email: 'chen@video.pro', role: UserRole.Freelancer, avatarUrl: 'https://i.pravatar.cc/150?u=chen@video.pro', rating: 4.9, reviews: 130, tagline: 'Professional Video Editor'
};
const clientUser2: User = {
    id: 'user-client-02', name: 'Startup Hub', email: 'contact@startuphub.com', role: UserRole.Client, avatarUrl: 'https://i.pravatar.cc/150?u=contact@startuphub.com', rating: 4.7, reviews: 34
};

export const mockUsers: User[] = [clientUser, freelancerUser, freelancerUser2, freelancerUser3, freelancerUser4, clientUser2];

export const mockGigs: Gig[] = [
    {
        id: 'gig-01',
        freelancerId: 'user-freelancer-01',
        title: 'I will build a responsive React website',
        category: 'Development',
        rating: 4.9,
        reviews: 102,
        startingPrice: 500,
        imageUrl: 'https://picsum.photos/seed/gig1/400/300',
        description: "Need a fast, modern, and fully responsive website? I specialize in building high-quality web applications using React, Next.js, and TypeScript. Whether it's a simple landing page or a complex web app, I deliver clean code and a pixel-perfect user interface. Let's build something amazing together!",
        packages: [
            { name: 'Basic', price: 500, deliveryTime: 3, revisions: 2, description: 'A 3-page static site.'},
            { name: 'Standard', price: 1200, deliveryTime: 7, revisions: 5, description: 'A 5-page site with CMS.'},
            { name: 'Pro', price: 2500, deliveryTime: 14, revisions: 10, description: 'A full-featured e-commerce site.'},
        ]
    },
    {
        id: 'gig-02',
        freelancerId: 'user-freelancer-02',
        title: 'I will design a modern logo for your brand',
        category: 'Design',
        rating: 5.0,
        reviews: 250,
        startingPrice: 300,
        imageUrl: 'https://picsum.photos/seed/gig2/400/300',
        description: "Your logo is the face of your brand. I create unique, memorable, and modern logos that capture your brand's essence. My design process is collaborative, ensuring the final result is something you'll love. All packages include high-resolution files for web and print.",
        packages: [
            { name: 'Basic', price: 300, deliveryTime: 2, revisions: 3, description: '2 logo concepts.'},
            { name: 'Standard', price: 650, deliveryTime: 4, revisions: 5, description: '3 concepts with vector files.'},
            { name: 'Pro', price: 1000, deliveryTime: 7, revisions: 10, description: '5 concepts with brand guide.'},
        ]
    },
    {
        id: 'gig-03',
        freelancerId: 'user-freelancer-03',
        title: 'I will write SEO-optimized blog content',
        category: 'Content',
        rating: 4.8,
        reviews: 88,
        startingPrice: 150,
        imageUrl: 'https://picsum.photos/seed/gig3/400/300',
        description: "Engage your audience and rank higher on Google with high-quality, SEO-optimized blog content. I research keywords, craft compelling headlines, and write articles that provide real value to your readers. Let me help you become an authority in your niche.",
        packages: [
             { name: 'Basic', price: 150, deliveryTime: 2, revisions: 1, description: 'One 500-word article.'},
            { name: 'Standard', price: 400, deliveryTime: 5, revisions: 2, description: 'Three 500-word articles.'},
            { name: 'Pro', price: 750, deliveryTime: 7, revisions: 3, description: 'Five 750-word articles.'},
        ]
    },
    {
        id: 'gig-04',
        freelancerId: 'user-freelancer-04',
        title: 'I will create a stunning marketing video',
        category: 'Video',
        rating: 4.9,
        reviews: 130,
        startingPrice: 800,
        imageUrl: 'https://picsum.photos/seed/gig4/400/300',
        description: "Video is the most engaging form of content. I produce professional marketing videos, social media ads, and corporate promos that grab attention and drive results. From scripting and storyboarding to editing and post-production, I handle it all.",
        packages: [
            { name: 'Basic', price: 800, deliveryTime: 5, revisions: 2, description: '30-second promo video.'},
            { name: 'Standard', price: 1500, deliveryTime: 10, revisions: 4, description: '60-second video with custom graphics.'},
            { name: 'Pro', price: 3000, deliveryTime: 15, revisions: 6, description: '90-second 4K video with scripting.'},
        ]
    }
];

export const mockJobs: Job[] = [
    {
        id: 'job-01',
        clientId: clientUser.id,
        title: 'Need a landing page for our new SaaS product',
        description: 'We are looking for a skilled developer to build a responsive and fast landing page using Next.js and Tailwind CSS. The design will be provided in Figma. The page should include a hero section, feature highlights, a pricing table, and a contact form. It must score above 90 on Google PageSpeed Insights for performance.',
        skills: ['Next.js', 'React', 'Tailwind CSS', 'Figma'],
        budget: {
            type: JobType.Fixed,
            min: 800,
            max: 1500,
        },
        proposals: 12,
        createdAt: '2 days ago'
    },
    {
        id: 'job-02',
        clientId: 'user-client-02',
        title: 'Hourly contract for a social media manager',
        description: 'We need an experienced social media manager to handle our Instagram and Twitter accounts. Responsibilities include content creation (3-4 posts per week), scheduling, and community engagement. Must have experience with Hootsuite or similar tools and a proven track record of growing social media accounts.',
        skills: ['Social Media Marketing', 'Content Creation', 'Hootsuite'],
        budget: {
            type: JobType.Hourly,
            min: 25,
            max: 40,
        },
        proposals: 25,
        createdAt: '5 days ago'
    },
     {
        id: 'job-03',
        clientId: clientUser.id,
        title: 'Build a custom Shopify theme',
        description: 'We need a custom Shopify theme developed from scratch based on our design specifications. Must be an expert in Liquid, HTML, CSS, and JS. The theme needs to be optimized for mobile and support Shopify 2.0 features, including sections on all pages.',
        skills: ['Shopify', 'Liquid', 'eCommerce'],
        budget: {
            type: JobType.Fixed,
            min: 3000,
            max: 5000,
        },
        proposals: 8,
        createdAt: '1 week ago'
    }
];

export const mockProposals: Proposal[] = [
    {
        id: 'prop-01',
        jobId: 'job-01',
        freelancerId: freelancerUser.id,
        coverLetter: "Hi Acme Inc., I'm an expert in Next.js and Tailwind CSS with 5+ years of experience building high-performance landing pages. I've reviewed your Figma design and I'm confident I can deliver a pixel-perfect result within your timeline. Let's connect!",
        bidAmount: 1200,
        timeline: "1 week",
        status: 'viewed',
    },
    {
        id: 'prop-02',
        jobId: 'job-01',
        freelancerId: 'user-freelancer-02',
        coverLetter: "Hello, I can build your landing page quickly and efficiently. Please check my portfolio for similar projects.",
        bidAmount: 950,
        timeline: "5 days",
        status: 'sent',
    },
    {
        id: 'prop-03',
        jobId: 'job-03',
        freelancerId: freelancerUser.id,
        coverLetter: "I'm a Shopify expert and can build your custom theme as requested. Let me know when we can discuss the project details.",
        bidAmount: 4500,
        timeline: "3 weeks",
        status: 'sent',
    }
];