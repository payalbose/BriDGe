import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { 
  Briefcase, ChevronRight, BookOpen, Star, AlertCircle, 
  Target, Trophy, Handshake, MapPin, Heart, MessageSquare,
  Play, Laptop, Code, Rocket, Users, BrainCircuit, GraduationCap, ArrowRight
} from 'lucide-react';

export function StudentDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* 1. Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-50 to-blue-50 rounded-[2.5rem] p-10 shadow-sm border border-white overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[150%] bg-gradient-to-br from-blue-200/40 to-violet-200/40 blur-[80px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[30%] h-[120%] bg-gradient-to-tl from-cyan-200/40 to-emerald-200/40 blur-[80px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-slate-100 text-sm font-medium text-slate-700 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Welcome to Stu-Bridge
           </div>
           
           <h1 className="text-4xl md:text-5xl font-black text-blue-600 mb-4 tracking-tight uppercase">
             Bridge the Gap, Build the Future
           </h1>
           <p className="text-slate-600 max-w-2xl mx-auto mb-8 text-lg">
             Welcome back, John! 👋 Your profile is 80% complete. Connect with opportunities, mentors, and skill-building resources to accelerate your career journey.
           </p>

           <div className="flex gap-4 mb-12">
             <button className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-violet-200 transition-all flex items-center gap-2">
                Complete Profile <Rocket className="w-4 h-4" />
             </button>
             <button className="bg-white hover:bg-slate-50 text-slate-800 px-8 py-3 rounded-xl font-bold shadow-sm border border-slate-200 transition-all flex items-center gap-2">
                Explore Now <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
             </button>
           </div>

           {/* Stats Row */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
              <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white flex flex-col items-center hover:-translate-y-1 transition-transform">
                 <div className="text-3xl font-black text-emerald-500 mb-1">10K+</div>
                 <div className="text-slate-600 font-medium flex items-center gap-2">Opportunities <Briefcase className="w-4 h-4" /></div>
              </div>
              <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white flex flex-col items-center hover:-translate-y-1 transition-transform">
                 <div className="text-3xl font-black text-blue-500 mb-1">5K+</div>
                 <div className="text-slate-600 font-medium flex items-center gap-2">Mentors <Users className="w-4 h-4" /></div>
              </div>
              <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white flex flex-col items-center hover:-translate-y-1 transition-transform">
                 <div className="text-3xl font-black text-violet-500 mb-1">50K+</div>
                 <div className="text-slate-600 font-medium flex items-center gap-2">Students <GraduationCap className="w-4 h-4" /></div>
              </div>
           </div>
        </div>
      </section>

      {/* Original Content Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* AI Analyzer Highlight */}
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 transition-opacity group-hover:opacity-10">
              <BrainCircuit size={120} />
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
                <AlertCircle className="text-violet-500" />
                AI Skill Analysis
              </h2>
              <p className="text-slate-600 mb-8 max-w-xl">Based on your recent activity, we recommend improving your React state management skills to match your target role (Frontend Developer).</p>
              <div className="bg-slate-50 p-6 rounded-2xl mb-6 border border-slate-100">
                <div className="flex justify-between text-sm mb-3">
                  <span className="font-bold text-slate-700">React Mastery</span>
                  <span className="text-violet-600 font-black">75%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-blue-500 to-violet-500 h-3 rounded-full shadow-inner" style={{ width: '75%' }}></div>
                </div>
              </div>
              <Button onClick={() => navigate('/student/analyzer')} className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl">View Full Analysis</Button>
            </div>
          </section>

          {/* Original Opportunities */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Recommended for You</h2>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                View All <ChevronRight size={16} />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                      <Briefcase size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">Frontend Engineer</h3>
                      <p className="text-sm text-slate-500 font-medium">TechCorp Inc. • Remote</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mb-6">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg">React</span>
                    <span className="px-3 py-1 bg-violet-50 text-violet-700 text-xs font-semibold rounded-lg">TypeScript</span>
                  </div>
                  <Button onClick={() => window.open('https://linkedin.com/jobs', '_blank')} variant="outline" className="w-full rounded-xl border-slate-200 hover:bg-slate-50 font-semibold">Apply Now</Button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Updates/Alerts */}
          <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Recent Updates</h2>
            <div className="space-y-5">
              <div className="flex gap-4 pb-5 border-b border-slate-100">
                <div className="w-2.5 h-2.5 mt-1.5 rounded-full bg-emerald-500 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                <div>
                  <p className="text-sm font-bold text-slate-900">New campus drive announced</p>
                  <p className="text-xs text-slate-500 mt-1 font-medium">2 hours ago</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-2.5 h-2.5 mt-1.5 rounded-full bg-violet-500 shrink-0 shadow-[0_0_8px_rgba(139,92,246,0.5)]"></div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Mentor accepted your request</p>
                  <p className="text-xs text-slate-500 mt-1 font-medium">1 day ago</p>
                </div>
              </div>
            </div>
          </section>

          {/* Learning Recommendations */}
          <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <BookOpen size={20} className="text-violet-500" />
              Up Next
            </h2>
            <div className="p-5 bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-2xl border border-slate-100/50">
              <h3 className="font-bold text-slate-900 mb-1">Advanced Zustand Patterns</h3>
              <p className="text-xs text-slate-500 mb-4 font-medium">Estimated time: 45 mins</p>
              <Button size="sm" className="w-full bg-slate-900 text-white hover:bg-slate-800 rounded-xl">Start Module</Button>
            </div>
          </section>
        </div>
      </div>

      {/* === NEW ADDED SECTIONS FROM SCREENSHOTS === */}

      {/* Featured Updates */}
      <section className="bg-white rounded-[2.5rem] p-12 shadow-sm border border-slate-100 text-center relative overflow-hidden">
         <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span> What's New
         </div>
         <h2 className="text-3xl font-bold text-violet-600 mb-3 flex items-center justify-center gap-3">
            Featured Updates <span className="text-2xl">🧩</span>
         </h2>
         <p className="text-slate-500 mb-10 font-medium">Stay updated with the latest opportunities, courses, and community highlights</p>

         <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              { icon: Target, iconBg: 'bg-blue-500', title: 'New AI Features', desc: 'Enhanced AI recommendations now available for personalized career guidance and smart job matching.', link: 'Learn More' },
              { icon: Trophy, iconBg: 'bg-orange-500', title: 'Monthly Challenge', desc: 'Join the December coding challenge and win exclusive badges, prizes, and recognition.', link: 'Join Now', linkColor: 'text-orange-500' },
              { icon: Handshake, iconBg: 'bg-emerald-500', title: 'New Partnerships', desc: "We've partnered with 50+ new companies to bring you more opportunities and career paths.", link: 'Explore', linkColor: 'text-emerald-600' }
            ].map((card, i) => (
               <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-white ${card.iconBg} shadow-sm`}>
                     <card.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{card.title}</h3>
                  <p className="text-sm text-slate-500 mb-6 min-h-[60px] leading-relaxed">{card.desc}</p>
                  <a href="#" className={`text-sm font-bold flex items-center gap-1 ${card.linkColor || 'text-blue-600'} hover:opacity-80 transition-opacity`}>
                     {card.link} <ArrowRight className="w-4 h-4" />
                  </a>
               </div>
            ))}
         </div>
      </section>

      {/* Connect with Mentors */}
      <section className="text-center px-4">
         <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 border border-violet-100 text-violet-600 text-xs font-bold mb-4">
            <span className="w-2 h-2 rounded-full bg-violet-500"></span> Expert Guidance
         </div>
         <h2 className="text-3xl font-bold text-pink-600 mb-3 flex items-center justify-center gap-2">
            Connect with Mentors <span className="text-2xl">♟️</span>
         </h2>
         <p className="text-slate-500 mb-12 font-medium max-w-xl mx-auto">Get personalized guidance from industry experts and accelerate your career growth with 1-on-1 mentorship sessions</p>

         <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              { name: 'Priya Sharma', role: 'Senior Software Engineer', company: 'Meta', rating: '5 (127 reviews)', icon: 'P', color: 'bg-indigo-500', expertise: ['React', 'System Design', 'Career Growth'], price: '₹1,200' },
              { name: 'Arjun Kumar', role: 'ML Research Scientist', company: 'OpenAI', rating: '5 (89 reviews)', icon: 'A', color: 'bg-emerald-500', expertise: ['Machine Learning', 'Python', 'Research'], price: '₹2,000' },
              { name: 'Sarah Chen', role: 'Product Manager', company: 'Google', rating: '4 (156 reviews)', icon: 'S', color: 'bg-teal-600', expertise: ['Product Strategy', 'Data Analysis', 'Leadership'], price: '₹1,500', busy: true }
            ].map((mentor, i) => (
               <div key={i} className="p-6 rounded-3xl bg-white shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative">
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
                  
                  <p className="text-xs text-slate-600 mb-4 line-clamp-3 min-h-[54px]">
                     Experienced professional with years of expertise at top tech companies. Specializes in helping juniors transition to senior roles and mastering new technologies.
                  </p>

                  <div className="mb-6">
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
                     <button onClick={() => alert('Please complete the payment process first to book a session.')} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-1 shadow-md shadow-blue-200">
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

      {/* Expanded Jobs & Internships */}
      <section className="bg-white rounded-[2.5rem] p-12 shadow-sm border border-slate-100">
         <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
            <div>
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-bold mb-3">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span> Career Opportunities
               </div>
               <h2 className="text-3xl font-bold text-red-600 flex items-center gap-2">
                  Jobs & Internships <Briefcase className="w-6 h-6" />
               </h2>
               <p className="text-slate-500 mt-2 font-medium max-w-md">Discover amazing career opportunities from top companies worldwide and kickstart your dream career</p>
            </div>
            <div className="bg-slate-50 p-1.5 rounded-xl flex border border-slate-100">
               <button className="px-6 py-2 rounded-lg bg-orange-500 text-white text-sm font-bold shadow-sm">Available</button>
               <button className="px-6 py-2 rounded-lg text-slate-500 text-sm font-bold hover:bg-slate-100">Recommended</button>
            </div>
         </div>

         <div className="grid md:grid-cols-3 gap-6">
            {[
              { role: 'Frontend Developer', company: 'Google', type: 'JOB', typeColor: 'bg-blue-500', loc: 'Bangalore, India', skills: ['React', 'TypeScript', 'Node.js'], icon: 'G', iconBg: 'bg-teal-500' },
              { role: 'ML Engineering Intern', company: 'Microsoft', type: 'INTERNSHIP', typeColor: 'bg-emerald-500', loc: 'Hyderabad, India', skills: ['Python', 'TensorFlow', 'Machine Learning'], icon: 'M', iconBg: 'bg-blue-600' },
              { role: 'Global Hackathon 2024', company: 'TechCorp', type: 'HACKATHON', typeColor: 'bg-purple-500', loc: 'Virtual', skills: ['JavaScript', 'API Integration', 'UI/UX'], icon: 'T', iconBg: 'bg-indigo-500' }
            ].map((job, i) => (
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
                  
                  <div className="flex items-center gap-1 text-xs text-slate-500 mb-4">
                     <MapPin className="w-3 h-3 text-red-400" /> {job.loc}
                  </div>

                  <p className="text-xs text-slate-600 mb-4 line-clamp-2">
                     Join our amazing team to build next-generation applications with cutting-edge technologies.
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
      </section>

      {/* Learning Resources */}
      <section className="bg-white rounded-[2.5rem] p-12 shadow-sm border border-slate-100">
         <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
            <div>
               <h2 className="text-3xl font-bold text-violet-600 flex items-center gap-2 mb-2">
                  Learning Resources 📚
               </h2>
               <p className="text-slate-500 font-medium max-w-md">Curated courses and tutorials to boost your skills and accelerate your learning journey</p>
            </div>
            <div className="bg-slate-50 p-1.5 rounded-xl flex border border-slate-100">
               <button className="px-6 py-2 rounded-lg bg-blue-500 text-white text-sm font-bold shadow-sm flex items-center gap-2">
                  <Play className="w-4 h-4 fill-white" /> YouTube
               </button>
               <button className="px-6 py-2 rounded-lg text-slate-500 text-sm font-bold hover:bg-slate-100 flex items-center gap-2">
                  🎓 Coursera
               </button>
            </div>
         </div>

         <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'React Masterclass', author: 'Tech With Tim', color: 'bg-gradient-to-br from-blue-400 to-indigo-500', icon: '📱', rating: '4.8 (2.1k)', btn: 'bg-violet-500' },
              { title: 'Python for Beginners', author: 'Code Academy', color: 'bg-gradient-to-br from-emerald-400 to-teal-500', icon: '🐍', rating: '4.9 (1.8k)', btn: 'bg-emerald-600' },
              { title: 'Full Stack Development', author: 'FreeCodeCamp', color: 'bg-gradient-to-br from-orange-400 to-red-500', icon: '🚀', rating: '4.7 (3.2k)', btn: 'bg-orange-600' }
            ].map((course, i) => (
               <div key={i} className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                  <div className={`h-40 ${course.color} flex items-center justify-center text-5xl`}>
                     {course.icon}
                  </div>
                  <div className="p-6">
                     <h3 className="font-bold text-slate-900 mb-1">{course.title}</h3>
                     <p className="text-xs text-slate-500 mb-6">by {course.author}</p>
                     
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs font-bold text-slate-600">
                           <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {course.rating}
                        </div>
                        <button onClick={() => window.open('https://youtube.com', '_blank')} className={`${course.btn} hover:brightness-110 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm`}>
                           Start Learning
                        </button>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* CTA Footer Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-[2.5rem] p-16 text-center text-white relative overflow-hidden shadow-2xl">
         <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] border-[40px] border-white/5 rounded-full pointer-events-none"></div>
         <div className="absolute top-[-30%] right-[-10%] w-[40%] h-[120%] border-[30px] border-white/5 rounded-full pointer-events-none"></div>
         
         <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-blue-200 text-xs font-bold mb-6 backdrop-blur-sm">
               <span className="w-2 h-2 rounded-full bg-blue-400"></span> Join the Revolution
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">Ready to Bridge Your Future? 🚀</h2>
            <p className="text-blue-100 text-lg mb-10 max-w-xl">
               Join thousands of students who are already building their careers with Bridge. Start your journey today and unlock endless opportunities in tech.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 rounded-xl font-black shadow-lg transition-all flex items-center gap-2">
                 Get Started Now <ArrowRight className="w-5 h-5" />
              </button>
            </div>
         </div>
      </section>

    </div>
  );
}
