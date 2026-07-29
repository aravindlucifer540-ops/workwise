import React, { useState, useEffect } from 'react';
import { Play, Mic, MicOff, RefreshCw, ChevronRight, Award, AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';

const DEFAULT_QUESTIONS = [
  "Can you introduce yourself and tell us why you are interested in this position?",
  "How do you handle situation when you realize you cannot meet a project deadline?",
  "Tell me about a technical project you worked on recently. What challenges did you face?"
];

const TRANSCRIPTS = [
  "Hi, I'm Aravind. I am a junior engineer specializing in building fully accessible and responsive user interfaces. I love collaborating with design teams to solve complex front-end challenges and make sure our apps comply with accessibility guidelines.",
  "If I realize a deadline is not achievable, I first check what is causing the delay. Then I document the issues and reach out to my manager immediately. I believe in being transparent and presenting alternative plans or milestones to keep the project on track.",
  "Recently, I worked on building a custom dashboard interface. The primary challenge was managing the state transitions while rendering SVG charts smoothly. I optimized the renders by separating components and using memoized hooks to handle dynamic calculations."
];

export default function InterviewScreen({ interviewQuestions, addXp, speakText, stopSpeaking, accessibilitySettings }) {
  const questions = interviewQuestions.length > 0 ? interviewQuestions : DEFAULT_QUESTIONS;
  
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Handle Transcript Typewriter simulation
  useEffect(() => {
    let timeout = null;
    if (isRecording) {
      const fullText = TRANSCRIPTS[currentQIndex % TRANSCRIPTS.length];
      let charIdx = 0;
      setTranscript('');
      
      const typeText = () => {
        if (charIdx < fullText.length) {
          setTranscript(prev => prev + fullText[charIdx]);
          charIdx++;
          timeout = setTimeout(typeText, 45); // Adjust typing speed
        }
      };
      
      timeout = setTimeout(typeText, 1000); // Wait 1 sec before starting
    } else {
      clearTimeout(timeout);
    }
    return () => clearTimeout(timeout);
  }, [isRecording, currentQIndex]);

  const handleMicToggle = () => {
    if (!isRecording) {
      setIsRecording(true);
      speakText("Recording started. Please respond to the active question.");
    } else {
      setIsRecording(false);
      speakText("Recording paused. Click next question to continue.");
    }
  };

  const formatTime = (timeInSecs) => {
    const mins = Math.floor(timeInSecs / 60);
    const secs = timeInSecs % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleNextQuestion = () => {
    setIsRecording(false);
    setTimer(0);
    setTranscript('');
    
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      speakText(`Loading question ${currentQIndex + 2}. ${questions[currentQIndex + 1]}`);
    } else {
      setCompleted(true);
      setShowFeedback(true);
      addXp(150); // Add XP for finishing an interview
      speakText("Interview completed. Loading detailed performance feedback report.");
    }
  };

  const handleRestart = () => {
    setCurrentQIndex(0);
    setTimer(0);
    setTranscript('');
    setIsRecording(false);
    setCompleted(false);
    setShowFeedback(false);
    speakText("Restarting interview simulator.");
  };

  // Contrast theme selections
  const textClass = accessibilitySettings.fontSize === 'large' ? 'text-lg' : accessibilitySettings.fontSize === 'extra-large' ? 'text-xl' : 'text-sm';
  const headingClass = accessibilitySettings.fontSize === 'large' ? 'text-2xl' : accessibilitySettings.fontSize === 'extra-large' ? 'text-3xl' : 'text-xl';
  const isSpeechDisability = accessibilitySettings.disabilityType === 'speech';

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-8 text-left">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/85 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
            <Mic className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">AI Interview Coach</h2>
            <p className="text-xs text-slate-400">Practice behavioral and custom questions in a live simulator</p>
          </div>
        </div>
        {completed && (
          <button
            onClick={handleRestart}
            className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 px-3 py-2 text-xs font-bold text-slate-300"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Restart Test
          </button>
        )}
      </div>

      {!showFeedback ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left panel: Avatar and wave */}
          <div className="lg:col-span-1 glass-card rounded-3xl p-6 border border-slate-800 flex flex-col items-center gap-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-24 h-24 rounded-full bg-cyan-600/5 blur-2xl pointer-events-none"></div>
            
            {/* AI Avatar visual */}
            <div className="relative h-32 w-32 rounded-full border-2 border-cyan-400/30 bg-slate-950 flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 100 100" className="h-24 w-24 text-cyan-400" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Robot head */}
                <rect x="25" y="30" width="50" height="40" rx="12" fill="#0f172a" stroke="#38BDF8" strokeWidth="2.5" />
                <path d="M40 70 L45 80 L55 80 L60 70" stroke="#38BDF8" strokeWidth="2.5" />
                {/* Antenna */}
                <line x1="50" y1="30" x2="50" y2="18" stroke="#38BDF8" strokeWidth="2.5" />
                <circle cx="50" cy="18" r="4" fill="#2563EB" />
                {/* Glowing Eyes */}
                <circle cx="42" cy="48" r="4.5" fill={isRecording ? "#22C55E" : "#38BDF8"} className={isRecording ? "animate-ping" : ""} />
                <circle cx="42" cy="48" r="3.5" fill={isRecording ? "#22C55E" : "#38BDF8"} />
                <circle cx="58" cy="48" r="4.5" fill={isRecording ? "#22C55E" : "#38BDF8"} className={isRecording ? "animate-ping" : ""} />
                <circle cx="58" cy="48" r="3.5" fill={isRecording ? "#22C55E" : "#38BDF8"} />
                {/* Mouth */}
                <path d="M42 60 Q50 63 58 60" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            
            {/* Waveform graphic */}
            <div className="flex items-center gap-1.5 h-12">
              <div className={`w-1 rounded-full bg-cyan-400 ${isRecording ? 'animate-wave-1' : 'h-2 bg-slate-700'}`}></div>
              <div className={`w-1 rounded-full bg-cyan-400 ${isRecording ? 'animate-wave-2' : 'h-3 bg-slate-700'}`}></div>
              <div className={`w-1 rounded-full bg-cyan-300 ${isRecording ? 'animate-wave-3' : 'h-1.5 bg-slate-700'}`}></div>
              <div className={`w-1 rounded-full bg-blue-500 ${isRecording ? 'animate-wave-4' : 'h-4 bg-slate-700'}`}></div>
              <div className={`w-1 rounded-full bg-cyan-400 ${isRecording ? 'animate-wave-2' : 'h-2 bg-slate-700'}`}></div>
              <div className={`w-1 rounded-full bg-cyan-300 ${isRecording ? 'animate-wave-1' : 'h-3.5 bg-slate-700'}`}></div>
            </div>

            {/* Mic Toggle Button */}
            <div className="flex flex-col items-center gap-2 w-full">
              <button
                onClick={handleMicToggle}
                className={`flex h-16 w-16 items-center justify-center rounded-full transition-all shadow-lg ${
                  isRecording
                    ? 'bg-red-500 text-white hover:bg-red-600 shadow-red-500/20 scale-105'
                    : 'bg-gradient-to-tr from-blue-600 to-cyan-500 text-white hover:scale-105 active:scale-95 shadow-blue-500/25'
                }`}
                aria-label={isRecording ? "Stop voice recording" : "Start voice recording"}
              >
                {isRecording ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
              </button>
              <span className="text-[11px] font-bold tracking-wider uppercase text-slate-450 mt-1">
                {isRecording ? "Stop Response" : "Tap to Speak"}
              </span>
            </div>

            {/* Visual Speech Metronome (ADHD/Speech impairments) */}
            {isSpeechDisability && (
              <div className="w-full bg-slate-950 rounded-xl p-3 border border-slate-850 text-center space-y-1.5">
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">Pacing Metronome</span>
                <div className="flex items-center justify-center gap-1.5">
                  <div className={`h-2.5 w-2.5 rounded-full ${isRecording && (timer % 3 === 0) ? 'bg-cyan-400' : 'bg-slate-800'}`}></div>
                  <div className={`h-2.5 w-2.5 rounded-full ${isRecording && (timer % 3 === 1) ? 'bg-cyan-400' : 'bg-slate-800'}`}></div>
                  <div className={`h-2.5 w-2.5 rounded-full ${isRecording && (timer % 3 === 2) ? 'bg-cyan-400' : 'bg-slate-800'}`}></div>
                </div>
                <span className="text-[9px] text-slate-500">Blink signals average word-pause cycles</span>
              </div>
            )}

          </div>

          {/* Right panel: Active Question, timer, and live transcript */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Active Question Box */}
            <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800/80 pb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400">
                  Question {currentQIndex + 1} of {questions.length}
                </span>
                
                {/* Timer block */}
                <div className="flex items-center gap-1.5 text-slate-300 font-bold text-xs bg-slate-900 border border-slate-800 rounded-lg px-2 py-1">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
                  <span>{formatTime(timer)}</span>
                </div>
              </div>

              <h3 className={`${headingClass} font-extrabold text-white leading-snug`}>
                {questions[currentQIndex]}
              </h3>
            </div>

            {/* Transcript Area */}
            <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-3 h-[240px] flex flex-col justify-between">
              <div className="space-y-2 overflow-y-auto max-h-[170px] text-left">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 block">
                  Live Response Transcript
                </span>
                
                {transcript ? (
                  <p className={`${textClass} text-slate-200 leading-relaxed font-semibold italic`}>
                    "{transcript}"
                  </p>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center text-slate-650 h-[100px] gap-2">
                    <AlertCircle className="h-6 w-6 stroke-slate-700" />
                    <p className="text-xs">No active recording transcript. Tap the microphone below the avatar and speak your answer.</p>
                  </div>
                )}
              </div>

              {/* Next CTA */}
              <button
                onClick={handleNextQuestion}
                disabled={!transcript && !isRecording}
                className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-slate-800 border border-slate-750 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-white font-bold py-3 text-sm transition-all"
              >
                {currentQIndex === questions.length - 1 ? "Finish and Analyze" : "Next Question"}
                <ChevronRight className="h-4.5 w-4.5" />
              </button>
            </div>

          </div>

        </div>
      ) : (
        /* Feedback Panel */
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-8 relative overflow-hidden animate-fade-in text-left">
          
          <div className="absolute top-0 left-0 w-48 h-48 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none"></div>
          
          {/* Feedback title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold bg-green-500/10 border border-green-500/20 text-green-400 px-2 py-0.5 rounded uppercase tracking-wider">
                ✓ Evaluation Ready
              </span>
              <h3 className="text-2xl font-bold text-white">AI Coach Performance Report</h3>
            </div>
            
            <div className="flex items-center gap-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20 px-3.5 py-1.5 text-yellow-400 font-bold text-sm">
              <Award className="h-4.5 w-4.5" />
              +150 XP Earned
            </div>
          </div>

          {/* Key Metric Blocks */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* Score 1 */}
            <div className="bg-slate-900/50 border border-slate-850 p-4 rounded-2xl text-center space-y-1">
              <span className="text-[10px] text-slate-450 uppercase tracking-wider block font-semibold">Confidence</span>
              <span className="text-3xl font-extrabold text-cyan-400">86%</span>
              <span className="text-[10px] text-green-400 block font-bold">✓ Excellent</span>
            </div>

            {/* Score 2 */}
            <div className="bg-slate-900/50 border border-slate-850 p-4 rounded-2xl text-center space-y-1">
              <span className="text-[10px] text-slate-450 uppercase tracking-wider block font-semibold">Communication</span>
              <span className="text-3xl font-extrabold text-blue-400">80%</span>
              <span className="text-[10px] text-cyan-400 block font-bold">✓ Clear Pacing</span>
            </div>

            {/* Score 3 */}
            <div className="bg-slate-900/50 border border-slate-850 p-4 rounded-2xl text-center space-y-1">
              <span className="text-[10px] text-slate-450 uppercase tracking-wider block font-semibold">Grammar Score</span>
              <span className="text-3xl font-extrabold text-purple-400">92%</span>
              <span className="text-[10px] text-green-400 block font-bold">✓ Standard Verb Usage</span>
            </div>

            {/* Score 4 */}
            <div className="bg-slate-900/50 border border-slate-850 p-4 rounded-2xl text-center space-y-1">
              <span className="text-[10px] text-slate-450 uppercase tracking-wider block font-semibold">Workspace Tone</span>
              <span className="text-3xl font-extrabold text-pink-400">85%</span>
              <span className="text-[10px] text-cyan-400 block font-bold">✓ Highly Polite</span>
            </div>

            {/* Score 5 */}
            <div className="bg-slate-900/50 border border-slate-850 p-4 rounded-2xl text-center col-span-2 lg:col-span-1 space-y-1">
              <span className="text-[10px] text-slate-450 uppercase tracking-wider block font-semibold">Eye Contact</span>
              <span className="text-3xl font-extrabold text-teal-400">75%</span>
              <span className="text-[10px] text-slate-500 block font-bold">Centered view focus</span>
            </div>

          </div>

          {/* Coaching Suggestions & Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            
            {/* Positives */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-green-400" />
                Key Highlights
              </h4>
              <ul className="text-xs text-slate-350 space-y-2 list-disc pl-5 leading-relaxed">
                <li>You maintained an excellent speaking rate of 132 WPM, which sits perfectly inside the target workspace guidelines.</li>
                <li>Your introduction clearly stated both target milestones and technical experience parameters.</li>
                <li>Grammar usage was cohesive, with solid passive voicing during structured issue statements.</li>
              </ul>
            </div>

            {/* Negatives / Recommendations */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                <HelpCircle className="h-4 w-4 text-cyan-400" />
                AI Coach Suggestions
              </h4>
              <ul className="text-xs text-slate-350 space-y-2 list-disc pl-5 leading-relaxed">
                <li>During Question 2, you rushed slightly after explaining the roadblock. Try to pause for 1 second before presenting solutions.</li>
                <li>Consider substituting colloquial words like "crazy" or "bad" with corporate alignments like "significant challenge" or "needs revisions".</li>
                <li>Your camera view detected slight down-left eye shift tendencies during complex memory lookups. Try to look at the lens.</li>
              </ul>
            </div>

          </div>

          {/* CTA actions */}
          <div className="flex gap-4 pt-4 border-t border-slate-800/80">
            <button
              onClick={handleRestart}
              className="flex-1 rounded-xl bg-slate-800 border border-slate-750 hover:bg-slate-700 text-white font-bold py-3 text-sm transition-all focus:ring-2 focus:ring-cyan-400"
            >
              Practice Again
            </button>
            
            <button
              onClick={() => {
                speakText("Redirecting to social scenarios trainer.");
                setActiveTab('conversation-simulator');
              }}
              className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-slate-900 font-bold py-3 text-sm transition-all focus:ring-2 focus:ring-cyan-400"
            >
              Try Social Simulator
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
