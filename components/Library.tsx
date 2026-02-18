import React, { useState, useMemo, useEffect } from 'react';
import Container from './ui/Container';
import { LIBRARY_ITEMS, FEATURED_JOURNALS } from '../constants';
import { LibraryItem, FeaturedJournalEntry } from '../types';
import { Book, Heart, Quote, Star, Activity, RotateCw, ChevronRight, Layers, ArrowUpRight, X, ChevronLeft, Calendar, Clock, Download, Mail, Send, Eye, CheckCircle2 } from 'lucide-react';

// --- MOCK DATA FOR RESOURCE PREVIEWS ---
const FREE_RESOURCE_PREVIEWS = [
  {
    id: 'r1',
    title: 'AI Implementation Checklist',
    description: 'A comprehensive step-by-step guide to deploying LLMs in enterprise environments without breaking compliance.',
    features: ['Security Protocols', 'Model Selection Matrix', 'Deployment Timeline'],
    images: [
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1600'
    ]
  },
  {
    id: 'r2',
    title: 'Systems Thinking Notion Template',
    description: 'Turn chaos into clarity. A pre-built workspace designed for systems mapping, causal loop diagrams, and leverage point analysis.',
    features: ['Drag & Drop Elements', 'Causal Loop Widgets', 'Project Dashboard'],
    images: [
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600'
    ]
  },
  {
    id: 'r3',
    title: 'Advanced Prompting Guide',
    description: 'Stop guessing. Learn the scientific method of prompt engineering with zero-shot, few-shot, and chain-of-thought techniques.',
    features: ['50+ Copy-Paste Prompts', 'Theory Breakdown', 'Optimization Cheatsheet'],
    images: [
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1555421689-492a18d9c3ad?auto=format&fit=crop&q=80&w=1600'
    ]
  }
];

const renderRating = (rating?: number) => {
  if (!rating) return null;
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className={`w-3 h-3 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
        />
      ))}
    </div>
  );
};

const BentoItem: React.FC<{ item: LibraryItem }> = ({ item }) => {
  // Determine span classes
  const spanClass = 
    item.colSpan === 3 ? 'md:col-span-3' : 
    item.colSpan === 2 ? 'md:col-span-2' : 
    'md:col-span-1';

  const bgClass = item.color || 'bg-white dark:bg-[#1C1C1E]';
  
  // Determine text classes based on background
  // If custom color includes text-white, we default to white text.
  // HOWEVER, if it also includes dark:text-black (like the quote card), we must respect that inversion.
  let textClass = 'text-[#1D1D1F] dark:text-white';
  let subTextClass = 'text-gray-500 dark:text-gray-400';
  let iconBgClass = 'bg-amber-100/50 dark:bg-amber-900/20'; // Default for Book
  let iconTextClass = 'text-amber-700 dark:text-amber-400'; // Default for Book

  if (item.color?.includes('text-white')) {
    if (item.color?.includes('dark:text-black')) {
        // Case: Inverted card (Black BG Light / White BG Dark)
        textClass = 'text-white dark:text-black';
        subTextClass = 'text-gray-300 dark:text-gray-500';
    } else {
        // Case: Always Dark card
        textClass = 'text-white';
        subTextClass = 'text-gray-300';
    }
  }

  // Icon styling logic
  if (item.type === 'health') {
    iconBgClass = 'bg-rose-100/50 dark:bg-rose-900/20';
    iconTextClass = 'text-rose-600 dark:text-rose-400';
  } else if (item.type === 'quote') {
    // Quote icon specific adjustment for the inverted card
    if (item.color?.includes('dark:text-black')) {
       iconBgClass = 'bg-gray-100/20 dark:bg-black/5';
       iconTextClass = 'text-gray-300 dark:text-gray-500';
    } else {
       iconBgClass = 'bg-gray-100/50 dark:bg-gray-800';
       iconTextClass = 'text-gray-600 dark:text-gray-300';
    }
  }

  return (
    <div className={`
      ${spanClass} 
      ${bgClass}
      rounded-[2rem] p-8 
      border border-gray-100 dark:border-white/5 
      shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1
      flex flex-col justify-between
      min-h-[240px]
      group
    `}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          {item.type === 'book' && <div className={`p-2 rounded-lg ${iconBgClass} ${iconTextClass}`}><Book size={18} /></div>}
          {item.type === 'health' && <div className={`p-2 rounded-lg ${iconBgClass} ${iconTextClass}`}><Heart size={18} /></div>}
          {item.type === 'quote' && <div className={`p-2 rounded-lg ${iconBgClass} ${iconTextClass}`}><Quote size={18} /></div>}
          
          {item.status && (
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              item.status === 'Reading' || item.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
              'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
            }`}>
              {item.status}
            </span>
          )}
        </div>
        {renderRating(item.rating)}
      </div>

      <div className="space-y-4">
        <div>
          <h3 className={`text-xl font-bold ${textClass} mb-1 leading-tight`}>{item.title}</h3>
          {item.subtitle && <p className={`text-sm font-medium ${subTextClass}`}>{item.subtitle}</p>}
        </div>

        {item.content && (
          <p className={`text-base ${item.type === 'quote' ? 'font-serif italic text-lg' : ''} ${subTextClass} leading-relaxed line-clamp-4`}>
            {item.content}
          </p>
        )}

        {item.tags && (
          <div className="flex flex-wrap gap-2 pt-2">
            {item.tags.map(tag => (
              <span 
                key={tag} 
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
                  item.color?.includes('bg-black') 
                  ? 'bg-white/20 text-white dark:bg-black/10 dark:text-black' 
                  : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// --- MINI CAROUSEL FOR RESOURCE PREVIEW ---
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
    <div className="relative w-full aspect-[4/3] bg-gray-100 dark:bg-black/30 rounded-xl overflow-hidden mb-4 group cursor-zoom-in" onClick={handleImageClick}>
      <img src={images[index]} alt="Resource Preview" className="w-full h-full object-cover" />
      
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

// --- RESOURCE PREVIEW MODAL (SNEAK PEEK) ---
const ResourcePreviewModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
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
        
        <div className="relative w-full max-w-6xl max-h-[80vh] h-auto bg-[#F5F5F7] dark:bg-black rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 border border-gray-200 dark:border-white/5">
          
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
              <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] dark:text-white mb-4">Resource Library Preview</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                A sneak peek into the tools, templates, and frameworks included in the free download package.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FREE_RESOURCE_PREVIEWS.map((resource) => (
                <div key={resource.id} className="bg-white dark:bg-[#1C1C1E] p-6 rounded-[2rem] border border-gray-100 dark:border-white/5 flex flex-col h-full">
                  <MiniCarousel 
                    images={resource.images} 
                    onImageClick={(idx) => setZoomState({ images: resource.images, index: idx })} 
                  />
                  
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-[#1D1D1F] dark:text-white mb-2">{resource.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 flex-grow">
                      {resource.description}
                    </p>
                    
                    <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-white/5">
                      {resource.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs font-medium text-gray-600 dark:text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
               <p className="text-sm text-gray-400 mb-4">Ready to access these tools?</p>
               <button 
                 onClick={onClose}
                 className="bg-black text-white dark:bg-white dark:text-black px-8 py-3 rounded-full font-semibold text-sm hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
               >
                 Go back to Download
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
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
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

// --- FREE TOOLS CARD ---

const FreeToolsCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSneakPeekOpen, setIsSneakPeekOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  return (
    <>
      <div className="bg-white dark:bg-[#1C1C1E] rounded-[2rem] p-8 md:p-10 shadow-sm border border-gray-100 dark:border-white/5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
              <Download className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <button 
              onClick={() => setIsSneakPeekOpen(true)}
              className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors bg-gray-50 dark:bg-white/5 px-3 py-1.5 rounded-full"
            >
              <Eye size={14} /> Sneak Peek
            </button>
          </div>
          
          <h3 className="text-2xl font-bold text-[#1D1D1F] dark:text-white mb-3">Free Resources</h3>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
            Access my personal library of templates, mental model cheat sheets, and prompt engineering guides. Updated monthly.
          </p>
          <ul className="space-y-2 mb-8 text-sm text-gray-600 dark:text-gray-300">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> AI Implementation Checklist
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Systems Thinking Notion Template
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Advanced Prompting Guide (PDF)
            </li>
          </ul>
        </div>
        <button 
          onClick={() => setIsOpen(true)}
          className="w-full mt-auto bg-black text-white dark:bg-white dark:text-black py-3.5 rounded-xl font-semibold text-sm hover:bg-gray-800 dark:hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
        >
          Unlock Freebies <Download size={16} />
        </button>
      </div>

      {/* Download Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white dark:bg-[#1C1C1E] rounded-[2rem] shadow-2xl p-8 border border-gray-100 dark:border-white/5 animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            {!submitted ? (
              <>
                <div className="text-center mb-8">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Download className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Unlock Resources</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Enter your details to receive the download link instantly via email.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="modal-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">First Name</label>
                    <input 
                      type="text" 
                      id="modal-name" 
                      required
                      placeholder="Jane"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-transparent focus:bg-white dark:focus:bg-black focus:border-blue-500 focus:ring-0 transition-all outline-none text-sm dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="modal-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      id="modal-email" 
                      required
                      placeholder="jane@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-transparent focus:bg-white dark:focus:bg-black focus:border-blue-500 focus:ring-0 transition-all outline-none text-sm dark:text-white"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 mt-2"
                  >
                    Send Me The Files
                  </button>
                  <p className="text-xs text-center text-gray-400 mt-4">
                    No spam. Unsubscribe anytime.
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Checkmark className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">On the way!</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-8">
                  Check your inbox. The resources should arrive within 2 minutes.
                </p>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sneak Peek Modal */}
      <ResourcePreviewModal 
        isOpen={isSneakPeekOpen} 
        onClose={() => setIsSneakPeekOpen(false)} 
      />
    </>
  );
};

// Helper for success state
const Checkmark = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

// --- NEWSLETTER CARD ---

const NewsletterCard: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock subscribe
    alert(`Thanks ${name}! You've subscribed with ${email}.`);
    setEmail('');
    setName('');
  };

  return (
    <div className="bg-white dark:bg-[#1C1C1E] rounded-[2rem] p-8 md:p-10 shadow-sm border border-gray-100 dark:border-white/5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col group">
      <div>
        <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/30 transition-colors">
          <Mail className="w-6 h-6 text-amber-600 dark:text-amber-400" />
        </div>
        <h3 className="text-2xl font-bold text-[#1D1D1F] dark:text-white mb-3">Join the Newsletter</h3>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
          Weekly insights on AI architecture, systems thinking, and the future of work. No fluff, just high-signal synthesis.
        </p>
      </div>
      
      <form onSubmit={handleSubscribe} className="space-y-4 mt-auto">
        <div>
          <label htmlFor="nl-name" className="sr-only">First Name</label>
          <input 
            type="text" 
            id="nl-name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="First Name"
            required
            className="w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-transparent focus:bg-white dark:focus:bg-black focus:border-amber-500 focus:ring-0 transition-all outline-none text-sm dark:text-white placeholder-gray-400"
          />
        </div>
        <div>
          <label htmlFor="nl-email" className="sr-only">Email</label>
          <input 
            type="email" 
            id="nl-email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
            className="w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-transparent focus:bg-white dark:focus:bg-black focus:border-amber-500 focus:ring-0 transition-all outline-none text-sm dark:text-white placeholder-gray-400"
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-black text-white dark:bg-white dark:text-black py-3.5 rounded-xl font-semibold text-sm hover:bg-gray-800 dark:hover:bg-gray-200 transition-all flex items-center justify-center gap-2 shadow-lg shadow-black/5 dark:shadow-white/5"
        >
          Subscribe <Send size={16} />
        </button>
      </form>
    </div>
  );
};

// --- JOURNAL MODAL & CAROUSEL ---

const JournalModal: React.FC<{ entry: FeaturedJournalEntry; isOpen: boolean; onClose: () => void }> = ({ entry, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const images = entry.galleryImages || (entry.coverImage ? [entry.coverImage] : []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl max-h-[80vh] bg-white dark:bg-[#1C1C1E] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-white/5">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/50 dark:bg-black/50 backdrop-blur-md rounded-full text-black dark:text-white hover:bg-white dark:hover:bg-black transition-colors"
        >
          <X size={20} />
        </button>

        {/* Scrollable Area */}
        <div className="overflow-y-auto no-scrollbar">
            
            {/* Image Carousel */}
            {images.length > 0 && (
              <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-gray-100 dark:bg-black/50">
                <img 
                  src={images[currentImageIndex]} 
                  alt={`Slide ${currentImageIndex + 1}`} 
                  className="w-full h-full object-cover"
                />
                
                {images.length > 1 && (
                  <>
                    <button 
                      onClick={(e) => { e.stopPropagation(); prevImage(); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-sm transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-sm transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {images.map((_, idx) => (
                        <div 
                          key={idx} 
                          className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'}`} 
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Text Content */}
            <div className="p-8 md:p-12">
               <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {entry.date}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {entry.readTime}</span>
                  <div className="flex gap-2">
                    {entry.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-gray-100 dark:bg-white/10 rounded-md text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
               </div>

               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{entry.title}</h2>
               <h3 className="text-xl text-gray-500 dark:text-gray-400 mb-8 font-medium">{entry.subtitle}</h3>

               <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed space-y-4 whitespace-pre-line">
                  {entry.content}
               </div>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- FEATURED JOURNAL GALLERY ITEM ---

const FeaturedJournalGallery: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedEntry, setSelectedEntry] = useState<FeaturedJournalEntry | null>(null);

  const handleFlip = () => {
    if (FEATURED_JOURNALS.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % FEATURED_JOURNALS.length);
  };

  const handleOpenModal = (e: React.MouseEvent, entry: FeaturedJournalEntry) => {
    e.stopPropagation();
    setSelectedEntry(entry);
  };

  if (FEATURED_JOURNALS.length === 0) return null;

  return (
    <>
      {/* Main Container acting as a single Bento Box */}
      <div className="md:col-span-3 relative min-h-[500px] perspective-1000 group">
        <div className="flex items-center justify-between mb-6 px-2 absolute top-0 left-0 right-0 z-10">
           <div className="flex items-center gap-2 text-gray-400 text-sm font-medium uppercase tracking-widest">
              <Layers size={16} />
              <span>Featured Expertise</span>
           </div>
           <div className="flex items-center gap-3">
             <span className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide">
                {FEATURED_JOURNALS.length} Posts
             </span>
             <button 
                onClick={handleFlip}
                className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-black dark:hover:text-white transition-colors px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 backdrop-blur-md"
              >
                 <RotateCw size={12} /> Flip
              </button>
           </div>
        </div>

        {/* Card Stack - Fixed layout issue here by using absolute inset */}
        <div className="absolute inset-x-0 top-12 bottom-0" onClick={handleFlip}>
           {FEATURED_JOURNALS.map((entry, index) => {
             const position = (index - activeIndex + FEATURED_JOURNALS.length) % FEATURED_JOURNALS.length;
             // Only render top 3 cards
             if (position > 2) return null;

             let style: React.CSSProperties = { transformOrigin: 'top center' };
             if (position === 0) {
               style = { ...style, zIndex: 30, transform: 'scale(1) translateY(0)', opacity: 1 };
             } else if (position === 1) {
               style = { ...style, zIndex: 20, transform: 'scale(0.97) translateY(15px)', opacity: 0.8 };
             } else if (position === 2) {
               style = { ...style, zIndex: 10, transform: 'scale(0.94) translateY(30px)', opacity: 0.5 };
             }

             return (
               <div 
                 key={entry.id}
                 className="absolute inset-0 bg-white dark:bg-[#1C1C1E] rounded-[2rem] overflow-hidden border border-gray-100 dark:border-white/5 cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col md:flex-row"
                 style={style}
               >
                  {/* Image Half */}
                  <div className="h-48 md:h-full md:w-1/2 overflow-hidden relative">
                     <img 
                       src={entry.coverImage} 
                       alt={entry.title} 
                       className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                     />
                     <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-black dark:text-white shadow-sm">
                        {entry.tags[0]}
                     </div>
                  </div>

                  {/* Content Half */}
                  <div className="p-8 md:p-10 flex flex-col flex-1 justify-center bg-white dark:bg-[#1C1C1E]">
                     <div className="mb-6">
                        <div className="text-xs text-gray-400 mb-3 flex items-center gap-2 font-mono">
                          {entry.date} • {entry.readTime}
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                          {entry.title}
                        </h3>
                        <p className="text-lg text-gray-500 dark:text-gray-400 font-medium mb-4">
                          {entry.subtitle}
                        </p>
                        <p className="text-gray-600 dark:text-gray-500 text-base leading-relaxed line-clamp-3">
                          {entry.excerpt}
                        </p>
                     </div>
                     
                     <div className="mt-4">
                        <button 
                          onClick={(e) => handleOpenModal(e, entry)}
                          className="inline-flex items-center gap-2 bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-all transform active:scale-[0.98]"
                        >
                          Read Full Article <ArrowUpRight size={16} />
                        </button>
                        <p className="mt-4 text-xs text-gray-300 dark:text-gray-600">Tap card to flip • Button to read</p>
                     </div>
                  </div>
               </div>
             );
           })}
        </div>
      </div>

      {/* Modal */}
      {selectedEntry && (
        <JournalModal 
          entry={selectedEntry} 
          isOpen={!!selectedEntry} 
          onClose={() => setSelectedEntry(null)} 
        />
      )}
    </>
  );
};

const ReadingBookGallery = ({ books }: { books: LibraryItem[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    if (books.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % books.length);
  };

  if (books.length === 0) return null;

  return (
    // Outer container is just a layout wrapper now, no Bento styling here
    <div className="md:col-span-1 relative min-h-[500px] perspective-1000 group">
       <div className="w-full h-full relative" onClick={handleNext}>
          {books.map((book, index) => {
              const position = (index - activeIndex + books.length) % books.length;
              // Only render relevant cards for stack effect
              if (position > 2) return null;

              const isActive = position === 0;
              const primaryTag = book.tags && book.tags.length > 0 ? book.tags[0] : 'Book';
              // Removed remainingTags logic

              let style: React.CSSProperties = { transformOrigin: 'top center' }; 
              if (position === 0) {
                style = { ...style, zIndex: 30, transform: 'scale(1) translateY(0)', opacity: 1 };
              } else if (position === 1) {
                style = { ...style, zIndex: 20, transform: 'scale(0.95) translateY(10px)', opacity: 0.7 }; 
              } else if (position === 2) {
                style = { ...style, zIndex: 10, transform: 'scale(0.9) translateY(20px)', opacity: 0.4 };
              }

              return (
                 <div 
                  key={book.id}
                  className="absolute inset-0 bg-white dark:bg-[#1C1C1E] rounded-[2rem] transition-all duration-500 ease-in-out cursor-pointer flex flex-col shadow-sm border border-gray-100 dark:border-white/5 p-8 hover:shadow-lg hover:-translate-y-1"
                  style={style}
                >
                   {/* Header moved INSIDE the card to prevent nested look */}
                   <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-green-100/50 dark:bg-green-900/20 rounded-lg text-green-700 dark:text-green-400">
                            <Book size={18} />
                         </div>
                         <div>
                            <span className="text-sm font-bold text-gray-900 dark:text-white leading-none mb-1 block">Reading</span>
                             <span className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide">
                              {books.length} {books.length === 1 ? 'Title' : 'Titles'}
                            </span>
                         </div>
                      </div>
                      <button 
                        className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-black dark:hover:text-white transition-colors px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10"
                      >
                         <RotateCw size={12} />
                      </button>
                   </div>

                   {/* Content */}
                   <div className="flex-1 flex flex-col bg-white dark:bg-[#1C1C1E] overflow-hidden">
                      {/* Here is the image container */}
                      <div className="h-[240px] w-auto aspect-[2/3] rounded-lg overflow-hidden shadow-sm mb-6 bg-gray-100 dark:bg-black/50 mx-auto relative">
                         {book.image ? (
                           <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                         ) : (
                           <div className="w-full h-full flex items-center justify-center">
                             <Book className="text-gray-300 dark:text-gray-600" />
                           </div>
                         )}
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                             <h3 className="text-xl font-bold text-[#1D1D1F] dark:text-white mb-1 leading-tight line-clamp-2">{book.title}</h3>
                             {/* Replaced Reading Badge with Genre Badge */}
                             <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 flex-shrink-0 whitespace-nowrap mt-1">
                               {primaryTag}
                             </span>
                          </div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{book.subtitle}</p>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-500 leading-relaxed line-clamp-3">
                          {book.content}
                        </p>
                      </div>
                   </div>
                </div>
              );
          })}
       </div>
        {books.length > 1 && (
          <div className="absolute bottom-[-30px] left-0 right-0 text-center z-0">
             <p className="text-xs text-gray-300 dark:text-gray-600 animate-pulse">Tap to flip</p>
          </div>
        )}
    </div>
  )
}

const BookGallery = ({ books }: { books: LibraryItem[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState<string>('All');

  // Extract unique genres from all books
  const genres = useMemo(() => {
    const allTags = books.flatMap(book => book.tags || []);
    const uniqueTags = Array.from(new Set(allTags)).sort();
    return ['All', ...uniqueTags];
  }, [books]);

  // Filter books based on selection
  const filteredBooks = useMemo(() => {
    if (selectedGenre === 'All') return books;
    return books.filter(book => book.tags?.includes(selectedGenre));
  }, [books, selectedGenre]);

  const handleNext = () => {
    if (filteredBooks.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % filteredBooks.length);
  };

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre);
    setActiveIndex(0); // Reset stack when changing filter
  };

  if (books.length === 0) return null;

  return (
    <div className="md:col-span-2 bg-white dark:bg-[#1C1C1E] rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-sm min-h-[500px] flex flex-col md:flex-row overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      
      {/* Sidebar / Topbar for Genres */}
      <div className="w-full md:w-56 flex-shrink-0 bg-gray-50/50 dark:bg-black/20 border-b md:border-b-0 md:border-r border-gray-100 dark:border-white/5 p-6 flex flex-col">
        <div className="hidden md:flex items-center gap-2 mb-6 text-gray-400 dark:text-gray-500">
          <Layers size={14} />
          <span className="text-xs font-bold uppercase tracking-widest">Collections</span>
        </div>
        
        <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible hide-scrollbar pb-2 md:pb-0">
          {genres.map(genre => (
            <button
              key={genre}
              onClick={() => handleGenreSelect(genre)}
              className={`
                px-4 py-2 rounded-xl text-sm font-medium transition-all text-left flex items-center justify-between whitespace-nowrap flex-shrink-0
                ${selectedGenre === genre 
                  ? 'bg-white dark:bg-white/10 text-black dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/5' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-black dark:hover:text-white'
                }
              `}
            >
              <span>{genre}</span>
              {selectedGenre === genre && <ChevronRight size={14} className="hidden md:block opacity-50" />}
            </button>
          ))}
        </div>
      </div>

      {/* Main Gallery Area */}
      <div className="flex-1 p-6 md:p-8 flex flex-col relative">
        <div className="flex items-center justify-between mb-8 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100/50 dark:bg-amber-900/20 rounded-lg text-amber-700 dark:text-amber-400">
              <Book size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900 dark:text-white leading-none mb-1">
                {selectedGenre}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide">
                {filteredBooks.length} {filteredBooks.length === 1 ? 'Title' : 'Titles'}
              </span>
            </div>
          </div>
          
          <button 
            onClick={handleNext}
            className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-black dark:hover:text-white transition-colors px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10"
          >
             <RotateCw size={12} /> Flip
          </button>
        </div>

        <div className="flex-grow relative w-full flex items-center justify-center perspective-1000 min-h-[300px]" onClick={handleNext}>
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => {
              // Calculate relative index based on activeIndex
              const position = (index - activeIndex + filteredBooks.length) % filteredBooks.length;
              
              // Only render the top 3 cards for performance and visual clarity
              if (position > 2) return null;

              // Styles based on stack position
              let style = {};
              if (position === 0) {
                style = { zIndex: 30, transform: 'scale(1) translateY(0)', opacity: 1 };
              } else if (position === 1) {
                style = { zIndex: 20, transform: 'scale(0.95) translateY(15px)', opacity: 0.7 };
              } else if (position === 2) {
                style = { zIndex: 10, transform: 'scale(0.9) translateY(30px)', opacity: 0.4 };
              }

              return (
                <div 
                  key={book.id}
                  className="absolute w-full max-w-md transition-all duration-500 ease-in-out cursor-pointer"
                  style={style}
                >
                  <div className="flex flex-col md:flex-row gap-6 bg-white dark:bg-[#252525] rounded-3xl p-6 border border-gray-100 dark:border-white/10 shadow-xl">
                     {/* Book Cover */}
                     <div className="flex-shrink-0 w-24 md:w-28 aspect-[2/3] rounded-lg overflow-hidden shadow-sm mx-auto md:mx-0 bg-gray-100 dark:bg-black/50">
                       {book.image ? (
                         <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                       ) : (
                         <div className="w-full h-full flex items-center justify-center">
                           <Book className="text-gray-300 dark:text-gray-600" />
                         </div>
                       )}
                     </div>

                     {/* Content */}
                     <div className="flex flex-col justify-center text-center md:text-left flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-[#1D1D1F] dark:text-white mb-1 truncate">{book.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-3 truncate">{book.subtitle}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-500 leading-relaxed mb-4 line-clamp-3 text-left">
                          {book.content}
                        </p>
                        <div className="flex items-center justify-center md:justify-start gap-2">
                           {renderRating(book.rating)}
                        </div>
                     </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-400">
              <p>No books found in this collection.</p>
            </div>
          )}
        </div>
        
        {filteredBooks.length > 1 && (
          <div className="mt-4 text-center z-10">
             <p className="text-xs text-gray-300 dark:text-gray-600 animate-pulse">Tap card to flip</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Library: React.FC = () => {
  const finishedBooks = LIBRARY_ITEMS.filter(item => item.type === 'book' && item.status === 'Finished');
  const readingBooks = LIBRARY_ITEMS.filter(item => item.type === 'book' && item.status === 'Reading');
  const quotes = LIBRARY_ITEMS.filter(item => item.type === 'quote');
  const health = LIBRARY_ITEMS.filter(item => item.type === 'health');

  return (
    <Container id="library">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <h2 className="text-3xl font-bold text-[#1D1D1F] dark:text-white">The Library</h2>
        <p className="text-gray-400 max-w-sm text-sm md:text-right">
          A curated collection of personal write-up, books recommendation, and biological protocols I subscribe to.
        </p>
      </div>

      <div className="space-y-16">
        {/* Featured Journal Section (NEW) */}
        <section>
           <FeaturedJournalGallery />
        </section>

        {/* Bookshelf Section */}
        <section>
          <div className="flex items-center gap-2 mb-6 text-gray-400 text-sm font-medium uppercase tracking-widest">
            <Book size={16} />
            <span>Bookshelf & Mental Models</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Gallery Component for Finished Books (Takes 2 Cols) */}
            <BookGallery books={finishedBooks} />
            
            {/* Reading List Gallery (Takes 1 Col) */}
            <ReadingBookGallery books={readingBooks} />
            
            {/* Render Quotes in full width rows if they exist */}
            {quotes.map(item => (
              <BentoItem key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Health Section */}
        <section>
          <div className="flex items-center gap-2 mb-6 text-gray-400 text-sm font-medium uppercase tracking-widest">
            <Activity size={16} />
            <span>Health & Performance Protocols</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {health.map(item => (
              <BentoItem key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* New 2-Column Section: Free Tools & Newsletter */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FreeToolsCard />
          <NewsletterCard />
        </section>
      </div>
    </Container>
  );
};

export default Library;