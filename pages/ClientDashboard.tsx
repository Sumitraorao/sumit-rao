
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLocale } from '../contexts/LocaleContext';
import { Job } from '../types';
import { fetchJobsByClient } from '../services/api';
import Tabs from '../components/ui/Tabs';
import Button from '../components/ui/Button';
import JobCard from '../components/shared/JobCard';
import Spinner from '../components/ui/Spinner';
import { Page } from '../App';
import Card from '../components/ui/Card';

interface ClientDashboardProps {
    onNavigate: (page: Page, id?: string) => void;
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ onNavigate }) => {
    const { user } = useAuth();
    const { strings } = useLocale();
    const [activeTab, setActiveTab] = useState(strings.myJobs);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            setLoading(true);
            fetchJobsByClient(user.id)
                .then(setJobs)
                .finally(() => setLoading(false));
        }
    }, [user]);
    
    const tabs = [strings.myJobs, strings.contracts];

    const renderContent = () => {
        if (loading) {
            return <div className="flex justify-center p-8"><Spinner /></div>;
        }

        if (activeTab === strings.myJobs) {
             if (jobs.length === 0) {
                return (
                    <Card className="text-center p-8">
                        <h3 className="text-xl font-semibold mb-2">You haven't posted any jobs yet.</h3>
                        <p className="text-gray-600 mb-4">Post a job to find the perfect freelancer for your project.</p>
                        <Button onClick={() => alert('Navigate to post job page!')}>{strings.postJob}</Button>
                    </Card>
                );
            }
            return (
                <div className="space-y-4">
                    {jobs.map(job => (
                        <JobCard key={job.id} job={job} onNavigate={onNavigate} />
                    ))}
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
                <h2 className="text-2xl font-bold text-gray-800">Client Dashboard</h2>
                <Button onClick={() => alert('Navigate to post job page!')}>
                    {strings.postJob}
                </Button>
            </div>
            <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="mt-6">
                {renderContent()}
            </div>
        </div>
    );
};

export default ClientDashboard;
