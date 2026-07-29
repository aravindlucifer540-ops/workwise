import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, Brain, RefreshCw } from 'lucide-react';

export default function ResumeUpload({ setActiveTab, setInterviewQuestions, speakText }) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [parseStep, setParseStep] = useState(0);
  const [resumeData, setResumeData] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      startMockParsing(e.dataTransfer.files[0].name);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      startMockParsing(e.target.files[0].name);
    }
  };

  const startMockParsing = (fileName) => {
    setIsParsing(true);
    setParseStep(1);
    speakText(`Uploading and parsing ${fileName}`);
    
    // Simulate steps in parser
    setTimeout(() => {
      setParseStep(2);
      speakText("Extracting technical skill sets.");
    }, 1200);

    setTimeout(() => {
      setParseStep(3);
      speakText("Analyzing professional experience blocks.");
    }, 2400);

    setTimeout(() => {
      setIsParsing(false);
      setResumeData({
        name: 'Aravind Kumar',
        fileName: fileName,
        title: 'Junior UI Engineer',
        skills: ['React', 'JavaScript (ES6+)', 'Tailwind CSS', 'Web Accessibility (WCAG)', 'HTML5 & CSS Grid', 'Git & CI/CD', 'Responsive Design'],
        experience: '2 Years in Frontend Engineering, focus on responsive architectures and semantic layouts.'
      });
      speakText("Resume parsed successfully. Technical skills and experience extracted.");
    }, 3600);
  };

  const handleGenerateQuestions = () => {
    // Generate questions matching skills
    const customQuestions = [
      "Can you describe a time you implemented WCAG accessibility compliance standards in a React app?",
      "How do you manage complex CSS layout changes using Tailwind CSS and keep classes clean?",
      "Tell me about a difficult Git merge conflict you resolved when working within a multi-member team."
    ];
    setInterviewQuestions(customQuestions);
    speakText("Custom interview questions generated based on your skills. Navigating to the AI Coach simulator.");
    setActiveTab('interview-screen');
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 text-left space-y-8">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
          <FileText className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Resume Skill Analyzer</h2>
          <p className="text-xs text-slate-400">Upload your professional resume to bootstrap custom, targetted interview coaching</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left column: Upload & Progress */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-slate-200">1. Drag & Drop PDF Resume</h3>
          
          {!isParsing && !resumeData && (
            <label
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`flex flex-col items-center justify-center border-2 border-dashed rounded-3xl p-10 text-center cursor-pointer transition-all ${
                isDragActive
                  ? 'border-cyan-400 bg-cyan-500/5 scale-102'
                  : 'border-slate-800 bg-slate-900/20 hover:bg-slate-900/40 hover:border-slate-700/60'
              }`}
            >
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleFileChange}
              />
              <Upload className="h-10 w-10 text-slate-500 mb-4 animate-bounce" />
              <span className="text-sm font-bold text-slate-250">Drop your resume here</span>
              <span className="text-xs text-slate-500 mt-1.5">Supports PDF, DOC, DOCX up to 5MB</span>
              <span className="mt-4 px-3 py-1.5 text-[10px] font-extrabold bg-slate-800 text-slate-350 rounded-lg border border-slate-700/50 uppercase tracking-wider">
                Browse Files
              </span>
            </label>
          )}

          {/* Parsing progress view */}
          {isParsing && (
            <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 text-center space-y-6 glass-card">
              <RefreshCw className="h-10 w-10 text-cyan-400 animate-spin mx-auto" />
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-white">Parsing Your Document</h4>
                
                {/* Loader track */}
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-500" 
                    style={{ width: `${parseStep * 33.3}%` }}
                  ></div>
                </div>

                <div className="flex flex-col gap-1 text-[11px] font-semibold text-slate-450 mt-2">
                  <span className={parseStep >= 1 ? "text-cyan-400" : ""}>✓ Uploading document file structure</span>
                  <span className={parseStep >= 2 ? "text-cyan-400" : ""}>{parseStep >= 2 ? "✓" : "○"} Parsing tech skills tagging</span>
                  <span className={parseStep >= 3 ? "text-cyan-400" : ""}>{parseStep >= 3 ? "✓" : "○"} Structuring custom interview checklist</span>
                </div>
              </div>
            </div>
          )}

          {/* Reset / upload new link if done */}
          {resumeData && (
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-cyan-400" />
                <div>
                  <h4 className="text-xs font-bold text-white max-w-[150px] truncate">{resumeData.fileName}</h4>
                  <p className="text-[10px] text-slate-500">Successfully Analyzed</p>
                </div>
              </div>
              <button
                onClick={() => setResumeData(null)}
                className="text-xs font-bold text-red-400 hover:text-red-300"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {/* Right column: Extracted Details Preview */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-slate-200">2. Extracted Profile Insights</h3>
          
          {resumeData ? (
            <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-cyan-500/5 blur-2xl pointer-events-none"></div>
              
              {/* Profile details */}
              <div className="space-y-1.5 border-b border-slate-800/80 pb-4">
                <h4 className="text-lg font-bold text-white">{resumeData.name}</h4>
                <p className="text-xs text-cyan-400 font-semibold">{resumeData.title}</p>
                <p className="text-xs text-slate-400 mt-2 italic leading-relaxed">"{resumeData.experience}"</p>
              </div>

              {/* Extracted Skills List */}
              <div className="space-y-3">
                <span className="text-xs text-slate-350 font-bold block">Extracted Skill Tags:</span>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-2.5 py-1 text-[11px] font-semibold bg-slate-800/80 text-cyan-300 border border-slate-700/50 rounded-lg hover:border-cyan-500/35 transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Generate Questions CTA */}
              <button
                onClick={handleGenerateQuestions}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-slate-900 font-bold py-3.5 text-sm transition-all focus:ring-2 focus:ring-cyan-400 shadow-md shadow-blue-500/10"
              >
                <Brain className="h-4.5 w-4.5" />
                Generate Interview Questions
              </button>
            </div>
          ) : (
            <div className="h-[280px] rounded-3xl border border-slate-850 bg-slate-900/10 flex flex-col items-center justify-center text-center p-6 text-slate-500 space-y-2">
              <FileText className="h-8 w-8 text-slate-650" />
              <p className="text-sm font-semibold">No Resume Uploaded</p>
              <p className="text-xs text-slate-550 max-w-xs leading-relaxed">Please drop a resume file on the left container to inspect extracted parameters.</p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
