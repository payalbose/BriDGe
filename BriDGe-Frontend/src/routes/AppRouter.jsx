import { Routes, Route, Navigate } from 'react-router-dom';
import useStore from '../store/useStore';

// Modules
import { Splash } from '../modules/splash/Splash';
import { Landing } from '../modules/public/Landing';
import { StudentLayout } from '../modules/student/StudentLayout';
import { StudentDashboard } from '../modules/student/StudentDashboard';
import { StudentProfile } from '../modules/student/StudentProfile';
import { Opportunities } from '../modules/student/Opportunities';
import { Mentors } from '../modules/student/Mentors';
import { AIAnalyzer } from '../modules/student/AIAnalyzer';
import { Learning } from '../modules/student/Learning';
import { AdminLayout } from '../modules/admin/AdminLayout';
import { AdminDashboard } from '../modules/admin/AdminDashboard';
import { AdminColleges } from '../modules/admin/AdminColleges';
import { AdminStudents } from '../modules/admin/AdminStudents';
import { AdminInsights } from '../modules/admin/AdminInsights';

function ProtectedRoute({ children, allowedRole }) {
  const { user } = useStore();
  
  if (!user) {
    return <Navigate to="/home" replace />;
  }
  
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={user.role === 'student' ? '/student' : '/admin'} replace />;
  }
  
  return children;
}

export function AppRouter() {
  const { user } = useStore();

  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      
      {/* Public Routes with Auth redirect */}
      <Route path="/home" element={user ? <Navigate to={user.role === 'student' ? '/student' : '/admin'} /> : <Landing />} />

      {/* Student Routes */}
      <Route path="/student" element={
        <ProtectedRoute allowedRole="student">
          <StudentLayout />
        </ProtectedRoute>
      }>
        <Route index element={<StudentDashboard />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="opportunities" element={<Opportunities />} />
        <Route path="mentors" element={<Mentors />} />
        <Route path="analyzer" element={<AIAnalyzer />} />
        <Route path="learning" element={<Learning />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute allowedRole="admin">
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="colleges" element={<AdminColleges />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="employers" element={<div className="p-6">Employers Page</div>} />
        <Route path="analytics" element={<div className="p-6">Analytics Page</div>} />
        <Route path="insights" element={<AdminInsights />} />
        <Route path="reports" element={<div className="p-6">Reports Page</div>} />
      </Route>
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
