
import React, { useState, useEffect } from 'react';
import { Job } from '../types';
import { fetchJobs } from '../services/api';
import JobCard from '../components/shared/JobCard';
import Spinner from '../components/ui/Spinner';
import { Page } from '../App';
import Select from '../components/ui/Select';
import Input from '../components/ui/Input';

interface BrowseJobsPageProps {
    onNavigate: (page: Page, id: string) => void;
}

const BrowseJobsPage: React.FC<BrowseJobsPageProps> = ({ onNavigate }) => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [skill, setSkill] = useState('All');

    useEffect(() => {
        setLoading(true);
        fetchJobs()
            .then(setJobs)
            .finally(() => setLoading(false));
    }, []);
    
    // Get unique skills from all jobs
    const allSkills = [...new Set(jobs.flatMap(j => j.skills))].sort();

    const filteredJobs = jobs
        .filter(job => skill === 'All' || job.skills.includes(skill))
        .filter(job => 
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description.toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-gray-900">Find Your Next Project</h1>
                <p className="mt-2 text-lg text-gray-600">Browse jobs posted by clients from all over the world.</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm mb-8 flex flex-col sm:flex-row gap-4">
                <Input
                    className="flex-grow"
                    placeholder="Search for jobs by title or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Select
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                >
                    <option>All</option>
                    {allSkills.map(s => <option key={s}>{s}</option>)}
                </Select>
            </div>

            {loading ? (
                <div className="flex justify-center p-16"><Spinner /></div>
            ) : (
                <div className="space-y-4">
                    {filteredJobs.map(job => (
                        <JobCard key={job.id} job={job} onNavigate={onNavigate} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BrowseJobsPage;
