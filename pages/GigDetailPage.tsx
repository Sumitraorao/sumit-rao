
import React, { useState, useEffect } from 'react';
import { Gig, User, GigPackage } from '../types';
import { fetchGigById, fetchUserById } from '../services/api';
import Spinner from '../components/ui/Spinner';
import { Page } from '../App';
import StarRating from '../components/shared/StarRating';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { CheckIcon } from '@heroicons/react/24/solid';

interface GigDetailPageProps {
    gigId: string;
    onNavigate: (page: Page, id?: string) => void;
}

const GigDetailPage: React.FC<GigDetailPageProps> = ({ gigId, onNavigate }) => {
    const [gig, setGig] = useState<Gig | null>(null);
    const [freelancer, setFreelancer] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedPackage, setSelectedPackage] = useState<GigPackage | null>(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const gigData = await fetchGigById(gigId);
            if (gigData) {
                setGig(gigData);
                setSelectedPackage(gigData.packages[1] || gigData.packages[0]); // Default to standard
                const freelancerData = await fetchUserById(gigData.freelancerId);
                if (freelancerData) {
                    setFreelancer(freelancerData);
                }
            }
            setLoading(false);
        };
        loadData();
    }, [gigId]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
    }

    if (!gig || !freelancer) {
        return <div className="text-center py-16">Gig not found.</div>;
    }
    
    const PackageTab = ({ pkg }: { pkg: GigPackage }) => (
        <button
            onClick={() => setSelectedPackage(pkg)}
            className={`w-1/3 py-3 text-sm font-bold border-b-4 ${selectedPackage?.name === pkg.name ? 'border-primary-500 text-primary-600' : 'border-gray-200 text-gray-500 hover:border-primary-200'}`}
        >
            {pkg.name}
        </button>
    );

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{gig.title}</h1>
                    <div className="flex items-center mb-6">
                        <img src={freelancer.avatarUrl} alt={freelancer.name} className="w-12 h-12 rounded-full mr-4" />
                        <div>
                            <p className="font-semibold text-lg">{freelancer.name}</p>
                            <div className="flex items-center">
                                <StarRating rating={gig.rating} />
                                <span className="ml-2 text-gray-600">({gig.reviews} reviews)</span>
                            </div>
                        </div>
                    </div>
                    <img src={gig.imageUrl} alt={gig.title} className="w-full rounded-lg shadow-md mb-8" />
                    
                    <h2 className="text-2xl font-semibold mb-4 border-b pb-2">About This Gig</h2>
                    <p className="text-gray-700 whitespace-pre-wrap">{gig.description}</p>
                </div>

                {/* Sidebar with Packages */}
                <aside className="lg:col-span-1">
                    <Card padding="none" className="sticky top-28">
                       <div className="flex border-b">
                            {gig.packages.map(pkg => <PackageTab key={pkg.name} pkg={pkg} />)}
                       </div>
                       {selectedPackage && (
                           <div className="p-6">
                               <div className="flex justify-between items-baseline mb-4">
                                   <h3 className="text-xl font-bold">{selectedPackage.name} Package</h3>
                                   <p className="text-2xl font-bold text-gray-900">${selectedPackage.price}</p>
                               </div>
                               <p className="text-gray-600 text-sm mb-4">{selectedPackage.description}</p>
                               <div className="text-sm font-semibold flex justify-between mb-4">
                                   <p>Delivery Time: {selectedPackage.deliveryTime} Days</p>
                                   <p>{selectedPackage.revisions} Revisions</p>
                               </div>
                               <ul className="space-y-2 text-gray-700 text-sm mb-6">
                                   <li className="flex items-center"><CheckIcon className="w-5 h-5 text-green-500 mr-2" /> Source File</li>
                                   <li className="flex items-center"><CheckIcon className="w-5 h-5 text-green-500 mr-2" /> High-Resolution</li>
                               </ul>
                               <Button className="w-full">
                                   Continue (${selectedPackage.price})
                               </Button>
                           </div>
                       )}
                    </Card>
                </aside>
            </div>
        </div>
    );
};

export default GigDetailPage;