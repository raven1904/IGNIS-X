import { CheckCircle2 } from "lucide-react";
export default function RiskExplanation({event}) {
  const factors=[["Thermal intensity",24],["Persistence",19],["Industrial exposure",20],["Population exposure",14],["Infrastructure exposure",10]];
  return <div className="panel p-3">
    <div className="flex items-center justify-between"><div className="text-[10px] font-bold uppercase tracking-[.15em] text-slate-200">Why this event is critical</div><div className="font-mono text-sm font-black text-red-400">{event.riskScore}</div></div>
    <div className="mt-2 space-y-1.5">
      {factors.map(([name,val])=><div key={name} className="flex items-center justify-between border-b border-slate-800/70 pb-1.5 text-[9px]"><span className="text-slate-400">{name}</span><span className="font-mono font-bold text-orange-300">+{val}</span></div>)}
    </div>
    <div className="mt-2 flex items-center justify-between border-t border-slate-700 pt-2 text-[10px] font-black uppercase tracking-widest"><span>Total risk</span><span className="text-red-300">{event.riskScore} / 100</span></div>
    <div className="mt-2 space-y-1 text-[9px] text-slate-400">
      {["High thermal intensity","Persistent activity detected","Located near industrial facility","High infrastructure exposure","Significant population exposure","High classification confidence"].map(x=><div key={x} className="flex gap-1.5"><CheckCircle2 size={11} className="shrink-0 text-red-400"/>{x}</div>)}
    </div>
  </div>
}