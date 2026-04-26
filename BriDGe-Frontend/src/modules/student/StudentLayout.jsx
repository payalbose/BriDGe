import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Users, BrainCircuit, BookOpen, User, LogOut } from 'lucide-react';
import useStore from '../../store/useStore';
import { cn } from '../../utils/cn';

export function StudentLayout() {
  const { user, logout } = useStore();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/student', icon: LayoutDashboard },
    { name: 'Opportunities', path: '/student/opportunities', icon: Briefcase },
    { name: 'Mentors', path: '/student/mentors', icon: Users },
    { name: 'AI Analyzer', path: '/student/analyzer', icon: BrainCircuit },
    { name: 'Learning', path: '/student/learning', icon: BookOpen },
    { name: 'Profile', path: '/student/profile', icon: User },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary-600">BriDGe.</h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 mt-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/student'}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary-50 text-primary-700" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold">
              P
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">Payal Bose</p>
              <p className="text-xs text-slate-500 truncate">Student</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10 p-4 flex justify-end">
           {/* Header actions can go here */}
           <div className="flex gap-4">
             <span className="text-sm text-slate-500">Welcome back!</span>
           </div>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
