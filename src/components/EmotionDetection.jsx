import React, { useState, useEffect } from 'react';
import { CALMING_SUGGESTIONS } from '../data/mockData';
import { Eye, ShieldAlert, Heart, Wind, Play, HelpCircle, Activity } from 'lucide-react';

export default function EmotionDetection({ speakText, accessibilitySettings }) {
  const [activeEmotion, setActiveEmotion] = useState('Neutral');
  const [suggestionIdx, setSuggestionIdx] = useState(0);
  const [stressScore, setStressScore] = useState(35);
  
  // Guided breathing state
  const [breathState, setBreathState] = useState('Inhale'); // Inhale, Hold, Exhale
  const [breathCounter, setBreathCounter] = useState(4);
  const [breathingActive, setBreathingActive] = useState(false);

  // Cycle suggestions
  const nextSuggestion = () => {
    const nextIdx = (suggestionIdx + 1) % CALMING_SUGGESTIONS.length;
    setSuggestionIdx(nextIdx);
    speakText(`Calming suggestion: ${CALMING_SUGGESTIONS[nextIdx]}`);
  };

  // Simulating active biometric changes
  useEffect(() => {
    const interval = setInterval(() => {
      const emotions = ['Neutral', 'Neutral', 'Happy', 'Nervous', 'Neutral'];
      const randEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      setActiveEmotion(prev => {
        if (prev !== randEmotion) {
          // If nervous, alert user via speak
          if (randEmotion === 'Nervous') {
            setStressScore(75);
            speakText("AI feedback: Slight nervousness detected. Try slowing down your breathing.");
          } else {
            setStressScore(Math.floor(Math.random() * 30) + 20);
          }
        }
        return randEmotion;
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Guided breathing loop
  useEffect(() => {
    let timer = null;
    if (breathingActive) {
      timer = setInterval(() => {
        setBreathCounter(prev => {
          if (prev <= 1) {
            // Transition state
            if (breathState === 'Inhale') {
              setBreathState('Hold');
              return 4;
            } else if (breathState === 'Hold') {
              setBreathState('Exhale');
              return 6;
            } else {
              setBreathState('Inhale');
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setBreathCounter(4);
      setBreathState('Inhale');
    }
    return () => clearInterval(timer);
  }, [breathingActive, breathState]);

  const toggleBreathing = () => {
    setBreathingActive(!breathingActive);
    if (!breathingActive) {
      speakText("Starting guided breathing trainer. Follow the expanding circle. Inhale.");
    } else {
      speakText("Guided breathing stopped.");
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-8 text-left">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
          <Activity className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Biometric Emotion Monitor</h2>
          <p className="text-xs text-slate-400">Real-time tone and facial expression alignment analysis simulator</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left: Futuristic camera biometrics */}
        <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-6 relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-cyan-500/5 blur-2xl pointer-events-none"></div>
          
          <div className="w-full flex justify-between items-center text-xs text-slate-400 font-bold border-b border-slate-800 pb-3">
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4 text-cyan-400" />
              Live Facial Overlay Tracker
            </span>
            <span className="text-[10px] text-green-400 uppercase tracking-widest bg-green-500/10 border border-green-500/25 px-2 py-0.5 rounded">
              Active Scan
            </span>
          </div>

          {/* Camera Sandbox Container */}
          <div className="relative w-full max-w-sm aspect-video rounded-2xl bg-slate-950 border border-slate-850 overflow-hidden flex items-center justify-center">
            {/* Ambient tracker scanner line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" style={{ animationDuration: '3s' }}></div>
            
            {/* SVG Facial Landmark Overlay */}
            <svg viewBox="0 0 160 90" className="h-full w-full text-cyan-400/30" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Outer boundary box */}
              <rect x="15" y="10" width="130" height="70" rx="10" stroke="rgba(56,189,248,0.15)" strokeWidth="1" strokeDasharray="3 3" />
              
              {/* Human facial mapping grid in SVG */}
              <g className="text-cyan-400/40">
                {/* Face outline */}
                <path d="M80 20 Q60 20 60 45 Q60 70 80 75 Q100 70 100 45 Q100 20 80 20 Z" stroke="currentColor" strokeWidth="1" />
                
                {/* Eyes landmarks */}
                <circle cx="70" cy="38" r="1.5" fill="currentColor" />
                <path d="M66 38 Q70 35 74 38" stroke="currentColor" strokeWidth="0.8" />
                <circle cx="90" cy="38" r="1.5" fill="currentColor" />
                <path d="M86 38 Q90 35 94 38" stroke="currentColor" strokeWidth="0.8" />
                
                {/* Nose landmarks */}
                <path d="M80 38 L80 50 L77 53 L83 53" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Mouth grid */}
                <path d="M72 62 Q80 65 88 62" stroke="currentColor" strokeWidth="1" />
                {activeEmotion === 'Happy' && <path d="M70 60 Q80 70 90 60" stroke="#22C55E" strokeWidth="1.5" />}
                {activeEmotion === 'Nervous' && <path d="M72 63 Q80 60 88 63" stroke="#F97316" strokeWidth="1.5" />}
                
                {/* Connection mapping points */}
                <circle cx="80" cy="20" r="1" fill="#38BDF8" />
                <circle cx="60" cy="45" r="1" fill="#38BDF8" />
                <circle cx="100" cy="45" r="1" fill="#38BDF8" />
                <circle cx="80" cy="75" r="1" fill="#38BDF8" />
              </g>
            </svg>

            {/* Glowing biometric metadata */}
            <div className="absolute bottom-3 left-3 bg-slate-900/80 border border-slate-800 text-[9px] font-bold text-slate-300 px-2 py-1 rounded">
              FPS: 30 | Latency: 12ms
            </div>
          </div>

          {/* Active Emotion Tracker status */}
          <div className="grid grid-cols-5 gap-2 w-full">
            {['Happy', 'Neutral', 'Nervous', 'Sad', 'Angry'].map(emo => (
              <div 
                key={emo}
                className={`py-2 text-center rounded-xl border text-[10px] font-extrabold uppercase transition-all ${
                  activeEmotion === emo
                    ? emo === 'Nervous' ? 'bg-orange-500/10 border-orange-500 text-orange-400 shadow-md' :
                      emo === 'Happy' ? 'bg-green-500/10 border-green-500 text-green-400 shadow-md' :
                      'bg-cyan-500/10 border-cyan-400 text-cyan-400 shadow-md'
                    : 'bg-slate-950 border-slate-850 text-slate-500'
                }`}
              >
                {emo}
              </div>
            ))}
          </div>

        </div>

        {/* Right: Suggestions and Breathing Trainer */}
        <div className="space-y-6">
          
          {/* Calming AI coaching panel */}
          <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <ShieldAlert className="h-4.5 w-4.5 text-cyan-400" />
              Live Pacing Advice
            </h3>
            
            <div className="bg-slate-950 border border-slate-850 rounded-2xl p-4 min-h-[90px] flex items-center justify-between gap-4">
              <p className="text-xs text-slate-350 italic leading-relaxed">
                "{CALMING_SUGGESTIONS[suggestionIdx]}"
              </p>
              <button 
                onClick={nextSuggestion}
                className="text-[10px] font-extrabold uppercase bg-slate-900 border border-slate-800 text-cyan-400 px-2.5 py-1.5 rounded-lg shrink-0 hover:bg-slate-850"
              >
                Next Tip
              </button>
            </div>
          </div>

          {/* Guided Respiration box */}
          <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-6 flex flex-col items-center">
            <div className="w-full flex items-center justify-between text-xs text-slate-400 font-bold border-b border-slate-800 pb-3">
              <span className="flex items-center gap-1">
                <Wind className="h-4 w-4 text-cyan-400" />
                Respiration Pacing Trainer
              </span>
              <button
                onClick={toggleBreathing}
                className={`flex items-center gap-1 px-3 py-1 rounded-xl font-bold text-[10px] uppercase border transition-all ${
                  breathingActive
                    ? 'bg-red-500/10 border-red-500/30 text-red-400'
                    : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-450'
                }`}
              >
                {breathingActive ? "Stop Trainer" : "Start Trainer"}
              </button>
            </div>

            {/* Breathing guided animation circle */}
            <div className="relative h-44 w-44 rounded-full bg-slate-950 border border-slate-850 flex items-center justify-center overflow-hidden">
              
              {/* Expanding circle */}
              <div 
                className={`absolute rounded-full transition-all duration-1000 ${
                  !breathingActive ? 'h-16 w-16 bg-cyan-500/5' :
                  breathState === 'Inhale' ? 'h-36 w-36 bg-cyan-500/15 scale-110' :
                  breathState === 'Hold' ? 'h-36 w-36 bg-cyan-400/20 scale-105' :
                  'h-16 w-16 bg-blue-500/10 scale-95'
                }`}
              ></div>

              <div className="relative text-center space-y-1">
                <span className="text-xl font-extrabold text-white tracking-wide">{breathState}</span>
                <span className="text-xs font-bold text-cyan-400 block">{breathCounter}s</span>
              </div>
            </div>

            <div className="text-center space-y-1 max-w-xs">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Coaching Routine</span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Matches WCAG speech support recommendations: Inhale for 4 seconds, hold for 4, and exhale for 6.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
