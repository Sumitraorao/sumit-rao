import { User, UserRole, Gig, Job, Proposal } from '../types';
import { mockGigs, mockJobs, mockProposals, clientUser, freelancerUser, mockUsers } from '../data/mockData';

// Re-export the user objects so other parts of the app that import from here
// (like ProposalCard.tsx) don't break.
export { clientUser, freelancerUser };

export const login = (email: string, role: UserRole): Promise<User> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (role === UserRole.Client) {
                resolve(clientUser);
            } else {
                resolve(freelancerUser);
            }
        }, 500);
    });
};

export const fetchGigs = (): Promise<Gig[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockGigs);
        }, 500);
    });
};

export const fetchJobs = (): Promise<Job[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockJobs);
        }, 500);
    });
};

export const fetchProposalsForJob = (jobId: string): Promise<Proposal[]> => {
     return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockProposals.filter(p => p.jobId === jobId));
        }, 500);
    });
}

export const fetchProposalsByFreelancer = (freelancerId: string): Promise<Proposal[]> => {
     return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockProposals.filter(p => p.freelancerId === freelancerId));
        }, 500);
    });
}

export const fetchJobsByClient = (clientId: string): Promise<Job[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockJobs.filter(j => j.clientId === clientId));
        }, 500);
    });
}

export const fetchGigsByFreelancer = (freelancerId: string): Promise<Gig[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockGigs.filter(g => g.freelancerId === freelancerId));
        }, 500);
    });
}

export const fetchGigById = (id: string): Promise<Gig | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockGigs.find(g => g.id === id));
        }, 300);
    });
};

export const fetchJobById = (id: string): Promise<Job | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockJobs.find(j => j.id === id));
        }, 300);
    });
};

export const fetchUserById = (id: string): Promise<User | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockUsers.find(u => u.id === id));
        }, 100);
    });
};