import { useState, useEffect } from 'react';
import { 
  Lightbulb, Target, Rocket, 
  BrainCircuit, RefreshCw, AlertCircle, Sparkles
} from 'lucide-react';

export function AdminInsights() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInsights = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const apiKey = "AIzaSyCVllKwA5wxd1ycZZ16aYzAaoebTkQJGvM";
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
      
      const prompt = `
        You are an expert AI Career and Placement Strategist analyzing an engineering and management college (IMIT Cuttack) under BPUT. 
        Currently, the placement rate is around 80%. 
        Provide a strategic plan to grow the placement rate to 95%+. 
        
        You MUST respond ONLY with a valid JSON object in the exact format below, with NO markdown formatting, NO backticks, and NO extra text:
        {
          "insights": ["insight 1", "insight 2", "insight 3"],
          "developmentStructures": [
            { "title": "Structure Name", "desc": "Description of structure" }
          ],
          "roadmap": [
            { "phase": "Phase 1: Foundation", "action": "Action description" }
          ]
        }
      `;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch from Gemini API');
      }

      const result = await response.json();
      let textResponse = result.candidates[0].content.parts[0].text;
      
      // Clean up markdown code blocks if the model included them by accident
      textResponse = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
      
      const parsedData = JSON.parse(textResponse);
      setData(parsedData);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to generate insights. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchInsights();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Header Section */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-full blur-[60px] pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-bold uppercase tracking-wide mb-4">
              <Sparkles className="w-3 h-3" /> Powered by Google Gemini AI
           </div>
           <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3 mb-2">
             <BrainCircuit className="w-8 h-8 text-violet-600" /> AI Strategic Insights
           </h1>
           <p className="text-slate-500 font-medium">
             Live AI-generated roadmap and development structures to maximize placement rates and student success across all courses.
           </p>
        </div>

        <button 
          onClick={fetchInsights}
          disabled={loading}
          className="relative z-10 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-300 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 whitespace-nowrap"
        >
          {loading ? (
            <><RefreshCw className="w-4 h-4 animate-spin" /> Analyzing Data...</>
          ) : (
            <><RefreshCw className="w-4 h-4" /> Regenerate Insights</>
          )}
        </button>
      </div>

      {loading && !data && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative w-20 h-20 mb-6">
             <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
             <div className="absolute inset-0 rounded-full border-4 border-violet-600 border-t-transparent animate-spin"></div>
             <BrainCircuit className="absolute inset-0 m-auto w-8 h-8 text-violet-600 animate-pulse" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Gemini is analyzing placement trends...</h3>
          <p className="text-slate-500 mt-2">Generating customized roadmap and structures</p>
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-2xl flex items-start gap-4">
           <AlertCircle className="w-6 h-6 shrink-0 mt-0.5" />
           <div>
             <h3 className="font-bold text-lg mb-1">Analysis Failed</h3>
             <p className="text-sm">{error}</p>
             <button onClick={fetchInsights} className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-700">Try Again</button>
           </div>
        </div>
      )}

      {data && !loading && (
        <div className="grid md:grid-cols-2 gap-8">
           
           {/* Key Insights */}
           <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                 <Lightbulb className="w-6 h-6 text-yellow-500" /> Key Insights
              </h2>
              <div className="space-y-4 flex-1">
                 {data.insights.map((insight, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-yellow-50/50 border border-yellow-100/50">
                       <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center font-bold shrink-0">
                          {i + 1}
                       </div>
                       <p className="text-slate-700 text-sm leading-relaxed font-medium pt-1">
                          {insight}
                       </p>
                    </div>
                 ))}
              </div>
           </div>

           {/* Development Structures */}
           <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                 <Target className="w-6 h-6 text-emerald-500" /> Development Structures
              </h2>
              <div className="space-y-4 flex-1">
                 {data.developmentStructures.map((struct, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors">
                       <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div> {struct.title}
                       </h3>
                       <p className="text-slate-600 text-sm leading-relaxed ml-4">
                          {struct.desc}
                       </p>
                    </div>
                 ))}
              </div>
           </div>

           {/* Growth Roadmap */}
           <div className="md:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                 <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Rocket className="w-6 h-6 text-blue-500" /> Actionable Roadmap to 95% Placement
                 </h2>
                 <div className="px-3 py-1 bg-blue-50 text-blue-600 font-bold text-xs rounded-lg uppercase tracking-wide">
                    Step-by-Step Guide
                 </div>
              </div>

              <div className="relative">
                 {/* Connecting Line */}
                 <div className="absolute left-8 top-8 bottom-8 w-1 bg-slate-100 rounded-full"></div>

                 <div className="space-y-8">
                    {data.roadmap.map((step, i) => (
                       <div key={i} className="flex gap-6 relative z-10">
                          <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center shrink-0">
                             <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-black text-xl">
                                {i + 1}
                             </div>
                          </div>
                          <div className="pt-2">
                             <h3 className="text-lg font-bold text-slate-900 mb-2">{step.phase}</h3>
                             <p className="text-slate-600 text-sm leading-relaxed max-w-4xl bg-slate-50 p-4 rounded-xl border border-slate-100">
                                {step.action}
                             </p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>

        </div>
      )}

    </div>
  );
}
