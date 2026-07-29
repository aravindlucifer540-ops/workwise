import React, { useState } from 'react';
import { UserPlus, LogIn, Globe, UserCheck } from 'lucide-react';

export default function Auth({ setActiveTab, speakText, updateUsername }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      speakText("Please enter both email and password.");
      return;
    }
    const name = email.split('@')[0];
    updateUsername(name.charAt(0).toUpperCase() + name.slice(1));
    speakText(`Logged in successfully. Welcome back, ${name}. Navigating to dashboard.`);
    setActiveTab('dashboard');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      speakText("Please fill out all input fields.");
      return;
    }
    updateUsername(fullName);
    speakText(`Registration successful. Welcome, ${fullName}. Navigating to dashboard.`);
    setActiveTab('dashboard');
  };

  const handleGuestLogin = () => {
    updateUsername('Guest Learner');
    speakText("Logged in as Guest. Redirecting you to the main dashboard.");
    setActiveTab('dashboard');
  };

  const handleGoogleLogin = () => {
    updateUsername('Aravind Kumar');
    speakText("Mock Google Login successful. Welcome back, Aravind. Redirecting to dashboard.");
    setActiveTab('dashboard');
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="glass-card rounded-3xl p-8 border border-slate-700/50 shadow-2xl relative">
        
        {/* Decorative elements */}
        <div className="absolute -top-12 -left-12 w-24 h-24 rounded-full bg-blue-500/10 blur-xl pointer-events-none"></div>
        
        {/* Branding header */}
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-3xl font-extrabold text-white">
            {isLogin ? "Welcome Back" : "Join WorkWise AI"}
          </h2>
          <p className="text-slate-400 text-sm">
            {isLogin ? "Log in to your workspace sandbox" : "Create an account to start tracking progress"}
          </p>
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-2 bg-slate-900/60 rounded-xl p-1.5 border border-slate-800/80 mb-6">
          <button
            onClick={() => {
              setIsLogin(true);
              speakText("Switched to Login form.");
            }}
            className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all ${
              isLogin 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LogIn className="h-4 w-4" />
            Login
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              speakText("Switched to Sign up form.");
            }}
            className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all ${
              !isLogin 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserPlus className="h-4 w-4" />
            Sign Up
          </button>
        </div>

        {/* Form panel */}
        {isLogin ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label htmlFor="login-email" className="text-xs font-semibold text-slate-350">
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full rounded-xl bg-slate-900/80 border border-slate-700/60 px-4 py-3 text-slate-100 text-sm focus:border-cyan-400"
              />
            </div>
            <div className="space-y-1.5 text-left">
              <label htmlFor="login-password" className="text-xs font-semibold text-slate-350">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl bg-slate-900/80 border border-slate-700/60 px-4 py-3 text-slate-100 text-sm focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 text-sm transition-all focus:ring-2 focus:ring-cyan-400 mt-2"
            >
              Sign In
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label htmlFor="reg-name" className="text-xs font-semibold text-slate-350">
                Full Name
              </label>
              <input
                id="reg-name"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Aravind Kumar"
                className="w-full rounded-xl bg-slate-900/80 border border-slate-700/60 px-4 py-3 text-slate-100 text-sm focus:border-cyan-400"
              />
            </div>
            <div className="space-y-1.5 text-left">
              <label htmlFor="reg-email" className="text-xs font-semibold text-slate-350">
                Email Address
              </label>
              <input
                id="reg-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aravind@company.com"
                className="w-full rounded-xl bg-slate-900/80 border border-slate-700/60 px-4 py-3 text-slate-100 text-sm focus:border-cyan-400"
              />
            </div>
            <div className="space-y-1.5 text-left">
              <label htmlFor="reg-password" className="text-xs font-semibold text-slate-350">
                Password
              </label>
              <input
                id="reg-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create password (min 6 chars)"
                className="w-full rounded-xl bg-slate-900/80 border border-slate-700/60 px-4 py-3 text-slate-100 text-sm focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 text-sm transition-all focus:ring-2 focus:ring-cyan-400 mt-2"
            >
              Create Account
            </button>
          </form>
        )}

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800/80"></div>
          </div>
          <span className="relative bg-[#0d1325] px-3 text-xs text-slate-500 font-semibold uppercase tracking-wider">
            Or continue with
          </span>
        </div>

        {/* Alternate log in pathways */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 rounded-xl bg-slate-900/50 border border-slate-850 hover:bg-slate-800/50 px-4 py-2.5 text-sm font-semibold text-slate-300 transition-all"
            aria-label="Log in with Google account"
          >
            <Globe className="h-4 w-4 text-red-400" />
            Google
          </button>
          <button
            onClick={handleGuestLogin}
            className="flex items-center justify-center gap-2 rounded-xl bg-slate-900/50 border border-slate-850 hover:bg-slate-800/50 px-4 py-2.5 text-sm font-semibold text-slate-300 transition-all"
            aria-label="Log in as guest visitor"
          >
            <UserCheck className="h-4 w-4 text-cyan-400" />
            Guest
          </button>
        </div>

      </div>
    </div>
  );
}
