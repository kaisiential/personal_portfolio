import { Project, JournalEntry, LibraryItem, FeaturedJournalEntry } from './types';
import { Layers, BookOpen, Database, ShieldCheck } from 'lucide-react';

export const NAV_ITEMS = [
  { id: 'work', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'me', label: 'Me' },
  { id: 'library', label: 'Library' },
  { id: 'contact', label: 'Contact' },
];

export const CORE_FOCUS = [
  "Use Case Discovery",
  "Workflow Optimization",
  "Change Management",
  "AI Ethics & Policy",
  "Education & Training"
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    category: 'WORKFLOW',
    title: 'R&D Workflow Audit',
    description: 'Redesigned the information retrieval process for a boutique legal firm, introducing AI-assisted summarization tools that reduced manual review time by 40%.',
    tags: ['Operations', 'Strategy', 'Legal Tech'],
    icon: Layers,
    galleryImages: [
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000'
    ],
    content: `
      ### The Challenge
      A boutique legal firm specializing in IP law was facing a bottleneck in their research phase. Associates were spending 15+ hours per week manually reviewing patent filings and case law, leading to burnout and slower turnaround times for clients.

      ### The Intervention
      We conducted a comprehensive audit of their information retrieval workflow. Instead of a generic "AI implementation," we focused on specific leverage points:

      1. **Document Ingestion:** Implemented a secure, private RAG (Retrieval-Augmented Generation) pipeline that allowed associates to query their internal database of past cases using natural language.
      2. **Summarization Agents:** Deployed a custom-prompted LLM workflow to generate "executive summaries" of technical patent documents, highlighting claims relevant to specific infringement criteria.

      ### The Outcome
      - **40% Reduction** in manual review time.
      - **Zero Data Leakage:** Architecture ensured no client data was used for model training.
      - **Adoption:** 90% of associates integrated the tool into their daily workflow within 3 weeks.
    `
  },
  {
    id: '2',
    category: 'GOVERNANCE',
    title: 'Corporate AI Governance',
    description: 'Developed the internal usage policy and employee handbook for a mid-sized marketing agency adopting Generative AI tools.',
    tags: ['Policy', 'Ethics', 'Risk Mgmt'],
    icon: ShieldCheck,
    galleryImages: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1526304640152-9292fa4fb92c?auto=format&fit=crop&q=80&w=1000'
    ],
    content: `
      ### The Context
      A marketing agency wanted to embrace GenAI for content creation but feared copyright infringement, hallucination risks, and data privacy violations. They needed a framework that encouraged innovation while establishing guardrails.

      ### The Framework
      We developed a "Traffic Light" protocol for AI usage:

      *   **Green Light (Safe):** Ideation, internal drafts, structuring arguments, stylistic editing.
      *   **Yellow Light (Caution):** Public-facing copy (requires human fact-checking), image generation (requires copyright review).
      *   **Red Light (Prohibited):** Inputting client PII (Personally Identifiable Information), generating legal contracts, final factual assertions without verification.

      ### Deliverables
      1. **Employee Handbook Update:** A clear, non-technical guide to acceptable use.
      2. **Training Workshop:** A mandatory session demonstrating "Red Light" scenarios to immunize staff against common pitfalls.
      3. **Tool Vetting Process:** A checklist for IT to evaluate future AI tools for privacy compliance.
    `
  },
  {
    id: '3',
    category: 'DATA',
    title: 'Knowledge Graph Strategy',
    description: "Consulted on the taxonomy and structure for a disorganized internal wiki, preparing the organization's data for future RAG implementation.",
    tags: ['Information Arch', 'Data Strategy'],
    icon: Database,
    galleryImages: [
      'https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1000'
    ],
    content: `
      ### The Problem
      "Garbage in, Garbage out." An e-commerce company wanted a chatbot for their support team, but their internal documentation (Confluence) was a mess. Articles were duplicated, outdated, or contradictory. Feeding this into an LLM would only scale confusion.

      ### The Strategy
      Before touching a single model, we restructured the knowledge base.

      1. **Taxonomy Definition:** Created a strict hierarchy for "Source of Truth" documents vs. "Transient Updates."
      2. **Metadata Tagging:** Implemented a tagging system to indicate "validity periods" for policies (e.g., Return Policy 2023 vs 2024).
      3. **Graph Structuring:** Linked related entities (Product -> Troubleshooting Guide -> Return Policy) to enable multi-hop reasoning for future AI agents.

      ### Result
      The organization is now "AI Ready." A preliminary test showed that retrieval accuracy improved by 60% simply by cleaning the data structure, before any model fine-tuning.
    `
  },
  {
    id: '4',
    category: 'EDUCATION',
    title: 'AI Literacy Workshop',
    description: 'Designed and facilitated a 2-day seminar for executive leadership to demystify LLM capabilities and identify high-value pilot projects.',
    tags: ['Education', 'Leadership', 'Workshop'],
    icon: BookOpen,
    galleryImages: [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000'
    ],
    content: `
      ### The Gap
      The C-Suite knew AI was important but didn't understand *why* or *how* specifically. They were oscillating between "AI will solve everything" and "It's just a hype cycle."

      ### The Curriculum
      We designed a 2-day intensive workshop stripped of jargon.

      *   **Day 1: The Mental Model.** Understanding tokens, probability, and the difference between "knowing" and "predicting." Hands-on session with advanced prompting.
      *   **Day 2: Strategic Application.** A guided "Use Case Discovery" sprint. We mapped their current value chain and identified friction points where stochastic intelligence could add value.

      ### Feedback
      *"For the first time, I understand what this technology actually is, not just what the news says it is."* - CFO.

      The workshop resulted in 3 sanctioned pilot projects for Q1 2025 with clear KPIs and budget allocation.
    `
  }
];

export const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: '1',
    title: 'The Future of Context Windows',
    description: 'Analyzing how infinite context will shift prompt engineering towards information architecture.',
    date: '2024-10-15',
    tags: ['LLM', 'Architecture'],
  },
  {
    id: '2',
    title: 'Agentic Workflows in Enterprise',
    description: 'Moving beyond chatbots: How autonomous agents are reshaping legacy system integrations.',
    date: '2024-11-02',
    tags: ['Agents', 'Enterprise'],
  },
  {
    id: '3',
    title: 'Why I Left Everything Behind',
    description: 'On rebuilding from zero in a new country and finding clarity through discomfort.',
    date: '2025-01-20',
    tags: ['Growth', 'Story'],
  }
];

export const FEATURED_JOURNALS: FeaturedJournalEntry[] = [
  {
    id: 'fj1',
    title: 'Applying Systems Thinking to AI Deployment',
    subtitle: 'From Theory to Practice',
    excerpt: 'Why linear implementation strategies fail in non-deterministic systems, and how to use feedback loops instead.',
    date: 'Oct 24, 2024',
    readTime: '8 min read',
    tags: ['Systems', 'Strategy'],
    coverImage: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&q=80&w=1000',
    galleryImages: [
      'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000'
    ],
    content: `
      The integration of Artificial Intelligence into enterprise environments is not merely a technical upgrade; it is a fundamental shift in how organizations process information and make decisions. Unlike traditional software, which operates on deterministic logic—input A always leads to output B—AI systems are probabilistic. They introduce a degree of variability that traditional linear deployment strategies are ill-equipped to handle.

      ### The Feedback Loop

      In systems thinking, a feedback loop is a channel or pathway formed by an 'effect' returning to its 'cause,' and generating either more or less of the same effect. When deploying AI, we must design for two types of loops:

      1. **Reinforcing Loops (Positive Feedback):** These drive growth but can also lead to runaway errors if unchecked. For example, a model that learns from user interaction might become more biased if the user base is homogeneous.

      2. **Balancing Loops (Negative Feedback):** These provide stability. This is where human-in-the-loop (HITL) protocols are essential. By validating outputs, humans provide the corrective signal necessary to keep the system within acceptable parameters.

      ### Moving Beyond "Set and Forget"

      The traditional IT mindset is often "build, test, deploy, maintain." AI requires a shift to "train, align, deploy, monitor, retrain." It is a living system. A successful AI strategy therefore looks less like a construction project and more like gardening. It requires constant pruning (refining context), watering (data injection), and pest control (security and bias mitigation).

      By treating AI deployment as a complex adaptive system rather than a linear pipeline, organizations can build resilience against the inherent unpredictability of stochastic models.
    `
  },
  {
    id: 'fj2',
    title: 'Your Lowest Point Is Not Your Final Chapter',
    subtitle: 'A Letter to Anyone Feeling Stuck',
    excerpt: 'I hit rock bottom in 2025. Everything collapsed. And somehow, that breaking was the beginning of everything that matters now.',
    date: 'Jan 15, 2025',
    readTime: '6 min read',
    tags: ['Growth', 'Story'],
    coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1000',
    galleryImages: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1000'
    ],
    content: `
      I spent years drifting without direction. Smart enough to know I was capable of more, but never sure how to get started. Life kept knocking me down — bullying, emotional isolation, a broken family dynamic. But even through the hardest moments, I never gave in.

      ### The Breaking Point

      In 2025, everything collapsed. A failed attempt to start a new life abroad. A devastating heartbreak. Depression. A complete loss of direction. I went back home defeated, having accomplished nothing by my own measure, and wondering if it was all over.

      ### The Rebuild

      But I got back up. I left again. And this time, a single friendship changed everything. Through real-world problem-solving, curiosity was reignited. The drive came back — stronger than before. Now I am rebuilding: my skills, my life, my identity. And I am sharing every step of that journey with the people who need to hear it most.

      The core message is this: your lowest point is not your ending. It is your origin story. And if you are reading this feeling stuck, lost, or behind — I have been exactly where you are. And you CAN get through this.
    `
  }
];

export const LIBRARY_ITEMS: LibraryItem[] = [
  // BOOKS SECTION - FINISHED
  {
    id: 'b1',
    type: 'book',
    title: 'Thinking in Systems',
    subtitle: 'Donella Meadows',
    content: 'The essential primer on how systems work and how to intervene effectively. A core text for understanding leverage points.',
    status: 'Finished',
    rating: 5,
    colSpan: 2,
    image: 'https://m.media-amazon.com/images/I/71+QmpkC0aL._AC_UF1000,1000_QL80_.jpg',
    tags: ['Systems', 'Philosophy']
  },
  {
    id: 'b4',
    type: 'book',
    title: 'Zero to One',
    subtitle: 'Peter Thiel',
    content: 'Notes on startups, or how to build the future. Contrarian thinking on competition vs monopoly.',
    status: 'Finished',
    rating: 5,
    colSpan: 2,
    image: 'https://m.media-amazon.com/images/I/71uAI28kJuL._SL1500_.jpg',
    tags: ['Strategy', 'Business']
  },
  {
    id: 'b5',
    type: 'book',
    title: 'The Psychology of Money',
    subtitle: 'Morgan Housel',
    content: "Timeless lessons on wealth, greed, and happiness. It's not about what you know, it's about how you behave.",
    status: 'Finished',
    rating: 5,
    colSpan: 2,
    image: 'https://m.media-amazon.com/images/I/81gC3mdNi5L.jpg',
    tags: ['Finance', 'Psychology']
  },

  // BOOKS SECTION - READING
  {
    id: 'b2',
    type: 'book',
    title: 'Deep Work',
    subtitle: 'Cal Newport',
    content: 'Rules for focused success in a distracted world.',
    status: 'Reading',
    colSpan: 1,
    image: 'https://m.media-amazon.com/images/I/71wSsgrOIhL._AC_UF1000,1000_QL80_.jpg',
    tags: ['Productivity']
  },
  {
    id: 'b6',
    type: 'book',
    title: 'Human Compatible',
    subtitle: 'Stuart Russell',
    content: 'Artificial Intelligence and the Problem of Control.',
    status: 'Reading',
    colSpan: 1,
    image: 'https://m.media-amazon.com/images/I/71I8m1lPg6L.jpg',
    tags: ['AI', 'Safety']
  },
  {
    id: 'b3',
    type: 'quote',
    title: 'Mantra',
    content: '"What others perceived is uniquely theirs. Create yours."',
    subtitle: '— @kaisiential',
    colSpan: 3,
    color: 'bg-black text-white dark:bg-white dark:text-black'
  },

  // TOOLS SECTION
  {
    id: 't1',
    type: 'tool',
    title: 'Miro',
    subtitle: 'Systems Mapping',
    content: 'My go-to for visualizing complex systems, mapping architecture, and collaborative workshops.',
    status: 'Active',
    colSpan: 1,
    tags: ['Visual', 'Strategy']
  },
  {
    id: 't2',
    type: 'tool',
    title: 'NotebookLM',
    subtitle: 'Research Synthesis',
    content: 'Using Google NotebookLM to synthesize research papers and build structured knowledge bases.',
    status: 'Active',
    colSpan: 1,
    tags: ['Research', 'AI']
  },
  {
    id: 't3',
    type: 'tool',
    title: 'Google AI Studio',
    subtitle: 'Prompt Lab',
    content: 'Where I test, iterate, and refine prompt chains before deploying them in client workflows.',
    status: 'Active',
    colSpan: 1,
    tags: ['Prompting', 'Testing']
  }
];
