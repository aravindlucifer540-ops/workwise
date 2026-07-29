import React from 'react';
import { Flame, Award, Accessibility, User, Volume2, VolumeX } from 'lucide-react';

export default function Navbar({ streak, xp, activeTab, setActiveTab, accessibilitySettings, speakText, stopSpeaking, isSpeaking }) {
  // Translate class font size
  const fontClass = 
    accessibilitySettings.fontSize === 'large' ? 'text-lg' : 
    accessibilitySettings.fontSize === 'extra-large' ? 'text-xl' : 'text-base';
  
  const headerFontClass = 
    accessibilitySettings.fontSize === 'large' ? 'text-2xl' : 
    accessibilitySettings.fontSize === 'extra-large' ? 'text-3xl' : 'text-xl';

  const announceNavbar = () => {
    speakText(`Navigation header. Current streak is ${streak} days. XP points is ${xp}. Active tab is ${activeTab}.`);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-card border-b border-slate-800/80 px-4 py-3 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        
        {/* Brand Logo */}
        <button 
          onClick={() => setActiveTab('landing')}
          className="flex items-center gap-2 text-left focus:ring-2 focus:ring-cyan-400"
          aria-label="WorkWise AI logo, go to home"
          onMouseEnter={() => speakText("WorkWise A I")}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 text-white font-extrabold shadow-md shadow-blue-500/20">
            W
          </div>
          <div>
            <h1 className={`${headerFontClass} font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent`}>
              WorkWise AI
            </h1>
            <p className="text-[10px] text-cyan-400 uppercase tracking-widest font-semibold">
              Training Platform
            </p>
          </div>
        </button>

        {/* User Stats and Quick Accessibility Controls */}
        <div className="flex items-center gap-3 sm:gap-6">
          
          {/* Daily Streak */}
          <div 
            className="flex items-center gap-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 text-orange-400"
            aria-label={`Streak: ${streak} days`}
            onMouseEnter={() => speakText(`Streak: ${streak} days`)}
          >
            <Flame className="h-4 w-4 fill-orange-500/20" />
            <span className="text-sm font-bold">{streak}d</span>
          </div>

          {/* XP points */}
          <div 
            className="flex items-center gap-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20 px-2.5 py-1 text-yellow-400"
            aria-label={`XP: ${xp} points`}
            onMouseEnter={() => speakText(`XP points: ${xp}`)}
          >
            <Award className="h-4 w-4" />
            <span className="text-sm font-bold">{xp} XP</span>
          </div>

          {/* Read out loud button */}
          <button
            onClick={isSpeaking ? stopSpeaking : announceNavbar}
            className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-all ${
              isSpeaking 
                ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400' 
                : 'bg-slate-800/50 border-slate-700/60 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/20'
            }`}
            aria-label={isSpeaking ? "Stop voice narration" : "Narrate page status"}
          >
            {isSpeaking ? <Volume2 className="h-4.5 w-4.5 animate-pulse" /> : <VolumeX className="h-4.5 w-4.5" />}
          </button>

          {/* Accessibility Quick Icon */}
          <button
            onClick={() => setActiveTab('accessibility-setup')}
            className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-all ${
              activeTab === 'accessibility-setup'
                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                : 'bg-slate-800/50 border-slate-700/60 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/20'
            }`}
            aria-label="Open accessibility setup"
            onMouseEnter={() => speakText("Accessibility Settings")}
          >
            <Accessibility className="h-4.5 w-4.5" />
          </button>

          {/* Profile Shortcut */}
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-all ${
              activeTab === 'profile'
                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                : 'bg-slate-800/50 border-slate-700/60 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/20'
            }`}
            aria-label="Go to profile"
            onMouseEnter={() => speakText("Profile")}
          >
            <User className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
