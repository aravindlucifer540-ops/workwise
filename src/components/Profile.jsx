import React from 'react';
import { User, ShieldCheck, Award, FileText, CheckCircle, Calendar } from 'lucide-react';

export default function Profile({ username, streak, xp, accessibilitySettings, speakText }) {
  
  const handlePrintCertificate = (title) => {
    speakText(`Preparing print-ready certificate for: ${title}`);
    alert(`Mock certificate printing triggered for: ${title}`);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-8 text-left animate-fade-in">
      
      {/* Profile Welcome Jumbotron */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-blue-500/5 blur-3xl pointer-events-none"></div>
        
        {/* Profile Avatar */}
        <div className="relative h-20 w-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-slate-900 font-black text-3xl shadow-lg shadow-blue-500/20 shrink-0">
          {username ? username.charAt(0).toUpperCase() : 'U'}
        </div>

        {/* User stats overview */}
        <div className="space-y-2 text-center sm:text-left flex-1">
          <h2 className="text-2xl font-bold text-white">{username}</h2>
          <div className="flex flex-wrap justify-center sm:justify-start gap-3 text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-4 w-4 text-cyan-400" />
              Streak: {streak} days
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Award className="h-4 w-4 text-yellow-400" />
              Total XP: {xp} points
            </span>
          </div>
        </div>

        {/* Print certificates overview */}
        <div className="rounded-2xl bg-slate-950 p-4 border border-slate-850 text-center shrink-0">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold">Training Rank</span>
          <span className="text-lg font-black text-cyan-400">Intermediate</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left column: active preferences summary */}
        <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white">Active Accessibility Profile</h3>
          
          <div className="space-y-3.5 text-xs text-slate-350 leading-relaxed">
            <div className="flex justify-between border-b border-slate-850 pb-2">
              <span className="text-slate-450">Selected Profile:</span>
              <span className="font-bold text-cyan-400 capitalize">{accessibilitySettings.disabilityType || 'None selected'}</span>
            </div>
            <div className="flex justify-between border-b border-slate-850 pb-2">
              <span className="text-slate-450">Text Scale:</span>
              <span className="font-bold text-slate-200 capitalize">{accessibilitySettings.fontSize}</span>
            </div>
            <div className="flex justify-between border-b border-slate-850 pb-2">
              <span className="text-slate-450">Visual Theme:</span>
              <span className="font-bold text-slate-200 capitalize">{accessibilitySettings.theme}</span>
            </div>
            <div className="flex justify-between border-b border-slate-850 pb-2">
              <span className="text-slate-450">Narration Speed:</span>
              <span className="font-bold text-slate-200">{accessibilitySettings.voiceSpeed}x</span>
            </div>
            <div className="flex justify-between border-b border-slate-850 pb-2">
              <span className="text-slate-450">Language:</span>
              <span className="font-bold text-slate-200">{accessibilitySettings.language}</span>
            </div>
          </div>
        </div>

        {/* Right columns: Certificates and History */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Certificate List */}
          <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <FileText className="h-4.5 w-4.5 text-cyan-400" />
              Earned Certifications
            </h3>

            <div className="space-y-3">
              
              {/* Cert 1 */}
              <div className="bg-slate-900/40 border border-slate-850 p-4 rounded-2xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-cyan-500/10 border border-cyan-500/25 rounded-xl flex items-center justify-center text-cyan-400">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Fundamentals of Social Dialogue</h4>
                    <p className="text-[10px] text-slate-450">Issued: June 2026</p>
                  </div>
                </div>
                <button
                  onClick={() => handlePrintCertificate("Fundamentals of Social Dialogue")}
                  className="px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/25 font-semibold text-[10px] uppercase transition-all"
                >
                  Print PDF
                </button>
              </div>

              {/* Cert 2 */}
              <div className="bg-slate-900/40 border border-slate-850 p-4 rounded-2xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-cyan-500/10 border border-cyan-500/25 rounded-xl flex items-center justify-center text-cyan-400">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Assertive Project Boundaries Settings</h4>
                    <p className="text-[10px] text-slate-450">Issued: July 2026</p>
                  </div>
                </div>
                <button
                  onClick={() => handlePrintCertificate("Assertive Project Boundaries Settings")}
                  className="px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/25 font-semibold text-[10px] uppercase transition-all"
                >
                  Print PDF
                </button>
              </div>

            </div>
          </div>

          {/* Timeline of History */}
          <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Calendar className="h-4.5 w-4.5 text-cyan-400" />
              Practice History Log
            </h3>
            
            <div className="space-y-4">
              
              {/* History item 1 */}
              <div className="flex gap-3 relative text-left">
                <div className="absolute top-6 left-3 w-[2px] h-8 bg-slate-800/80"></div>
                <div className="h-6.5 w-6.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center shrink-0 z-10">
                  <CheckCircle className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Completed: AI Interview Coach</h4>
                  <p className="text-[10px] text-slate-450">Confidence Score: 86% | 15 mins practice</p>
                </div>
              </div>

              {/* History item 2 */}
              <div className="flex gap-3 relative text-left">
                <div className="absolute top-6 left-3 w-[2px] h-8 bg-slate-800/80"></div>
                <div className="h-6.5 w-6.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center shrink-0 z-10">
                  <CheckCircle className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Completed: Coffee Break scenario roleplay</h4>
                  <p className="text-[10px] text-slate-450">Pace: Neutral | 6 mins practice</p>
                </div>
              </div>

              {/* History item 3 */}
              <div className="flex gap-3 text-left">
                <div className="h-6.5 w-6.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center shrink-0 z-10">
                  <CheckCircle className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Analyzed: Resume Upload (junior-dev-cv.pdf)</h4>
                  <p className="text-[10px] text-slate-450">Extracted 7 core skill tags successfully</p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
