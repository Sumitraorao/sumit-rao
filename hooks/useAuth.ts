
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

// This is a re-export for convenience, but the primary definition is in the context file.
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
