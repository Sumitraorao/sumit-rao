
import React, { useState, useEffect } from 'react';
import { Gig, User } from '../../types';
import { fetchUserById } from '../../services/api';
import Card from '../ui/Card';
import StarRating from './StarRating';
import { Page } from '../../App';

interface GigCardProps {
    gig: Gig;
    onNavigate: (page: Page, id: string) => void;
}

const GigCard: React.FC<GigCardProps> = ({ gig, onNavigate }) => {
    const [freelancer, setFreelancer] = useState<User | null>(null);

    useEffect(() => {
        fetchUserById(gig.freelancerId).then(user => {
            if (user) setFreelancer(user);
        });
    }, [gig.freelancerId]);

    return (
        <Card className="flex flex-col h-full overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" padding="sm" onClick={() => onNavigate('gigDetail', gig.id)}>
            <img className="h-40 w-full object-cover" src={gig.imageUrl} alt={gig.title} />
            <div className="p-4 flex flex-col flex-grow">
                {freelancer && (
                    <div className="flex items-center mb-2">
                        <img className="h-6 w-6 rounded-full mr-2" src={freelancer.avatarUrl} alt={freelancer.name} />
                        <span className="text-sm font-medium text-gray-800">{freelancer.name}</span>
                    </div>
                )}
                <p className="text-gray-800 font-semibold hover:text-primary-600 transition-colors flex-grow">
                    {gig.title}
                </p>
                <div className="flex items-center text-sm text-gray-500 mt-2">
                    <StarRating rating={gig.rating} />
                    <span className="ml-2">({gig.reviews})</span>
                </div>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm text-gray-500">STARTING AT</span>
                <span className="text-lg font-bold text-gray-800">${gig.startingPrice}</span>
            </div>
        </Card>
    );
};

export default GigCard;
