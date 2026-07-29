import React, { useState, useEffect } from 'react';
import Navbar from './components/Common/Navbar';
import VoiceAssistantButton from './components/Common/VoiceAssistantButton';
import LandingPage from './components/LandingPage';
import Auth from './components/Auth';
import AccessibilitySetup from './components/AccessibilitySetup';
import Dashboard from './components/Dashboard';
import ResumeUpload from './components/ResumeUpload';
import InterviewScreen from './components/InterviewScreen';
import ConversationSimulator from './components/ConversationSimulator';
import EmotionDetection from './components/EmotionDetection';
import TranslationAssistant from './components/TranslationAssistant';
import PersonalizedLearning from './components/PersonalizedLearning';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import Profile from './components/Profile';
import { Home, MessageSquare, BarChart2, User } from 'lucide-react';

export default function App() {
  const [username, setUsername] = useState('');
  const [activeTab, setActiveTab] = useState('landing');
  const [streak, setStreak] = useState(5);
  const [xp, setXp] = useState(1450);
  const [interviewQuestions, setInterviewQuestions] = useState([]);
  
  // Accessibility Defaults
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    disabilityType: '',
    fontSize: 'standard',
    theme: 'dark',
    voiceSpeed: 1.0,
    language: 'English'
  });

  const [isSpeaking, setIsSpeaking] = useState(false);

  // HTML5 SpeechSynthesis Helper
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop existing speech
      if (!text) return;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = accessibilitySettings.voiceSpeed;
      
      // Attempt to load Indian English voice if language matches, or defaults
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        // Find best match voice
        const matchedVoice = voices.find(v => v.lang.includes('IN') || v.lang.includes('en-IN'));
        if (matchedVoice) {
          utterance.voice = matchedVoice;
        }
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Add XP helper
  const addXp = (amount) => {
    setXp(prev => prev + amount);
  };

  // Setup initial voices trigger for browser support
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  // Sync settings modifications to UI body styling
  useEffect(() => {
    // Dyslexia custom spacing
    if (accessibilitySettings.disabilityType === 'dyslexia') {
      document.body.classList.add('font-dyslexic');
      document.body.style.letterSpacing = '0.15em';
      document.body.style.wordSpacing = '0.3em';
      document.body.style.lineHeight = '2';
    } else {
      document.body.classList.remove('font-dyslexic');
      document.body.style.letterSpacing = 'normal';
      document.body.style.wordSpacing = 'normal';
      document.body.style.lineHeight = 'normal';
    }

    // High contrast override
    if (accessibilitySettings.theme === 'high-contrast') {
      document.body.style.backgroundColor = '#000000';
    } else {
      document.body.style.backgroundColor = '#0b0f19';
    }
  }, [accessibilitySettings]);

  const updateUsername = (name) => {
    setUsername(name);
  };

  // Render correct content pane
  const renderContent = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage setActiveTab={setActiveTab} speakText={speakText} />;
      case 'auth':
        return <Auth setActiveTab={setActiveTab} speakText={speakText} updateUsername={updateUsername} />;
      case 'accessibility-setup':
        return (
          <AccessibilitySetup
            accessibilitySettings={accessibilitySettings}
            setAccessibilitySettings={setAccessibilitySettings}
            speakText={speakText}
          />
        );
      case 'dashboard':
        return (
          <Dashboard
            username={username}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            streak={streak}
            xp={xp}
            accessibilitySettings={accessibilitySettings}
            speakText={speakText}
          />
        );
      case 'resume-upload':
        return (
          <ResumeUpload
            setActiveTab={setActiveTab}
            setInterviewQuestions={setInterviewQuestions}
            speakText={speakText}
          />
        );
      case 'interview-screen':
        return (
          <InterviewScreen
            interviewQuestions={interviewQuestions}
            addXp={addXp}
            speakText={speakText}
            stopSpeaking={stopSpeaking}
            accessibilitySettings={accessibilitySettings}
          />
        );
      case 'conversation-simulator':
        return (
          <ConversationSimulator
            speakText={speakText}
            accessibilitySettings={accessibilitySettings}
            addXp={addXp}
          />
        );
      case 'emotion-detection':
        return (
          <EmotionDetection
            speakText={speakText}
            accessibilitySettings={accessibilitySettings}
          />
        );
      case 'translation-assistant':
        return (
          <TranslationAssistant
            speakText={speakText}
            accessibilitySettings={accessibilitySettings}
          />
        );
      case 'personalized-learning':
        return (
          <PersonalizedLearning
            setActiveTab={setActiveTab}
            speakText={speakText}
            accessibilitySettings={accessibilitySettings}
          />
        );
      case 'analytics':
        return (
          <AnalyticsDashboard
            speakText={speakText}
            accessibilitySettings={accessibilitySettings}
          />
        );
      case 'profile':
        return (
          <Profile
            username={username}
            streak={streak}
            xp={xp}
            accessibilitySettings={accessibilitySettings}
            speakText={speakText}
          />
        );
      default:
        return <LandingPage setActiveTab={setActiveTab} speakText={speakText} />;
    }
  };

  // Determine text sizes class based on accessibility scaling configuration
  const fontClass = 
    accessibilitySettings.fontSize === 'large' ? 'text-lg' : 
    accessibilitySettings.fontSize === 'extra-large' ? 'text-xl' : 'text-sm';

  const containerClass = 
    accessibilitySettings.theme === 'high-contrast' 
      ? 'min-h-screen text-white bg-black border-2 border-white' 
      : 'min-h-screen text-slate-100 bg-[#0b0f19]';

  const isAuthOrLanding = activeTab === 'landing' || activeTab === 'auth';

  return (
    <div className={`${containerClass} ${fontClass} pb-24 flex flex-col justify-between`}>
      
      {/* Dynamic Header / Navbar */}
      <Navbar 
        streak={streak} 
        xp={xp} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        accessibilitySettings={accessibilitySettings}
        speakText={speakText}
        stopSpeaking={stopSpeaking}
        isSpeaking={isSpeaking}
      />

      {/* Main viewport */}
      <main className="flex-1 w-full flex flex-col items-center">
        {renderContent()}
      </main>

      {/* Accessible Bottom Navigation (Hidden on Landing and Auth) */}
      {!isAuthOrLanding && (
        <nav 
          className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/90 border-t border-slate-800/80 backdrop-blur-md px-4 py-3 flex items-center justify-around"
          aria-label="Primary bottom navigation bar"
        >
          <button
            onClick={() => {
              speakText("Go to home dashboard");
              setActiveTab('dashboard');
            }}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
              activeTab === 'dashboard' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Home className="h-4.5 w-4.5" />
            Home
          </button>
          
          <button
            onClick={() => {
              speakText("Go to practice simulators");
              setActiveTab('conversation-simulator');
            }}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
              activeTab === 'conversation-simulator' || activeTab === 'interview-screen' || activeTab === 'resume-upload'
                ? 'text-cyan-400' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="h-4.5 w-4.5" />
            Practice
          </button>

          <button
            onClick={() => {
              speakText("Go to analytics and scores charts");
              setActiveTab('analytics');
            }}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
              activeTab === 'analytics' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart2 className="h-4.5 w-4.5" />
            Analytics
          </button>

          <button
            onClick={() => {
              speakText("Go to user profile settings");
              setActiveTab('profile');
            }}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
              activeTab === 'profile' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="h-4.5 w-4.5" />
            Profile
          </button>
        </nav>
      )}

      {/* Voice Assistant Floater Button */}
      <VoiceAssistantButton speakText={speakText} currentTab={activeTab} />

    </div>
  );
}
