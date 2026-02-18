import React, { useState, useEffect } from 'react';
import Container from './ui/Container';
import Badge from './ui/Badge';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { X, ChevronLeft, ChevronRight, Layers, ShieldCheck, Database, BookOpen, Eye, CheckCircle2 } from 'lucide-react';

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

// --- PROJECT MODAL ---

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
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

  const images = project.galleryImages || [];

  const nextImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
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
        <div className="overflow-y-auto no-scrollbar flex-1">
            
            {/* Image Carousel */}
            {images.length > 0 && (
              <div className="relative w-full aspect-[16/9] bg-gray-100 dark:bg-black/50">
                <img 
                  src={images[currentImageIndex]} 
                  alt={`${project.title} Slide ${currentImageIndex + 1}`} 
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

            {/* Content */}
            <div className="p-8 md:p-10">
               <div className="mb-8">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                    {project.category}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                    {project.title}
                  </h2>
                  <div className="flex flex-wrap gap-y-2 mb-6">
                    {project.tags.map(tag => (
                      <Badge key={tag} label={tag} />
                    ))}
                  </div>
                  
                  {/* Description / Excerpt */}
                  <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed border-b border-gray-100 dark:border-white/10 pb-8">
                    {project.description}
                  </p>
               </div>

               {/* Full Write Up */}
               {project.content && (
                 <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed space-y-6 whitespace-pre-line">
                    {project.content}
                 </div>
               )}
            </div>
        </div>
      </div>
    </div>
  );
};

const SelectedProjects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSneakPeekOpen, setIsSneakPeekOpen] = useState(false);

  return (
    <Container>
      <div className="mb-12 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-[#1D1D1F] dark:text-white">Selected Projects</h2>
        <button 
          onClick={() => setIsSneakPeekOpen(true)}
          className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-black dark:hover:text-white transition-colors bg-gray-100 dark:bg-white/5 px-4 py-2 rounded-full"
        >
          <Eye size={14} /> Sneak Peek
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS.map((project) => {
          const Icon = project.icon;
          return (
            <div 
              key={project.id} 
              onClick={() => setSelectedProject(project)}
              className="bg-white dark:bg-[#1C1C1E] p-8 rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
            >
              <div className="mb-6">
                <div className="w-10 h-10 bg-gray-50 dark:bg-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-colors duration-300">
                  {Icon && <Icon className="w-5 h-5 dark:text-white dark:group-hover:text-black" />}
                </div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  {project.category}
                </div>
                <h3 className="text-xl font-bold text-[#1D1D1F] dark:text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-y-2">
                {project.tags.map(tag => (
                  <Badge key={tag} label={tag} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          isOpen={!!selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

      {/* Sneak Peek Modal */}
      <ProjectSneakPeekModal 
        isOpen={isSneakPeekOpen} 
        onClose={() => setIsSneakPeekOpen(false)} 
      />
    </Container>
  );
};

export default SelectedProjects;