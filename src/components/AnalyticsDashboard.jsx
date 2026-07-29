import React from 'react';
import { ACHIEVEMENTS, ANALYTICS_DATA } from '../data/mockData';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart2, Award, Zap, BookOpen, CheckCircle } from 'lucide-react';

export default function AnalyticsDashboard({ speakText, accessibilitySettings }) {
  const data = ANALYTICS_DATA;
  const badges = ACHIEVEMENTS;

  const handleBadgeHover = (title, desc) => {
    speakText(`Badge unlocked: ${title}. ${desc}`);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-xs font-bold text-slate-200">
          <span>{payload[0].value} {payload[0].name === 'wpm' ? 'WPM' : payload[0].name === 'hours' ? 'hours' : '%'}</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-8 text-left">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
          <BarChart2 className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Performance Analytics</h2>
          <p className="text-xs text-slate-400">Detailed reviews of your pacing, confidence metrics, and training stats</p>
        </div>
      </div>

      {/* Grid for Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Chart 1: Confidence Trend */}
        <div className="glass-card rounded-3xl p-5 border border-slate-800 space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Confidence Trend (%)</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.confidenceTrend}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} domain={[40, 100]} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="score" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Speaking Speed */}
        <div className="glass-card rounded-3xl p-5 border border-slate-800 space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Speaking Speed (WPM vs Target 130)</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.speakingSpeed}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} domain={[100, 180]} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="wpm" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Grammar Improvement */}
        <div className="glass-card rounded-3xl p-5 border border-slate-800 space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Grammar Progression (%)</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.grammarImprovement}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} domain={[0, 100]} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="score" fill="#c084fc" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Practice Hours */}
        <div className="glass-card rounded-3xl p-5 border border-slate-800 space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Daily Practice Hours</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.practiceHours}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="hours" fill="#4ade80" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Badges Shelf */}
      <div className="space-y-4 pt-4">
        <h3 className="text-sm font-bold text-slate-205">Unlocked Achievements</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map(badge => {
            const Icon = 
              badge.icon === 'Zap' ? Zap : 
              badge.icon === 'BookOpen' ? BookOpen :
              badge.icon === 'CheckCircle' ? CheckCircle : Award;

            return (
              <div
                key={badge.id}
                onMouseEnter={() => handleBadgeHover(badge.title, badge.description)}
                className={`p-5 rounded-2xl border flex items-start gap-3.5 transition-all text-left ${badge.color}`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950/40 shrink-0 border border-current/15">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white leading-snug">{badge.title}</h4>
                  <p className="text-[10px] text-slate-350 leading-relaxed">{badge.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
