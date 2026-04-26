import { Users, TrendingUp, Building2, DollarSign } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, ResponsiveContainer } from 'recharts';

const placementDistData = [
  { name: 'Placed', value: 400 },
  { name: 'Higher Studies', value: 150 },
  { name: 'Entrepreneurship', value: 50 },
  { name: 'Seeking', value: 200 },
];
const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

const districtPerfData = [
  { name: 'Dist A', score: 85 },
  { name: 'Dist B', score: 78 },
  { name: 'Dist C', score: 92 },
  { name: 'Dist D', score: 65 },
];

const trendData = [
  { year: '2020', rate: 75 },
  { year: '2021', rate: 78 },
  { year: '2022', rate: 82 },
  { year: '2023', rate: 88 },
  { year: '2024', rate: 91 },
];

const deptData = [
  { id: 1, name: 'Computer Science', placed: 120, total: 130, avgPackage: '12 LPA' },
  { id: 2, name: 'Information Tech', placed: 95, total: 110, avgPackage: '10.5 LPA' },
  { id: 3, name: 'Electronics', placed: 80, total: 100, avgPackage: '8 LPA' },
  { id: 4, name: 'Mechanical', placed: 60, total: 90, avgPackage: '6.5 LPA' },
];

function StatCard({ title, value, icon: Icon, trend }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
        {trend && <p className="text-xs font-medium text-green-600 mt-2">+{trend}% from last year</p>}
      </div>
      <div className="p-3 bg-primary-50 rounded-lg text-primary-600">
        <Icon size={20} />
      </div>
    </div>
  );
}

export function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* 1. STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Students" value="12,450" icon={Users} trend="12" />
        <StatCard title="Overall Placement Rate" value="88.5%" icon={TrendingUp} trend="4.2" />
        <StatCard title="Partner Companies" value="342" icon={Building2} trend="18" />
        <StatCard title="Avg. Package" value="8.5 LPA" icon={DollarSign} trend="15" />
      </div>

      {/* 2. ANALYTICS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Placement Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={placementDistData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {placementDistData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-4 justify-center mt-4">
            {placementDistData.map((entry, index) => (
              <div key={entry.name} className="flex items-center text-xs text-slate-600">
                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index] }}></span>
                {entry.name}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-4">District Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={districtPerfData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f1f5f9'}} />
                <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Placement Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="year" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} domain={['dataMin - 10', 'auto']} />
                <Tooltip />
                <Line type="monotone" dataKey="rate" stroke="#8b5cf6" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3. TABLE */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900">Department-wise Placements</h3>
            <button className="text-sm font-medium text-primary-600 hover:text-primary-700">View Full Report</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 font-medium">Department</th>
                  <th className="px-6 py-4 font-medium">Total Students</th>
                  <th className="px-6 py-4 font-medium">Placed</th>
                  <th className="px-6 py-4 font-medium">Avg Package</th>
                  <th className="px-6 py-4 font-medium">Placement %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {deptData.map((row) => {
                  const percent = Math.round((row.placed / row.total) * 100);
                  return (
                    <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">{row.name}</td>
                      <td className="px-6 py-4 text-slate-600">{row.total}</td>
                      <td className="px-6 py-4 text-slate-600">{row.placed}</td>
                      <td className="px-6 py-4 text-slate-600">{row.avgPackage}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-200 rounded-full h-1.5">
                            <div className={`h-1.5 rounded-full ${percent >= 80 ? 'bg-green-500' : 'bg-yellow-500'}`} style={{ width: `${percent}%` }}></div>
                          </div>
                          <span className="text-xs font-medium text-slate-600">{percent}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. LISTS */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col gap-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Top Colleges</h3>
            <div className="space-y-3">
              {[
                { name: 'National Institute of Tech', score: '98/100' },
                { name: 'State Engineering College', score: '94/100' },
                { name: 'City University', score: '89/100' },
              ].map((c, i) => (
                <div key={i} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-sm font-medium text-slate-800">{c.name}</span>
                  <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded">{c.score}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">System Alerts</h3>
            <div className="space-y-3">
              <div className="flex gap-2 items-start text-sm">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-red-500 shrink-0"></div>
                <p className="text-slate-600">Company registration API needs update.</p>
              </div>
              <div className="flex gap-2 items-start text-sm">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-yellow-500 shrink-0"></div>
                <p className="text-slate-600">Pending approval for 12 new mentors.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
