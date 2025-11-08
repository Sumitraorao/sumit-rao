
import React from 'react';
import { Job, JobType } from '../../types';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Page } from '../../App';

interface JobCardProps {
    job: Job;
    onNavigate: (page: Page, id: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onNavigate }) => {
    const budgetString = job.budget.type === JobType.Fixed
        ? `$${job.budget.min} - $${job.budget.max}`
        : `$${job.budget.min} - $${job.budget.max} / hr`;

    return (
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onNavigate('jobDetail', job.id)}>
            <div className="flex flex-col sm:flex-row justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-primary-600 hover:underline">{job.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                        {budgetString} - Posted {job.createdAt}
                    </p>
                    <p className="text-gray-700 mt-2 line-clamp-2">
                        {job.description}
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-6 text-right flex-shrink-0">
                    <p className="text-sm font-semibold">{job.proposals} Proposals</p>
                </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
                {job.skills.map(skill => (
                    <Badge key={skill}>{skill}</Badge>
                ))}
            </div>
        </Card>
    );
};

export default JobCard;
