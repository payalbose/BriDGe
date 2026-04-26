import { useState } from 'react';
import { 
  Search, Star, MessageSquare, Bot, Zap, Brain, 
  TrendingUp, CheckCircle, Layout, ChevronDown, Briefcase, Target
} from 'lucide-react';

export function Mentors() {
  const [activeFilter, setActiveFilter] = useState('All Areas');
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState([
    { role: 'model', content: "Hello! 👋 I'm your AI Career Mentor! I'm here to help you advance your career, develop skills, and achieve your professional goals. What career challenge can I help you with today?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      const apiKey = "AIzaSyDiK6ay183SWPGG8b9V-e9bFh0yCFKLCcQ";
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

      const context = messages.map(m => `${m.role === 'user' ? 'Student' : 'AI Mentor'}: ${m.content}`).join('\\n');
      const prompt = `You are a friendly, expert AI Career Mentor for a student portal. Provide helpful, encouraging, and actionable mentorship advice. Keep responses concise (1-2 small paragraphs). Do NOT use markdown code blocks or asterisks, just plain text.\\n\\nConversation history:\\n${context}\\nStudent: ${userMessage}\\nAI Mentor:`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error?.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const aiReply = data.candidates[0].content.parts[0].text;
      
      setMessages(prev => [...prev, { role: 'model', content: aiReply.replace(/\*/g, '').trim() }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', content: `Oops, something went wrong: ${err.message}` }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (text) => {
    setInputValue(text);
  };

  const stats = [
    { label: 'Expert Mentors', value: '500+', color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'Avg Rating', value: '4.9', color: 'text-yellow-600', bg: 'bg-yellow-50', isRating: true },
    { label: 'Sessions', value: '10K+', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Success Rate', value: '95%', color: 'text-pink-600', bg: 'bg-pink-50' }
  ];

  const filters = [
    { name: 'All Areas', icon: '🌟' },
    { name: 'Frontend', icon: '🎨' },
    { name: 'Backend', icon: '⚙️' },
    { name: 'Mobile', icon: '📱' },
    { name: 'Data Science', icon: '📊' },
    { name: 'AI/ML', icon: '🤖' },
    { name: 'UI/UX', icon: '🎯' }
  ];

  const events = [
    { title: 'Career Planning Workshop', date: 'Dec 15, 2024 • 2:00 PM PST', desc: 'Learn how to create a strategic career roadmap', color: 'bg-pink-500', icon: '🎯' },
    { title: 'Tech Interview Prep', date: 'Dec 18, 2024 • 6:00 PM PST', desc: 'Master coding interviews with industry experts', color: 'bg-orange-500', icon: '💼' },
    { title: 'Startup Founder Panel', date: 'Dec 20, 2024 • 4:00 PM PST', desc: 'Insights from successful startup founders', color: 'bg-blue-500', icon: '🚀' }
  ];

  const paidMentors = [
    { name: 'Priya Sharma', role: 'Senior Software Engineer', company: 'Meta', rating: '5 (127 reviews)', icon: 'P', color: 'bg-indigo-500', expertise: ['React', 'System Design', 'Career Growth', '+1'], price: '₹1,200', busy: false },
    { name: 'Arjun Kumar', role: 'ML Research Scientist', company: 'OpenAI', rating: '5 (89 reviews)', icon: 'A', color: 'bg-emerald-500', expertise: ['Machine Learning', 'Python', 'Research', '+1'], price: '₹1,800', busy: false },
    { name: 'Vikram Reddy', role: 'Mobile Engineering Lead', company: 'Uber', rating: '4 (142 reviews)', icon: 'V', color: 'bg-slate-800', expertise: ['iOS', 'Android', 'React Native', '+1'], price: '₹1,400', busy: false },
    { name: 'Sneha Jain', role: 'Product Manager', company: 'Flipkart', rating: '5 (78 reviews)', icon: 'S', color: 'bg-purple-600', expertise: ['Product Strategy', 'Market Research', 'Agile', '+1'], price: '₹1,300', busy: false },
    { name: 'Karan Mehta', role: 'DevOps Engineer', company: 'Zomato', rating: '4 (92 reviews)', icon: 'K', color: 'bg-red-500', expertise: ['AWS', 'Docker', 'Kubernetes', '+1'], price: '₹900', busy: false }
  ];

  const handleBookSession = (mentorName) => {
    alert(`Please complete the payment process first to book a session with ${mentorName}.`);
  };

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 overflow-hidden text-center flex flex-col items-center">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
           <div className="absolute top-[20%] left-[10%] w-[40%] h-[60%] bg-gradient-to-br from-violet-200 to-fuchsia-200 blur-[80px] rounded-full"></div>
           <div className="absolute top-[10%] right-[10%] w-[30%] h-[50%] bg-gradient-to-br from-cyan-200 to-blue-200 blur-[80px] rounded-full"></div>
        </div>
        
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-500 mb-4 relative z-10 flex items-center gap-3">
          Connect with Mentors 🤝
        </h1>
        <p className="text-slate-600 mb-12 max-w-2xl relative z-10 font-medium text-lg">
          Get <span className="text-violet-600 font-bold">personalized guidance</span> from <span className="text-pink-500 font-bold">industry experts</span> and <span className="text-cyan-600 font-bold">accelerate your career growth</span>
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10 w-full max-w-4xl mb-12">
          {stats.map((stat, i) => (
            <div key={i} className={`${stat.bg} p-6 rounded-3xl border border-white shadow-sm flex flex-col items-center justify-center hover:-translate-y-1 transition-transform`}>
              <div className={`text-3xl font-black ${stat.color} mb-1 flex items-center gap-1`}>
                {stat.value}
                {stat.isRating && <Star className="w-5 h-5 fill-yellow-600 text-yellow-600" />}
              </div>
              <div className="text-xs font-bold text-slate-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 relative z-10">
          <button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-violet-200 transition-all flex items-center gap-2">
            🚀 Find Your Mentor
          </button>
          <button className="bg-white hover:bg-slate-50 text-slate-800 px-8 py-3.5 rounded-xl font-bold shadow-sm border border-slate-200 transition-all flex items-center gap-2">
            🤖 Try AI Mentor
          </button>
        </div>
      </section>

      {/* 2. Search & Filter Section */}
      <section className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 flex flex-col items-center relative overflow-hidden">
        <h2 className="text-3xl font-bold text-violet-600 mb-2 flex items-center gap-2 relative z-10">
          Find Your Perfect Mentor 🍎
        </h2>
        <p className="text-slate-500 mb-8 font-medium relative z-10">Search through our expert mentors and filter by expertise</p>

        <div className="w-full max-w-2xl relative z-10 mb-8">
          <div className="relative flex items-center shadow-sm rounded-2xl overflow-hidden border border-slate-200">
            <Search className="absolute left-4 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search mentors by name, company, or skills..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-32 py-4 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 font-medium text-slate-700"
            />
            <button className="absolute right-2 bg-violet-500 hover:bg-violet-600 text-white px-6 py-2 rounded-xl text-sm font-bold transition-colors">
              Search
            </button>
          </div>
        </div>

        <div className="text-sm font-bold text-slate-700 mb-4 relative z-10">Filter by Expertise</div>
        <div className="flex flex-wrap justify-center gap-3 relative z-10 mb-10">
          {filters.map(filter => (
            <button 
              key={filter.name}
              onClick={() => setActiveFilter(filter.name)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 shadow-sm ${
                activeFilter === filter.name 
                  ? 'bg-gradient-to-r from-violet-500 to-blue-500 text-white border-transparent' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{filter.icon}</span> {filter.name}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 relative z-10 pt-8 border-t border-slate-100 w-full">
           <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold">
              <CheckCircle className="w-3.5 h-3.5" /> Available Now
           </div>
           <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-blue-600" /> Top Rated
           </div>
           <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-pink-50 text-pink-600 text-xs font-bold">
              <Zap className="w-3.5 h-3.5 fill-pink-600" /> Budget Friendly
           </div>
        </div>
      </section>

      {/* 3. AI Mentor Section */}
      <section className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-200 flex flex-col items-center relative overflow-hidden text-center shadow-inner">
         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-bold mb-4">
            🤖 AI Support
         </div>
         <h2 className="text-4xl font-black text-violet-600 mb-4 tracking-tight uppercase">
            Your AI Mentor 🤖 🍎
         </h2>
         <p className="text-slate-600 mb-8 max-w-xl font-medium">
            Your professional AI career mentor for expert guidance, skill development, and career advancement strategies.
         </p>

         <div className="flex gap-3 mb-8">
            <span className="px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold flex items-center gap-1">💼 Career Guidance</span>
            <span className="px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-bold flex items-center gap-1">🎯 Skill Development</span>
            <span className="px-4 py-1.5 rounded-full bg-pink-50 border border-pink-100 text-pink-600 text-xs font-bold flex items-center gap-1">📈 Career Strategy</span>
         </div>

         <div className="w-full max-w-3xl bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            {/* Chat Messages */}
            <div className="flex flex-col gap-4 mb-6 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
               {messages.map((msg, idx) => (
                 <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 shadow-md ${msg.role === 'model' ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500' : 'bg-slate-800'}`}>
                       {msg.role === 'model' ? <Bot className="w-5 h-5" /> : <UserIcon className="w-5 h-5" />}
                    </div>
                    <div className={`${msg.role === 'model' ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-tl-sm' : 'bg-slate-100 text-slate-800 rounded-tr-sm'} p-4 rounded-2xl text-sm font-medium text-left shadow-sm max-w-[80%] whitespace-pre-wrap`}>
                       {msg.content}
                    </div>
                 </div>
               ))}
               {isTyping && (
                 <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white shrink-0 shadow-md">
                       <Bot className="w-5 h-5 animate-pulse" />
                    </div>
                    <div className="bg-slate-100 text-slate-500 p-4 rounded-2xl rounded-tl-sm text-sm font-medium text-left shadow-sm flex items-center gap-1">
                       <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                       <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                       <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                 </div>
               )}
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 mb-6 justify-center">
                 <button onClick={() => handleSuggestionClick("I need help with Career Path Planning 🗺️")} className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">Career Path Planning 🗺️</button>
                 <button onClick={() => handleSuggestionClick("How can I improve my Skill Development? 📚")} className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">Skill Development 📚</button>
                 <button onClick={() => handleSuggestionClick("Can you give me some Interview Preparation tips? 💼")} className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">Interview Preparation 💼</button>
                 <button onClick={() => handleSuggestionClick("How do I optimize my resume? 📄")} className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">Resume Optimization 📄</button>
              </div>
            )}

            {/* Input area */}
            <form onSubmit={handleSendMessage} className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                  <UserIcon className="w-5 h-5" />
               </div>
               <div className="flex-1 relative">
                  <input 
                     type="text" 
                     value={inputValue}
                     onChange={(e) => setInputValue(e.target.value)}
                     disabled={isTyping}
                     placeholder="Ask me about your career goals, skills, or professional development... 🧠" 
                     className="w-full pl-4 pr-32 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 font-medium text-slate-700 disabled:opacity-50"
                  />
                  <button 
                     type="submit" 
                     disabled={!inputValue.trim() || isTyping}
                     className="absolute right-1 top-1 bottom-1 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-300 text-white px-4 rounded-lg text-xs font-bold transition-colors"
                  >
                     Send
                  </button>
               </div>
            </form>
         </div>

         {/* Bottom Stats */}
         <div className="flex flex-wrap justify-center gap-12 mt-12 w-full max-w-3xl border-t border-slate-200 pt-8">
            <div className="text-center">
               <div className="text-slate-700 font-black text-2xl flex justify-center mb-1"><Briefcase className="w-6 h-6 text-orange-700" /></div>
               <div className="text-slate-800 font-black text-xl mb-1">100K+</div>
               <div className="text-[10px] font-bold text-slate-500">Career Queries</div>
            </div>
            <div className="text-center">
               <div className="text-slate-700 font-black text-2xl flex justify-center mb-1"><Target className="w-6 h-6 text-pink-600" /></div>
               <div className="text-slate-800 font-black text-xl mb-1">95%</div>
               <div className="text-[10px] font-bold text-slate-500">Success Rate</div>
            </div>
            <div className="text-center">
               <div className="text-slate-700 font-black text-2xl flex justify-center mb-1"><Layout className="w-6 h-6 text-emerald-500" /></div>
               <div className="text-slate-800 font-black text-xl mb-1">500+</div>
               <div className="text-[10px] font-bold text-slate-500">Skills Covered</div>
            </div>
            <div className="text-center">
               <div className="text-slate-700 font-black text-2xl flex justify-center mb-1"><TrendingUp className="w-6 h-6 text-blue-500" /></div>
               <div className="text-slate-800 font-black text-xl mb-1">∞</div>
               <div className="text-[10px] font-bold text-slate-500">Growth Potential</div>
            </div>
         </div>
      </section>

      {/* 4. Upcoming Mentorship Events */}
      <section>
         <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            Upcoming Mentorship Events 📅
         </h2>
         <div className="grid md:grid-cols-3 gap-6">
            {events.map((event, i) => (
               <div key={i} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-xl mb-4">
                     {event.icon}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">{event.title}</h3>
                  <p className="text-xs font-bold text-slate-500 mb-4">{event.date}</p>
                  <p className="text-sm text-slate-600 mb-6 flex-1 line-clamp-2">{event.desc}</p>
                  <button className="w-full bg-slate-100 hover:bg-slate-200 text-violet-700 py-3 rounded-xl text-sm font-bold transition-colors">
                     Register Free
                  </button>
               </div>
            ))}
         </div>
      </section>

      {/* 5. Mentors Grid */}
      <section>
         <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
               8 Mentors Available
            </h2>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 cursor-pointer hover:bg-slate-50">
               Sort by: Rating <ChevronDown className="w-4 h-4" />
            </div>
         </div>

         <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            
            {/* AI Mentor Card (Free) */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-blue-500 to-violet-600 shadow-lg border border-blue-400 relative overflow-hidden flex flex-col hover:-translate-y-1 transition-transform group text-white">
               <div className="absolute top-4 right-4 bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 px-2 py-1 rounded-full text-[9px] font-bold tracking-wider">
                  ONLINE
               </div>
               <div className="flex flex-col items-center text-center mt-4 mb-6 relative z-10">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center text-4xl mb-4 shadow-xl">
                     🤖
                  </div>
                  <h3 className="font-black text-xl mb-1 drop-shadow-md">AI Career Mentor</h3>
                  <p className="text-xs text-blue-100 font-bold mb-1">Powered by Advanced AI</p>
                  <p className="text-[10px] text-blue-200">Professional Guidance • Career Strategy</p>
               </div>

               <div className="grid grid-cols-2 gap-2 mb-6 flex-1">
                  <div className="bg-white/10 rounded-xl p-3 text-center border border-white/10 hover:bg-white/20 transition-colors">
                     <Brain className="w-5 h-5 mx-auto mb-1 text-pink-300" />
                     <div className="text-[9px] font-bold">Smart Analysis</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 text-center border border-white/10 hover:bg-white/20 transition-colors">
                     <Zap className="w-5 h-5 mx-auto mb-1 text-yellow-300" />
                     <div className="text-[9px] font-bold">Instant Help</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 text-center border border-white/10 hover:bg-white/20 transition-colors">
                     <TrendingUp className="w-5 h-5 mx-auto mb-1 text-emerald-300" />
                     <div className="text-[9px] font-bold">Growth Tracking</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 text-center border border-white/10 hover:bg-white/20 transition-colors">
                     <Target className="w-5 h-5 mx-auto mb-1 text-orange-300" />
                     <div className="text-[9px] font-bold">Goal Setting</div>
                  </div>
               </div>

               <button className="w-full bg-white text-violet-700 hover:bg-blue-50 py-3 rounded-xl text-sm font-black transition-colors shadow-lg">
                  Chat Now (Free) ✨
               </button>
            </div>

            {/* Paid Mentors */}
            {paidMentors.map((mentor, i) => (
               <div key={i} className="p-6 rounded-3xl bg-white shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative flex flex-col hover:-translate-y-1">
                  <div className="flex flex-col items-center text-center mb-6">
                     <div className={`w-16 h-16 rounded-full text-white flex items-center justify-center text-2xl font-bold mb-3 shadow-md ${mentor.color}`}>
                        {mentor.icon}
                     </div>
                     <h3 className="font-bold text-slate-900 text-lg">{mentor.name}</h3>
                     <p className="text-xs text-slate-500">{mentor.role}</p>
                     <p className="text-[10px] text-slate-400 mb-3">{mentor.company}</p>
                     <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-bold text-slate-700">{mentor.rating}</span>
                     </div>
                  </div>
                  
                  <div className="mb-6 flex-1">
                     <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Expertise</p>
                     <div className="flex flex-wrap gap-1.5">
                        {mentor.expertise.map(skill => (
                           <span key={skill} className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-md">{skill}</span>
                        ))}
                     </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${mentor.busy ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
                        <span className="text-xs font-bold text-slate-600">{mentor.busy ? 'Busy' : 'Available Now'}</span>
                     </div>
                     <div className="text-right">
                        <div className="text-emerald-600 font-bold text-lg">{mentor.price}</div>
                        <div className="text-[9px] text-slate-400 uppercase">per session</div>
                     </div>
                  </div>

                  <div className="flex gap-2">
                     <button 
                       onClick={() => handleBookSession(mentor.name)}
                       className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-1 shadow-md shadow-blue-200"
                     >
                        Book Session ✨
                     </button>
                     <button className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors">
                        <MessageSquare className="w-5 h-5" />
                     </button>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* 6. Become a Mentor Banner */}
      <section className="bg-gradient-to-r from-violet-600 to-indigo-700 rounded-[2.5rem] p-12 text-center text-white relative overflow-hidden shadow-lg">
         <div className="relative z-10 flex flex-col items-center">
            <div className="text-4xl mb-4">🌟</div>
            <h2 className="text-3xl font-black mb-4">Become a Mentor</h2>
            <p className="text-blue-100 text-sm mb-8 max-w-md font-medium">
               Share your expertise and help the next generation of professionals grow their careers
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-violet-700 hover:bg-blue-50 px-6 py-3 rounded-xl text-sm font-bold shadow-md transition-all">
                 Apply to Mentor
              </button>
              <button className="border border-white hover:bg-white/10 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all">
                 Learn More
              </button>
            </div>
         </div>
      </section>

    </div>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
