import { useState } from 'react';
import { 
  Search, Briefcase, MapPin, Heart, Sparkles, Filter, 
  ChevronDown, Target, Code, Trophy
} from 'lucide-react';
import { Button } from '../../components/common/Button';

export function Opportunities() {
  const [activeTab, setActiveTab] = useState('All');

  const stats = [
    { label: 'Jobs', value: '2.5K+' },
    { label: 'Internships', value: '1.2K+' },
    { label: 'Hackathons', value: '500+' },
    { label: 'Competitions', value: '300+' }
  ];

  const jobs = [
    { 
      role: 'Senior Frontend Developer', company: 'Google', type: 'JOB', typeColor: 'bg-blue-500', 
      loc: 'Bangalore, India', skills: ['React', 'TypeScript', 'GraphQL', '+1'], 
      icon: 'G', iconBg: 'bg-teal-500', 
      desc: 'Join our team to build next-generation web applications with cutting-edge technologies. Work on products used by billions of users worldwide.'
    },
    { 
      role: 'Machine Learning Intern', company: 'Microsoft', type: 'INTERNSHIP', typeColor: 'bg-emerald-500', 
      loc: 'Hyderabad, India', skills: ['Python', 'TensorFlow', 'PyTorch', '+1'], 
      icon: 'M', iconBg: 'bg-blue-600',
      desc: 'Work on cutting-edge AI research projects and contribute to products that impact millions of users.'
    },
    { 
      role: 'Global Innovation Challenge', company: 'Amazon', type: 'HACKATHON', typeColor: 'bg-purple-500', 
      loc: 'Virtual', skills: ['AWS', 'JavaScript', 'API Integration', '+1'], 
      icon: 'A', iconBg: 'bg-orange-500',
      desc: 'Build innovative solutions for sustainability challenges using AWS cloud technologies.'
    },
    { 
      role: 'Product Designer', company: 'Meta', type: 'JOB', typeColor: 'bg-blue-500', 
      loc: 'Remote', skills: ['Figma', 'UI/UX', 'Prototyping'], 
      icon: 'M', iconBg: 'bg-indigo-600',
      desc: 'Design intuitive and engaging user experiences for the next generation of social networking platforms.'
    },
    { 
      role: 'Backend Engineering Intern', company: 'Netflix', type: 'INTERNSHIP', typeColor: 'bg-emerald-500', 
      loc: 'Pune, India', skills: ['Java', 'Spring Boot', 'Microservices'], 
      icon: 'N', iconBg: 'bg-red-600',
      desc: 'Help scale our global content delivery network and build robust microservices architectures.'
    },
    { 
      role: 'Data Science Hackathon', company: 'Kaggle', type: 'COMPETITION', typeColor: 'bg-orange-500', 
      loc: 'Virtual', skills: ['Data Analysis', 'Python', 'ML'], 
      icon: 'K', iconBg: 'bg-cyan-500',
      desc: 'Compete with data scientists globally to solve complex predictive modeling problems.'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* Hero Section */}
      <section className="relative bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 overflow-hidden text-center flex flex-col items-center">
        {/* Decorative blobs */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-indigo-100 rounded-full blur-2xl opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-100 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
        
        <h1 className="text-4xl font-bold text-slate-900 mb-4 relative z-10">
          Discover Opportunities 🚀
        </h1>
        <p className="text-slate-500 mb-10 max-w-xl relative z-10 font-medium">
          Find your next career move from thousands of jobs, internships, hackathons, and competitions
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 relative z-10">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-black text-slate-900 mb-1">{stat.value}</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Search & Filters */}
      <section className="bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-slate-100 sticky top-4 z-20">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search opportunities..." 
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm font-medium text-slate-700"
            />
          </div>
          <button 
            onClick={() => window.open('http://localhost:3002', '_blank')}
            className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md shadow-violet-200 transition-all hover:-translate-y-0.5"
          >
            <Sparkles className="w-5 h-5" /> Job Matching AI
          </button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['All', 'Jobs', 'Internships', 'Hackathons', 'Competitions'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === tab 
                  ? 'bg-violet-500 text-white shadow-sm' 
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab === 'Jobs' && <Briefcase className="w-4 h-4" />}
              {tab === 'Internships' && <Target className="w-4 h-4" />}
              {tab === 'Hackathons' && <Code className="w-4 h-4" />}
              {tab === 'Competitions' && <Trophy className="w-4 h-4" />}
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* Results Header */}
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-bold text-slate-900">12 Opportunities Found</h2>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 cursor-pointer hover:bg-slate-50">
          Sort by: Relevance <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {/* Grid of Opportunities */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job, i) => (
           <div key={i} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex flex-col">
              <div className="flex items-start justify-between mb-4">
                 <div className="flex gap-3 items-center">
                    <div className={`w-10 h-10 rounded-xl text-white flex items-center justify-center font-bold text-lg ${job.iconBg}`}>
                       {job.icon}
                    </div>
                    <div>
                       <h3 className="font-bold text-slate-900 leading-tight">{job.role}</h3>
                       <p className="text-xs text-slate-500">{job.company}</p>
                    </div>
                 </div>
                 <span className={`px-2 py-1 text-[9px] font-bold text-white rounded-full ${job.typeColor}`}>{job.type}</span>
              </div>
              
              <div className="flex items-center gap-1 text-xs text-slate-500 mb-4 font-medium">
                 <MapPin className="w-3 h-3 text-red-400" /> {job.loc}
              </div>

              <p className="text-xs text-slate-600 mb-4 line-clamp-3 min-h-[54px] leading-relaxed">
                 {job.desc}
              </p>

              <div className="mb-6 flex-1">
                 <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Required Skills</p>
                 <div className="flex flex-wrap gap-1.5">
                    {job.skills.map(skill => (
                       <span key={skill} className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-md">{skill}</span>
                    ))}
                 </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                 <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
                    ⏱️ Deadline: 2024-12-15
                 </div>
                 <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                       <Heart className="w-4 h-4" />
                    </button>
                    <button onClick={() => window.open('https://linkedin.com/jobs', '_blank')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                       Apply Now ✈️
                    </button>
                 </div>
              </div>
           </div>
        ))}
      </div>

    </div>
  );
}
