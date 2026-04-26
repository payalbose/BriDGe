import { Sparkles, Activity, Compass, ArrowRight } from 'lucide-react';

export function AIAnalyzer() {
  const handleOpenModel = (modelName) => {
    if (modelName === 'Skill Gap Analyzer') {
      window.open('http://localhost:3000', '_blank');
    } else if (modelName === 'Career Recommendation') {
      window.open('http://localhost:8081', '_blank');
    } else {
      // Placeholder for actual model opening logic (modal, iframe, or navigation)
      alert(`Opening ${modelName} Model... (Integration ready)`);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 max-w-5xl mx-auto">
      
      {/* Hero Section */}
      <section className="text-center pt-8 pb-4 relative">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-bold mb-6 shadow-sm">
          <Sparkles className="w-4 h-4" /> Powered by Advanced AI
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
          AI Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">Intelligence</span> 🧠
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
          Leverage our advanced machine learning models to analyze your skills, identify gaps, and discover your optimal career trajectory.
        </p>
      </section>

      {/* Models Grid */}
      <section className="grid md:grid-cols-2 gap-8 px-4">
        
        {/* Model 1: Skill Gap Analyzer */}
        <div className="group relative bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm hover:shadow-xl hover:border-violet-200 transition-all duration-300 flex flex-col overflow-hidden text-left hover:-translate-y-2">
           {/* Background decorative glow */}
           <div className="absolute -top-24 -right-24 w-64 h-64 bg-violet-100 rounded-full blur-[80px] opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"></div>
           
           <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white mb-8 shadow-lg shadow-violet-200 shrink-0">
              <Activity className="w-8 h-8" />
           </div>
           
           <h2 className="text-2xl font-black text-slate-900 mb-3">AI Skill Gap Analyzer</h2>
           <p className="text-violet-600 font-bold text-sm uppercase tracking-wide mb-6">
              Identify blind spots & master key skills
           </p>
           
           <p className="text-slate-600 mb-10 flex-1 leading-relaxed">
              Upload your resume or manually enter your skill set. Our NLP engine will cross-reference your profile against real-time industry demands to pinpoint exact skill gaps and generate a personalized, actionable learning roadmap.
           </p>
           
           <button 
             onClick={() => handleOpenModel('Skill Gap Analyzer')}
             className="w-full group-hover:bg-violet-600 bg-slate-900 text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md"
           >
              Launch Analyzer <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </button>
        </div>

        {/* Model 2: Career Recommendation */}
        <div className="group relative bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col overflow-hidden text-left hover:-translate-y-2">
           {/* Background decorative glow */}
           <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-100 rounded-full blur-[80px] opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"></div>
           
           <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white mb-8 shadow-lg shadow-blue-200 shrink-0">
              <Compass className="w-8 h-8" />
           </div>
           
           <h2 className="text-2xl font-black text-slate-900 mb-3">AI Career Recommendation</h2>
           <p className="text-blue-600 font-bold text-sm uppercase tracking-wide mb-6">
              Discover your perfect career path
           </p>
           
           <p className="text-slate-600 mb-10 flex-1 leading-relaxed">
              Not sure what role fits you best? Our recommendation engine analyzes your interests, strengths, and current market trends to suggest high-growth career tracks that perfectly align with your potential and goals.
           </p>
           
           <button 
             onClick={() => handleOpenModel('Career Recommendation')}
             className="w-full group-hover:bg-blue-600 bg-slate-900 text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md"
           >
              Launch Recommendation <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </button>
        </div>

      </section>

      {/* Decorative Bottom Banner */}
      <section className="mx-4 mt-8 bg-slate-50 rounded-3xl p-8 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-blue-200 to-violet-200 blur-[80px] rounded-full"></div>
         </div>
         <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-xl shrink-0">
               🎯
            </div>
            <div>
               <h3 className="font-bold text-slate-900">Need help choosing a model?</h3>
               <p className="text-sm text-slate-500 font-medium">Both models are free to use and update in real-time.</p>
            </div>
         </div>
         <button className="relative z-10 bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors whitespace-nowrap">
            Read Documentation
         </button>
      </section>

    </div>
  );
}
