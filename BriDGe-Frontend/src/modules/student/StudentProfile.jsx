import { useState } from 'react';
import { 
  User, Briefcase, Code, Terminal, FolderOpen, 
  GraduationCap, Award, Trophy, Languages, 
  Edit3, Save, X, Mail, MapPin, Phone, Globe, Link
} from 'lucide-react';

const SectionTitle = ({ icon: Icon, title }) => (
  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
    <Icon className="w-5 h-5 text-violet-600" /> {title}
  </h3>
);

export function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false);

  // Initial Profile State
  const [profile, setProfile] = useState({
    firstName: 'Payal',
    lastName: 'Bose',
    role: 'MCA Student',
    email: 'payalbose98@gmail.com',
    phone: '+91 79886 49701',
    location: 'Cuttack, Odisha',
    github: 'https://github.com/payalbose1234',
    linkedin: 'https://www.linkedin.com/in/payal-bose-52bb65372?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    bio: 'Frontend-focused Software Developer skilled in JavaScript, HTML5, CSS3, React.js, and Next.js, building scalable and responsive web applications. Experienced in API integration, state management, and performance optimization (lazy loading, code splitting) to deliver efficient user-centric solutions. Strong in debugging, cross-browser compatibility, and clean code practices, with hands-on experience in real-time systems, data-driven dashboards, and RESTful architectures..',
    about: 'I am a final year MCA student with a strong foundation in data structures and web development. I love participating in hackathons, building open-source projects, and constantly exploring new web technologies like React, Next.js, and Tailwind CSS.',
    experience: 'Frontend Developer Intern. Built responsive UI components using React and Tailwind CSS. Improved website load speed by 20% through code splitting.',
    techSkills: 'React.js, JavaScript, HTML/CSS, Tailwind CSS, Node.js, Express, MongoDB, Python, C++',
    softSkills: 'Communication, Teamwork, Problem Solving, Leadership, Time Management',
    projects: '1. E-Commerce Dashboard: A full-stack admin panel built with MERN stack.\n2. AI Career Analyzer: A React app integrating NLP for resume parsing.',
    education: 'MCA - Institute of management and Information Technology, Cuttack (2024 - 2026) | CGPA: 9.2\nBSc ITM - Computer Application Centre (2020 - 2023) | Percentage: 85%',
    certificates: 'Meta Front-End Developer Professional Certificate (Coursera)\nAWS Certified Cloud Practitioner',
    achievements: 'Winner of State Hackathon 2025 (BPUT)\nTop 100 in LeetCode Biweekly Contest 110',
    languages: 'English (Fluent), Hindi (Fluent), Bengali (Native), Odia (Native)'
  });

  // Local state for the edit form
  const [formData, setFormData] = useState(profile);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20 px-4">
      
      {/* Top Header Card */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-100 to-blue-100 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
          <div className="w-32 h-32 bg-gradient-to-br from-violet-500 to-blue-600 rounded-full flex items-center justify-center text-white text-5xl font-black shadow-xl shrink-0 border-4 border-white">
            {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-black text-slate-900 mb-1">{profile.firstName} {profile.lastName}</h1>
            <p className="text-blue-600 font-bold mb-4">{profile.role}</p>
            <p className="text-slate-600 mb-6 max-w-2xl">{profile.bio}</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm font-medium text-slate-500">
               <div className="flex items-center gap-1"><Mail className="w-4 h-4 text-slate-400" /> {profile.email}</div>
               <div className="flex items-center gap-1"><Phone className="w-4 h-4 text-slate-400" /> {profile.phone}</div>
               <div className="flex items-center gap-1"><MapPin className="w-4 h-4 text-slate-400" /> {profile.location}</div>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm font-medium text-slate-500 mt-2">
               <div className="flex items-center gap-1"><Globe className="w-4 h-4 text-slate-400" /> {profile.github}</div>
               <div className="flex items-center gap-1"><Link className="w-4 h-4 text-slate-400" /> {profile.linkedin}</div>
            </div>
          </div>

          <div className="shrink-0 flex flex-col gap-3 w-full md:w-auto">
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 w-full"
              >
                <Edit3 className="w-4 h-4" /> Edit Profile
              </button>
            ) : (
              <>
                <button 
                  onClick={handleSave}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 w-full"
                >
                  <Save className="w-4 h-4" /> Save Changes
                </button>
                <button 
                  onClick={handleCancel}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 w-full"
                >
                  <X className="w-4 h-4" /> Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="md:col-span-2 space-y-8">
          
          {/* About Me */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
             <SectionTitle icon={User} title="About Me" />
             {isEditing ? (
               <textarea name="about" value={formData.about} onChange={handleInputChange} rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-violet-500 outline-none" />
             ) : (
               <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-sm">{profile.about}</p>
             )}
          </div>

          {/* Experience */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
             <SectionTitle icon={Briefcase} title="Experience" />
             {isEditing ? (
               <textarea name="experience" value={formData.experience} onChange={handleInputChange} rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-violet-500 outline-none" />
             ) : (
               <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-sm">{profile.experience}</p>
             )}
          </div>

          {/* Projects */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
             <SectionTitle icon={FolderOpen} title="Projects" />
             {isEditing ? (
               <textarea name="projects" value={formData.projects} onChange={handleInputChange} rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-violet-500 outline-none" />
             ) : (
               <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-sm">{profile.projects}</p>
             )}
          </div>

          {/* Education */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
             <SectionTitle icon={GraduationCap} title="Education" />
             {isEditing ? (
               <textarea name="education" value={formData.education} onChange={handleInputChange} rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-violet-500 outline-none" />
             ) : (
               <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-sm">{profile.education}</p>
             )}
          </div>

        </div>

        {/* Right Column */}
        <div className="space-y-8">
          
          {/* Technical Skills */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
             <SectionTitle icon={Code} title="Technical Skills" />
             {isEditing ? (
               <textarea name="techSkills" value={formData.techSkills} onChange={handleInputChange} rows={3} placeholder="Comma separated..." className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-violet-500 outline-none" />
             ) : (
               <div className="flex flex-wrap gap-2">
                 {profile.techSkills.split(',').map((skill, i) => (
                   <span key={i} className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-100">
                     {skill.trim()}
                   </span>
                 ))}
               </div>
             )}
          </div>

          {/* Soft Skills */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
             <SectionTitle icon={Terminal} title="Soft Skills" />
             {isEditing ? (
               <textarea name="softSkills" value={formData.softSkills} onChange={handleInputChange} rows={3} placeholder="Comma separated..." className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-violet-500 outline-none" />
             ) : (
               <div className="flex flex-wrap gap-2">
                 {profile.softSkills.split(',').map((skill, i) => (
                   <span key={i} className="bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-lg text-xs font-bold border border-emerald-100">
                     {skill.trim()}
                   </span>
                 ))}
               </div>
             )}
          </div>

          {/* Certificates */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
             <SectionTitle icon={Award} title="Certificates" />
             {isEditing ? (
               <textarea name="certificates" value={formData.certificates} onChange={handleInputChange} rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-violet-500 outline-none" />
             ) : (
               <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-sm">{profile.certificates}</p>
             )}
          </div>

          {/* Achievements */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
             <SectionTitle icon={Trophy} title="Achievements" />
             {isEditing ? (
               <textarea name="achievements" value={formData.achievements} onChange={handleInputChange} rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-violet-500 outline-none" />
             ) : (
               <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-sm">{profile.achievements}</p>
             )}
          </div>

          {/* Languages */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
             <SectionTitle icon={Languages} title="Languages Known" />
             {isEditing ? (
               <textarea name="languages" value={formData.languages} onChange={handleInputChange} rows={2} placeholder="Comma separated..." className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-violet-500 outline-none" />
             ) : (
               <div className="flex flex-wrap gap-2">
                 {profile.languages.split(',').map((lang, i) => (
                   <span key={i} className="bg-orange-50 text-orange-600 px-3 py-1.5 rounded-lg text-xs font-bold border border-orange-100">
                     {lang.trim()}
                   </span>
                 ))}
               </div>
             )}
          </div>

        </div>
      </div>
      
      {/* Floating Edit Header Details (only visible in edit mode) */}
      {isEditing && (
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-violet-200 mt-8">
           <h3 className="text-lg font-bold text-violet-600 mb-6 flex items-center gap-2"><Edit3 className="w-5 h-5" /> Edit Basic Information</h3>
           <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wide">First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-violet-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wide">Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-violet-500 outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wide">Headline / Role</label>
                <input type="text" name="role" value={formData.role} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-violet-500 outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wide">Short Bio</label>
                <input type="text" name="bio" value={formData.bio} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-violet-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wide">Email</label>
                <input type="text" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-violet-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wide">Phone</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-violet-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wide">Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-violet-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wide">GitHub Link</label>
                <input type="text" name="github" value={formData.github} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-violet-500 outline-none" />
              </div>
           </div>
        </div>
      )}

    </div>
  );
}
