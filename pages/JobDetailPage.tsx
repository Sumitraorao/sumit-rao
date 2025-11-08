
import React, { useState, useEffect } from 'react';
import { Job, User } from '../types';
import { fetchJobById, fetchUserById } from '../services/api';
import Spinner from '../components/ui/Spinner';
import { Page } from '../App';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';

interface JobDetailPageProps {
    jobId: string;
    onNavigate: (page: Page, id?: string) => void;
}

const JobDetailPage: React.FC<JobDetailPageProps> = ({ jobId, onNavigate }) => {
    const { user: currentUser } = useAuth();
    const [job, setJob] = useState<Job | null>(null);
    const [client, setClient] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const jobData = await fetchJobById(jobId);
            if (jobData) {
                setJob(jobData);
                const clientData = await fetchUserById(jobData.clientId);
                if (clientData) {
                    setClient(clientData);
                }
            }
            setLoading(false);
        };
        loadData();
    }, [jobId]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
    }

    if (!job || !client) {
        return <div className="text-center py-16">Job not found.</div>;
    }
    
    const isOwner = currentUser?.id === job.clientId;

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <Card>
                        <p className="text-sm text-gray-500">Posted {job.createdAt}</p>
                        <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4">{job.title}</h1>
                         <div className="flex flex-wrap gap-2 mb-6">
                            {job.skills.map(skill => (
                                <Badge key={skill}>{skill}</Badge>
                            ))}
                        </div>
                        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Job Description</h2>
                        <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
                    </Card>
                </div>

                {/* Sidebar */}
                <aside className="lg:col-span-1 space-y-6">
                     <Card>
                        <div className="text-center">
                            {currentUser?.role === UserRole.Freelancer && !isOwner && (
                                <Button className="w-full mb-4">Submit a Proposal</Button>
                            )}
                             {isOwner && (
                                <Button className="w-full mb-4" variant="secondary">View Proposals ({job.proposals})</Button>
                            )}
                            <div className="border-t pt-4">
                                <h3 className="text-lg font-semibold mb-2">About the Client</h3>
                                <div className="flex items-center justify-center mb-2">
                                    <img src={client.avatarUrl} alt={client.name} className="w-12 h-12 rounded-full mr-4" />
                                    <p className="font-semibold text-lg">{client.name}</p>
                                </div>
                                <p className="text-sm text-gray-600">Rating: {client.rating} ({client.reviews} reviews)</p>
                            </div>
                        </div>
                    </Card>
                     <Card>
                        <h3 className="text-lg font-semibold mb-2">Job Details</h3>
                        <ul className="text-sm space-y-2">
                            <li className="flex justify-between">
                                <span className="text-gray-600">Budget Type:</span>
                                <strong>{job.budget.type}</strong>
                            </li>
                            <li className="flex justify-between">
                                <span className="text-gray-600">Budget:</span>
                                <strong>${job.budget.min} - ${job.budget.max}{job.budget.type === 'Hourly' ? '/hr' : ''}</strong>
                            </li>
                             <li className="flex justify-between">
                                <span className="text-gray-600">Proposals:</span>
                                <strong>{job.proposals}</strong>
                            </li>
                        </ul>
                    </Card>
                </aside>
            </div>
        </div>
    );
};

export default JobDetailPage;
