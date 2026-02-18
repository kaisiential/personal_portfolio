import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';
import Container from './ui/Container';
import { Menu, X, Sparkles, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleTheme, activeTab, setActiveTab }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200/50 dark:border-white/10 py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <Container className="flex items-center justify-between">
        <button 
          onClick={() => handleTabClick('work')}
          className="flex items-center gap-2 group outline-none"
        >
          <div className="p-1.5 bg-gray-100 dark:bg-white/10 rounded-lg group-hover:bg-gray-200 dark:group-hover:bg-white/20 transition-colors">
            <Sparkles className="w-4 h-4 text-gray-800 dark:text-white" />
          </div>
          <span className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Kaisiential <span className="text-gray-400 font-normal">by Kai</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <div className="h-4 w-[1px] bg-gray-300 dark:bg-white/20"></div>

          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`text-sm font-medium transition-colors ${
                activeTab === item.id 
                  ? 'text-black dark:text-white font-semibold' 
                  : 'text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleTabClick('contact')}
            className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-all transform hover:scale-105"
          >
            Start a conversation &rarr;
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-600 dark:text-gray-400"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className="p-2 text-gray-600 dark:text-gray-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-[#1C1C1E] border-b border-gray-200 dark:border-white/10 p-6 md:hidden shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`text-lg font-medium text-left ${
                  activeTab === item.id 
                    ? 'text-black dark:text-white' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {item.label}
              </button>
            ))}
             <button
              onClick={() => handleTabClick('contact')}
              className="bg-black text-white dark:bg-white dark:text-black px-5 py-3 rounded-xl text-center text-sm font-medium mt-4"
            >
              Start a conversation
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;