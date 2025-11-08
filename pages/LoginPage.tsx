
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLocale } from '../contexts/LocaleContext';
import { UserRole } from '../types';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import Logo from '../components/ui/Logo';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<UserRole>(UserRole.Client);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const { strings } = useLocale();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(email, role);
            // The App component will handle navigation on auth state change
        } catch (err) {
            setError('Failed to login. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <div className="mx-auto h-12 w-auto flex justify-center">
                        <Logo />
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{strings.appName}</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">{strings.tagline}</p>
                </div>
                <Card>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <Input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email address"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">I am a...</label>
                            <div className="mt-2 flex rounded-md shadow-sm">
                                <button
                                    type="button"
                                    onClick={() => setRole(UserRole.Client)}
                                    className={`relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 w-1/2 justify-center ${role === UserRole.Client ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                >
                                    Client
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole(UserRole.Freelancer)}
                                    className={`-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 w-1/2 justify-center ${role === UserRole.Freelancer ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                >
                                    Freelancer
                                </button>
                            </div>
                        </div>

                        {error && <p className="text-sm text-red-600">{error}</p>}

                        <div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? 'Logging in...' : 'Sign in / Register'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;
