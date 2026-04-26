import { useState } from 'react';
import { 
  PlayCircle, BookOpen, ExternalLink, Code, Award, 
  Search, Play, Compass, MonitorPlay,
  TrendingUp, Star
} from 'lucide-react';

export function Learning() {
  const [activeTab, setActiveTab] = useState('All');

  const categories = ['All', 'Video Courses', 'Reading & Practice', 'Certifications'];

  const resources = [
    {
      type: 'Video Courses',
      title: 'React JS Crash Course',
      platform: 'YouTube (FreeCodeCamp)',
      level: 'Beginner',
      duration: '4 Hours',
      color: 'bg-red-500',
      icon: <MonitorPlay className="w-6 h-6 text-white" />,
      link: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
      desc: 'Master the fundamentals of React.js by building real-world projects.'
    },
    {
      type: 'Video Courses',
      title: 'Machine Learning Specialization',
      platform: 'Coursera (Stanford)',
      level: 'Intermediate',
      duration: '3 Months',
      color: 'bg-blue-600',
      icon: <PlayCircle className="w-6 h-6 text-white" />,
      link: 'https://www.coursera.org/specializations/machine-learning-introduction',
      desc: 'Learn fundamental AI concepts from Andrew Ng, covering supervised learning, neural networks, and more.'
    },
    {
      type: 'Reading & Practice',
      title: 'Data Structures & Algorithms',
      platform: 'GeeksforGeeks',
      level: 'All Levels',
      duration: 'Self-paced',
      color: 'bg-emerald-600',
      icon: <Code className="w-6 h-6 text-white" />,
      link: 'https://www.geeksforgeeks.org/data-structures/',
      desc: 'Comprehensive tutorials and practice problems for mastering DSA for top-tier tech interviews.'
    },
    {
      type: 'Reading & Practice',
      title: 'Top Interview Questions',
      platform: 'LeetCode',
      level: 'Advanced',
      duration: 'Self-paced',
      color: 'bg-orange-500',
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      link: 'https://leetcode.com/explore/interview/card/top-interview-questions-easy/',
      desc: 'Practice the most frequently asked coding interview questions from FAANG companies.'
    },
    {
      type: 'Video Courses',
      title: 'Harvard CS50x',
      platform: 'edX',
      level: 'Beginner',
      duration: '12 Weeks',
      color: 'bg-rose-600',
      icon: <Award className="w-6 h-6 text-white" />,
      link: 'https://cs50.harvard.edu/x/',
      desc: 'Harvard University\'s introduction to the intellectual enterprises of computer science and the art of programming.'
    },
    {
      type: 'Reading & Practice',
      title: 'Web Development Docs',
      platform: 'MDN Web Docs',
      level: 'All Levels',
      duration: 'Self-paced',
      color: 'bg-indigo-600',
      icon: <BookOpen className="w-6 h-6 text-white" />,
      link: 'https://developer.mozilla.org/en-US/docs/Learn',
      desc: 'The ultimate reading material for mastering HTML, CSS, and vanilla JavaScript.'
    }
  ];

  const filteredResources = activeTab === 'All' 
    ? resources 
    : resources.filter(r => r.type === activeTab);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 max-w-7xl mx-auto">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-[2.5rem] p-12 relative overflow-hidden shadow-xl text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
           <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-blue-500 blur-[100px] rounded-full mix-blend-screen"></div>
           <div className="absolute -bottom-20 right-[20%] w-[400px] h-[400px] bg-violet-600 blur-[100px] rounded-full mix-blend-screen"></div>
        </div>

        <div className="relative z-10 max-w-2xl">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-300 text-xs font-bold mb-6">
              <Star className="w-3.5 h-3.5 fill-blue-300" /> Curated Resources
           </div>
           <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
             Accelerate Your <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
               Learning Journey 📚
             </span>
           </h1>
           <p className="text-blue-100 text-lg font-medium leading-relaxed mb-8 max-w-xl">
             Explore high-quality courses, tutorials, and practice platforms handpicked to help you master new skills and ace your interviews.
           </p>
           
           <div className="relative max-w-md shadow-lg shadow-black/20 rounded-2xl">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
             <input 
               type="text" 
               placeholder="Search courses, topics, or platforms..." 
               className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 transition-all font-medium backdrop-blur-sm"
             />
           </div>
        </div>
        
        <div className="relative z-10 hidden lg:block">
           <div className="w-64 h-64 bg-gradient-to-tr from-blue-600 to-violet-500 rounded-full flex items-center justify-center p-2 shadow-2xl border-4 border-white/10">
              <div className="w-full h-full border-2 border-dashed border-white/30 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite]">
                 <div className="w-40 h-40 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite_reverse]">
                    <Compass className="w-16 h-16 text-white" />
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-hide px-4">
        {categories.map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === tab 
                ? 'bg-slate-900 text-white shadow-md shadow-slate-200' 
                : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200 hover:text-slate-900 hover:-translate-y-0.5'
            }`}
          >
            {tab === 'Video Courses' && <Play className="w-4 h-4" />}
            {tab === 'Reading & Practice' && <BookOpen className="w-4 h-4" />}
            {tab === 'Certifications' && <Award className="w-4 h-4" />}
            {tab}
          </button>
        ))}
      </section>

      {/* Resources Grid */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {filteredResources.map((resource, i) => (
          <div key={i} className="group bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col hover:-translate-y-1 relative overflow-hidden">
             
             {/* Gradient glow on hover */}
             <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-50 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

             <div className="flex items-start gap-4 mb-6 relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${resource.color}`}>
                   {resource.icon}
                </div>
                <div>
                   <h3 className="font-bold text-slate-900 leading-tight mb-1 group-hover:text-blue-600 transition-colors">{resource.title}</h3>
                   <p className="text-xs font-bold text-slate-500">{resource.platform}</p>
                </div>
             </div>

             <p className="text-slate-600 text-sm mb-8 flex-1 leading-relaxed relative z-10">
                {resource.desc}
             </p>

             <div className="flex items-center gap-4 mb-6 pt-4 border-t border-slate-100 relative z-10">
                <div className="flex flex-col">
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Level</span>
                   <span className="text-xs font-bold text-slate-700">{resource.level}</span>
                </div>
                <div className="w-px h-8 bg-slate-200"></div>
                <div className="flex flex-col">
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Duration</span>
                   <span className="text-xs font-bold text-slate-700">{resource.duration}</span>
                </div>
             </div>

             <a 
               href={resource.link} 
               target="_blank" 
               rel="noreferrer"
               className="w-full bg-slate-50 hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-100 hover:border-transparent py-3.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 group/btn relative z-10"
             >
                Start Learning <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
             </a>
          </div>
        ))}
      </section>

    </div>
  );
}
