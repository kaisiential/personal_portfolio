import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import SelectedProjects from './components/SelectedProjects';
import Services from './components/Services';
import Journal from './components/Journal';
import Contact from './components/Contact';
import Library from './components/Library';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('work');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleContactClick = () => {
    setActiveTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F7] dark:bg-black transition-colors duration-300 relative overflow-hidden">

      {/* Ambient Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-blue-200/20 dark:bg-blue-900/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-purple-200/20 dark:bg-purple-900/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
      </div>

      <Navbar
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="flex-grow pt-32 pb-20 relative z-10">
        {activeTab === 'work' && (
          <div className="space-y-32 animate-in fade-in duration-700 slide-in-from-bottom-4">
            <Hero onContactClick={handleContactClick} />
            <BentoGrid />
            {/*<SelectedProjects />*/}
          </div>
        )}

        {activeTab === 'services' && (
          <div className="space-y-20 animate-in fade-in duration-700 slide-in-from-bottom-4 pt-10">
            <Services onContactClick={handleContactClick} />
          </div>
        )}

        {activeTab === 'me' && (
          <div className="space-y-20 animate-in fade-in duration-700 slide-in-from-bottom-4 pt-10">
            <Journal />
          </div>
        )}

        {activeTab === 'library' && (
          <div className="animate-in fade-in duration-700 slide-in-from-bottom-4 pt-10">
            <Library />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="animate-in fade-in duration-700 slide-in-from-bottom-4 pt-10">
            <Contact />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
