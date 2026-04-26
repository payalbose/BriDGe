import { Building2, Users, GraduationCap, TrendingUp, MapPin, Search } from 'lucide-react';

export function AdminColleges() {
  const colleges = [
    {
      id: 1,
      name: "Institute of Management and Information Technology (IMIT)",
      location: "Cuttack",
      type: "Constituent College",
      overallPlacement: "85%",
      totalStudents: 180,
      courses: [
        { name: "MCA", students: 120, placed: 102, rate: "85%" },
        { name: "MBA", students: 60, placed: 51, rate: "85%" }
      ]
    },
    {
      id: 2,
      name: "Silicon Institute of Technology",
      location: "Bhubaneswar",
      type: "Autonomous College",
      overallPlacement: "92%",
      totalStudents: 480,
      courses: [
        { name: "B.Tech CSE", students: 300, placed: 285, rate: "95%" },
        { name: "B.Tech IT", students: 120, placed: 108, rate: "90%" },
        { name: "MCA", students: 60, placed: 48, rate: "80%" }
      ]
    },
    {
      id: 3,
      name: "GITA Autonomous College",
      location: "Bhubaneswar",
      type: "Autonomous College",
      overallPlacement: "82%",
      totalStudents: 360,
      courses: [
        { name: "B.Tech CSE", students: 240, placed: 204, rate: "85%" },
        { name: "B.Tech ECE", students: 120, placed: 91, rate: "76%" }
      ]
    },
    {
      id: 4,
      name: "GIFT",
      location: "Bhubaneswar",
      type: "Affiliated College",
      overallPlacement: "78%",
      totalStudents: 240,
      courses: [
        { name: "B.Tech CSE", students: 180, placed: 144, rate: "80%" },
        { name: "MCA", students: 60, placed: 43, rate: "72%" }
      ]
    },
    {
      id: 5,
      name: "Trident Academy of Technology",
      location: "Bhubaneswar",
      type: "Affiliated College",
      overallPlacement: "80%",
      totalStudents: 360,
      courses: [
        { name: "B.Tech CSE", students: 240, placed: 204, rate: "85%" },
        { name: "MCA", students: 120, placed: 84, rate: "70%" }
      ]
    },
    {
      id: 6,
      name: "Parala Maharaja Engineering College",
      location: "Berhampur",
      type: "Government College",
      overallPlacement: "65%",
      totalStudents: 360,
      courses: [
        { name: "B.Tech CSE", students: 120, placed: 96, rate: "80%" },
        { name: "B.Tech Mechanical", students: 120, placed: 72, rate: "60%" },
        { name: "B.Tech Civil", students: 120, placed: 66, rate: "55%" }
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Header Section */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full blur-[60px] pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3 mb-2">
            <Building2 className="w-8 h-8 text-blue-600" /> BPUT Affiliated Colleges
          </h1>
          <p className="text-slate-500 font-medium max-w-2xl">
            Live dashboard tracking student enrollment and placement rates across reputed constituent and affiliated colleges of Biju Patnaik University of Technology.
          </p>
        </div>

        <div className="relative w-full md:w-72 z-10">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search colleges..." 
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
          />
        </div>
      </div>

      {/* Grid of Colleges */}
      <div className="grid lg:grid-cols-2 gap-8">
        {colleges.map((college) => (
          <div key={college.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
            
            {/* College Header */}
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
               <div className="flex justify-between items-start mb-4">
                  <div>
                     <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wide mb-3">
                        {college.type}
                     </div>
                     <h2 className="text-xl font-bold text-slate-900 leading-tight pr-4">{college.name}</h2>
                  </div>
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center shrink-0">
                     <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
               </div>
               <div className="flex items-center gap-4 text-sm font-semibold text-slate-500">
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-red-500" /> {college.location}</span>
                  <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-violet-500" /> {college.totalStudents} Students</span>
                  <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-emerald-500" /> {college.overallPlacement} Placed</span>
               </div>
            </div>

            {/* Courses Table */}
            <div className="p-6 flex-1">
               <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-slate-400" /> Courses & Live Placement Rate
               </h3>
               
               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                   <thead>
                     <tr className="border-b border-slate-200">
                       <th className="pb-3 text-xs font-bold text-slate-500 uppercase">Course Name</th>
                       <th className="pb-3 text-xs font-bold text-slate-500 uppercase text-center">Enrolled</th>
                       <th className="pb-3 text-xs font-bold text-slate-500 uppercase text-center">Placed</th>
                       <th className="pb-3 text-xs font-bold text-slate-500 uppercase text-right">Rate</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                     {college.courses.map((course, i) => (
                       <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                         <td className="py-3 text-sm font-bold text-slate-800">{course.name}</td>
                         <td className="py-3 text-sm font-medium text-slate-600 text-center">{course.students}</td>
                         <td className="py-3 text-sm font-bold text-emerald-600 text-center">{course.placed}</td>
                         <td className="py-3 text-right">
                           <div className="flex items-center justify-end gap-2">
                             <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${parseInt(course.rate) >= 80 ? 'bg-emerald-500' : parseInt(course.rate) >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                                  style={{ width: course.rate }}
                                ></div>
                             </div>
                             <span className="text-xs font-bold text-slate-700 w-8">{course.rate}</span>
                           </div>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
