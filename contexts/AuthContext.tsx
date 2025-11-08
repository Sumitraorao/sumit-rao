import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { User, UserRole } from '../types';
import { login as apiLogin } from '../services/api';

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (email: string, role: UserRole) => Promise<void>;
    logout: () => void;
}

// FIX: Export AuthContext to allow it to be imported by other modules.
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = useCallback(async (email: string, role: UserRole) => {
        const userData = await apiLogin(email, role);
        setUser(userData);
    }, []);

    const logout = useCallback(() => {
        setUser(null);
    }, []);

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};