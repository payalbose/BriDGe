import { useState } from 'react';
import { 
  Users, GraduationCap, TrendingUp, ChevronDown, ChevronUp, 
  CheckCircle2, XCircle, Briefcase 
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

export function AdminStudents() {
  const [expandedCourse, setExpandedCourse] = useState(null);

  const courses = [
    {
      id: "mca",
      name: "Master of Computer Applications (MCA)",
      totalStudents: 120,
      placedStudents: 102,
      placementRate: 85,
      iconBg: "bg-blue-500",
      growthData: [
        { year: "2020", rate: 65 },
        { year: "2021", rate: 72 },
        { year: "2022", rate: 78 },
        { year: "2023", rate: 82 },
        { year: "2024", rate: 85 },
      ],
      students: [
        { name: "Payal Bose", placed: true, company: "Argusoft" },
        { name: "Deepak Ranjan Sahoo", placed: false, company: null },
        { name: "Krishnakant Das", placed: false, company: null },
        { name: "Biswarupa Panda", placed: true, company: "HireKarma" },
        { name: "Kumkum Chakrabarty", placed: true, company: "BhojSoft" },
        { name: "Ashish Kumar Dawada", placed: false, company: null },
        { name: "Krutibandhu Bhol", placed: true, company: "Kickr Technologies" },
      ]
    },
    {
      id: "mba",
      name: "Master of Business Administration (MBA)",
      totalStudents: 60,
      placedStudents: 51,
      placementRate: 85,
      iconBg: "bg-emerald-500",
      growthData: [
        { year: "2020", rate: 70 },
        { year: "2021", rate: 74 },
        { year: "2022", rate: 79 },
        { year: "2023", rate: 81 },
        { year: "2024", rate: 85 },
      ],
      students: [
        { name: "Binay Barik", placed: true, company: "Deloitte" },
        { name: "Safia", placed: true, company: "PwC" },
        { name: "Amit Kumar", placed: false, company: null },
        { name: "Priya Singh", placed: true, company: "KPMG" },
        { name: "Rahul Jain", placed: true, company: "EY" },
        { name: "Kavita Mishra", placed: false, company: null },
      ]
    },
    {
      id: "mtech",
      name: "Master of Technology (M.Tech)",
      totalStudents: 40,
      placedStudents: 30,
      placementRate: 75,
      iconBg: "bg-violet-500",
      growthData: [
        { year: "2020", rate: 60 },
        { year: "2021", rate: 62 },
        { year: "2022", rate: 68 },
        { year: "2023", rate: 72 },
        { year: "2024", rate: 75 },
      ],
      students: [
        { name: "Suresh Babu", placed: true, company: "Intel" },
        { name: "Anita Roy", placed: false, company: null },
        { name: "Deepak Choudhury", placed: true, company: "IBM" },
        { name: "Meera Nair", placed: true, company: "Wipro" },
        { name: "Sunil Shetty", placed: false, company: null },
      ]
    }
  ];

  const toggleExpand = (id) => {
    if (expandedCourse === id) {
      setExpandedCourse(null);
    } else {
      setExpandedCourse(id);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Header Section */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-full blur-[60px] pointer-events-none"></div>
        <div className="relative z-10">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide mb-4">
              Institute of Management and Information Technology (IMIT)
           </div>
           <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3 mb-2">
             <Users className="w-8 h-8 text-blue-600" /> Student Placement Directory
           </h1>
           <p className="text-slate-500 font-medium max-w-3xl">
             Comprehensive tracking of student enrollment, individual placement statuses, and historical placement growth across IMIT Cuttack's flagship programs.
           </p>
        </div>
      </div>

      {/* Courses Cards */}
      <div className="space-y-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-300">
            
            {/* Card Header (Always Visible) */}
            <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative">
               <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-md shrink-0 ${course.iconBg}`}>
                     <GraduationCap className="w-8 h-8" />
                  </div>
                  <div>
                     <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-2">{course.name}</h2>
                     <div className="flex flex-wrap gap-4 text-sm font-semibold text-slate-500">
                        <span className="flex items-center gap-1"><Users className="w-4 h-4 text-slate-400" /> Enrolled: {course.totalStudents}</span>
                        <span className="flex items-center gap-1"><Briefcase className="w-4 h-4 text-emerald-500" /> Placed: {course.placedStudents}</span>
                        <span className="flex items-center gap-1"><TrendingUp className="w-4 h-4 text-blue-500" /> Rate: {course.placementRate}%</span>
                     </div>
                  </div>
               </div>

               <button 
                  onClick={() => toggleExpand(course.id)}
                  className="w-full md:w-auto px-6 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center gap-2 transition-colors border border-slate-200"
               >
                  {expandedCourse === course.id ? (
                    <>Hide Details <ChevronUp className="w-5 h-5" /></>
                  ) : (
                    <>Show More <ChevronDown className="w-5 h-5" /></>
                  )}
               </button>
            </div>

            {/* Expanded Content */}
            <div className={`grid md:grid-cols-3 gap-0 border-t border-slate-100 transition-all duration-500 overflow-hidden ${expandedCourse === course.id ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
               
               {/* Chart Section */}
               <div className="col-span-1 border-r border-slate-100 bg-slate-50/50 p-8 flex flex-col items-center justify-center">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-6 text-center w-full">Placement Growth (5 Yrs)</h3>
                  
                  {/* Big Number */}
                  <div className="text-center mb-6">
                     <div className="text-5xl font-black text-emerald-500 mb-1">{course.placementRate}%</div>
                     <div className="text-xs font-bold text-slate-500 uppercase">Current Rate</div>
                  </div>

                  <div className="w-full h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={course.growthData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                        <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                        <Tooltip 
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                          itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                        />
                        <Line type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={4} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
               </div>

               {/* Students List Section */}
               <div className="col-span-2 p-8 bg-white">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-6">Student Directory ({course.name})</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {course.students.map((student, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-white hover:border-slate-300 hover:shadow-sm transition-all">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                                 {student.name.charAt(0)}
                              </div>
                              <div>
                                 <p className="text-sm font-bold text-slate-900">{student.name}</p>
                                 {student.placed ? (
                                    <p className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                                       <Briefcase className="w-3 h-3" /> {student.company}
                                    </p>
                                 ) : (
                                    <p className="text-xs font-medium text-slate-400">Actively looking</p>
                                 )}
                              </div>
                           </div>
                           
                           <div className="shrink-0">
                              {student.placed ? (
                                 <div className="bg-emerald-50 text-emerald-600 p-2 rounded-xl" title="Placed">
                                    <CheckCircle2 className="w-5 h-5" />
                                 </div>
                              ) : (
                                 <div className="bg-slate-50 text-slate-400 p-2 rounded-xl" title="Not Placed">
                                    <XCircle className="w-5 h-5" />
                                 </div>
                              )}
                           </div>
                        </div>
                     ))}
                  </div>

               </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
