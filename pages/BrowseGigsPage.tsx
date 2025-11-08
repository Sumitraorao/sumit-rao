
import React, { useState, useEffect } from 'react';
import { Gig } from '../types';
import { fetchGigs } from '../services/api';
import GigCard from '../components/shared/GigCard';
import Spinner from '../components/ui/Spinner';
import { Page } from '../App';
import { CATEGORIES } from '../constants';
import Select from '../components/ui/Select';
import Input from '../components/ui/Input';

interface BrowseGigsPageProps {
    onNavigate: (page: Page, id: string) => void;
}

const BrowseGigsPage: React.FC<BrowseGigsPageProps> = ({ onNavigate }) => {
    const [gigs, setGigs] = useState<Gig[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');

    useEffect(() => {
        setLoading(true);
        fetchGigs()
            .then(setGigs)
            .finally(() => setLoading(false));
    }, []);

    const filteredGigs = gigs
        .filter(gig => category === 'All' || gig.category === category)
        .filter(gig => gig.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-gray-900">Find the Perfect Service</h1>
                <p className="mt-2 text-lg text-gray-600">Browse gigs from our talented freelancers.</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm mb-8 flex flex-col sm:flex-row gap-4">
                <Input
                    className="flex-grow"
                    placeholder="Search for gigs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option>All</option>
                    {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
                </Select>
            </div>

            {loading ? (
                <div className="flex justify-center p-16"><Spinner /></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredGigs.map(gig => (
                        <GigCard key={gig.id} gig={gig} onNavigate={onNavigate} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BrowseGigsPage;
