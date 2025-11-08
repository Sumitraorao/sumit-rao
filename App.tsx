
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LocaleProvider } from './contexts/LocaleContext';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import BrowseGigsPage from './pages/BrowseGigsPage';
import BrowseJobsPage from './pages/BrowseJobsPage';
import GigDetailPage from './pages/GigDetailPage';
import JobDetailPage from './pages/JobDetailPage';

export type Page = 'home' | 'login' | 'dashboard' | 'browseGigs' | 'browseJobs' | 'gigDetail' | 'jobDetail';

const AppContent: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const [page, setPage] = useState<Page>('home');
    const [pageId, setPageId] = useState<string | undefined>(undefined);

    const handleNavigate = (newPage: Page, id?: string) => {
        setPage(newPage);
        setPageId(id);
        window.scrollTo(0, 0);
    };

    const renderPage = () => {
        if (!isAuthenticated && !['home', 'browseGigs', 'browseJobs', 'gigDetail', 'jobDetail'].includes(page)) {
             return <LoginPage />;
        }

        switch (page) {
            case 'home':
                return <HomePage onNavigate={handleNavigate} />;
            case 'login':
                return <LoginPage />;
            case 'dashboard':
                return <Dashboard onNavigate={handleNavigate} />;
            case 'browseGigs':
                return <BrowseGigsPage onNavigate={handleNavigate} />;
            case 'browseJobs':
                 return <BrowseJobsPage onNavigate={handleNavigate} />;
            case 'gigDetail':
                return pageId ? <GigDetailPage gigId={pageId} onNavigate={handleNavigate} /> : <BrowseGigsPage onNavigate={handleNavigate} />;
            case 'jobDetail':
                 return pageId ? <JobDetailPage jobId={pageId} onNavigate={handleNavigate} /> : <BrowseJobsPage onNavigate={handleNavigate} />;
            default:
                return <HomePage onNavigate={handleNavigate} />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header onNavigate={handleNavigate} />
            <main className="flex-grow bg-gray-50">
                {renderPage()}
            </main>
            <Footer />
        </div>
    );
};


const App: React.FC = () => {
    return (
        <LocaleProvider>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </LocaleProvider>
    );
};

export default App;
