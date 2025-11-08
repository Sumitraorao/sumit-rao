
import React, { useState, useEffect } from 'react';
import { Job, Proposal, User } from '../../types';
import { fetchJobById, fetchUserById } from '../../services/api';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Spinner from '../ui/Spinner';
import { Page } from '../../App';

interface ProposalCardProps {
    proposal: Proposal;
    onNavigate: (page: Page, id: string) => void;
}

const ProposalCard: React.FC<ProposalCardProps> = ({ proposal, onNavigate }) => {
    const [job, setJob] = useState<Job | null>(null);
    const [freelancer, setFreelancer] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const jobData = await fetchJobById(proposal.jobId);
            if (jobData) setJob(jobData);
            
            const freelancerData = await fetchUserById(proposal.freelancerId);
            if(freelancerData) setFreelancer(freelancerData);

            setLoading(false);
        };
        fetchData();
    }, [proposal]);

    if (loading) {
        return <Card className="flex justify-center items-center h-24"><Spinner /></Card>;
    }

    if (!job || !freelancer) {
        return <Card>Could not load proposal details.</Card>;
    }

    const statusColors = {
        sent: 'bg-blue-100 text-blue-800',
        viewed: 'bg-yellow-100 text-yellow-800',
        shortlisted: 'bg-green-100 text-green-800',
    };

    return (
        <Card>
            <div className="flex justify-between items-start">
                 <div>
                    <p className="text-sm text-gray-500">Proposal for:</p>
                    <h4 
                        className="text-lg font-semibold text-primary-600 cursor-pointer hover:underline"
                        onClick={() => onNavigate('jobDetail', job.id)}
                    >
                        {job.title}
                    </h4>
                </div>
                 <Badge className={`${statusColors[proposal.status]} capitalize`}>{proposal.status}</Badge>
            </div>
            <p className="mt-4 text-gray-700 italic border-l-4 border-gray-200 pl-4 py-2">
                "{proposal.coverLetter}"
            </p>
            <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                <span>Bid: <span className="font-bold text-gray-800">${proposal.bidAmount}</span></span>
                <span>Timeline: <span className="font-bold text-gray-800">{proposal.timeline}</span></span>
            </div>
        </Card>
    );
};

export default ProposalCard;
