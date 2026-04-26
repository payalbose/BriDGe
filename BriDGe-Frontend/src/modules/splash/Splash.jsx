import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-primary-900 via-primary-700 to-secondary-900">
      <div className="text-center animate-pulse">
        <h1 className="text-6xl font-extrabold tracking-tighter text-white sm:text-7xl">
          BriDGe<span className="text-secondary-400">.</span>
        </h1>
        <p className="mt-4 text-xl text-primary-100">AI-Powered Career & University Platform</p>
      </div>
    </div>
  );
}
