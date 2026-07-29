import React, { useState } from 'react';
import { Mic, Volume2, HelpCircle } from 'lucide-react';

export default function VoiceAssistantButton({ speakText, currentTab }) {
  const [isOpen, setIsOpen] = useState(false);

  const getHelpPrompt = () => {
    switch (currentTab) {
      case 'landing':
        return "Welcome to WorkWise AI. Tap 'Get Started' to configure your accessibility profile and begin learning.";
      case 'auth':
        return "This is the authentication page. You can log in, sign up, use Google, or click Guest login to proceed instantly.";
      case 'accessibility-setup':
        return "Accessibility profile settings. Select your disability type, adjust font sizes, color contrasts, or narration speeds here.";
      case 'dashboard':
        return "Your learning dashboard. Here you can start the AI Interview Coach, Conversation Simulator, Resume Analyzer, and review achievements.";
      case 'resume-upload':
        return "Resume Analyzer. Drag and drop your resume in PDF format or click upload to pull skills and generate custom questions.";
      case 'interview-screen':
        return "AI Interview Screen. Speak into the microphone, view live speech transcripts, and click next question to review detailed grammar and tone reports.";
      case 'conversation-simulator':
        return "Conversation simulator. Select a workplace scenario like HR interview or coffee break. Practice responding to dynamic situations with emotion alerts.";
      case 'emotion-detection':
        return "Emotion feedback interface. Monitors nervousness and outputs cognitive breathing exercises or calming tips if anxiety is detected.";
      case 'translation-assistant':
        return "Workplace translation assistant. Translate colloquial sentences into formal corporate statements in English, Tamil, Hindi, Telugu, and Malayalam.";
      case 'personalized-learning':
        return "Learning roadmap. Shows your focus topics, daily exercises, and weak areas needing attention.";
      case 'analytics':
        return "Analytics board. View trends for confidence score, speaking speed, grammar feedback, and unlocked badges.";
      case 'profile':
        return "User profile. Review your completed certifications, preference profiles, and overall statistics.";
      default:
        return "WorkWise AI is ready to assist you. Tap any menu item to begin.";
    }
  };

  const handleMicClick = () => {
    const text = getHelpPrompt();
    speakText(text);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {isOpen && (
        <div className="mb-2 max-w-xs rounded-xl glass-card border border-slate-700/60 p-3 shadow-xl text-xs text-slate-200 animate-fade-in flex flex-col gap-1.5">
          <span className="font-bold text-cyan-400 flex items-center gap-1">
            <Volume2 className="h-3.5 w-3.5" />
            AI Audio Companion
          </span>
          <p>
            {getHelpPrompt()}
          </p>
          <button 
            onClick={handleMicClick}
            className="mt-1 w-full rounded bg-cyan-500 hover:bg-cyan-600 px-2 py-1 text-slate-900 font-semibold text-[10px] uppercase tracking-wider text-center"
          >
            Play Narration
          </button>
        </div>
      )}
      
      <div className="flex gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 border border-slate-750 text-slate-300 hover:text-white shadow-lg focus:outline-none"
          aria-label="Get page voice tips"
        >
          <HelpCircle className="h-5 w-5" />
        </button>

        <button
          onClick={handleMicClick}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all"
          aria-label="Trigger AI Voice narration helper"
        >
          <Mic className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
