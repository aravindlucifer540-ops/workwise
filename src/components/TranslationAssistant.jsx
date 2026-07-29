import React, { useState } from 'react';
import { TRANSLATIONS } from '../data/mockData';
import { Languages, Volume2, Copy, Send, HelpCircle, Check } from 'lucide-react';

export default function TranslationAssistant({ speakText, accessibilitySettings }) {
  const [selectedLang, setSelectedLang] = useState('English');
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [copied, setCopied] = useState(false);

  const langData = TRANSLATIONS[selectedLang] || TRANSLATIONS['English'];

  const handleSelectExample = (item) => {
    setInputText(item.original);
    setTranslatedText(item.professional);
    speakText(`Casual input selected. Professional corporate translation generated.`);
  };

  const handleTranslateCustom = () => {
    if (!inputText) return;
    
    // Simulating custom translation logic
    const customTranslation = `In response to your query regarding "${inputText}", I would like to suggest we schedule an alignment sync to review the parameters in detail and ensure we are on the same page.`;
    setTranslatedText(customTranslation);
    speakText("Custom corporate translation generated.");
  };

  const handleCopy = () => {
    if (!translatedText) return;
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    speakText("Translation copied to clipboard.");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeakTranslation = () => {
    if (!translatedText) return;
    speakText(translatedText);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-8 text-left">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
            <Languages className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Workplace Translation Assistant</h2>
            <p className="text-xs text-slate-400">Convert direct or casual phrases into polite, professional workplace communication</p>
          </div>
        </div>

        {/* Language selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-bold">Select Language:</span>
          <select
            value={selectedLang}
            onChange={(e) => {
              setSelectedLang(e.target.value);
              setInputText('');
              setTranslatedText('');
              speakText(`Translation language changed to ${e.target.value}`);
            }}
            className="rounded-xl bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-slate-350 focus:border-cyan-400"
          >
            <option value="English">English</option>
            <option value="Tamil">Tamil (தமிழ்)</option>
            <option value="Hindi">Hindi (हिन्दी)</option>
            <option value="Telugu">Telugu (తెలుగు)</option>
            <option value="Malayalam">Malayalam (മലയാളം)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Column: Direct Casual Input */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-200">1. Direct / Casual Sentence</h3>
          
          <div className="glass-card rounded-3xl p-5 border border-slate-800 space-y-4">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your casual phrasing here (e.g. 'I don't care about this, deal with it yourself')..."
              rows={4}
              className="w-full rounded-2xl bg-slate-950 border border-slate-850 p-4 text-xs text-slate-200 focus:border-cyan-400"
            />
            
            <button
              onClick={handleTranslateCustom}
              disabled={!inputText}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-white font-bold py-3 text-sm transition-all border border-slate-750"
            >
              Refine Statement
            </button>
          </div>

          {/* Mapped Presets Grid */}
          <div className="space-y-2">
            <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
              <HelpCircle className="h-3.5 w-3.5" />
              Or click a common workplace scenario to translate:
            </span>
            <div className="space-y-2">
              {langData.scenarios.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectExample(item)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all text-xs font-semibold bg-slate-900/40 border-slate-850 hover:bg-slate-800/45 hover:border-slate-750 ${
                    inputText === item.original ? 'border-cyan-400/80 bg-slate-850' : 'text-slate-350'
                  }`}
                >
                  {item.original}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Polished corporate outputs */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-200">2. Professional Workplace translation</h3>
          
          <div className="glass-card rounded-3xl p-5 border border-slate-800 h-[220px] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-blue-500/5 blur-2xl pointer-events-none"></div>
            
            <div className="overflow-y-auto max-h-[140px] pr-2 text-left">
              {translatedText ? (
                <p className="text-xs font-semibold text-slate-200 leading-relaxed italic">
                  "{translatedText}"
                </p>
              ) : (
                <div className="flex flex-col items-center justify-center text-center text-slate-650 h-[100px] gap-2">
                  <Languages className="h-8 w-8 text-slate-750" />
                  <p className="text-xs">Translation details will render here. Choose a preset on the left column or type a custom query.</p>
                </div>
              )}
            </div>

            {/* Translation actions */}
            <div className="flex gap-3 border-t border-slate-850 pt-3">
              <button
                onClick={handleSpeakTranslation}
                disabled={!translatedText}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-850 text-slate-300 disabled:opacity-40 disabled:pointer-events-none py-2.5 text-xs font-bold transition-all"
                aria-label="Speak translated statement aloud"
              >
                <Volume2 className="h-4 w-4" />
                Listen
              </button>
              <button
                onClick={handleCopy}
                disabled={!translatedText}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-slate-900 disabled:opacity-40 disabled:pointer-events-none py-2.5 text-xs font-extrabold transition-all"
                aria-label="Copy translated text to clipboard"
              >
                {copied ? <Check className="h-4 w-4 text-slate-900" /> : <Copy className="h-4 w-4 text-slate-900" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          {/* Why it works banner */}
          {translatedText && (
            <div className="rounded-3xl border border-blue-500/10 bg-blue-500/5 p-4 space-y-1.5 text-xs text-left">
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">Coaching Tone Alert:</span>
              <p className="text-slate-350 leading-relaxed">
                This translation replaces direct confrontation with collaborative inquiries. It acknowledges the complexity of the task while politely asking for alignment, preserving positive relationships in your team.
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
