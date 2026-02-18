import React, { useState, useEffect, useRef } from 'react';
import Container from './ui/Container';
import Badge from './ui/Badge';
import { PROJECTS } from '../constants';
import { Globe, BrainCircuit, Terminal, Layers, Box, Database, Cpu, FileText, Eye, X, ChevronLeft, ChevronRight, Workflow, Quote, Briefcase, ArrowBigDown } from 'lucide-react';

// --- MINI CAROUSEL FOR SNEAK PEEK ---
const MiniCarousel: React.FC<{ images: string[], onImageClick: (index: number) => void }> = ({ images, onImageClick }) => {
  const [index, setIndex] = useState(0);

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleImageClick = () => {
    onImageClick(index);
  };

  return (
    <div className="relative w-full aspect-video bg-gray-100 dark:bg-black/30 rounded-xl overflow-hidden mb-4 group cursor-zoom-in" onClick={handleImageClick}>
      <img src={images[index]} alt="Project Preview" className="w-full h-full object-cover" />
      
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />

      {images.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <ChevronLeft size={16} />
          </button>
          <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <ChevronRight size={16} />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, idx) => (
              <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-all ${idx === index ? 'bg-white w-3' : 'bg-white/50'}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// --- LIVE TIME INDICATOR ---
const LiveTime: React.FC = () => {
  const [time, setTime] = useState('');
  const [timeDiff, setTimeDiff] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Format Chiang Mai Time
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Bangkok',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat('en-US', options).format(now));

      // Calculate Time Difference
      const targetOffset = -420; 
      const localOffset = now.getTimezoneOffset();
      const diffMinutes = localOffset - targetOffset;
      const diffHours = Math.round(diffMinutes / 60);

      if (diffHours === 0) {
        setTimeDiff('Same time zone');
      } else if (diffHours > 0) {
        setTimeDiff(`${diffHours}h behind`);
      } else {
        setTimeDiff(`${Math.abs(diffHours)}h ahead`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-white/5 px-3 py-1.5 rounded-full w-fit">
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </div>
        <span>{time} in Chiang Mai</span>
      </div>
      {timeDiff && (
        <div className="text-[10px] font-medium text-gray-400 dark:text-gray-500 px-2">
          {timeDiff}
        </div>
      )}
    </div>
  );
};

// --- MOCK DATA FOR TESTIMONIALS ---

const TESTIMONIALS = [
  /*{
    id: 't1',
    quote: "Kai transformed our fragmented AI experiments into a cohesive strategy. The ROI was clear within 3 months.",
    author: "Sarah Chen",
    role: "CTO @ TechFlow",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 't2',
    quote: "The systems thinking approach is a game changer. We stopped building isolated 'features' and started building scalable 'engines'.",
    author: "Marcus Thorne",
    role: "Founder @ Nexus",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 't3',
    quote: "Finally, an AI consultant who actually understands business logic. The governance framework Kai implemented saved us.",
    author: "Elena Rodriguez",
    role: "VP of Ops @ Solaris",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 't4',
    quote: "A masterclass in bridging the gap between technical capability and strategic necessity. Highly recommended.",
    author: "Michael Ang",
    role: "Product Lead @ Infolog",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
  }*/
];

// --- TESTIMONIAL CAROUSEL (INFINITE SCROLL) ---
const TestimonialCarousel: React.FC = () => {
  // Duplicate array to create seamless loop effect
  const extendedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  const Card = ({ t }: { t: typeof TESTIMONIALS[0] }) => (
    <div 
      className="flex-shrink-0 w-[85vw] md:w-[400px] bg-white dark:bg-[#1C1C1E] rounded-[2rem] p-8 shadow-sm border border-gray-100 dark:border-white/5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
    >
      <div className="mb-6">
          <Quote className="w-8 h-8 text-gray-200 dark:text-white/10 mb-4" />
          <p className="text-lg font-medium text-[#1D1D1F] dark:text-white leading-relaxed">
            "{t.quote}"
          </p>
      </div>
      
      <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-white/5">
        <img 
          src={t.image} 
          alt={t.author} 
          className="w-10 h-10 rounded-full object-cover border border-gray-100 dark:border-white/10"
        />
        <div>
          <div className="font-bold text-sm text-gray-900 dark:text-white">{t.author}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{t.role}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-12 relative w-full overflow-hidden group">
      <div className="flex w-max">
        <div className="flex gap-6 animate-scroll pr-6">
          {extendedTestimonials.map((t, idx) => (
            <Card key={`1-${t.id}-${idx}`} t={t} />
          ))}
        </div>
        <div className="flex gap-6 animate-scroll pr-6">
          {extendedTestimonials.map((t, idx) => (
            <Card key={`2-${t.id}-${idx}`} t={t} />
          ))}
        </div>
      </div>
      
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F5F5F7] dark:from-black to-transparent pointer-events-none z-10"></div>
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#F5F5F7] dark:from-black to-transparent pointer-events-none z-10"></div>
      
      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
        .group:hover .animate-scroll {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

// --- PROJECT SNEAK PEEK MODAL ---
const ProjectSneakPeekModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [zoomState, setZoomState] = useState<{ images: string[]; index: number } | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Keyboard navigation for zoomed view
  useEffect(() => {
    if (!zoomState) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setZoomState(null);
      } else if (e.key === 'ArrowLeft') {
        setZoomState(prev => prev ? ({ ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length }) : null);
      } else if (e.key === 'ArrowRight') {
        setZoomState(prev => prev ? ({ ...prev, index: (prev.index + 1) % prev.images.length }) : null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomState]);

  if (!isOpen) return null;

  const handleNextZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomState(prev => prev ? ({ ...prev, index: (prev.index + 1) % prev.images.length }) : null);
  };

  const handlePrevZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomState(prev => prev ? ({ ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length }) : null);
  };

  return (
    <>
      <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity" onClick={onClose}></div>
        
        <div className="relative w-full max-w-7xl max-h-[80vh] h-auto bg-[#F5F5F7] dark:bg-black rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 border border-gray-200 dark:border-white/5">
          
          <div className="absolute top-6 right-6 z-20">
            <button 
              onClick={onClose}
              className="p-2 bg-white dark:bg-[#1C1C1E] rounded-full shadow-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-8 md:p-12 overflow-y-auto no-scrollbar">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] dark:text-white mb-4">Work Archive Preview</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                A visual overview of recent case studies, systems architecture, and strategic interventions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROJECTS.map((project) => (
                <div key={project.id} className="bg-white dark:bg-[#1C1C1E] p-6 rounded-[2rem] border border-gray-100 dark:border-white/5 flex flex-col h-full">
                  <MiniCarousel 
                    images={project.galleryImages || []} 
                    onImageClick={(idx) => setZoomState({ images: project.galleryImages || [], index: idx })} 
                  />
                  
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                       <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 px-2 py-1 rounded-md">
                         {project.category}
                       </span>
                    </div>
                    <h3 className="text-xl font-bold text-[#1D1D1F] dark:text-white mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 flex-grow line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-white/5">
                      {project.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="text-xs text-gray-400 dark:text-gray-500">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
               <button 
                 onClick={onClose}
                 className="bg-black text-white dark:bg-white dark:text-black px-8 py-3 rounded-full font-semibold text-sm hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
               >
                 Close Preview
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* Zoomed Image Carousel Overlay */}
      {zoomState && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200" onClick={() => setZoomState(null)}>
          <button 
            onClick={() => setZoomState(null)}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50"
          >
            <X size={24} />
          </button>

          <div className="relative w-full max-w-7xl h-full flex items-center justify-center">
            {/* Prev Button */}
            <button 
              onClick={handlePrevZoom}
              className="absolute left-2 md:left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50"
            >
              <ChevronLeft size={32} />
            </button>

            {/* Image */}
            <img 
              src={zoomState.images[zoomState.index]} 
              alt={`Zoomed Preview ${zoomState.index + 1}`} 
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()} 
            />

            {/* Next Button */}
            <button 
              onClick={handleNextZoom}
              className="absolute right-2 md:right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50"
            >
              <ChevronRight size={32} />
            </button>

            {/* Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {zoomState.images.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-2 h-2 rounded-full transition-all ${idx === zoomState.index ? 'bg-white w-4' : 'bg-white/40'}`} 
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// --- PROCESS WORKFLOW MODAL ---
const ProcessWorkflowModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity" onClick={onClose}></div>
      
      <div className="relative w-full max-w-6xl max-h-[80vh] h-auto bg-[#F5F5F7] dark:bg-black rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 border border-gray-200 dark:border-white/5">
        
        <div className="absolute top-6 right-6 z-20">
          <button 
            onClick={onClose}
            className="p-2 bg-white dark:bg-[#1C1C1E] rounded-full shadow-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8 md:p-12 overflow-y-auto no-scrollbar flex-1 flex flex-col">
          <div className="text-center mb-8 flex-shrink-0">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] dark:text-white mb-4">The Process</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              A systematic approach to problem-solving, ensuring alignment from discovery to deployment.
            </p>
          </div>

          <div className="flex-grow flex flex-col gap-8">
            {/* Large Process Image */}
            <div className="w-full bg-white dark:bg-[#1C1C1E] rounded-[2rem] p-4 shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
               <img 
                 src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2000" 
                 alt="Workflow Process Diagram" 
                 className="w-full h-auto max-h-[50vh] object-contain rounded-xl"
               />
            </div>

            {/* Process Steps Description */}
            <div className="bg-white dark:bg-[#1C1C1E] rounded-[2rem] p-8 shadow-sm border border-gray-100 dark:border-white/5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
               <h3 className="text-xl font-bold text-[#1D1D1F] dark:text-white mb-6">Workflow Breakdown</h3>
               <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">01</div>
                    <h4 className="font-bold text-lg mb-2 dark:text-white">Discovery</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      Deep dive into current workflows, identifying bottlenecks and high-leverage opportunities for AI intervention.
                    </p>
                  </div>
                  <div className="relative md:pl-6 md:border-l border-gray-100 dark:border-white/10">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">02</div>
                    <h4 className="font-bold text-lg mb-2 dark:text-white">Mapping</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      Visualizing the entire system architecture. Defining data flows, integration points, and user touchpoints.
                    </p>
                  </div>
                  <div className="relative md:pl-6 md:border-l border-gray-100 dark:border-white/10">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">03</div>
                    <h4 className="font-bold text-lg mb-2 dark:text-white">Architecture</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      Selecting the right models and tools. Designing prompt chains and RAG pipelines for reliability and accuracy.
                    </p>
                  </div>
                  <div className="relative md:pl-6 md:border-l border-gray-100 dark:border-white/10">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">04</div>
                    <h4 className="font-bold text-lg mb-2 dark:text-white">Deployment</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      Iterative rollout with feedback loops. Monitoring for drift and refining protocols for long-term success.
                    </p>
                  </div>
               </div>
            </div>
          </div>
          
          <div className="mt-8 text-center flex-shrink-0">
             <button 
               onClick={onClose}
               className="bg-black text-white dark:bg-white dark:text-black px-8 py-3 rounded-full font-semibold text-sm hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
             >
               Close Process View
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BentoGrid: React.FC = () => {
  const [isSneakPeekOpen, setIsSneakPeekOpen] = useState(false);
  const [isProcessOpen, setIsProcessOpen] = useState(false);

  // Common card style for hover effect
  const cardStyle = "bg-white dark:bg-[#1C1C1E] rounded-[2rem] shadow-sm border border-gray-100 dark:border-white/5 transition-all duration-300 ease-out transform hover:-translate-y-1 hover:shadow-lg";

  return (
    <Container id="work">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-[#1D1D1F] dark:text-white">The Work</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 perspective-1000">
        {/* Left Column Container */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Main Large Card - Systems Strategy */}
          <div className={`relative md:col-span-2 p-8 md:p-10 ${cardStyle}`}>
            
            <div className="absolute top-8 right-8 flex gap-3 z-10">
              {/* Process Button */}
              <button 
                onClick={() => setIsProcessOpen(true)}
                className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-black dark:hover:text-white transition-colors bg-gray-50 dark:bg-white/5 px-3 py-1.5 rounded-full"
              >
                <Workflow size={14} /> View Process
              </button>
              
              {/* Sneak Peek Button */}
              <button 
                onClick={() => setIsSneakPeekOpen(true)}
                className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-black dark:hover:text-white transition-colors bg-gray-50 dark:bg-white/5 px-3 py-1.5 rounded-full"
              >
                <Eye size={14} /> Sneak Peek
              </button>
            </div>

            <div className="w-12 h-12 bg-gray-100 dark:bg-white/10 rounded-2xl flex items-center justify-center mb-6">
              <BrainCircuit className="w-6 h-6 text-gray-800 dark:text-white" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 dark:text-white">AI & Systems Strategy</h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-lg">
              I am semi-technical, I don't write code; I rewrite workflows and think in systems. I help organizations navigate the complexity of the AI landscape, focusing on adoption strategy, ethical implementation, and maximizing human-AI collaboration.
            </p>
          </div>

          {/* Bottom Left Small Card */}
          <div className={`p-8 flex flex-col justify-between min-h-[240px] ${cardStyle}`}>
            <div className="w-12 h-12 bg-gray-100 dark:bg-white/10 rounded-2xl flex items-center justify-center mb-6">
              <Globe className="w-6 h-6 text-gray-800 dark:text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Remote Native</h3>
              {/* Location and Time Indicator */}
              <div className="space-y-3">
                <p className="text-gray-400 text-sm leading-relaxed">
                  Based in Singapore.<br />Currently in Chiang Mai.<br />
                </p>
                <LiveTime />
              </div>
            </div>
          </div>

          {/* Bottom Right Small Card (Dark in light mode, distinct in dark mode) */}
          <div className={`bg-[#1D1D1F] dark:bg-[#2C2C2E] rounded-[2rem] p-8 shadow-sm transition-all duration-300 ease-out transform hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between min-h-[240px] text-white border-none`}>
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
              <Terminal className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Business Development</h3>
              <p className="text-gray-400 text-sm">Strategic Partner w Tapir</p>
            </div>
          </div>

        </div>

        {/* Right Column Tall Card - AI Generalist Stack */}
        <div className={`p-8 md:p-10 flex flex-col ${cardStyle}`}>
          <div className="w-12 h-12 bg-gray-100 dark:bg-white/10 rounded-2xl flex items-center justify-center mb-8">
             <Layers className="w-6 h-6 text-gray-800 dark:text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-8 dark:text-white">Core Stack</h3>
          
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 flex items-center justify-center flex-shrink-0">
                <Database className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-base">Research & Learning</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">Gemini & NotebookLM for research & learning.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 flex items-center justify-center flex-shrink-0">
                <Cpu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-base">Ideation</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">AI Studio for prototyping & Antigravity for building</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 flex items-center justify-center flex-shrink-0">
                <BrainCircuit className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-base">Reasoning & Building</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">Claude (Chat, CoWork & Code) – <br></br>the agentic layer</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 flex items-center justify-center flex-shrink-0">
                <Cpu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-base">Synthesis</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">Google Workspace Docs & Sheets for documentation.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 flex items-center justify-center flex-shrink-0">
                <Box className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-base">System Mapping</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">Miro for mapping system workflow & architecture.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Testimonials Section - Header */}
      {/*
      <div className="mb-12 mt-20 pt-20 border-t border-gray-200 dark:border-white/10">
        <h2 className="text-3xl font-bold text-[#1D1D1F] dark:text-white">The Testimonial</h2>
      </div>
      */}

      {/* New Testimonials Section */}
      <TestimonialCarousel />

      {/* Sneak Peek Modal */}
      <ProjectSneakPeekModal isOpen={isSneakPeekOpen} onClose={() => setIsSneakPeekOpen(false)} />
      
      {/* Process Workflow Modal */}
      <ProcessWorkflowModal isOpen={isProcessOpen} onClose={() => setIsProcessOpen(false)} />
    </Container>
  );
};

export default BentoGrid;