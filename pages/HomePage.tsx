
import React from 'react';
import { useLocale } from '../contexts/LocaleContext';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import { Page } from '../App';
import { mockGigs, mockUsers } from '../data/mockData';
import GigCard from '../components/shared/GigCard';
import { User, UserRole } from '../types';
import StarRating from '../components/shared/StarRating';
import FadeIn from '../components/shared/FadeIn';
import AnimatedHeroText from '../components/ui/AnimatedHeroText';
import { CheckCircleIcon, ShieldCheckIcon, CurrencyDollarIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';


interface HomePageProps {
    onNavigate: (page: Page, id?: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
    const { strings } = useLocale();
    const { isAuthenticated, user } = useAuth();

    const topFreelancers = mockUsers.filter(u => u.role === UserRole.Freelancer).slice(0, 4);

    const TrustSignal = ({ icon, title }: { icon: React.ReactNode, title: string }) => (
        <div className="flex flex-col items-center text-center">
            <div className="mb-4 text-primary-600">{icon}</div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
    );


    return (
        <div>
            {/* Hero Section */}
            <section className="bg-primary-50">
                <div className="container mx-auto px-6 py-20 text-center">
                    <AnimatedHeroText text={strings.heroTitle} />
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{strings.heroSubtitle}</p>
                    <div className="mt-8 space-x-4">
                        <Button size="lg" onClick={() => onNavigate(isAuthenticated && user?.role === UserRole.Client ? 'dashboard' : 'browseJobs')}>
                            {strings.postJob}
                        </Button>
                        <Button size="lg" variant="secondary" onClick={() => onNavigate(isAuthenticated && user?.role === UserRole.Freelancer ? 'dashboard' : 'browseGigs')}>
                            {strings.createGig}
                        </Button>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">{strings.howItWorks}</h2>
                    <div className="grid md:grid-cols-2 gap-16">
                        <FadeIn>
                            <div className="text-center">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-4">{strings.forClients}</h3>
                                <div className="space-y-8">
                                    <div className="flex flex-col items-center">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 font-bold text-xl mb-2">1</div>
                                        <h4 className="font-semibold text-lg">{strings.clientStep1}</h4>
                                        <p className="text-gray-600">{strings.clientStep1Desc}</p>
                                    </div>
                                     <div className="flex flex-col items-center">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 font-bold text-xl mb-2">2</div>
                                        <h4 className="font-semibold text-lg">{strings.clientStep2}</h4>
                                        <p className="text-gray-600">{strings.clientStep2Desc}</p>
                                    </div>
                                     <div className="flex flex-col items-center">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 font-bold text-xl mb-2">3</div>
                                        <h4 className="font-semibold text-lg">{strings.clientStep3}</h4>
                                        <p className="text-gray-600">{strings.clientStep3Desc}</p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                         <FadeIn>
                            <div className="text-center">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-4">{strings.forFreelancers}</h3>
                                <div className="space-y-8">
                                    <div className="flex flex-col items-center">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent text-white font-bold text-xl mb-2">1</div>
                                        <h4 className="font-semibold text-lg">{strings.freelancerStep1}</h4>
                                        <p className="text-gray-600">{strings.freelancerStep1Desc}</p>
                                    </div>
                                     <div className="flex flex-col items-center">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent text-white font-bold text-xl mb-2">2</div>
                                        <h4 className="font-semibold text-lg">{strings.freelancerStep2}</h4>
                                        <p className="text-gray-600">{strings.freelancerStep2Desc}</p>
                                    </div>
                                     <div className="flex flex-col items-center">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent text-white font-bold text-xl mb-2">3</div>
                                        <h4 className="font-semibold text-lg">{strings.freelancerStep3}</h4>
                                        <p className="text-gray-600">{strings.freelancerStep3Desc}</p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

             {/* Featured Gigs */}
            <section className="bg-gray-100 py-16">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">{strings.featuredCategories}</h2>
                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                        {mockGigs.map((gig, index) => (
                           <FadeIn key={gig.id} delay={index * 100}>
                                <GigCard gig={gig} onNavigate={onNavigate} />
                           </FadeIn>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Top Talent */}
            <section className="py-16">
                 <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">{strings.topTalent}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {topFreelancers.map((freelancer: User, index) => (
                            <FadeIn key={freelancer.id} delay={index * 100}>
                                <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
                                    <img src={freelancer.avatarUrl} alt={freelancer.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
                                    <h4 className="text-lg font-semibold">{freelancer.name}</h4>
                                    <p className="text-primary-600 text-sm mb-2">{freelancer.tagline}</p>
                                    <div className="flex justify-center mb-4">
                                        <StarRating rating={freelancer.rating} />
                                        <span className="text-sm text-gray-500 ml-2">({freelancer.reviews} reviews)</span>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                 </div>
            </section>

             {/* Trust Signals */}
             <section className="bg-primary-50 py-16">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">{strings.trustSignalsTitle}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <TrustSignal icon={<ShieldCheckIcon className="w-12 h-12" />} title={strings.verifiedProfiles} />
                        <TrustSignal icon={<CurrencyDollarIcon className="w-12 h-12" />} title={strings.paymentSecured} />
                        <TrustSignal icon={<ChatBubbleLeftRightIcon className="w-12 h-12" />} title={strings.disputeSupport} />
                         <TrustSignal icon={<CheckCircleIcon className="w-12 h-12" />} title="24/7 Support" />
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-accent text-white py-16">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">{strings.ctaTitle}</h2>
                    <Button size="lg" variant="secondary" className="bg-white text-accent hover:bg-gray-100" onClick={() => onNavigate(isAuthenticated ? 'dashboard' : 'login')}>
                        {strings.getStarted}
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default HomePage;