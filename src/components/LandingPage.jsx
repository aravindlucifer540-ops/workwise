import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Accessibility, Brain, Languages, MessageSquare } from 'lucide-react';

export default function LandingPage({ setActiveTab, speakText }) {
  
  const handleGetStarted = () => {
    speakText("Navigating to authentication screen. Click guest login to instantly access the dashboard.");
    setActiveTab('auth');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-16">
      
      {/* Hero Section */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
        
        {/* Hero Copy */}
        <div className="text-left space-y-6">
          <div 
            className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs text-blue-400 font-semibold"
            onMouseEnter={() => speakText("New release, WorkWise AI Platform")}
          >
            <Sparkles className="h-3 w-3" />
            Empowering Accessible Workplace Success
          </div>
          
          <h1 
            className="text-4xl font-extrabold tracking-tight sm:text-6xl text-white font-sans leading-none"
            onMouseEnter={() => speakText("Train. Communicate. Succeed.")}
          >
            Train. <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Communicate.</span> Succeed.
          </h1>
          
          <p className="text-lg text-slate-300 max-w-lg leading-relaxed">
            WorkWise AI is an intelligence-powered workplace communication training platform designed specifically for people with disabilities. Practice interviews, conversations, small talk, and build confidence in a zero-stress environment.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={handleGetStarted}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-slate-900 font-bold px-6 py-3.5 shadow-lg shadow-blue-500/20 hover:scale-102 active:scale-98 transition-all focus:ring-2 focus:ring-cyan-400"
              aria-label="Get Started and setup profile"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5 text-slate-900" />
            </button>
            <button
              onClick={() => {
                speakText("WorkWise AI offers customized options for Autism, Low Vision, Dyslexia, Speech difficulties, and Hearing impairments.");
                setActiveTab('accessibility-setup');
              }}
              className="flex items-center gap-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 px-6 py-3.5 hover:scale-102 active:scale-98 transition-all"
            >
              Configure Accessibility
            </button>
          </div>
        </div>

        {/* Dynamic AI Illustration */}
        <div className="flex justify-center items-center">
          <div className="relative w-full max-w-md aspect-square rounded-3xl bg-slate-900/40 border border-slate-800/80 p-8 glass-card flex items-center justify-center">
            {/* Ambient gradients */}
            <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"></div>

            {/* Custom SVG Illustration of AI assisting humans */}
            <svg viewBox="0 0 200 200" className="w-full h-full text-cyan-400" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Outer Network Rings */}
              <circle cx="100" cy="100" r="85" stroke="rgba(56,189,248,0.15)" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="100" cy="100" r="65" stroke="rgba(56,189,248,0.25)" strokeWidth="1" />
              
              {/* AI Neural Nodes */}
              <circle cx="100" cy="35" r="8" fill="url(#blueGrad)" className="animate-pulse" />
              <circle cx="35" cy="100" r="6" fill="#38BDF8" />
              <circle cx="165" cy="100" r="6" fill="#38BDF8" />
              <circle cx="100" cy="165" r="8" fill="url(#blueGrad)" />
              
              {/* Connectors */}
              <line x1="100" y1="43" x2="100" y2="70" stroke="rgba(56,189,248,0.4)" strokeWidth="2" />
              <line x1="41" y1="100" x2="70" y2="100" stroke="rgba(56,189,248,0.4)" strokeWidth="2" />
              <line x1="159" y1="100" x2="130" y2="100" stroke="rgba(56,189,248,0.4)" strokeWidth="2" />
              <line x1="100" y1="157" x2="100" y2="130" stroke="rgba(56,189,248,0.4)" strokeWidth="2" />

              {/* Central Processor */}
              <rect x="70" y="70" width="60" height="60" rx="14" fill="#0f172a" stroke="url(#cyanGrad)" strokeWidth="2.5" />
              
              {/* Animated Waveform Inside Center */}
              <path d="M80 100 Q85 80 90 100 T100 100 T110 100 T120 100" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
              <circle cx="100" cy="100" r="3" fill="#2563EB" />

              {/* Chat Bubble Icons hovering */}
              <g transform="translate(135, 45)">
                <rect width="32" height="22" rx="6" fill="#1E293B" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <path d="M8 11h16M8 15h10" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
              </g>
              <g transform="translate(25, 125)">
                <rect width="32" height="22" rx="6" fill="#1E293B" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <path d="M8 11h10" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />
              </g>

              {/* Define Gradients */}
              <defs>
                <linearGradient id="blueGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#1D4ED8" />
                </linearGradient>
                <linearGradient id="cyanGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

      </div>

      {/* Feature Section */}
      <div className="mt-24 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Tailored Practice Tools
          </h2>
          <p className="text-slate-400 max-w-md mx-auto">
            Our specialized modules prepare you for every stage of your communication roadmap.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col items-start text-left gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <Brain className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">AI Interview Coach</h3>
            <p className="text-sm text-slate-400">
              Speak into a live waveform simulator and receive detailed metrics on confidence, vocabulary speed, grammar, and focus.
            </p>
          </div>

          <div className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col items-start text-left gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
              <MessageSquare className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Conversation Simulator</h3>
            <p className="text-sm text-slate-400">
              Roleplay HR check-ins, coffee chats, or manager status review alignments with live helpful prompt tips.
            </p>
          </div>

          <div className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col items-start text-left gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
              <Languages className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Corporate Translator</h3>
            <p className="text-sm text-slate-400">
              Translate plain spoken or written phrases into polite, professional workspace updates instantly across 5 languages.
            </p>
          </div>

          <div className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col items-start text-left gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/10 text-pink-400">
              <Accessibility className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Accessibility Profiles</h3>
            <p className="text-sm text-slate-400">
              Autism, ADHD, Dyslexia, and Visual impairment custom profiles designed with high-contrast rules and narration.
            </p>
          </div>

        </div>
      </div>

      {/* Benefits Section */}
      <div className="mt-24 glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="text-left space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Why Choose WorkWise AI?
            </h2>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 mt-0.5">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Safe Practice Environment</h4>
                  <p className="text-sm text-slate-400">Practice speaking and presenting without the stress of being judged, building organic muscle memory.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 mt-0.5">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Live Calming Coaching</h4>
                  <p className="text-sm text-slate-400">Our emotion monitors identify nervous patterns and suggest instant breathing routines and pacing reminders.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 mt-0.5">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">WCAG Compliant Design</h4>
                  <p className="text-sm text-slate-400">Supports keyboard navigation focus, text scaling, speech synthesis output, and visual distraction toggle toggling.</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleGetStarted}
              className="mt-2 inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 focus:ring-2 focus:ring-cyan-400 transition-all"
            >
              Start Free Training Now
            </button>
          </div>

          {/* Stats Callouts */}
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 text-center space-y-2">
              <span className="text-4xl font-extrabold text-cyan-400">95%</span>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">User Confidence Improvement</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 text-center space-y-2">
              <span className="text-4xl font-extrabold text-blue-400">5+</span>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Accessibility Modes</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 text-center space-y-2">
              <span className="text-4xl font-extrabold text-indigo-400">10k+</span>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Simulated Practice Questions</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 text-center space-y-2">
              <span className="text-4xl font-extrabold text-purple-400">100%</span>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Privacy & Sandbox Practice</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
