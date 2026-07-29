// Mock data for WorkWise AI application

export const SCENARIOS = [
  {
    id: 'hr-interview',
    title: 'HR Interview Practice',
    description: 'Practice basic behavioral and soft skill questions with our virtual HR manager.',
    icon: 'Briefcase',
    difficulty: 'Beginner',
    timeLimit: '5 mins',
    tips: [
      'Focus on using the STAR method (Situation, Task, Action, Result).',
      'Speak at a measured speed (around 120-150 words per minute).',
      'Use professional greetings like "Thank you for this opportunity."'
    ],
    prompts: [
      'Tell me about a time you handled a difficult task.',
      'Why do you want to join our organization?',
      'How do you manage stress and prioritize tasks under tight deadlines?'
    ]
  },
  {
    id: 'manager-discussion',
    title: 'Manager Discussion',
    description: 'Simulate a 1-on-1 status update and feedback session with your direct manager.',
    icon: 'UserCheck',
    difficulty: 'Intermediate',
    timeLimit: '8 mins',
    tips: [
      'Be transparent about roadblocks you are facing.',
      'Ask for feedback directly using polite terms.',
      'Propose solutions alongside the problems you bring up.'
    ],
    prompts: [
      'I noticed the latest module is slightly delayed. Can you give me an update?',
      'What areas of support do you need from my side to complete this project?',
      'How do you feel about the transition to our new workflow next week?'
    ]
  },
  {
    id: 'team-meeting',
    title: 'Team Standup Meeting',
    description: 'Practice presenting updates and participating in quick team alignment sessions.',
    icon: 'Users',
    difficulty: 'Beginner',
    timeLimit: '3 mins',
    tips: [
      'Keep your updates concise and punchy.',
      'Acknowledge others contributions: "Building on what Sarah mentioned..."',
      'State what you worked on yesterday, what you are doing today, and any blockages.'
    ],
    prompts: [
      'Let’s go around and share our daily updates. What is on your plate today?',
      'Does anyone have bandwidth to assist with the code review for the login module?',
      'Are there any major dependencies we need to resolve before the weekend?'
    ]
  },
  {
    id: 'client-meeting',
    title: 'Client Review Meeting',
    description: 'Learn how to present progress, handle difficult inquiries, and manage client feedback.',
    icon: 'Globe',
    difficulty: 'Advanced',
    timeLimit: '10 mins',
    tips: [
      'Frame setbacks positively and focus on the corrective roadmap.',
      'Use active listening: "If I understand correctly, your priority is..."',
      'Remain calm and avoid defensive language even if the client is unhappy.'
    ],
    prompts: [
      'We ran some tests on the dashboard and noticed latency issues. How do you plan to address this?',
      'Can you explain why this feature was designed this way? It doesn’t align with our initial request.',
      'What is the timeline for shipping the staging environment build?'
    ]
  },
  {
    id: 'coffee-break',
    title: 'Coffee Break (Watercooler Chat)',
    description: 'Practice casual, unstructured workspace conversations and small talk.',
    icon: 'Coffee',
    difficulty: 'Beginner',
    timeLimit: '4 mins',
    tips: [
      'Keep topics light: weekend plans, hobbies, movies, weather.',
      'Ask open-ended questions to show interest.',
      'Avoid controversial subjects (politics, salary, personal details).'
    ],
    prompts: [
      'Hey! Did you get a chance to watch the weekend match? It was crazy!',
      'I am planning to grab some lunch nearby. Do you have any good recommendations?',
      'Are you doing anything special for the upcoming holidays?'
    ]
  },
  {
    id: 'conflict-resolution',
    title: 'Conflict Resolution',
    description: 'Navigate tense communication situations and resolve misalignments politely.',
    icon: 'AlertTriangle',
    difficulty: 'Advanced',
    timeLimit: '7 mins',
    tips: [
      'Use "I" statements rather than "you" statements (e.g., "I feel overwhelmed" vs "You give too much work").',
      'Validate their point of view before presenting your own.',
      'Focus on finding a mutually beneficial compromise.'
    ],
    prompts: [
      'I think your design changes completely ignored the constraints I highlighted in the document.',
      'You did not respond to my slack messages for two days, and it blocked the entire QA process.',
      'I feel like my suggestions are always pushed aside during our planning calls.'
    ]
  }
];

export const TRANSLATIONS = {
  English: {
    scenarios: [
      { original: "I don't want to do this, it is too hard.", professional: "I believe this task presents some complex challenges. Could we break it down into smaller milestones, or is there some guidance available?" },
      { original: "You are wrong and your code is bad.", professional: "I noticed a few areas in the implementation that might benefit from adjustments. Let's walk through the requirements to align on the best approach." },
      { original: "I forgot to do my work yesterday because I was lazy.", professional: "I encountered some unexpected blocks yesterday and was unable to complete the deliverables. I have reprioritized my schedule to finish them today." },
      { original: "Stop talking and let me explain.", professional: "Thank you for sharing your thoughts. May I take a moment to elaborate on the design details from my perspective?" },
      { original: "I need to leave early because I hate meetings.", professional: "I have a prior commitment that requires me to sign off slightly early today. I will review the meeting notes and follow up on my action items." }
    ]
  },
  Tamil: {
    scenarios: [
      { original: "என்னால் இதை செய்ய முடியாது, இது ரொம்ப கஷ்டம்.", professional: "இந்த பணி சற்று சவாலாக உள்ளது. இதை எளிமையாக்க ஏதேனும் வழிகள் உள்ளதா அல்லது உங்கள் வழிகாட்டுதலைப் பெறலாமா?" },
      { original: "நீ சொல்வது தப்பு, உன் வேலை சரியில்லை.", professional: "இதில் சில மாற்றங்கள் செய்தால் இன்னும் சிறப்பாக இருக்கும் என நினைக்கிறேன். நாம் இணைந்து இதை மறுபரிசீலனை செய்யலாமா?" },
      { original: "நேற்று நான் தூங்கிவிட்டேன், வேலை செய்யவில்லை.", professional: "நேற்று சில தவிர்க்க முடியாத காரணங்களால் என்னால் பணியை முடிக்க இயலவில்லை. இன்று முன்னுரிமை கொடுத்து இதை முடித்து விடுகிறேன்." },
      { original: "பேசாமல் நான் சொல்வதை கேள்.", professional: "உங்கள் கருத்துக்களைப் பகிர்ந்தமைக்கு நன்றி. இது குறித்து எனது விளக்கத்தையும் சமர்ப்பிக்க விரும்புகிறேன்." }
    ]
  },
  Hindi: {
    scenarios: [
      { original: "मुझसे यह नहीं होगा, यह बहुत मुश्किल है।", professional: "इस कार्य में कुछ जटिलताएं हैं। क्या हम इसे छोटे हिस्सों में विभाजित कर सकते हैं या इस पर कुछ मार्गदर्शन मिल सकता है?" },
      { original: "तुम गलत हो और तुम्हारा कोड बेकार है।", professional: "मुझे इस कार्यान्वयन में सुधार की कुछ संभावनाएं दिखती हैं। आइए आवश्यकताओं की समीक्षा करें ताकि हम सही दिशा में काम कर सकें।" },
      { original: "कल मैंने काम नहीं किया क्योंकि मेरा मन नहीं था।", professional: "कल कुछ व्यक्तिगत कारणों से मैं काम पूरा नहीं कर सका। मैंने आज अपनी कार्यसूची को पुनर्गठित किया है ताकि इसे समय पर पूरा कर सकूं।" },
      { original: "चुप रहो और मेरी बात सुनो।", professional: "अपने विचार साझा करने के लिए धन्यवाद। क्या मैं इस विषय पर अपना दृष्टिकोण प्रस्तुत कर सकता हूँ?" }
    ]
  },
  Telugu: {
    scenarios: [
      { original: "నేను ఇది చేయలేను, ఇది చాలా కష్టం.", professional: "ఈ పని కొంచెం సవాలుగా అనిపిస్తోంది. దీనిని చిన్న భాగాలుగా విభజించుకుందామా లేదా మీ సహాయం తీసుకోమంటారా?" },
      { original: "నువ్వు చెప్పేది తప్పు, నీ వర్క్ బాలేదు.", professional: "ఈ పనిలో కొన్ని మార్పులు చేస్తే బాగుంటుందని నా అభిప్రాయం. ఒకసారి మనం చర్చించి సరిచేసుకుందామా?" }
    ]
  },
  Malayalam: {
    scenarios: [
      { original: "എനിക്ക് ഇത് ചെയ്യാൻ പറ്റില്ല, ഭയങ്കര പാടാണ്.", professional: "ഈ ജോലി കുറച്ച് പ്രയാസമുള്ളതായി തോന്നുന്നു. ഇതിൽ എനിക്ക് കുറച്ച് സഹായമോ മാർഗ്ഗനിർദ്ദേശമോ നൽകാൻ സാധിക്കുമോ?" },
      { original: "നീ പറയുന്നത് തെറ്റാണ്, നിന്റെ ജോലി ശരിയല്ല.", professional: "ഇതിൽ ചില മാറ്റങ്ങൾ വരുത്തിയാൽ കൂടുതൽ നന്നായിരിക്കും എന്ന് കരുതുന്നു. നമുക്ക് ഒന്നിച്ച് ഇത് പരിശോധിക്കാം." }
    ]
  }
};

export const ACHIEVEMENTS = [
  { id: 'first-interview', title: 'First Steps', description: 'Completed your first AI Interview Practice.', icon: 'Award', color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10' },
  { id: 'confidence-master', title: 'Confidence Master', description: 'Achieved a Confidence score above 85% in an interview.', icon: 'Zap', color: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10' },
  { id: 'grammar-pro', title: 'Grammar Pro', description: 'Completed 3 scenarios with a Grammar score above 90%.', icon: 'BookOpen', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
  { id: 'comm-expert', title: 'Communication Expert', description: 'Practiced all 6 social and interview scenarios.', icon: 'CheckCircle', color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10' }
];

export const CALMING_SUGGESTIONS = [
  "Take a deep breath. Inhale slowly for 4 seconds, hold for 4, and exhale for 6.",
  "Remember that this is a practice environment. There is no penalty for mistakes.",
  "Slow down your speech. Pausing between sentences makes you sound more composed and gives you time to think.",
  "Focus on the prompt rather than your camera feed. Sit comfortably with relaxed shoulders.",
  "You are doing great! Let's try the next question at a slightly slower pace."
];

export const LEARNING_ROADMAP = {
  focus: "Clear Professional Articulation",
  weakAreas: [
    { area: "Speaking speed (tending to rush when nervous)", impact: "High", recommendation: "Practice Coffee Break with the Metronome tool." },
    { area: "Assertive project boundary settings", impact: "Medium", recommendation: "Try the Conflict Resolution scenario again." }
  ],
  exercises: [
    { title: "STAR Method Practice", duration: "10 mins", type: "Interview", xp: 100 },
    { title: "Calming Breathwork + Speak", duration: "5 mins", type: "Coaching", xp: 50 },
    { title: "Polite Rejection Translations", duration: "8 mins", type: "Translation", xp: 80 }
  ],
  suggestions: [
    "Your grammar score increased by 4% this week. Keep focus on using past tenses properly during experience descriptions.",
    "Try practicing speech prompts in the Autism setup mode to get less visual distraction and simplified tip prompts."
  ],
  roadmap: [
    { week: 1, title: "Fundamentals of Workspace Socializing", status: "Completed", desc: "Small talk, greetings, coffee breaks, and simple status sharing." },
    { week: 2, title: "Structuring Technical Answers", status: "In Progress", desc: "Using STAR methodology, maintaining a professional vocabulary, and pausing." },
    { week: 3, title: "Handling Critical Management Interactions", status: "Locked", desc: "Setting boundaries, discussing delays, requesting leaves, and receiving feedback." },
    { week: 4, title: "Client Negotiation & Conflict", status: "Locked", desc: "Resolving misunderstandings, answering tough questions, and retaining composure." }
  ]
};

export const ANALYTICS_DATA = {
  confidenceTrend: [
    { name: 'Mon', score: 65 },
    { name: 'Tue', score: 70 },
    { name: 'Wed', score: 68 },
    { name: 'Thu', score: 75 },
    { name: 'Fri', score: 82 },
    { name: 'Sat', score: 80 },
    { name: 'Sun', score: 86 }
  ],
  speakingSpeed: [
    { name: 'Mon', wpm: 165 },
    { name: 'Tue', wpm: 155 },
    { name: 'Wed', wpm: 150 },
    { name: 'Thu', wpm: 142 },
    { name: 'Fri', wpm: 135 },
    { name: 'Sat', wpm: 138 },
    { name: 'Sun', wpm: 130 } // closer to target 130 WPM
  ],
  grammarImprovement: [
    { name: 'Week 1', score: 70 },
    { name: 'Week 2', score: 76 },
    { name: 'Week 3', score: 81 },
    { name: 'Week 4', score: 88 }
  ],
  interviewScores: [
    { name: 'STAR Answer', score: 72 },
    { name: 'Project Update', score: 80 },
    { name: 'Client Pitch', score: 68 },
    { name: 'Conflict Res', score: 85 }
  ],
  practiceHours: [
    { name: 'Mon', hours: 0.5 },
    { name: 'Tue', hours: 1.2 },
    { name: 'Wed', hours: 0.8 },
    { name: 'Thu', hours: 1.5 },
    { name: 'Fri', hours: 2.0 },
    { name: 'Sat', hours: 1.0 },
    { name: 'Sun', hours: 2.5 }
  ]
};
