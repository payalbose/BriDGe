import { useState } from 'react';
import { X, Mail, Lock, GraduationCap, Landmark, ArrowRight, ArrowLeft, User } from 'lucide-react';
import useStore from '../../store/useStore';

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login, authView, setAuthView } = useStore();
  const [role, setRole] = useState('student');

  if (!isAuthModalOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    login({ role, name: role === 'student' ? 'John Student' : 'Admin User' });
  };
  
  const handleSignUp = (e) => {
    e.preventDefault();
    login({ role, name: role === 'student' ? 'John Student' : 'Admin User' });
  };

  const isLogin = authView === 'login';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-4xl rounded-3xl bg-white shadow-2xl flex flex-col md:flex-row overflow-hidden min-h-[600px] animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className={`absolute right-6 top-6 z-20 rounded-full p-2 transition-colors ${
            isLogin 
              ? 'text-white hover:text-blue-100 bg-white/10 hover:bg-white/20' 
              : 'text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200'
          }`}
        >
          <X size={20} />
        </button>

        {/* Form Column */}
        <div className={`w-full md:w-1/2 p-12 flex flex-col items-center justify-center relative bg-white transition-all duration-500 ${isLogin ? 'order-1' : 'order-2'}`}>
          <h2 className="text-3xl font-bold text-blue-600 mb-6">{isLogin ? 'Login' : 'Create Account'}</h2>

          <div className="flex gap-4 mb-4">
            <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors shadow-md shadow-blue-200">
               <span className="font-bold text-lg">G</span>
            </button>
            <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors shadow-md shadow-blue-200">
               <span className="font-bold text-lg">f</span>
            </button>
            <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors shadow-md shadow-blue-200">
               <span className="font-bold text-lg">GH</span>
            </button>
            <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors shadow-md shadow-blue-200">
               <span className="font-bold text-lg">in</span>
            </button>
          </div>

          <p className="text-xs text-slate-400 mb-6">
            {isLogin ? 'or use your email account' : 'or use your email for registration'}
          </p>

          <div className="flex gap-4 w-full mb-6">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-all border ${
                role === 'student' ? 'border-blue-500 bg-blue-50 text-blue-600 shadow-sm' : 'border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              <GraduationCap className="w-4 h-4" /> Student
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-all border ${
                role === 'admin' ? 'border-blue-500 bg-blue-50 text-blue-600 shadow-sm' : 'border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              <Landmark className="w-4 h-4" /> University
            </button>
          </div>

          <form onSubmit={isLogin ? handleLogin : handleSignUp} className="w-full space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                placeholder="Email"
                required
                defaultValue={role === 'student' ? 'payal@studentbridge.com' : 'payal@adminbridge.com'}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="password"
                placeholder="Password"
                required
                defaultValue="payal@24"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>
            
            {isLogin && (
              <div className="flex items-center justify-between text-xs py-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-500 font-medium">
                  <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4" />
                  Remember me
                </label>
                <a href="#" className="text-blue-600 hover:underline font-medium">Forgot Password?</a>
              </div>
            )}

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3.5 font-bold shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 mt-4">
              {isLogin ? 'Login' : 'Sign Up'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Promo Column */}
        <div className={`w-full md:w-1/2 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 p-12 flex flex-col items-center justify-center text-center text-white relative transition-all duration-500 ${isLogin ? 'order-2' : 'order-1'}`}>
          {/* Decorative shapes */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
             <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-white blur-[80px]"></div>
          </div>
          
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-4xl font-bold mb-6 tracking-tight">
              {isLogin ? 'Hello, Friend!' : 'Welcome Back!'}
            </h2>
            <p className="text-blue-100 text-sm mb-10 leading-relaxed max-w-[260px] font-medium">
              {isLogin 
                ? 'Register with your personal details to use all of site features'
                : 'To keep connected with us please login with your personal info'}
            </p>
            <button 
              type="button"
              onClick={() => setAuthView(isLogin ? 'signup' : 'login')} 
              className="border-[1.5px] border-white text-white hover:bg-white hover:text-blue-600 rounded-full px-10 py-3 font-bold tracking-widest text-xs transition-colors flex items-center gap-2"
            >
               {isLogin ? (
                 <>SIGN UP <ArrowRight className="w-4 h-4" /></>
               ) : (
                 <><ArrowLeft className="w-4 h-4" /> SIGN IN</>
               )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
