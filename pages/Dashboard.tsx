import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import ClientDashboard from './ClientDashboard';
import FreelancerDashboard from './FreelancerDashboard';
import { Page } from '../App';

interface DashboardProps {
    onNavigate: (page: Page, id?: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
    const { user } = useAuth();

    if (!user) {
        return (
            <div className="container mx-auto px-6 py-8 text-center">
                <p>Loading user data...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
                <p className="text-gray-600">You are logged in as a {user.role}.</p>
            </div>
            
            {user.role === UserRole.Client 
                ? <ClientDashboard onNavigate={onNavigate} /> 
                : <FreelancerDashboard onNavigate={onNavigate} />}
        </div>
    );
};

export default Dashboard;