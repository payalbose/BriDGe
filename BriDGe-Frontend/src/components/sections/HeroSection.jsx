import { ArrowRight, Bot, Target, Building2, Briefcase } from 'lucide-react';
import useStore from '../../store/useStore';
import { Button } from '../../components/common/Button';

export function HeroSection() {
  const { openAuthModal } = useStore();

  return (
    <section className="relative overflow-hidden bg-slate-50 pt-24 pb-32">
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-primary-50 to-transparent"></div>
      <div className="mx-auto max-w-7xl px-6 relative z-10 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl mb-6">
          Navigate Your Future with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">AI-Powered</span> Precision
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-600 mb-10">
          BriDGe connects students, universities, and employers through intelligent career pathways, skill analysis, and data-driven insights.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" onClick={openAuthModal}>
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" onClick={openAuthModal}>
            Explore Programs
          </Button>
        </div>
      </div>
    </section>
  );
}
