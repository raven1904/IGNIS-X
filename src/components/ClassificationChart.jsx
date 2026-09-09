import { classificationDistribution } from "../data/demoEvents";
export default function ClassificationChart() {
  return <div className="panel p-3">
    <div className="flex items-center justify-between"><div className="text-[10px] font-bold uppercase tracking-[.15em] text-slate-200">AI classification</div><span className="text-[8px] uppercase tracking-wider text-slate-600">Prototype confidence — requires operational validation</span></div>
    <div className="mt-3 space-y-2">{classificationDistribution.map(([name,v])=><div key={name}><div className="mb-1 flex justify-between text-[9px]"><span className="text-slate-400">{name}</span><span className="font-mono text-slate-300">{v}%</span></div><div className="h-1.5 rounded bg-slate-800"><div className="h-full rounded bg-cyan-500/70" style={{width:`${Math.max(v,2)}%`}}/></div></div>)}</div>
  </div>
}