import React, { useState } from 'react';
import Container from './ui/Container';
import { Workflow, ShieldCheck, GraduationCap, Database, Sparkles, ArrowRight, CheckCircle2, X } from 'lucide-react';

interface Service {
  id: string;
  icon: React.ElementType;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  idealFor: string;
}

const SERVICES: Service[] = [
  {
    id: 's1',
    icon: Workflow,
    title: 'AI Workflow Audit & Optimization',
    tagline: 'Find the bottleneck. Fix the system.',
    description: 'I dive deep into your existing workflows — mapping every step, identifying friction, and pinpointing exactly where AI can create the most leverage. No generic advice. A tailored, systems-level analysis that shows you the highest-ROI opportunities for AI integration.',
    deliverables: [
      'Full workflow mapping & bottleneck analysis',
      'Prioritized AI opportunity roadmap',
      'Tool recommendations with implementation plan',
      'ROI projections for each intervention'
    ],
    idealFor: 'Teams spending 10+ hours/week on repetitive research, reporting, or data processing tasks.'
  },
  {
    id: 's2',
    icon: ShieldCheck,
    title: 'Corporate AI Governance & Policy',
    tagline: 'Innovate without the risk.',
    description: 'Your team wants to use AI but leadership is worried about data privacy, hallucinations, and compliance. I build clear, actionable governance frameworks — the "Traffic Light" protocol — that let your people innovate confidently within defined guardrails.',
    deliverables: [
      'AI Usage Policy & Employee Handbook',
      '"Traffic Light" protocol (Green/Yellow/Red zones)',
      'Tool vetting checklist for IT & compliance',
      'Mandatory training workshop for staff'
    ],
    idealFor: 'Organizations adopting GenAI tools who need risk frameworks before scaling.'
  },
  {
    id: 's3',
    icon: GraduationCap,
    title: 'AI Literacy Training & Workshops',
    tagline: 'From confusion to confidence.',
    description: 'Your leadership team knows AI is important but can\'t articulate why or how. I design jargon-free workshops that build genuine understanding — not just awareness. Participants leave with mental models, hands-on experience, and concrete pilot projects to run.',
    deliverables: [
      'Custom 1-2 day workshop curriculum',
      'Hands-on prompting & use case discovery sessions',
      'Executive decision framework for AI investment',
      'Post-workshop action plan with KPIs'
    ],
    idealFor: 'C-Suite and leadership teams who oscillate between "AI will solve everything" and "It\'s just hype."'
  },
  {
    id: 's4',
    icon: Database,
    title: 'Knowledge Base & Data Architecture',
    tagline: 'Clean data in. Smart answers out.',
    description: '"Garbage in, garbage out." Before you build a chatbot or RAG pipeline, your data needs to be structured, tagged, and organized. I help companies get "AI Ready" by restructuring their knowledge bases for machine-readable retrieval — so when you do build, it works.',
    deliverables: [
      'Knowledge base audit & gap analysis',
      'Taxonomy & metadata tagging framework',
      'Entity relationship mapping for RAG readiness',
      'Data quality scorecard & maintenance plan'
    ],
    idealFor: 'Companies with messy Confluence, Notion, or SharePoint wikis who want to build AI-powered search or support tools.'
  }
];

const ServiceModal: React.FC<{ service: Service; isOpen: boolean; onClose: () => void; onContact: () => void }> = ({ service, isOpen, onClose, onContact }) => {
  if (!isOpen) return null;
  const Icon = service.icon;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl max-h-[80vh] bg-white dark:bg-[#1C1C1E] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-white/5">
        <div className="absolute top-6 right-6 z-20">
          <button onClick={onClose} className="p-2 bg-gray-100 dark:bg-white/10 rounded-full text-gray-500 hover:text-black dark:hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-8 md:p-10 overflow-y-auto no-scrollbar">
          <div className="w-14 h-14 bg-gray-100 dark:bg-white/10 rounded-2xl flex items-center justify-center mb-6">
            <Icon className="w-7 h-7 text-gray-800 dark:text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1D1D1F] dark:text-white mb-2">{service.title}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-8 italic">{service.tagline}</p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 text-base">{service.description}</p>
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">What You Get</h3>
            <div className="space-y-3">
              {service.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl mb-8">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Ideal For</div>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{service.idealFor}</p>
          </div>
          <button
            onClick={() => { onClose(); onContact(); }}
            className="w-full bg-black text-white dark:bg-white dark:text-black py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-all transform active:scale-[0.99]"
          >
            Inquire About This Service <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

interface ServicesProps {
  onContactClick: () => void;
}

const Services: React.FC<ServicesProps> = ({ onContactClick }) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const cardStyle = "bg-white dark:bg-[#1C1C1E] rounded-[2rem] shadow-sm border border-gray-100 dark:border-white/5 transition-all duration-300 ease-out transform hover:-translate-y-1 hover:shadow-lg cursor-pointer";

  return (
    <Container>
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-white/10 border border-gray-200/50 dark:border-white/5 shadow-sm mb-6">
          <Sparkles className="w-3 h-3 text-gray-500 dark:text-gray-300" />
          <span className="text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Professional Services</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] dark:text-white mb-6 tracking-tight">
          How I Can Help
        </h2>
        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed">
          I work with organizations to navigate the complexity of AI — from strategy to governance to hands-on training. No fluff — just results.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {SERVICES.map((service) => {
          const Icon = service.icon;
          return (
            <div key={service.id} onClick={() => setSelectedService(service)} className={`p-8 ${cardStyle} group`}>
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 bg-gray-100 dark:bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-black dark:group-hover:bg-white transition-colors duration-300">
                  <Icon className="w-6 h-6 text-gray-800 dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors duration-300" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-black dark:group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-[#1D1D1F] dark:text-white mb-2">{service.title}</h3>
              <p className="text-gray-400 dark:text-gray-500 text-sm italic mb-4">{service.tagline}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">{service.description}</p>
              <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-gray-100 dark:border-white/5">
                {service.deliverables.slice(0, 2).map((d, idx) => (
                  <span key={idx} className="text-xs bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 px-3 py-1 rounded-full">
                    {d.split(' ').slice(0, 3).join(' ')}...
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-16 text-center">
        <div className="bg-[#1D1D1F] dark:bg-[#2C2C2E] rounded-[2.5rem] p-10 md:p-14 text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Not sure where to start?</h3>
          <p className="text-gray-400 max-w-xl mx-auto leading-relaxed mb-8">
            Book a free 30-minute discovery call. I will listen to your challenges, map out the landscape, and tell you honestly whether AI is the right move for your situation.
          </p>
          <button
            onClick={onContactClick}
            className="bg-white text-black px-8 py-4 rounded-full font-semibold text-base hover:bg-gray-200 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Book a Discovery Call &rarr;
          </button>
        </div>
      </div>

      {selectedService && (
        <ServiceModal
          service={selectedService}
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          onContact={onContactClick}
        />
      )}
    </Container>
  );
};

export default Services;
