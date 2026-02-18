import React from 'react';
import Container from './ui/Container';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-gray-200 dark:border-white/5 bg-[#F5F5F7] dark:bg-black transition-colors">
      <Container className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-400 dark:text-gray-600">
          &copy; {new Date().getFullYear()} Kaisiential by Kai. Built with systems thinking.
        </p>
        <div className="flex items-center gap-6">
          <a href="https://x.com/kaisiential" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white transition-colors">
            Twitter/X
          </a>
          <a href="https://instagram.com/kaisiential" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white transition-colors">
            Instagram
          </a>
          <a href="mailto:hello@kaisiential.com" className="text-sm text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white transition-colors">
            Email
          </a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
