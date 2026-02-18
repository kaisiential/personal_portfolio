
import React, { useState, useEffect, useRef } from 'react';
import Container from './ui/Container';
import Badge from './ui/Badge';
import { JOURNAL_ENTRIES } from '../constants';
import { Briefcase, Dumbbell, Heart, Cpu, Rocket, BookOpen, ArrowUpRight, RotateCw, ShieldCheck, ShoppingBag, Layers, ChevronLeft, ChevronRight, X, Flame, Zap, Activity, PenTool, Gamepad2, Palmtree, Plus, Plane, MapPin, Sparkles, History } from 'lucide-react';

// --- HELPER FOR SPOTLIGHT EFFECT ---
const SpotlightCard: React.FC<{ children: React.ReactNode, className?: string, onClick?: (e: React.MouseEvent) => void }> = ({ children, className = "", onClick }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div 
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Ambient Animated Background (Subtle) */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-20 animate-gradient-slow pointer-events-none" />

      {/* Spotlight Gradient Overlay */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0,0,0,0.05), transparent 40%)`
        }}
      />
      {/* Dark Mode Spotlight */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-10 dark:block hidden"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.08), transparent 40%)`
        }}
      />
      
      {/* Content */}
      <div className="relative z-20 h-full">
        {children}
      </div>
    </div>
  );
};

// --- MOCK DATA FOR VENTURES ---
const VENTURES = [
  {
    id: 'v1',
    title: 'Kaisiential',
    subtitle: 'Systems Architecture',
    description: 'Scaling a boutique consultancy focused on AI Systems Architecture. Moving from solo-operator to a network of specialized agents and human experts.',
    tags: ['Agency', 'Consulting'],
    icon: Rocket,
    style: 'bg-black text-white dark:bg-white dark:text-black border-transparent' 
  },
  {
    id: 'v2',
    title: 'Tapir Protocol',
    subtitle: 'DeFi Infrastructure',
    description: 'A depeg protection marketplace that allows DeFi investors to secure high-yield positions without sacrificing their base yield.',
    tags: ['DeFi', 'Web3', 'Protocol'],
    icon: ShieldCheck,
    style: 'bg-indigo-900 text-white border-indigo-800'
  }
];

// --- MOCK DATA FOR BUILDING ---
const BUILDING_PROJECTS = [
  {
    id: 'b1',
    title: 'Tapir Protocol',
    description: 'Developing businesses in marketing, sales, operations, etc. Researching ecosystem integration, and architecturing the backbone for DeFi depeg protection use cases.',
    progress: 70,
    icon: ShieldCheck,
    color: 'bg-indigo-500',
    bg: 'bg-white dark:bg-[#1C1C1E]'
  },
  {
    id: 'b2',
    title: 'Kaisiential',
    description: 'Developing a personal brand for AI product solutions built to last. Creating practical prompting techniques and 0-to-100 tool usage guides.',
    progress: 75,
    icon: PenTool,
    color: 'bg-orange-500',
    bg: 'bg-white dark:bg-[#1C1C1E]'
  }
];

// --- MOCK DATA FOR FUNSIE ---
const FUNSIE_ACTIVITIES = [
  {
    id: 'fa1',
    title: 'Surfing',
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=800',
    subtitle: 'Catching waves'
  },
  {
    id: 'fa2',
    title: 'Hiking',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=800',
    subtitle: 'Nature trails'
  },
  {
    id: 'fa3',
    title: 'Badminton',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=800',
    subtitle: 'High intensity agility'
  },
  {
    id: 'fa4',
    title: 'Reading',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800',
    subtitle: 'Deep focus'
  }
];

const FUNSIE_GAMES = [
  {
    id: 'fg1',
    title: 'Uno',
    image: 'https://images.unsplash.com/photo-1595538742276-54d443f3b575?auto=format&fit=crop&q=80&w=800',
    subtitle: 'Friendship destroyer'
  },
  {
    id: 'fg2',
    title: 'Poker',
    image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&q=80&w=800',
    subtitle: 'Probability & Psychology'
  }
];

// --- MOCK DATA FOR TRAVEL LOGS ---
const TRAVEL_LOGS = [
  /*
  {
    id: 'tr1',
    country: 'Chiang Mai, Thailand',
    image: 'https://images.unsplash.com/photo-1598970591582-367236587418?auto=format&fit=crop&q=80&w=800',
    description: 'Ancient temples, digital nomad hubs, and the mist of Doi Suthep.',
    gallery: [
      'https://images.unsplash.com/photo-1598970591582-367236587418?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&q=80&w=1200'
    ],
    log: `
      Chiang Mai is where ancient Lanna culture meets the modern digital nomad revolution. It's my current base and a constant source of inspiration.
      
      From morning coffees in Nimman to evening street food at Chiang Mai Gate, the city offers a pace of life that allows for deep work and deep rest. The community here is vibrant, diverse, and incredibly welcoming.
      
      Weekends are for exploring the mountains. Doi Suthep at sunrise is a spiritual experience, and the winding roads of the Samoeng Loop are perfect for clearing the mind.
    `
  },
  {
    id: 'tr2',
    country: 'Melbourne, Australia',
    image: 'https://images.unsplash.com/photo-1514395462725-fb4566216a44?auto=format&fit=crop&q=80&w=800',
    description: 'Coffee culture capital, street art laneways, and four seasons in one day.',
    gallery: [
      'https://images.unsplash.com/photo-1514395462725-fb4566216a44?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1545044846-351ba102b6d5?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1470290449668-02dd93d9420a?auto=format&fit=crop&q=80&w=1200'
    ],
    log: `
      Melbourne isn't just a city; it's a vibe. It's arguably the coffee capital of the world, and as a caffeine enthusiast, it felt like a pilgrimage.
      
      Exploring the laneways like Hosier Lane, filled with ever-changing street art, was a highlight. The creative energy is palpable. The food scene is equally diverse, reflecting the multicultural fabric of the city.
      
      I spent a lot of time in Fitzroy and Collingwood, soaking in the hipster charm and vintage shops. The unpredictability of the weather taught me to always be prepared, a metaphor for life I suppose.
    `
  },
  {
    id: 'tr3',
    country: 'Perth, Australia',
    image: 'https://images.unsplash.com/photo-1598325046760-7080250394b9?auto=format&fit=crop&q=80&w=800', 
    description: 'Sun-drenched beaches, endless horizons, and the relaxed West Coast pace.',
    gallery: [
      'https://images.unsplash.com/photo-1598325046760-7080250394b9?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1580634165242-448298174a7d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1604932398747-79349509924d?auto=format&fit=crop&q=80&w=1200'
    ],
    log: `
      Perth is the antidote to the hustle. Isolated by geography but connected by sunshine, it feels like a permanent holiday.
      
      Cottesloe Beach at sunset is mandatory viewing. The colors of the Indian Ocean are unlike anywhere else. I took a day trip to Rottnest Island to cycle around and meet the quokkas – yes, they really do smile.
      
      It’s a city that prioritizes lifestyle. The balance between work and play feels naturally skewed towards play here, which was a refreshing change of pace.
    `
  },
  {
    id: 'tr4',
    country: 'Taiwan',
    image: 'https://images.unsplash.com/photo-1508248772752-316f608027c2?auto=format&fit=crop&q=80&w=800',
    description: 'Night markets, high-tech cities, and misty mountain retreats.',
    gallery: [
      'https://images.unsplash.com/photo-1508248772752-316f608027c2?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1535128863547-626945a76b83?auto=format&fit=crop&q=80&w=1200'
    ],
    log: `
      Taiwan captures your heart through your stomach. The night markets in Taipei (Shilin, Raohe) are legendary for a reason. Stinky tofu, bubble tea, pepper buns – it's a culinary marathon.
      
      Beyond the food, the efficiency of the High Speed Rail makes exploring the island a breeze. A trip to Jiufen offered a glimpse into the inspiration for 'Spirited Away', with its red lanterns and teahouses clinging to the hillside.
      
      The people are incredibly warm and helpful. It’s a place where tradition and modernity coexist seamlessly, from 101 Tower to Longshan Temple.
    `
  },
  {
    id: 'tr5',
    country: 'Vietnam',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800',
    description: 'Chaotic energy, limestone karsts, and the world’s best iced coffee.',
    gallery: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1504542982118-59308b40fe0c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1557750255-c76072a7bb6d?auto=format&fit=crop&q=80&w=1200'
    ],
    log: `
      Vietnam assaults the senses in the best way possible. The motorbike traffic in Ho Chi Minh City is a synchronized chaos that you eventually learn to navigate.
      
      Ha Long Bay is otherworldly. Drifting between thousands of limestone islands feels like entering a fantasy novel. But my favorite moments were simpler: sitting on a low plastic stool, sipping Ca Phe Sua Da, and watching the world go by.
      
      The resilience and optimism of the people are inspiring. The history is heavy, but the future feels bright and energetic.
    `
  },
  {
    id: 'tr6',
    country: 'Korea',
    image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&q=80&w=800',
    description: 'K-pop vibrancy, royal palaces, and a skincare obsession.',
    gallery: [
      'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1517154421773-0529f29ea389?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1583820153562-3b7c85050895?auto=format&fit=crop&q=80&w=1200'
    ],
    log: `
      Seoul is a city that never sleeps. From the neon lights of Myeongdong to the historic grandeur of Gyeongbokgung Palace, it's a city of layers.
      
      I spent time exploring the cafe culture in Hongdae and the traditional hanok village in Bukchon. The attention to aesthetic detail in Korea is unmatched—everything is designed to be beautiful.
      
      And the food... Korean BBQ, Kimchi stew, endless banchan. It’s communal, spicy, and soulful. It was a trip that fueled both my creativity and my appetite.
    `
    
  }*/
];


// --- MOCK DATA FOR PAST PROJECTS ---
const PAST_PROJECTS = [
  {
    id: 'pp1',
    title: 'Co-Founder, COO',
    role: 'Co-Founder, COO',
    company: 'Fortune Goodis',
    client: 'Door-to-Door Business',
    date: '2014 - 2015',
    image: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&q=80&w=1200',
    summary: 'My first lesson in bravery and business. Started a door-to-door snack business because I was too young for a job, learning sales, team management, and responsibility.',
    content: `
      ### How It Started
      I was too young to get a job or open a bank account, but I really wanted to earn my own money. My brother, who is 10 years older than me, saw this and decided to help. He taught me that I didn't need a normal job to start earning, I could build something myself. With his guidance, we started a business selling snacks door-to-door.

      ### Looking Back
      This was my first real lesson in being brave. Going from a kid who couldn't work to someone who could talk to total strangers was a huge change. It taught me how to communicate and gave me confidence that I still use today.

      ### What I Did
      *   **Leading the Team**: I took what I learned and taught it to others. I hired new people (mostly other teenagers) and showed them how to sell. I walked side-by-side with them, listened to them talk to customers, and helped them get better.
      *   **Running the Show**: While my brother helped start it, I got my hands dirty running it. I managed the money, counted the profits, and worked with my brother to find suppliers for our snacks.
      *   **Learning by Doing**: It wasn't just about selling chips or candy; it was about learning how to be a leader and how to handle responsibility at a young age.
    `
  },
  {
    id: 'pp2',
    title: 'Project Team Lead',
    role: 'Project Team Lead',
    company: 'CITI-YMCA "Youth for Causes" 2018',
    client: 'Fundraising x Awareness',
    date: '2017 - 2018',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=1200',
    summary: 'Led a fundraising project like a real business. 30 hours of training, working 7 days a week, learning mental toughness and the balance between work and passion.',
    content: `
      ### How It Started
      With the help of my teacher and mentor, I got the chance to join a special program with the YMCA and NUS Business School. It wasn't just about volunteering; it was about learning how to run a project like a real business. I went through 30 hours of training to learn how to serve the community better.

      ### Looking Back
      This was a time when I really tested my limits. During the week, I was busy working at my internship. On the weekends, I was fully focused on this project. I was working seven days a week! It was exhausting, but it was also really fun. It taught me that I have a lot of mental toughness. I also learned that I’m a bit of a workaholic and a perfectionist—I just really care about getting things right.

      ### What I Did
      *   **Learning the Ropes**: I combined classroom learning with real-world action. I took what I learned in the training program and used it to lead my team effectively.
      *   **Leading the Charge**: I worked closely with my team, outside sellers (vendors), and the community to raise money and awareness for a good cause.
      *   **Finding Balance**: Even though I was tired from my weekday job, I showed up every weekend ready to lead. I learned how to push through tiredness to reach a goal I believed in.
    `
  },
  {
    id: 'pp3',
    title: 'Intern',
    role: 'Intern',
    company: 'CTC Global',
    client: 'IT Support',
    date: '2018',
    image: 'https://images.unsplash.com/photo-1551721434-8b94ddff0e6d?auto=format&fit=crop&q=80&w=1200',
    summary: 'Navigated a major cyberattack crisis at Singapore General Hospital. Learned to think fast under pressure and that IT support is really about people.',
    content: `
      ### How It Started
      I went into this internship to learn about technology, but I ended up learning even more about people. I realized that IT support isn't just about fixing broken computers; it's about listening to the person using the computer. I learned how to understand their problems and give them helpful tips so they could get back to work.

      ### Looking Back
      This experience became unforgettable because of one huge event: the Singapore General Hospital cyberattack. It was a scary situation, but looking back, I was lucky to be there. It forced me to grow up fast. It wasn't just a normal day at the office anymore; it was an emergency, and I had to step up.

      ### What I Did
      *   **Handling a Crisis**: When the hack happened, we had to clean and replace thousands of computers immediately. We were racing against the clock.
      *   **Thinking Fast**: It was chaotic, but I learned how to think clearly under pressure. I had to figure out what was most important and solve problems quickly so the hospital staff could keep doing their jobs.
      *   **Helping People**: I learned that being good at tech is important, but being able to explain things simply and help people when they are stressed is even more important.
    `
  },
  {
    id: 'pp4',
    title: 'Intern',
    role: 'Intern',
    company: 'KPMG',
    client: 'IT Security Specialist',
    date: '2021',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200',
    summary: 'Experienced the discipline of corporate security at a global level. Learned that preventing problems through strict rules is as vital as fixing them.',
    content: `
      ### How It Started
      I joined KPMG to see how the "big leagues" handle security. After my past experiences where things were sometimes chaotic or fast-paced, I wanted to see how a massive global company keeps their systems safe and organized.

      ### Looking Back
      This experience was all about discipline. It wasn't about running around fixing sudden problems; it was about preventing them before they happened. It taught me that following a strict plan is just as important as having technical skills.

      ### What I Did
      *   **Checking the Locks**: I helped the team look for weak spots in the system. My job was to help find risks before they became real problems.
      *   **Following the Rules**: I learned how to handle security incidents the "right" way. In a big company, you have to follow very strict rules to make sure everything is done perfectly.
      *   **Professional Growth**: It gave me a peek into the corporate world and showed me how important it is to be detailed and organized when protecting important data.
    `
  },
  {
    id: 'pp5',
    title: 'Contract',
    role: 'Contract',
    company: 'teamWork APAC',
    client: 'AI Consultant',
    date: '2024',
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=1200',
    summary: 'Helped build the digital backbone for companies using AI. Learned the importance of compliance and how technology solves boring business problems.',
    content: `
      ### How It Started
      I honestly felt lucky to stumble upon this job. I realized that if I wanted to be great at business, I needed to understand the "serious" stuff—like accounting and corporate laws. It’s a huge industry that keeps everything running, and I wanted to see how it worked from the inside.

      ### Looking Back
      This role was a huge breakthrough for me. I learned more here than I expected. I wasn't just working on tech; I was helping to build the "digital backbone" for companies. I saw firsthand how important it is for a business to follow the rules (compliance) and how technology can make that easy instead of a headache.

      ### What I Did
      *   **Using AI for Good**: I helped companies use AI to handle their boring, repetitive paperwork. This let them focus on growing their business instead of getting stuck in forms.
      *   **Building the Backbone**: I guided businesses on how to use special software (like TWCSS and PMS) to keep their records straight and avoid mistakes with the government.
      *   **Helping Small/Medium-Sized Businesses**: I worked with smaller companies (SMEs) to help them go digital. I showed them how to use modern tools to work faster and smarter.
    `
  }
];

// --- VENTURE STACK COMPONENT ---
const VentureStack: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleFlip = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % VENTURES.length);
  };

  return (
    <div 
      className="w-full h-full relative group perspective-1000 cursor-pointer"
      onClick={(e) => handleFlip(e)}
    >
      <div className="w-full h-full relative">
        {VENTURES.map((venture, index) => {
           const position = (index - activeIndex + VENTURES.length) % VENTURES.length;
           
           // Only render top 3 cards for stack effect
           if (position > 2) return null;

           const Icon = venture.icon;
           
           let style: React.CSSProperties = { transformOrigin: 'top center' };
           let opacity = 1;
           
           if (position === 0) {
             style = { ...style, zIndex: 30, transform: 'scale(1) translateY(0)' };
             opacity = 1;
           } else if (position === 1) {
             style = { ...style, zIndex: 20, transform: 'scale(0.96) translateY(12px)' };
             opacity = 0.6; // Fade out background cards
           } else if (position === 2) {
             style = { ...style, zIndex: 10, transform: 'scale(0.92) translateY(24px)' };
             opacity = 0.3;
           }

           return (
             <div 
                key={venture.id}
                className={`absolute inset-0 rounded-[2rem] p-8 flex flex-col justify-between shadow-lg transition-all duration-500 ease-in-out border ${venture.style}`}
                style={{...style, opacity: position === 0 ? 1 : opacity }}
             >
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                     <Icon className="w-6 h-6" />
                  </div>
                  
                  {/* Only show Flip button on top card */}
                  {position === 0 && (
                    <button 
                      onClick={handleFlip}
                      className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md transition-colors"
                    >
                      <RotateCw size={12} /> Flip
                    </button>
                  )}
                </div>

                {/* Content */}
                <div className="mt-4">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold mb-1">{venture.title}</h3>
                    <p className="text-sm opacity-70 font-medium uppercase tracking-wider">{venture.subtitle}</p>
                  </div>
                  <p className="text-lg leading-relaxed opacity-90 line-clamp-3 mb-6">
                    {venture.description}
                  </p>
                </div>

                {/* Footer/Tags */}
                <div className="pt-2 pb-6">
                   <div className="flex flex-wrap gap-2">
                      {venture.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full border border-white/20 bg-white/5 text-xs font-medium backdrop-blur-sm">
                          {tag}
                        </span>
                      ))}
                   </div>
                </div>
             </div>
           );
        })}
      </div>
      
      {/* Helper text inside the box - z-index higher than cards */}
      <div className="absolute bottom-4 left-0 right-0 text-center z-40 pointer-events-none">
         <p className="text-xs text-white/50 dark:text-black/50 animate-pulse">Tap to view next venture</p>
      </div>
    </div>
  );
};

// --- BUILDING STACK COMPONENT ---
const BuildingStack: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const project = BUILDING_PROJECTS[activeIndex];
  const Icon = project.icon;

  const handleFlip = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % BUILDING_PROJECTS.length);
  };

  return (
    <div 
      className="w-full h-full relative group cursor-pointer"
      onClick={(e) => handleFlip(e)}
    >
       {/* Single Card Container */}
       <div className={`absolute inset-0 rounded-[2rem] p-8 flex flex-col overflow-hidden border border-gray-100 dark:border-white/5 shadow-lg transition-all duration-500 ease-in-out ${project.bg}`}>
           
           {/* Decorator */}
           <div key={`decorator-${project.id}`} className={`absolute top-0 right-0 w-32 h-32 rounded-bl-[4rem] -mr-4 -mt-4 opacity-10 transition-colors duration-500 ${project.color.replace('bg-', 'bg-')}`}></div>
           
           <div className="relative z-10 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                 <div className="w-10 h-10 bg-white dark:bg-black/50 rounded-xl flex items-center justify-center shadow-sm transition-all duration-500">
                    <Icon key={`icon-${project.id}`} className={`w-5 h-5 ${project.color.replace('bg-', 'text-')}`} />
                 </div>
                 <button 
                    onClick={handleFlip}
                    className="flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-full bg-white dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 transition-colors text-gray-500 dark:text-gray-400"
                  >
                    <RotateCw size={10} /> Flip
                  </button>
              </div>
              
              <div key={project.id} className="animate-in fade-in slide-in-from-bottom-2 duration-300 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Building</h3>
                  <p className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3">{project.title}</p>
                  
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-grow overflow-hidden line-clamp-4">
                    {project.description}
                  </p>
                  
                  <div className="mt-auto">
                     <div className="w-full bg-gray-200 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className={`${project.color} h-full rounded-full transition-all duration-1000 ease-out`} style={{ width: `${project.progress}%` }}></div>
                     </div>
                     <div className="flex justify-between mt-2 text-xs text-gray-400 font-mono">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                     </div>
                  </div>
              </div>
           </div>
       </div>
    </div>
  );
}

// --- FUNSIE STACK COMPONENT ---
const FunsieStack: React.FC<{ title: string, icon: React.ElementType, items: { id: string, title: string, image: string, subtitle: string }[] }> = ({ title, icon: Icon, items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleFlip = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <div 
      className="relative group perspective-1000 cursor-pointer w-full h-full"
      onClick={(e) => handleFlip(e)}
    >
      <div className="w-full h-full relative">
        {items.map((item, index) => {
           const position = (index - activeIndex + items.length) % items.length;
           
           if (position > 2) return null;

           let style: React.CSSProperties = { transformOrigin: 'bottom center' };
           
           if (position === 0) {
             style = { ...style, zIndex: 30, transform: 'scale(1) translateY(0)' };
           } else if (position === 1) {
             style = { ...style, zIndex: 20, transform: 'scale(0.95) translateY(10px)' };
           } else {
             style = { ...style, zIndex: 10, transform: 'scale(0.90) translateY(20px)' };
           }

           return (
             <div 
                key={item.id}
                className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-lg transition-all duration-500 ease-in-out bg-gray-200 dark:bg-[#1C1C1E]"
                style={{...style, opacity: position === 0 ? 1 : 0 }}
             >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10"></div>

                <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
                   <div className="flex items-center gap-2 text-white/90 backdrop-blur-sm bg-black/20 px-3 py-1.5 rounded-full">
                      <Icon size={14} />
                      <span className="text-xs font-bold uppercase tracking-wide">{title}</span>
                   </div>
                   
                   {/* Removed Flip button as requested */}
                </div>

                <div key={item.id} className="absolute bottom-8 left-8 right-8 z-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
                   <h3 className="text-3xl font-bold text-white mb-1">{item.title}</h3>
                   <p className="text-white/80 text-sm font-medium">{item.subtitle}</p>
                </div>
             </div>
           );
        })}
      </div>
      
      <div className="absolute bottom-3 left-0 right-0 text-center z-40 pointer-events-none">
         <p className="text-[10px] text-white/50 uppercase tracking-widest animate-pulse font-semibold">Tap to view next</p>
      </div>
    </div>
  );
};

// --- FUNSIE CARD ---
const FunsieCard: React.FC<{ title: string, image: string, activities: string[], icon: React.ElementType }> = ({ title, image, activities, icon: Icon }) => {
  return (
    <div className="relative h-[300px] rounded-[2rem] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
      
      <div className="absolute inset-0 p-8 flex flex-col justify-between">
         <div className="self-end p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
           <Icon size={20} />
         </div>
         
         <div>
           <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
           <div className="flex flex-wrap gap-2">
             {activities.map(act => (
               <span key={act} className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-medium text-white border border-white/10">
                 {act}
               </span>
             ))}
           </div>
         </div>
      </div>
    </div>
  );
}

// --- TRAVEL COMPONENTS ---
const TravelModal: React.FC<{ log: typeof TRAVEL_LOGS[0], isOpen: boolean, onClose: () => void }> = ({ log, isOpen, onClose }) => {
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

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % log.gallery.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + log.gallery.length) % log.gallery.length);

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity" onClick={onClose}></div>
      
      <div className="relative w-full max-w-4xl max-h-[80vh] bg-white dark:bg-[#1C1C1E] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-white/5">
         <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors">
            <X size={20} />
         </button>

         <div className="overflow-y-auto no-scrollbar h-full">
            {/* Gallery */}
            <div className="relative w-full aspect-video md:aspect-[21/9] bg-black">
               <img src={log.gallery[currentImageIndex]} alt={log.country} className="w-full h-full object-cover" />
               
               {log.gallery.length > 1 && (
                 <>
                   <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-sm">
                     <ChevronLeft size={24} />
                   </button>
                   <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-sm">
                     <ChevronRight size={24} />
                   </button>
                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {log.gallery.map((_, idx) => (
                        <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-3' : 'bg-white/50'}`} />
                      ))}
                   </div>
                 </>
               )}
               
               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                 <h2 className="text-4xl font-bold text-white">{log.country}</h2>
               </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
               <p className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-8 leading-relaxed border-l-4 border-blue-500 pl-6">
                 {log.description}
               </p>
               <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 whitespace-pre-line">
                 {log.log}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

const TravelCarousel: React.FC = () => {
  const [selectedLog, setSelectedLog] = useState<typeof TRAVEL_LOGS[0] | null>(null);
  const extendedLogs = [...TRAVEL_LOGS, ...TRAVEL_LOGS];

  return (
    <>
    <div className="relative group overflow-hidden w-full">
       {/* Gradient Masks for Fade Effect */}
       <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F5F5F7] dark:from-black to-transparent pointer-events-none z-10"></div>
       <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#F5F5F7] dark:from-black to-transparent pointer-events-none z-10"></div>

       <div className="flex gap-6 animate-scroll-travel hover:pause-animation px-4">
          {extendedLogs.map((log, idx) => (
            <div 
              key={`${log.id}-${idx}`} 
              onClick={() => setSelectedLog(log)}
              className="flex-shrink-0 w-[280px] md:w-[320px] aspect-[3/4] rounded-[2rem] overflow-hidden relative cursor-pointer group/card shadow-md transition-all duration-300"
            >
               <img 
                 src={log.image} 
                 alt={log.country} 
                 className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
               
               <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-2 text-white/70 text-xs font-bold uppercase tracking-wider mb-2">
                     <MapPin size={12} /> Travel Log
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">{log.country}</h3>
                  <p className="text-sm text-white/80 line-clamp-2 leading-relaxed">
                    {log.description}
                  </p>
               </div>
            </div>
          ))}
       </div>
       
       <style>{`
         @keyframes scroll-travel {
           from { transform: translateX(0); }
           to { transform: translateX(-50%); } /* Move half width since list is doubled */
         }
         .animate-scroll-travel {
           animation: scroll-travel 40s linear infinite;
           width: max-content;
         }
         .hover\\:pause-animation:hover {
           animation-play-state: paused;
         }
       `}</style>
    </div>

    {selectedLog && (
      <TravelModal 
        log={selectedLog} 
        isOpen={!!selectedLog} 
        onClose={() => setSelectedLog(null)} 
      />
    )}
    </>
  );
}

// --- PAST PROJECT SHOWCASE (NEW) ---
const PastProjectShowcase: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentProject = PAST_PROJECTS[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % PAST_PROJECTS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + PAST_PROJECTS.length) % PAST_PROJECTS.length);
  };

  return (
    <>
      <div className="bg-white dark:bg-[#1C1C1E] rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 dark:border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* LEFT: Large Display Area */}
          <div className="aspect-square rounded-[2rem] overflow-hidden relative shadow-lg group">
             {/* Apply SpotlightCard here if needed, or just styling */}
             <SpotlightCard className="w-full h-full">
               <img 
                 key={currentProject.id}
                 src={currentProject.image} 
                 alt={currentProject.title} 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 animate-in fade-in zoom-in-105 duration-500"
               />
               
               {/* ROLE BADGE */}
               <div className="absolute top-8 left-8 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md text-white/90 text-xs font-medium border border-white/10 z-10">
                  <Briefcase size={14} />
                  <span className="uppercase tracking-wider">{currentProject.role}</span>
               </div>

               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
               <div className="absolute bottom-8 left-8 right-8 text-white">
                  <div className="text-xs font-bold uppercase tracking-widest mb-2 opacity-80">{currentProject.date}</div>
                  <h3 className="text-3xl font-bold mb-2">{currentProject.title}</h3>
                  <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium opacity-75 uppercase tracking-wider">{currentProject.company}</p>
                      <p className="text-2xl font-bold">{currentProject.client}</p>
                  </div>
               </div>
             </SpotlightCard>
          </div>

          {/* RIGHT: Navigation & Details */}
          <div className="flex flex-col h-full">
             
             {/* Top: Thumbnail Carousel */}
             <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Archive Gallery</h4>
                <div className="flex gap-2">
                  <button onClick={handlePrev} className="p-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors">
                    <ChevronLeft size={16} className="text-black dark:text-white" />
                  </button>
                  <button onClick={handleNext} className="p-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors">
                    <ChevronRight size={16} className="text-black dark:text-white" />
                  </button>
                </div>
             </div>

             <div className="flex gap-4 mb-8 overflow-x-auto pb-2 hide-scrollbar">
                {PAST_PROJECTS.map((project, idx) => (
                  <div 
                    key={project.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${idx === activeIndex ? 'ring-2 ring-black dark:ring-white scale-105' : 'opacity-50 hover:opacity-100'}`}
                  >
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                ))}
             </div>

             {/* Bottom: Description Box */}
             <SpotlightCard className="flex-grow bg-gray-50 dark:bg-white/5 rounded-[2rem] p-8 flex flex-col">
                <div className="mb-6">
                   <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{currentProject.role}</h4>
                   <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                     {currentProject.summary}
                   </p>
                </div>
                
                <div className="mt-auto w-full flex justify-between items-center py-4 bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-xl px-6 group cursor-pointer hover:bg-gray-50 dark:hover:bg-white/10 transition-colors" onClick={() => setIsModalOpen(true)}>
                  <span className="font-medium text-sm text-gray-900 dark:text-white">Read Retrospective</span> 
                  <ArrowUpRight size={16} className="text-gray-900 dark:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
             </SpotlightCard>

          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="relative w-full max-w-3xl max-h-[85vh] bg-white dark:bg-[#1C1C1E] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
             <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 z-20 p-2 bg-white/10 hover:bg-black/10 dark:hover:bg-white/10 rounded-full text-black dark:text-white transition-colors">
                <X size={24} />
             </button>

             <div className="overflow-y-auto no-scrollbar">
                <div className="relative h-64 md:h-80">
                  <img src={currentProject.image} alt={currentProject.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8 md:p-12">
                     <span className="text-white/80 font-mono text-sm mb-2">{currentProject.date}</span>
                     <h2 className="text-3xl md:text-4xl font-bold text-white">{currentProject.title}</h2>
                     <p className="text-xl text-white/90">{currentProject.company}</p>
                  </div>
                </div>
                
                <div className="p-8 md:p-12 prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 whitespace-pre-line">
                   {currentProject.content}
                </div>
             </div>
          </div>
        </div>
      )}
    </>
  );
};

// --- TRAINING DATA & COMPONENTS ---
const TRAINING_DATA = {
  cardio: [
    {
      title: "Zone 2 Base Building",
      description: "The foundation of metabolic health. 45-60 mins of steady state running keeping heart rate between 135-145 bpm.",
      stat: "3x / Week",
      icon: Heart,
      image: "https://images.unsplash.com/photo-1502904550040-7534597429ae?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "VO2 Max Intervals",
      description: "Norwegian 4x4 protocol. 4 minutes at 90-95% max heart rate, followed by 3 minutes active recovery. Increases mitochondrial density.",
      stat: "1x / Week",
      icon: Flame,
      image: "https://images.unsplash.com/photo-1533560906234-a4fc169e58dd?auto=format&fit=crop&q=80&w=1000"
    }
  ],
  strength: [
    {
      title: "Compound Power",
      description: "Focusing on the big 3: Squat, Deadlift, Bench Press. Low reps (3-5), high weight to build maximal strength and CNS adaptation.",
      stat: "Heavy Lifts",
      icon: Dumbbell,
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Functional Mobility",
      description: "Kettlebell flows and weighted calisthenics to ensure strength translates to real-world movement patterns and longevity.",
      stat: "Mobility",
      icon: Activity,
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1000"
    }
  ]
};

const TrainingCarousel: React.FC<{ category: string, data: typeof TRAINING_DATA['cardio'] }> = ({ category, data }) => {
  const [index, setIndex] = useState(0);

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % data.length);
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  const current = data[index];
  const Icon = current.icon;

  return (
    <div className="bg-white dark:bg-[#1C1C1E] rounded-[2rem] border border-gray-100 dark:border-white/5 overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
      <div className="px-6 py-4 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
        <h3 className="font-bold text-lg text-[#1D1D1F] dark:text-white uppercase tracking-wide">{category}</h3>
        <div className="flex gap-2">
          <button onClick={prev} className="p-1.5 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors">
             <ChevronLeft size={16} className="text-black dark:text-white" />
          </button>
          <button onClick={next} className="p-1.5 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors">
             <ChevronRight size={16} className="text-black dark:text-white" />
          </button>
        </div>
      </div>

      <div className="relative w-full h-48 bg-gray-200 dark:bg-black/50">
         <img 
            src={current.image} 
            alt={current.title} 
            className="w-full h-full object-cover transition-opacity duration-300"
         />
         <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold">
            {current.stat}
         </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
         <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gray-100 dark:bg-white/10 rounded-lg text-black dark:text-white">
               <Icon size={20} />
            </div>
            <h4 className="text-xl font-bold text-[#1D1D1F] dark:text-white leading-tight">{current.title}</h4>
         </div>
         <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            {current.description}
         </p>
         
         <div className="mt-auto pt-6 flex justify-center gap-1.5">
            {data.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-1.5 h-1.5 rounded-full transition-all ${idx === index ? 'bg-black dark:bg-white w-3' : 'bg-gray-300 dark:bg-white/20'}`} 
              />
            ))}
         </div>
      </div>
    </div>
  );
};

const TrainingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
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
      
      <div className="relative w-full max-w-5xl max-h-[85vh] bg-[#F5F5F7] dark:bg-black rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 border border-gray-200 dark:border-white/5">
         <div className="absolute top-6 right-6 z-20">
            <button 
              onClick={onClose}
              className="p-2 bg-white dark:bg-[#1C1C1E] rounded-full shadow-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
         </div>

         <div className="p-8 md:p-10 overflow-y-auto no-scrollbar">
            <div className="text-center mb-10">
               <h2 className="text-3xl font-bold text-[#1D1D1F] dark:text-white mb-3">Training Protocol</h2>
               <p className="text-gray-500 dark:text-gray-400">A look into the engine building and structural integrity work.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <TrainingCarousel category="Cardio Engine" data={TRAINING_DATA.cardio} />
               <TrainingCarousel category="Strength & Structure" data={TRAINING_DATA.strength} />
            </div>
         </div>
      </div>
    </div>
  );
};

const Journal: React.FC = () => {
  const [isTrainingModalOpen, setIsTrainingModalOpen] = useState(false);

  return (
    <Container id="journal">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <h2 className="text-3xl font-bold text-[#1D1D1F] dark:text-white">Me</h2>
        <p className="text-gray-400 max-w-sm text-sm md:text-right">
          My "now" page inspired by Derek Sivers. A living snapshot of what I'm building, learning, and optimizing right now. 
        </p>
      </div>

      {/* "NOW" BENTO GRID SECTION */}
      <section className="mb-24">
        <div className="flex items-center gap-2 mb-6 text-gray-400 text-sm font-medium uppercase tracking-widest">
           <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
           <span>What am I DOING "Now"</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">
          
          {/* 1. Business / Venture (Stack) */}
          <SpotlightCard className="md:col-span-2 lg:col-span-2 row-span-2 rounded-[2rem]">
             <VentureStack />
          </SpotlightCard>

          {/* 2. Tech / Building (Stack) */}
          <SpotlightCard className="md:col-span-1 lg:col-span-1 row-span-2 rounded-[2rem]">
             <BuildingStack />
          </SpotlightCard>

          {/* 3. Work (Standard) */}
          <SpotlightCard className="md:col-span-1 lg:col-span-1 bg-white dark:bg-[#1C1C1E] rounded-[2rem] p-8 border border-gray-100 dark:border-white/5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
             <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/20 rounded-xl flex items-center justify-center text-amber-600 dark:text-amber-400">
                   <Briefcase className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 px-2 py-1 rounded-md">ACTIVE</span>
             </div>
             <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Consulting</h3>
             <p className="text-sm text-gray-500 dark:text-gray-400">
               Building AI transformation strategy for businesses.
             </p>
          </SpotlightCard>

          {/* 4. Health (Standard) */}
          <SpotlightCard className="md:col-span-1 lg:col-span-1 bg-white dark:bg-[#1C1C1E] rounded-[2rem] p-8 border border-gray-100 dark:border-white/5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
             <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex items-center justify-center text-rose-600 dark:text-rose-400">
                   <Heart className="w-5 h-5" />
                </div>
             </div>
             <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Biohacking</h3>
             <p className="text-sm text-gray-500 dark:text-gray-400">
               Optimizing sleep efficiency (Oura {'>'} 85) &amp; glucose stability.
             </p>
          </SpotlightCard>

          {/* 5. Fitness (Wide) */}
          <SpotlightCard 
             onClick={() => setIsTrainingModalOpen(true)}
             className="md:col-span-2 lg:col-span-2 relative w-full h-[180px] bg-white dark:bg-[#1C1C1E] rounded-[2rem] p-8 border border-gray-100 dark:border-white/5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
          >
             <div className="h-full flex flex-col md:flex-row items-center justify-center gap-8">
               <div className="flex-shrink-0">
                 <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center border-4 border-white dark:border-[#1C1C1E] shadow-sm">
                     <Dumbbell className="w-8 h-8 text-gray-800 dark:text-white" />
                 </div>
               </div>
               <div className="flex-1 text-center md:text-left">
                   <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Training Regime</h3>
                   <div className="flex flex-wrap justify-center md:justify-start gap-2">
                     <span className="px-3 py-1 bg-gray-100 dark:bg-white/10 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300">Hybrid Athlete</span>
                     <span className="px-3 py-1 bg-gray-100 dark:bg-white/10 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300">Zone 2 x3/wk</span>
                     <span className="px-3 py-1 bg-gray-100 dark:bg-white/10 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300">Heavy Lifts x3/wk</span>
                   </div>
               </div>
             </div>

             {/* Helper text INSIDE the card */}
             <p className="absolute bottom--1 left-0 right-0 text-center text-xs text-gray-400 animate-pulse pointer-events-none">
               Tap to view training regime
             </p>
          </SpotlightCard>

          {/* 6. Learning (Standard) */}
          <SpotlightCard className="md:col-span-1 lg:col-span-2 bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/30 dark:to-[#1C1C1E] rounded-[2rem] p-8 border border-indigo-100 dark:border-white/5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
             <div className="relative z-10">
               <div className="flex items-center gap-3 mb-4">
                 <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                 <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">Deep Dive</span>
               </div>
               <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Studying: Multi-Agent Orchestration</h3>
               <p className="text-sm text-gray-500 dark:text-gray-400"> Exploring LangGraph & AutoGen patterns.</p>
             </div>
             <ArrowUpRight className="absolute top-8 right-8 w-5 h-5 text-indigo-300 dark:text-white/20" />
          </SpotlightCard>

        </div>
      </section>

      {/* FUNSIE SECTION */}
      <section className="mb-24">
        <SpotlightCard className="bg-white dark:bg-[#1C1C1E] rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 dark:border-white/5">
          
          <div className="flex items-center gap-2 mb-8 text-gray-400 text-sm font-medium uppercase tracking-widest">
             <Gamepad2 size={16} />
             <span>Funsie & Recharge</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            
            {/* LEFT: TEXT CONTENT */}
            <div className="lg:col-span-2 flex flex-col justify-center space-y-8">
               <div>
                 <h3 className="text-3xl font-bold text-[#1D1D1F] dark:text-white mb-4">Current Favorites</h3>
                 <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                   When I'm not architecting systems or training, I'm usually recharging with a mix of competitive play and nature immersion.
                 </p>
                 
                 <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-yellow-500" />
                        <h4 className="font-semibold text-gray-900 dark:text-white">Activity of Choice</h4>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 pl-6">
                        Badminton. The speed and agility keep my reflexes sharp.
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-purple-500" />
                        <h4 className="font-semibold text-gray-900 dark:text-white">Game of Choice</h4>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 pl-6">
                        Uno. It's simple, chaotic, and perfect for social downtime.
                      </p>
                    </div>
                 </div>
               </div>
            </div>

            {/* RIGHT: BENTO BOXES (Stacked/Grid) */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4 h-full">
               {/* 1. Activities Stack */}
               <div className="h-96 sm:h-96">
                  <FunsieStack 
                      title="Activities" 
                      icon={Palmtree} 
                      items={FUNSIE_ACTIVITIES} 
                  />
               </div>

               {/* 2. Games Stack */}
               <div className="h-96 sm:h-96">
                  <FunsieStack 
                      title="Games" 
                      icon={Gamepad2} 
                      items={FUNSIE_GAMES} 
                  />
               </div>

               {/* 3. Placeholder */}
               <SpotlightCard className="h-96 sm:h-96 aspect-[3/4] w-full rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-white/10 flex flex-col items-center justify-center text-center p-8 group hover:border-gray-300 dark:hover:border-white/20 transition-colors">
                   <div className="w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Plus size={24} className="text-gray-400 dark:text-gray-600" />
                   </div>
                   <p className="text-sm font-medium text-gray-400 dark:text-gray-600">Coming Soon</p>
                   <p className="text-xs text-gray-400/70 dark:text-gray-600/70 mt-1">Exploring new hobbies</p>
               </SpotlightCard>
            </div>

          </div>
        </SpotlightCard>
      </section>
      {/* TRAVEL LOGS SECTION (NEW) */}
      {/*
      <section className="mb-24">
        <div className="flex items-center gap-2 mb-6 text-gray-400 text-sm font-medium uppercase tracking-widest">
           <Plane size={16} />
           <span>Travel Logs</span>
        </div>

        <TravelCarousel />
      </section>    
      */}
      {/* WHAT I DID (PAST PROJECTS) SECTION */}
      {/*
      <section className="mb-24">
        <div className="flex items-center gap-2 mb-6 text-gray-400 text-sm font-medium uppercase tracking-widest">
           <History size={16} />
           <span>What I Did (In the Past)</span>
        </div>

        <PastProjectShowcase />
      </section>
      */}
      {/* ARCHIVE SECTION */}
      {/*
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-t border-gray-200 dark:border-white/10 pt-12">
        <h2 className="text-2xl font-bold text-[#1D1D1F] dark:text-white">Thinking Archive</h2>
      </div>

      <div className="space-y-4">
        {JOURNAL_ENTRIES.map((entry) => (
          <SpotlightCard 
            key={entry.id} 
            className="group bg-white dark:bg-[#1C1C1E] rounded-[2rem] p-8 border border-gray-100 dark:border-white/5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            <div className="flex flex-col md:flex-row md:justify-between gap-6">
              <div className="space-y-3 flex-1">
                <h3 className="text-xl font-bold text-[#1D1D1F] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {entry.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
                  {entry.description}
                </p>
                <div className="pt-2">
                  {entry.tags.map(tag => (
                    <Badge key={tag} label={tag} />
                  ))}
                </div>
              </div>
              <div className="md:text-right pt-1">
                <span className="text-xs font-mono text-gray-400 tracking-wider">
                  {entry.date}
                </span>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* TRAINING MODAL */}
      {/* Missing in previous output, ensuring it's back */}
      <TrainingModal 
        isOpen={isTrainingModalOpen} 
        onClose={() => setIsTrainingModalOpen(false)} 
      />
    </Container>
  );
};

export default Journal;
