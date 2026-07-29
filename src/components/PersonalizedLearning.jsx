import React from 'react';
import { LEARNING_ROADMAP } from '../data/mockData';
import { BookOpen, CheckCircle, ShieldAlert, Sparkles, Map, ChevronRight, Play } from 'lucide-react';

export default function PersonalizedLearning({ setActiveTab, speakText, accessibilitySettings }) {
  const data = LEARNING_ROADMAP;

  const handleStartExercise = (title) => {
    speakText(`Starting recommended exercise: ${title}`);
    if (title.includes("Interview") || title.includes("STAR")) {
      setActiveTab('interview-screen');
    } else if (title.includes("Translation") || title.includes("Rejection")) {
      setActiveTab('translation-assistant');
    } else {
      setActiveTab('conversation-simulator');
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-8 text-left">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
          <BookOpen className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Personalized Learning Hub</h2>
          <p className="text-xs text-slate-400">Dynamic workspace curriculum and focus areas tailored by our AI Coach</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Columns: Focus & Recommendations */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Today's Focus Card */}
          <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-cyan-500/5 blur-2xl pointer-events-none"></div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-405">
              Today's Key Objective
            </span>
            <h3 className="text-xl font-extrabold text-white">{data.focus}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Focus on slowing down your response rates and structuring your work summaries using the STAR (Situation, Task, Action, Result) model. Keep sentences concise.
            </p>
          </div>

          {/* Recommended Actions */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              Suggested Exercises
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {data.exercises.map((ex, index) => (
                <div 
                  key={index}
                  className="glass-card rounded-2xl p-4 border border-slate-800/80 flex flex-col justify-between items-start gap-4 hover:border-slate-700/60 transition-all text-left"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[9px] font-extrabold uppercase bg-slate-800 text-slate-400 border border-slate-700 px-2 py-0.5 rounded">
                        {ex.type}
                      </span>
                      <span className="text-[9px] font-bold text-slate-500">{ex.duration}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white leading-snug">{ex.title}</h4>
                  </div>

                  <button
                    onClick={() => handleStartExercise(ex.title)}
                    className="w-full flex items-center justify-center gap-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[10px] uppercase rounded-xl transition-all"
                  >
                    <Play className="h-3 w-3 fill-white" />
                    Start (+{ex.xp} XP)
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Weak areas list */}
          <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <ShieldAlert className="h-4.5 w-4.5 text-cyan-400" />
              Target Improvement Areas
            </h3>
            
            <div className="space-y-3">
              {data.weakAreas.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-slate-950 rounded-2xl p-4 border border-slate-850 flex items-start justify-between gap-4 text-xs text-left"
                >
                  <div className="space-y-1">
                    <p className="font-bold text-slate-205">{item.area}</p>
                    <p className="text-[11px] text-slate-450">{item.recommendation}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                    item.impact === 'High' ? 'bg-red-500/10 border border-red-500/20 text-red-400' : 'bg-orange-500/10 border border-orange-500/20 text-orange-400'
                  }`}>
                    {item.impact} Priority
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Weekly roadmap curriculum */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
            <Map className="h-4 w-4 text-cyan-400" />
            Curriculum Map
          </h3>

          <div className="glass-card rounded-3xl p-5 border border-slate-800 space-y-4">
            {data.roadmap.map((week, index) => (
              <div key={index} className="flex gap-3 relative text-left">
                {/* Connector line */}
                {index < data.roadmap.length - 1 && (
                  <div className="absolute top-8 left-3.5 w-[2px] h-12 bg-slate-800/80"></div>
                )}
                
                {/* Week node circle */}
                <div className={`h-7.5 w-7.5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 z-10 border ${
                  week.status === 'Completed' ? 'bg-green-500/10 border-green-500 text-green-400' :
                  week.status === 'In Progress' ? 'bg-blue-600/20 border-cyan-400 text-cyan-400 animate-pulse' :
                  'bg-slate-950 border-slate-800 text-slate-600'
                }`}>
                  {week.status === 'Completed' ? '✓' : week.week}
                </div>

                <div className="space-y-1 pb-4">
                  <div className="flex items-baseline gap-2">
                    <h4 className="text-xs font-bold text-white">Week {week.week}: {week.title}</h4>
                  </div>
                  <p className="text-[10px] text-slate-450 leading-relaxed">{week.desc}</p>
                  
                  {week.status === 'In Progress' && (
                    <span className="inline-block text-[8px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 mt-1">
                      Active Week
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
