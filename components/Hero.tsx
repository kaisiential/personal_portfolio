import React from 'react';
import Container from './ui/Container';

interface HeroProps {
  onContactClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onContactClick }) => {
  return (
    <Container className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-white/10 border border-gray-200/50 dark:border-white/5 shadow-sm">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
             <span className="text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Available for new projects</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-[#1D1D1F] dark:text-white leading-[1.05]">
            Learn with AI,<br />Build with Systems.
          </h1>

          <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg">
            I help organizations navigate the AI landscape with systems thinking, workflow optimization, and ethical implementation. No fluff — just results.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={onContactClick}
              className="inline-flex items-center justify-center bg-[#1D1D1F] text-white dark:bg-white dark:text-black rounded-full px-8 py-4 text-base font-medium hover:bg-black dark:hover:bg-gray-200 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Start a conversation &rarr;
            </button>
          </div>
        </div>

        {/* Image Container with Hover Effect */}
        <div className="relative aspect-[4/5] lg:aspect-square w-full rounded-[2.5rem] overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200 bg-black group">
          <img
            src="./images/IMG_0117.jpg"
            alt="Portrait of Kai"
            className="w-full h-full object-cover transition-all duration-500 ease-in-out grayscale group-hover:grayscale-0 group-hover:opacity-40"
          />

          {/* Text Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
            <h3 className="text-3xl font-bold text-white mb-4 drop-shadow-md">Hey, I'm Kai.</h3>
            <p className="text-lg text-gray-100 max-w-xs leading-relaxed font-medium drop-shadow-md">
              AI Systems. I don't write code — I rewrite workflows and think in systems.
            </p>
            <p className="text-lg text-gray-100 max-w-xs leading-relaxed font-medium mt-4 drop-shadow-md">
              Let's build something meaningful together.
            </p>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent dark:from-black/50 pointer-events-none"></div>
        </div>
      </div>
    </Container>
  );
};

export default Hero;
