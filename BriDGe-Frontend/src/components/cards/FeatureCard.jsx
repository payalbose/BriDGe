import { cn } from '../../utils/cn';

export function FeatureCard({ icon: Icon, title, description, className }) {
  return (
    <div className={cn("flex flex-col items-start p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow", className)}>
      <div className="p-3 bg-primary-50 rounded-lg mb-4 text-primary-600">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
}
