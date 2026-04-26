import { useEffect } from 'react';
import useStore from '../../store/useStore';
import { 
  Play, Plus, User, BarChart2, Star, Target, BookOpen, MessageSquare, Users, 
  Code, Palette, LineChart, Lightbulb, CheckCircle2, TrendingUp, Sparkles, ArrowRight,
  Check
} from 'lucide-react';

export function Landing() {
  const { openAuthModal } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;
      if (isBottom) {
        openAuthModal();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [openAuthModal]);

  return (
    <div className="min-h-screen bg-[#eef8ff] font-sans overflow-hidden">
      {/* Navbar Placeholder */}
      <nav className="flex items-center justify-between p-6 bg-[#0f172a] text-white">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-violet-600 flex items-center justify-center font-bold text-xl">B</div>
          <div>
            <div className="text-xl font-bold leading-tight">BriDGe</div>
            <div className="text-[10px] text-slate-400">Bridge the gap. Build the future</div>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <div className="hidden md:flex items-center gap-1 cursor-pointer hover:text-violet-400">
             🌐 English ⌄
          </div>
          <button className="hover:text-violet-400 font-medium" onClick={() => openAuthModal('login')}>Login</button>
          <button className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-lg font-medium transition-colors" onClick={() => openAuthModal('signup')}>Sign Up</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 pt-16 pb-24 max-w-7xl mx-auto">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-violet-300/20 blur-[100px]"></div>
            <div className="absolute top-[20%] right-[-5%] w-[30%] h-[50%] rounded-full bg-cyan-300/20 blur-[100px]"></div>
        </div>

        <div className="text-center md:text-left mb-12">
           <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-2">BriDGe</h1>
           <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 pb-2">
             Where Intelligence Meets Opportunity
           </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
           {/* Left Hero Card */}
           <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/40">
              <div className="grid grid-cols-3 gap-3 mb-6">
                 {[
                   { l: 'B', t: 'BPUT', bg: 'bg-violet-500' },
                   { l: 'R', t: 'Real-time', bg: 'bg-blue-500' },
                   { l: 'I', t: 'Intelligent', bg: 'bg-indigo-500' },
                   { l: 'D', t: 'Digital', bg: 'bg-cyan-500' },
                   { l: 'G', t: 'Guidance', bg: 'bg-emerald-500' },
                   { l: 'E', t: 'Engine', bg: 'bg-green-500' },
                 ].map((item, i) => (
                    <div key={i} className={`${item.bg} rounded-xl p-4 text-center text-white shadow-sm hover:scale-105 transition-transform`}>
                       <div className="text-2xl font-bold mb-1">{item.l}</div>
                       <div className="text-xs font-medium opacity-90">{item.t}</div>
                    </div>
                 ))}
              </div>
              
              <div className="bg-gradient-to-r from-violet-600 to-cyan-600 rounded-full p-[1px] mb-8 inline-block">
                 <div className="bg-gradient-to-r from-violet-600 to-cyan-600 rounded-full px-4 py-2 text-center text-sm font-semibold text-white flex items-center justify-center gap-2">
                    🚀 Revolutionizing Career Guidance with AI ✨
                 </div>
              </div>

              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                Experience the power of BriDGe - our revolutionary Real-time Intelligent Digital Guidance Engine that transforms career discovery. Get AI-powered job recommendations, structured career paths, and personalized guidance that adapts to your unique journey in real-time.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                 <button onClick={openAuthModal} className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-violet-200 transition-all hover:shadow-xl">
                   Get Started
                 </button>
                 <button onClick={() => openAuthModal()} className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-slate-700 hover:bg-slate-100 transition-colors border border-slate-200/50">
                   <Play className="w-4 h-4" /> Watch Demo
                 </button>
              </div>
           </div>

           {/* Right Hero Cards */}
           <div className="grid grid-cols-2 gap-4 h-full">
              <div className="col-span-2 bg-gradient-to-br from-blue-400 to-teal-400 rounded-3xl p-8 text-white shadow-lg flex flex-col justify-center transform transition-transform hover:-translate-y-1">
                 <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                    <Plus className="w-5 h-5" />
                 </div>
                 <h3 className="text-xl font-bold mb-2">AI Recommended Jobs and Internships</h3>
                 <p className="text-white/80 text-sm">Get personalized job and internship recommendations powered by AI</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-3xl p-8 text-white shadow-lg flex flex-col justify-center transform transition-transform hover:-translate-y-1">
                 <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                    <User className="w-5 h-5" />
                 </div>
                 <h3 className="text-lg font-bold mb-2">Profile Completion</h3>
                 <p className="text-white/80 text-sm">Complete your profile to get personalized recommendations</p>
              </div>

              <div className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-3xl p-8 text-white shadow-lg flex flex-col justify-center transform transition-transform hover:-translate-y-1">
                 <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                    <BarChart2 className="w-5 h-5" />
                 </div>
                 <h3 className="text-lg font-bold mb-2">Structured Career Path/Courses</h3>
                 <p className="text-white/80 text-sm">Skill analysis transformed into structured career roadmaps and course recommendations</p>
              </div>

              <div className="col-span-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-8 text-white shadow-lg flex items-center gap-6 transform transition-transform hover:-translate-y-1">
                 <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0 backdrop-blur-sm">
                    <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold mb-1">BriDGe Pro Personalised Features</h3>
                   <p className="text-white/90 text-sm">Advanced personalised features to unlock your potential - track progress and discover opportunities</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Expert Career Guidance Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Career Guidance
           </div>
           <h2 className="text-4xl font-bold text-violet-600 mb-4">Expert Career Guidance</h2>
           <p className="text-slate-500 max-w-2xl mx-auto mb-16 text-lg">
             Get personalized support from industry professionals to accelerate your career growth and achieve your goals.
           </p>

           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {[
                { 
                  icon: Target, color: 'text-blue-500', bg: 'bg-blue-100', title: 'Career Counseling', 
                  desc: 'Get personalized career advice from industry experts',
                  checks: ['1-on-1 Sessions', 'Career Path Planning', 'Goal Setting']
                },
                { 
                  icon: BookOpen, color: 'text-emerald-500', bg: 'bg-emerald-100', title: 'Resume Review', 
                  desc: 'Professional resume optimization and feedback',
                  checks: ['Expert Review', 'ATS Optimization', 'Industry Standards']
                },
                { 
                  icon: MessageSquare, color: 'text-violet-500', bg: 'bg-violet-100', title: 'Interview Prep', 
                  desc: 'Practice interviews with real-world scenarios',
                  checks: ['Mock Interviews', 'Feedback Sessions', 'Confidence Building']
                },
                { 
                  icon: Users, color: 'text-orange-500', bg: 'bg-orange-100', title: 'Mentorship Program', 
                  desc: 'Connect with experienced professionals in your field',
                  checks: ['Industry Mentors', 'Regular Check-ins', 'Network Building'],
                  highlight: true
                }
              ].map((card, i) => (
                 <div key={i} className={`p-8 rounded-3xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${card.highlight ? 'bg-orange-50/50 border-orange-200' : 'bg-white border-slate-100 shadow-sm'}`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${card.bg}`}>
                       <card.icon className={`w-6 h-6 ${card.color}`} />
                    </div>
                    <h3 className={`text-xl font-bold mb-3 ${card.highlight ? 'text-violet-600' : 'text-slate-900'}`}>{card.title}</h3>
                    <p className="text-slate-500 text-sm mb-6 min-h-[40px]">{card.desc}</p>
                    <ul className="space-y-3 mb-8">
                       {card.checks.map((check, j) => (
                          <li key={j} className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                             <CheckCircle2 className={`w-5 h-5 ${card.highlight ? 'text-orange-500' : 'text-blue-500'}`} />
                             {check}
                          </li>
                       ))}
                    </ul>
                    <button onClick={() => openAuthModal()} className="w-full py-3 rounded-xl border border-slate-200 font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                       Learn More
                    </button>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* Develop In-Demand Skills Section */}
      <section className="py-24 bg-[#eef8ff]">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Skill Development
           </div>
           <h2 className="text-4xl font-bold text-violet-600 mb-4">Develop In-Demand Skills</h2>
           <p className="text-slate-500 max-w-2xl mx-auto mb-16 text-lg">
             Stay ahead of the curve with skills that employers are actively seeking. Build your expertise with our curated learning paths.
           </p>

           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-left mb-16">
              {[
                { 
                  icon: Code, color: 'text-blue-500', bg: 'bg-blue-500', title: 'Programming & Development', 
                  checks: ['JavaScript', 'Python', 'React', 'Node.js', 'SQL']
                },
                { 
                  icon: Palette, color: 'text-pink-500', bg: 'bg-pink-500', title: 'Design & Creative', 
                  checks: ['UI/UX Design', 'Figma', 'Adobe Creative Suite', 'Prototyping']
                },
                { 
                  icon: LineChart, color: 'text-emerald-500', bg: 'bg-emerald-500', title: 'Data & Analytics', 
                  checks: ['Data Analysis', 'Machine Learning', 'Tableau', 'Statistics']
                },
                { 
                  icon: Lightbulb, color: 'text-violet-500', bg: 'bg-violet-500', title: 'Business & Strategy', 
                  checks: ['Project Management', 'Business Analysis', 'Strategy', 'Leadership']
                }
              ].map((card, i) => (
                 <div key={i} className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${card.bg}`}>
                       <card.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-6 text-slate-900 leading-tight min-h-[48px]">{card.title}</h3>
                    <ul className="space-y-3 mb-8 flex-1">
                       {card.checks.map((check, j) => (
                          <li key={j} className="flex items-center gap-3 text-sm text-slate-600">
                             <div className={`w-5 h-5 rounded flex items-center justify-center ${card.bg}`}>
                               <Check className="w-3 h-3 text-white" strokeWidth={3} />
                             </div>
                             {check}
                          </li>
                       ))}
                    </ul>
                    <button onClick={() => openAuthModal()} className="w-full py-3 rounded-xl border border-slate-200 font-medium text-slate-700 hover:bg-slate-50 transition-colors mt-auto">
                       Explore Skills
                    </button>
                 </div>
              ))}
           </div>

           {/* Trending Skills Box */}
           <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-left max-w-5xl mx-auto relative overflow-hidden">
             <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-emerald-500" />
                <h3 className="text-xl font-bold text-slate-800">Trending Skills</h3>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { name: 'Artificial Intelligence', growth: '+45%' },
                  { name: 'Cloud Computing', growth: '+38%' },
                  { name: 'Cybersecurity', growth: '+32%' },
                  { name: 'Data Science', growth: '+28%' },
                ].map((skill, i) => (
                   <div key={i} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
                      <div className="font-semibold text-sm text-slate-800 mb-2">{skill.name}</div>
                      <div className="flex items-center gap-1 text-emerald-500 font-bold text-sm">
                         <Star className="w-4 h-4 fill-emerald-500" />
                         {skill.growth}
                      </div>
                   </div>
                ))}
             </div>
             <div className="flex justify-center">
                <button onClick={() => openAuthModal()} className="bg-gradient-to-r from-blue-600 to-violet-600 text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-violet-200 hover:shadow-xl transition-all flex items-center gap-2">
                   Start Learning Today <Sparkles className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                </button>
             </div>
           </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <h2 className="text-3xl font-bold text-violet-600 mb-12">Success Stories</h2>
           <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                { 
                  quote: "The career guidance helped me transition from marketing to tech in just 8 months!",
                  name: "Sarah Johnson",
                  role: "Software Engineer at Google",
                  pillColor: "bg-violet-100 text-violet-700"
                },
                { 
                  quote: "Mock interviews and resume feedback were game-changers for my job search.",
                  name: "Mike Chen",
                  role: "Product Manager at Microsoft",
                  pillColor: "bg-blue-100 text-blue-700"
                },
                { 
                  quote: "My mentor guided me through the entire career change process. Couldn't have done it without them!",
                  name: "Emily Davis",
                  role: "UX Designer at Airbnb",
                  pillColor: "bg-violet-100 text-violet-700"
                }
              ].map((story, i) => (
                 <div key={i} className="p-8 rounded-3xl border border-slate-100 shadow-sm bg-white hover:shadow-md transition-shadow">
                    <p className="text-slate-600 italic mb-8 min-h-[80px]">"{story.quote}"</p>
                    <div>
                       <div className="font-bold text-slate-900 mb-2">{story.name}</div>
                       <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${story.pillColor}`}>
                          {story.role}
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-indigo-500 via-blue-600 to-violet-600 rounded-[2.5rem] p-16 text-center text-white relative overflow-hidden shadow-2xl">
           {/* Decorative circles */}
           <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
              <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] border-[40px] border-white/20 rounded-full"></div>
              <div className="absolute top-[-30%] right-[-10%] w-[40%] h-[120%] border-[30px] border-white/20 rounded-full"></div>
           </div>
           
           <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">Ready to Accelerate Your Career?</h2>
              <p className="text-white/90 text-lg mb-10">Book a free consultation with our career experts today</p>
              <button onClick={() => openAuthModal()} className="bg-violet-800 hover:bg-violet-900 text-white px-8 py-4 rounded-xl font-semibold shadow-lg transition-all flex items-center gap-2 mx-auto">
                 Schedule Free Consultation <ArrowRight className="w-5 h-5" />
              </button>
           </div>
        </div>
      </section>

      <section className="bg-slate-900 py-12 text-center text-slate-500 text-sm">
         <p>&copy; {new Date().getFullYear()} BriDGe. All rights reserved.</p>
      </section>
    </div>
  );
}
