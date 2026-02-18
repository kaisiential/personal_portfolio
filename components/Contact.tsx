import React, { useState } from 'react';
import Container from './ui/Container';
import { Send, Mail, Clock, ChevronDown } from 'lucide-react';

// --- BRAND LOGOS ---

const GoogleMeetLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background Circle (matches container) */}
    <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="white"/>
    
    {/* Base Shape (Green) - Covers Bottom and Right Lens */}
    <path d="M21 7.5L17 10.5V7C17 6.45 16.55 6 16 6H8C7.45 6 7 6.45 7 7V17C7 17.55 7.45 18 8 18H16C16.55 18 17 17.55 17 17V13.5L21 16.5V7.5Z" fill="#00AC47"/>
    
    {/* Top Strip (Yellow) */}
    <path d="M17 7C17 6.45 16.55 6 16 6H8C7.45 6 7 6.45 7 7V10.5H17V7Z" fill="#FFBA00"/>
    
    {/* Left Strip (Blue) */}
    <path d="M7 7V17C7 17.55 7.45 18 8 18H11V7H7Z" fill="#2962FF"/>
    
    {/* Top Left Corner (Red) */}
    <path d="M7 7L11 7L7 11V7Z" fill="#EA4335"/>
  </svg>
);

const ZoomLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#2D8CFF"/>
    <path d="M5 10C5 8.89543 5.89543 8 7 8H13C14.1046 8 15 8.89543 15 10V14C15 15.1046 14.1046 16 13 16H7C5.89543 16 5 15.1046 5 14V10Z" fill="white"/>
    <path d="M16 10.5L19 8.5V15.5L16 13.5V10.5Z" fill="white"/>
  </svg>
);

const DiscordLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#5865F2"/>
    <path d="M15.5 9C15.5 9 14 8 12 8C10 8 8.5 9 8.5 9C7 11 6.5 14 6.5 14C6.5 14 8 15.5 10 15.5L10.5 14.5C9.5 14.25 8.5 13.5 8.5 13.5C8.5 13.5 9 13.75 12 13.75C15 13.75 15.5 13.5 15.5 13.5C15.5 13.5 14.5 14.25 13.5 14.5L14 15.5C16 15.5 17.5 14 17.5 14C17.5 14 17 11 15.5 9ZM10 12.5C9.44772 12.5 9 12.0523 9 11.5C9 10.9477 9.44772 10.5 10 10.5C10.5523 10.5 11 10.9477 11 11.5C11 12.0523 10.5523 12.5 10 12.5ZM14 12.5C13.4477 12.5 13 12.0523 13 11.5C13 10.9477 13.4477 10.5 14 10.5C14.5523 10.5 15 10.9477 15 11.5C15 12.0523 14.5523 12.5 14 12.5Z" fill="white"/>
  </svg>
);

const InstagramLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ig_gradient" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#f09433" />
        <stop offset="0.25" stopColor="#e6683c" />
        <stop offset="0.5" stopColor="#dc2743" />
        <stop offset="0.75" stopColor="#cc2366" />
        <stop offset="1" stopColor="#bc1888" />
      </linearGradient>
    </defs>
    <path
      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z"
      fill="url(#ig_gradient)"
    />
    <path
      d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
      fill="url(#ig_gradient)"
    />
    <path
      d="M18.406 4.155a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
      fill="url(#ig_gradient)"
    />
  </svg>
);

const XLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const ThreadsLogo = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 192 192" // CHANGED: matched to the path size
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" // You can keep the display size 32
    height="32"
  >
    <path 
      d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" 
      // REMOVED: fill="black" (this allows fill="currentColor" on the svg to work)
    />
  </svg>
);

const TelegramLogo = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background Circle */}
    <circle cx="12" cy="12" r="12" fill="#229ED9"/>
    
    {/* Official Telegram Plane Path */}
    <path 
      d="M17.49 7.15L5.99 11.59C5.17 11.91 5.18 12.36 5.82 12.56L8.79 13.48L15.63 9.17C15.96 8.97 16.26 9.08 16.02 9.3L10.49 14.29H10.48L10.27 17.16C10.56 17.16 10.7 17.03 10.86 16.87L12.28 15.51L15.22 17.68C15.76 17.98 16.15 17.83 16.29 17.18L18.29 7.78C18.49 6.96 17.97 6.59 17.49 7.15Z" 
      fill="white"
    />
  </svg>
);

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    topic: 'AI Consulting', // Default topic
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, topic, message } = formState;
    // Subject line optimized for triage: [Topic] Name
    const subject = `[${topic}] Inquiry from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\nMessage:\n${message}`;
    const mailtoLink = `mailto:hello@kaisiential.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <Container>
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] dark:text-white mb-6 tracking-tight">Get in Touch</h2>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed">
             I am currently based in Chiang Mai, building my AI consulting practice, growing Tapir Protocol as a Business Development & Strategy, and sharing everything I learn along the way. If any of that resonates with you, I would love to connect.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div className="space-y-8">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 dark:text-white">Let's build the future.</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                Whether you have a question about AI systems & architecture, need consulting on a project, or just want to say hello, I'm always open to discussing new opportunities.
              </p>
            </div>

            {/* Response Time Card */}
            <div className="p-6 bg-white dark:bg-[#1C1C1E] rounded-[2rem] border border-gray-100 dark:border-white/5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Response Time</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Usually within 24 hours</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 pl-2">Work Email</div>
                    <a 
                      href="mailto:hello@kaisiential.com" 
                      className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 group"
                    >
                      <Mail className="w-5 h-5 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                      <span className="font-medium">hello@kaisiential.com</span>
                    </a>
                  </div>

                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 pl-2">Personal Email</div>
                    <a 
                      href="mailto:angkaihui@gmail.com" 
                      className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 group"
                    >
                      <Mail className="w-5 h-5 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                      <span className="font-medium">angkaihui@gmail.com</span>
                    </a>
                  </div>
                </div>
            </div>

            {/* Schedule Call Card */}
            <a 
              href="#" 
              className="block p-6 bg-white dark:bg-[#1C1C1E] rounded-[2rem] border border-gray-100 dark:border-white/5 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
              onClick={(e) => { e.preventDefault(); /* Mock functionality */ }}
            >
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    {/* Logo Stack Overlay */}
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full border-2 border-white dark:border-[#1C1C1E] z-30 bg-white">
                        <GoogleMeetLogo className="w-full h-full" />
                      </div>
                      <div className="w-10 h-10 rounded-full border-2 border-white dark:border-[#1C1C1E] z-20 -ml-3 bg-white">
                        <ZoomLogo className="w-full h-full" />
                      </div>
                      <div className="w-10 h-10 rounded-full border-2 border-white dark:border-[#1C1C1E] z-10 -ml-3 bg-white">
                        <DiscordLogo className="w-full h-full" />
                      </div>
                    </div>
                    
                    <div className="pl-1">
                      <div className="font-semibold text-gray-900 dark:text-white text-lg">Schedule a Call</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mt-0.5">
                        <Clock size={14} /> 30 Min Intro Chat
                      </div>
                    </div>
                 </div>
                 <div className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 group-hover:text-black dark:group-hover:text-white group-hover:border-gray-400 dark:group-hover:border-white/40 transition-all">
                    <span className="text-xl leading-none mb-1">→</span>
                 </div>
               </div>
            </a>

            {/* Social Media / Catch Up Card */}
            <div className="p-6 bg-white dark:bg-[#1C1C1E] rounded-[2rem] border border-gray-100 dark:border-white/5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col-reverse md:flex-row items-center justify-between gap-4">
               <div className="font-semibold text-gray-900 dark:text-white text-lg whitespace-nowrap">Catch me on</div>
               <div className="flex items-center gap-3">
                  <a href="https://instagram.com/kaisiential" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <InstagramLogo className="w-full h-full" />
                  </a>
                  <a
                    href="https://x.com/kaisiential" target="_blank" rel="noopener noreferrer"
                    className="
                      w-10 h-10 rounded-full flex items-center justify-center
                      transition-all duration-300 hover:scale-110
                      bg-black text-white hover:bg-white hover:text-black hover:ring-2 hover:ring-black
                      dark:bg-white dark:text-gray-900 dark:hover:bg-black dark:hover:text-white dark:hover:ring-2 dark:hover:ring-white
                    "
                  >
                    <XLogo className="w-5 h-5" />
                  </a>
                  <a
                    href="https://threads.net/@kaisiential" target="_blank" rel="noopener noreferrer"
                    className="
                      w-10 h-10 rounded-full flex items-center justify-center
                      transition-all duration-300 hover:scale-110
                      bg-black text-white hover:bg-white hover:text-black hover:ring-2 hover:ring-black
                      dark:bg-white dark:text-gray-900 dark:hover:bg-black dark:hover:text-white dark:hover:ring-2 dark:hover:ring-white
                    "
                  >
                    <ThreadsLogo className="w-6 h-6" />
                  </a>
                  <a href="https://t.me/kaisiential" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <TelegramLogo className="w-full h-full" />
                  </a>
               </div>
            </div>

          </div>

          <div className="bg-white dark:bg-[#1C1C1E] p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-white/5">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  required
                  className="w-full px-4 py-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-transparent focus:bg-white dark:focus:bg-black focus:border-gray-200 dark:focus:border-gray-700 focus:ring-0 transition-all outline-none text-base dark:text-white dark:placeholder-gray-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  required
                  className="w-full px-4 py-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-transparent focus:bg-white dark:focus:bg-black focus:border-gray-200 dark:focus:border-gray-700 focus:ring-0 transition-all outline-none text-base dark:text-white dark:placeholder-gray-500"
                />
              </div>

              {/* Topic Dropdown */}
              <div className="relative">
                <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1">Topic</label>
                <div className="relative">
                  <select
                    id="topic"
                    value={formState.topic}
                    onChange={handleChange}
                    className="w-full px-4 py-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-transparent focus:bg-white dark:focus:bg-black focus:border-gray-200 dark:focus:border-gray-700 focus:ring-0 transition-all outline-none text-base appearance-none text-gray-900 dark:text-white cursor-pointer"
                  >
                    <option value="AI Consulting">AI Consulting</option>
                    <option value="Workflow Audit">Workflow Audit</option>
                    <option value="AI Governance">AI Governance</option>
                    <option value="AI Training">AI Training / Workshop</option>
                    <option value="Speaking">Speaking</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Just Saying Hi">Just Saying Hi</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500 dark:text-gray-400">
                    <ChevronDown size={20} />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1">Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="How can I help you?"
                  required
                  className="w-full px-4 py-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-transparent focus:bg-white dark:focus:bg-black focus:border-gray-200 dark:focus:border-gray-700 focus:ring-0 transition-all outline-none text-base resize-none dark:text-white dark:placeholder-gray-500"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-black text-white dark:bg-white dark:text-black py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-all transform active:scale-[0.99]"
              >
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Contact;