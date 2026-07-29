import React, { useState, useEffect } from 'react';
import { SCENARIOS } from '../data/mockData';
import { ArrowLeft, Send, Mic, Play, ShieldAlert, Sparkles, Smile, RefreshCw } from 'lucide-react';

export default function ConversationSimulator({ speakText, accessibilitySettings, addXp }) {
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [transcriptText, setTranscriptText] = useState('');
  const [promptIndex, setPromptIndex] = useState(0);
  
  // Emotion simulation variables
  const [emotion, setEmotion] = useState('Neutral');
  const [tips, setTips] = useState([]);

  useEffect(() => {
    if (selectedScenario) {
      // Load initial message from AI
      setChatHistory([
        { sender: 'ai', text: selectedScenario.prompts[0], time: 'Just now' }
      ]);
      setPromptIndex(1);
      setTips(selectedScenario.tips);
      setEmotion('Neutral');
    }
  }, [selectedScenario]);

  const handleSelectScenario = (scenario) => {
    setSelectedScenario(scenario);
    speakText(`Started ${scenario.title}. AI asks: ${scenario.prompts[0]}`);
  };

  const handleMicToggle = () => {
    if (isRecording) {
      setIsRecording(false);
      // Generate user response based on prompt
      const mockResponses = [
        "Well, I faced a major database sync issue last quarter where our API was failing. I coordinated with the system admin to trace the logs, found the query mismatch, and fixed it within two hours.",
        "I would love to join because I want to apply my web accessibility skills to make software that is more usable. I see your company prioritizes responsive and clean design, which is exactly my focus area.",
        "Under tight deadlines, I break the project tasks into hourly schedules. I write down what I need, identify dependencies early, and sync with my manager to delegate components if blockers arise."
      ];
      const userText = mockResponses[promptIndex % mockResponses.length];
      setTranscriptText(userText);
      speakText("Recording finished. Message transcript generated.");
    } else {
      setIsRecording(true);
      setTranscriptText('');
      speakText("Recording started. Please speak your answer.");
    }
  };

  const handleSend = () => {
    if (!transcriptText) return;
    
    // Add user response to chat
    const updatedHistory = [
      ...chatHistory,
      { sender: 'user', text: transcriptText, time: 'Just now' }
    ];
    setChatHistory(updatedHistory);
    
    // Evaluate simulated emotion
    // Short responses or fast typing could trigger nervous. Let's vary it
    const emotionsPool = ['Happy', 'Nervous', 'Neutral', 'Neutral'];
    const newEmotion = emotionsPool[Math.floor(Math.random() * emotionsPool.length)];
    setEmotion(newEmotion);

    setTranscriptText('');

    // Generate AI response
    setTimeout(() => {
      if (promptIndex < selectedScenario.prompts.length) {
        const nextPrompt = selectedScenario.prompts[promptIndex];
        setChatHistory(prev => [
          ...prev,
          { sender: 'ai', text: nextPrompt, time: 'Just now' }
        ]);
        setPromptIndex(prev => prev + 1);
        speakText(`AI response: ${nextPrompt}`);
        addXp(40);
      } else {
        const conclusionText = "That's all the questions I had for today. You did a fantastic job navigating this discussion. I recommend reviewing your pacing results in the analytics tab.";
        setChatHistory(prev => [
          ...prev,
          { sender: 'ai', text: conclusionText, time: 'Just now' }
        ]);
        speakText(conclusionText);
        addXp(80);
      }
    }, 1500);
  };

  const handleBack = () => {
    setSelectedScenario(null);
    setChatHistory([]);
    setTranscriptText('');
    speakText("Returned to scenario selection screen.");
  };

  // Typography scaling
  const textClass = accessibilitySettings.fontSize === 'large' ? 'text-base' : accessibilitySettings.fontSize === 'extra-large' ? 'text-lg' : 'text-sm';
  const headerClass = accessibilitySettings.fontSize === 'large' ? 'text-xl' : accessibilitySettings.fontSize === 'extra-large' ? 'text-2xl' : 'text-md';

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 text-left space-y-6">
      
      {!selectedScenario ? (
        // Scenario Selection Grid
        <div className="space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-2xl font-bold text-white">Conversation Simulator</h2>
            <p className="text-xs text-slate-400">Practice communication in common workspace scenarios with live coaching tips</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SCENARIOS.map(scenario => (
              <button
                key={scenario.id}
                onClick={() => handleSelectScenario(scenario)}
                className="glass-card glass-card-hover p-6 rounded-3xl border border-slate-800 text-left space-y-4 focus:ring-2 focus:ring-cyan-400 flex flex-col justify-between"
                aria-label={`Start ${scenario.title} scenario`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-widest bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg">
                      {scenario.difficulty}
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold">{scenario.timeLimit}</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-extrabold text-white">{scenario.title}</h3>
                    <p className="text-xs text-slate-450 leading-relaxed">{scenario.description}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 w-full flex items-center justify-between text-xs font-bold text-cyan-400">
                  <span>Start Roleplay</span>
                  <Play className="h-3.5 w-3.5 fill-cyan-400" />
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        // Active Scenario Chat UI
        <div className="space-y-4">
          
          {/* Active Header */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-200"
              aria-label="Go back to scenario selector"
            >
              <ArrowLeft className="h-4 w-4" />
              Change Scenario
            </button>
            <h3 className={`${headerClass} font-bold text-white`}>{selectedScenario.title}</h3>
            
            {/* Emotion Indicator Badge */}
            <div className={`flex items-center gap-1 px-3 py-1 rounded-xl border text-xs font-bold ${
              emotion === 'Nervous' ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' :
              emotion === 'Happy' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
              'bg-blue-500/10 border-blue-500/20 text-blue-400'
            }`}>
              <Smile className="h-3.5 w-3.5" />
              <span>Pace: {emotion}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            
            {/* Chat Feed */}
            <div className="lg:col-span-3 glass-card border border-slate-800 rounded-3xl p-5 h-[480px] flex flex-col justify-between overflow-hidden">
              
              {/* Message Area */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 scrollbar-thin">
                {chatHistory.map((chat, idx) => (
                  <div 
                    key={idx} 
                    className={`flex flex-col max-w-[80%] ${chat.sender === 'ai' ? 'mr-auto items-start' : 'ml-auto items-end'}`}
                  >
                    <div className={`p-4 rounded-2xl ${
                      chat.sender === 'ai' 
                        ? 'bg-slate-900 border border-slate-800 text-slate-100' 
                        : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-900 font-semibold shadow-md shadow-blue-500/5'
                    }`}>
                      <p className={`${textClass} leading-relaxed`}>{chat.text}</p>
                    </div>
                    <span className="text-[9px] text-slate-550 mt-1 px-1 font-semibold">{chat.time}</span>
                  </div>
                ))}
              </div>

              {/* Chat Input & Mic Toggle */}
              <div className="border-t border-slate-850 pt-4 flex flex-col gap-3">
                
                {/* Simulated speech transcript */}
                {transcriptText && (
                  <div className="bg-slate-950 rounded-xl p-3 border border-slate-850 text-left">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Speech Transcript preview:</span>
                    <p className="text-xs text-slate-300 italic mt-0.5">"{transcriptText}"</p>
                  </div>
                )}

                <div className="flex gap-3">
                  {/* Speech input toggle */}
                  <button
                    onClick={handleMicToggle}
                    className={`h-11 w-11 rounded-xl flex items-center justify-center border transition-all ${
                      isRecording
                        ? 'bg-red-500 border-red-400 text-white animate-pulse'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/25'
                    }`}
                    aria-label={isRecording ? "Stop recording speech" : "Start recording speech"}
                  >
                    <Mic className="h-5 w-5" />
                  </button>

                  <input
                    type="text"
                    value={transcriptText}
                    onChange={(e) => setTranscriptText(e.target.value)}
                    placeholder={isRecording ? "Listening to speech..." : "Type your message or tap the mic to speak..."}
                    disabled={isRecording}
                    className="flex-1 rounded-xl bg-slate-900 border border-slate-800 px-4 text-xs text-slate-150 focus:border-cyan-400 disabled:opacity-50"
                  />

                  <button
                    onClick={handleSend}
                    disabled={!transcriptText || isRecording}
                    className="h-11 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:pointer-events-none text-white font-bold flex items-center gap-1.5 transition-all text-xs"
                    aria-label="Send response"
                  >
                    Send
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* Sidebar: Live Coaching Tips */}
            <div className="lg:col-span-1 space-y-6">
              
              <div className="glass-card rounded-3xl p-5 border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse" />
                  Live AI Tips
                </h4>
                
                <div className="space-y-3.5 text-xs text-slate-350 leading-relaxed">
                  {tips.map((tip, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <span className="h-5 w-5 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 font-bold text-[10px]">
                        {index + 1}
                      </span>
                      <p>{tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stress alert notification if nervous */}
              {emotion === 'Nervous' && (
                <div className="rounded-3xl border border-orange-500/30 bg-orange-500/5 p-4 space-y-2 text-xs text-left animate-pulse">
                  <div className="flex items-center gap-2 text-orange-400 font-bold">
                    <ShieldAlert className="h-4.5 w-4.5" />
                    Speech Speed Warning
                  </div>
                  <p className="text-slate-350 leading-relaxed">
                    AI detected that you spoke slightly too quickly. Take a deep breath, and try to speak slower in your next turn.
                  </p>
                </div>
              )}

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
