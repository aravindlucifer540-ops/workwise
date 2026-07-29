import React, { useState } from 'react';
import { Settings, Eye, Volume2, Type, Check, ShieldAlert } from 'lucide-react';

const DISABILITIES = [
  { id: 'hearing', name: 'Hearing Impairment', desc: 'Prominent transcripts and visual indicators for sound cues.' },
  { id: 'speech', name: 'Speech Difficulty', desc: 'Adjusted timer speeds and visual metronome speech pacing.' },
  { id: 'autism', name: 'Autism Spectrum', desc: 'Simplified tips, muted tones, and minimal distraction interface.' },
  { id: 'adhd', name: 'ADHD / Focus Mode', desc: 'Visual progress milestones, active timeboxing, and no animations.' },
  { id: 'dyslexia', name: 'Dyslexia Friendly', desc: 'Increased line height, word spacing, and high-readability fonts.' },
  { id: 'lowvision', name: 'Low Vision', desc: 'High contrast styling, large text presets, and audio narration guides.' }
];

export default function AccessibilitySetup({ accessibilitySettings, setAccessibilitySettings, speakText }) {
  const [localSettings, setLocalSettings] = useState({ ...accessibilitySettings });

  const handleDisabilityToggle = (id) => {
    setLocalSettings(prev => ({
      ...prev,
      disabilityType: prev.disabilityType === id ? '' : id
    }));
    const name = DISABILITIES.find(d => d.id === id)?.name;
    speakText(`Selected disability profile: ${name || 'None'}`);
  };

  const handleSave = () => {
    setAccessibilitySettings(localSettings);
    speakText("Preferences saved successfully. Layout and assistant voices have been adjusted.");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 text-left space-y-8">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
          <Settings className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Accessibility Center</h2>
          <p className="text-xs text-slate-400">Customize the WorkWise UI and assistant speech patterns to fit your needs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left: Disability Profile Selection */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-cyan-400" />
            1. Select Disability Profile
          </h3>
          <p className="text-xs text-slate-450">This automatically sets optimal layouts and naration assistants.</p>
          
          <div className="space-y-3">
            {DISABILITIES.map(profile => (
              <button
                key={profile.id}
                onClick={() => handleDisabilityToggle(profile.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${
                  localSettings.disabilityType === profile.id
                    ? 'bg-blue-600/20 border-cyan-400 text-white ring-1 ring-cyan-400'
                    : 'bg-slate-900/40 border-slate-800/80 text-slate-300 hover:bg-slate-800/40'
                }`}
                aria-label={`Toggle profile for ${profile.name}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-100">{profile.name}</span>
                  {localSettings.disabilityType === profile.id && (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400 text-slate-900">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{profile.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Fine-Grained Controls */}
        <div className="space-y-6">
          
          {/* Font Scaling */}
          <div className="space-y-3 p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Type className="h-4 w-4 text-cyan-400" />
              Font Size Scaling
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {['standard', 'large', 'extra-large'].map(size => (
                <button
                  key={size}
                  onClick={() => {
                    setLocalSettings(prev => ({ ...prev, fontSize: size }));
                    speakText(`Font size set to ${size}`);
                  }}
                  className={`py-2 rounded-xl text-xs font-bold border capitalize transition-all ${
                    localSettings.fontSize === size
                      ? 'bg-cyan-500 border-cyan-400 text-slate-900'
                      : 'bg-slate-950 border-slate-800 text-slate-350 hover:bg-slate-800'
                  }`}
                >
                  {size.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Theme selection */}
          <div className="space-y-3 p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Eye className="h-4 w-4 text-cyan-400" />
              Theme Mode
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {['dark', 'high-contrast', 'minimalist'].map(theme => (
                <button
                  key={theme}
                  onClick={() => {
                    setLocalSettings(prev => ({ ...prev, theme }));
                    speakText(`Theme set to ${theme}`);
                  }}
                  className={`py-2 rounded-xl text-xs font-bold border capitalize transition-all ${
                    localSettings.theme === theme
                      ? 'bg-cyan-500 border-cyan-400 text-slate-900'
                      : 'bg-slate-950 border-slate-800 text-slate-350 hover:bg-slate-800'
                  }`}
                >
                  {theme.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Voice speed */}
          <div className="space-y-3 p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-cyan-400" />
              Narration Speech Rate
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Slow (0.8x)', val: 0.8 },
                { label: 'Normal (1.0x)', val: 1.0 },
                { label: 'Fast (1.2x)', val: 1.2 }
              ].map(speed => (
                <button
                  key={speed.val}
                  onClick={() => {
                    setLocalSettings(prev => ({ ...prev, voiceSpeed: speed.val }));
                    speakText(`Narration speed set to ${speed.label}`);
                  }}
                  className={`py-2 rounded-xl text-[11px] font-bold border transition-all ${
                    localSettings.voiceSpeed === speed.val
                      ? 'bg-cyan-500 border-cyan-400 text-slate-900'
                      : 'bg-slate-950 border-slate-800 text-slate-350 hover:bg-slate-800'
                  }`}
                >
                  {speed.label}
                </button>
              ))}
            </div>
          </div>

          {/* Language Selection */}
          <div className="space-y-3 p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <h3 className="text-sm font-bold text-white">System Language</h3>
            <select
              value={localSettings.language}
              onChange={(e) => {
                setLocalSettings(prev => ({ ...prev, language: e.target.value }));
                speakText(`Language changed to ${e.target.value}`);
              }}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-slate-300 text-sm focus:border-cyan-400"
            >
              <option value="English">English (Workspace Standard)</option>
              <option value="Tamil">Tamil (தமிழ்)</option>
              <option value="Hindi">Hindi (हिन्दी)</option>
              <option value="Telugu">Telugu (తెలుగు)</option>
              <option value="Malayalam">Malayalam (മലയാളം)</option>
            </select>
          </div>

          {/* Action trigger */}
          <button
            onClick={handleSave}
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-slate-900 font-bold py-3.5 text-sm transition-all focus:ring-2 focus:ring-cyan-400 shadow-lg shadow-blue-500/10"
          >
            Save Profile Settings
          </button>

        </div>

      </div>

    </div>
  );
}
