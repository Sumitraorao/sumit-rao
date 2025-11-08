
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLocale } from '../contexts/LocaleContext';
import { Gig, Proposal } from '../types';
import { fetchGigsByFreelancer, fetchProposalsByFreelancer } from '../services/api';
import Tabs from '../components/ui/Tabs';
import Button from '../components/ui/Button';
import GigCard from '../components/shared/GigCard';
import ProposalCard from '../components/shared/ProposalCard';
import Spinner from '../components/ui/Spinner';
import Card from '../components/ui/Card';
import { Page } from '../App';

interface FreelancerDashboardProps {
    onNavigate: (page: Page, id?: string) => void;
}


const FreelancerDashboard: React.FC<FreelancerDashboardProps> = ({ onNavigate }) => {
    const { user } = useAuth();
    const { strings } = useLocale();
    const [activeTab, setActiveTab] = useState(strings.myGigs);
    const [gigs, setGigs] = useState<Gig[]>([]);
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        
        setLoading(true);
        if (activeTab === strings.myGigs) {
            fetchGigsByFreelancer(user.id).then(setGigs).finally(() => setLoading(false));
        } else if (activeTab === strings.proposalsSent) {
            fetchProposalsByFreelancer(user.id).then(setProposals).finally(() => setLoading(false));
        } else {
            setLoading(false);
        }

    }, [user, activeTab, strings.myGigs, strings.proposalsSent]);

    const tabs = [strings.myGigs, strings.proposalsSent, strings.contracts];
    
    const renderContent = () => {
        if (loading) {
            return <div className="flex justify-center p-8"><Spinner /></div>;
        }

        if (activeTab === strings.myGigs) {
            if (gigs.length === 0) {
                 return (
                    <Card className="text-center p-8">
                        <h3 className="text-xl font-semibold mb-2">You haven't created any gigs yet.</h3>
                        <p className="text-gray-600 mb-4">Create a gig to showcase your skills and get hired.</p>
                        <Button onClick={() => alert('Navigate to create gig page!')}>{strings.createGig}</Button>
                    </Card>
                );
            }
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gigs.map(gig => <GigCard key={gig.id} gig={gig} onNavigate={onNavigate} />)}
                </div>
            );
        }

        if (activeTab === strings.proposalsSent) {
            if (proposals.length === 0) {
                 return (
                    <Card className="text-center p-8">
                        <h3 className="text-xl font-semibold mb-2">You haven't sent any proposals.</h3>
                        <p className="text-gray-600 mb-4">Find jobs that match your skills and send proposals.</p>
                        <Button onClick={() => onNavigate('browseJobs')}>Browse Jobs</Button>
                    </Card>
                );
            }
            return (
                <div className="space-y-4">
                    {proposals.map(proposal => <ProposalCard key={proposal.id} proposal={proposal} onNavigate={onNavigate}/>)}
                </div>
            );
        }
        
        if (activeTab === strings.contracts) {
            return <Card><p>Contracts feature coming soon.</p></Card>;
        }
        
        return null;
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Freelancer Dashboard</h2>
                <Button onClick={() => alert('Navigate to create gig page!')}>
                    {strings.createGig}
                </Button>
            </div>
            <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
             <div className="mt-6">
                {renderContent()}
            </div>
        </div>
    );
};

export default FreelancerDashboard;
