import React from 'react';
import { Play, Calendar, Trophy, BarChart2, MessageSquare, Briefcase, FileText, Presentation, Users } from 'lucide-react';

export default function Dashboard({ username, activeTab, setActiveTab, streak, xp, accessibilitySettings, speakText }) {
  
  // Custom font styling for accessibility
  const titleClass = accessibilitySettings.fontSize === 'large' ? 'text-3xl' : accessibilitySettings.fontSize === 'extra-large' ? 'text-4xl' : 'text-2xl';
  const textClass = accessibilitySettings.fontSize === 'large' ? 'text-base' : accessibilitySettings.fontSize === 'extra-large' ? 'text-lg' : 'text-sm';

  // ADHD Minimalist mode
  const isADHD = accessibilitySettings.disabilityType === 'adhd';

  const handleStartLearning = () => {
    speakText("Starting next recommended exercise: S T A R Method Practice.");
    setActiveTab('interview-screen');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-8 text-left">
      
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/30 rounded-3xl p-6 border border-slate-800/80 glass-card relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-blue-600/5 blur-3xl pointer-events-none"></div>
        <div>
          <h2 className={`${titleClass} font-extrabold text-white`}>
            Welcome back, <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{username}</span>!
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            {accessibilitySettings.disabilityType 
              ? `Active Accessibility Profile: ${accessibilitySettings.disabilityType.toUpperCase()}`
              : "Let's work on your workplace communication skills today."}
          </p>
        </div>
        
        {/* Continue Learning button */}
        <button
          onClick={handleStartLearning}
          className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-slate-900 font-extrabold px-6 py-3.5 shadow-lg shadow-blue-500/10 hover:scale-102 transition-all shrink-0 focus:ring-2 focus:ring-cyan-400"
        >
          <Play className="h-4 w-4 fill-slate-900" />
          Continue Learning
        </button>
      </div>

      {/* Goal Summary Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Stats 1: Daily Streak info */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Daily Streak</span>
            <h3 className="text-3xl font-extrabold text-white flex items-baseline gap-1.5">
              {streak} <span className="text-xs font-bold text-orange-400">days active</span>
            </h3>
            <p className="text-xs text-slate-450">Complete a practice today to maintain it!</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
            <Calendar className="h-6 w-6" />
          </div>
        </div>

        {/* Stats 2: Weekly Goal progress with SVG progress circle */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Weekly XP Goal</span>
            <h3 className="text-3xl font-extrabold text-white">
              {xp}<span className="text-sm font-semibold text-slate-450"> / 2,000 XP</span>
            </h3>
            <p className="text-xs text-slate-450">{(2000 - xp) > 0 ? `${2000 - xp} XP needed to reach weekly goal` : 'Goal reached!'}</p>
          </div>
          <div className="relative h-14 w-14 flex items-center justify-center shrink-0">
            {/* SVG Progress Circle */}
            <svg className="h-full w-full transform -rotate-90">
              <circle cx="28" cy="28" r="22" stroke="rgba(255,255,255,0.06)" strokeWidth="4" fill="transparent" />
              <circle cx="28" cy="28" r="22" stroke="#38bdf8" strokeWidth="4" fill="transparent"
                strokeDasharray="138" strokeDashoffset={138 - (138 * Math.min(xp, 2000)) / 2000} strokeLinecap="round" />
            </svg>
            <span className="absolute text-[10px] font-bold text-slate-200">{Math.min(Math.round((xp / 2000) * 100), 100)}%</span>
          </div>
        </div>

        {/* Stats 3: XP Rewards achievements */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Achievements</span>
            <h3 className="text-3xl font-extrabold text-white">
              3 <span className="text-xs font-bold text-yellow-400">Unlocked</span>
            </h3>
            <p className="text-xs text-slate-450">Earned 1 new badge this week</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
            <Trophy className="h-6 w-6" />
          </div>
        </div>

      </div>

      {/* Main Feature Cards Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">
          {isADHD ? "Your Priority Learning Path" : "Explore Training Modules"}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: AI Interview Coach */}
          <button
            onClick={() => setActiveTab('interview-screen')}
            className="glass-card glass-card-hover p-6 rounded-2xl border border-slate-800 text-left space-y-4 focus:ring-2 focus:ring-cyan-400"
            aria-label="Start AI Interview Coach module"
            onMouseEnter={() => speakText("AI Interview Coach: Practice behavioral job interview questions in real-time.")}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Briefcase className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-white">AI Interview Coach</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Practice behavioral questions with voice inputs, speech pacing metrics, and automated transcripts.
              </p>
            </div>
          </button>

          {/* Card 2: Conversation Simulator */}
          <button
            onClick={() => setActiveTab('conversation-simulator')}
            className="glass-card glass-card-hover p-6 rounded-2xl border border-slate-800 text-left space-y-4 focus:ring-2 focus:ring-cyan-400"
            aria-label="Start Conversation Simulator"
            onMouseEnter={() => speakText("Conversation Simulator: Roleplay workplace scenarios with interactive speech guides.")}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-white">Conversation Simulator</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Roleplay coffee breaks, manager sync-ups, or team standup meetings with interactive visual guides.
              </p>
            </div>
          </button>

          {/* Card 3: Resume Analyzer */}
          <button
            onClick={() => setActiveTab('resume-upload')}
            className="glass-card glass-card-hover p-6 rounded-2xl border border-slate-800 text-left space-y-4 focus:ring-2 focus:ring-cyan-400"
            aria-label="Start Resume Analyzer"
            onMouseEnter={() => speakText("Resume Analyzer: Upload your resume to extract skills and generate custom questions.")}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <FileText className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-white">Resume Analyzer</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Drag and drop your PDF resume to extract key technical skills and generate customized behavior interview prompts.
              </p>
            </div>
          </button>

          {/* Render extra items only if NOT in ADHD focus mode */}
          {!isADHD && (
            <>
              {/* Card 4: Translation Assistant */}
              <button
                onClick={() => setActiveTab('translation-assistant')}
                className="glass-card glass-card-hover p-6 rounded-2xl border border-slate-800 text-left space-y-4 focus:ring-2 focus:ring-cyan-400"
                aria-label="Start Corporate Translation Assistant"
                onMouseEnter={() => speakText("Translation Assistant: Convert colloquial phrases into polite corporate language.")}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Presentation className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">Translation Assistant</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Convert direct, informal statements into formal, polite corporate terminology across 5 Indian languages.
                  </p>
                </div>
              </button>

              {/* Card 5: Personalized Learning Roadmap */}
              <button
                onClick={() => setActiveTab('personalized-learning')}
                className="glass-card glass-card-hover p-6 rounded-2xl border border-slate-800 text-left space-y-4 focus:ring-2 focus:ring-cyan-400"
                aria-label="Open Personalized Learning roadmap"
                onMouseEnter={() => speakText("Personalized Learning: View roadmap, weak areas, and daily suggested roadmap exercises.")}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
                  <Users className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">Learning Roadmap</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Check your personalized weekly curriculum roadmap, review focus zones, and start daily customized milestones.
                  </p>
                </div>
              </button>

              {/* Card 6: Progress Analytics */}
              <button
                onClick={() => setActiveTab('analytics')}
                className="glass-card glass-card-hover p-6 rounded-2xl border border-slate-800 text-left space-y-4 focus:ring-2 focus:ring-cyan-400"
                aria-label="Open Analytics Dashboard"
                onMouseEnter={() => speakText("Progress Analytics: Track confidence trends, speaking speeds, and grammar improvement.")}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <BarChart2 className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">Progress Analytics</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Review your charts for speaking pace, daily hours practiced, vocabulary, and inspect unlocked milestone badges.
                  </p>
                </div>
              </button>
            </>
          )}

        </div>
      </div>

    </div>
  );
}
