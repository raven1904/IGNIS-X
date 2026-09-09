import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import { temporal } from "../data/demoEvents";
export default function TemporalChart({event}) {
  const factor = event.persistence/86;
  const data=temporal.map(d=>({...d,value:Math.min(100,Math.round(d.value*factor))}));
  return <div className="panel p-3">
    <div className="flex items-center justify-between"><div className="text-[10px] font-bold uppercase tracking-[.15em] text-slate-200">Temporal persistence</div><div className="text-[9px] text-emerald-400">↑ Increasing</div></div>
    <div className="mt-2 h-32"><ResponsiveContainer width="100%" height="100%"><AreaChart data={data} margin={{top:5,right:4,left:-28,bottom:0}}><defs><linearGradient id="thermalFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ff6b35" stopOpacity=".35"/><stop offset="100%" stopColor="#ff6b35" stopOpacity="0"/></linearGradient></defs><XAxis dataKey="time" tick={{fontSize:8,fill:"#667787"}} axisLine={false} tickLine={false}/><YAxis domain={[0,100]} tick={{fontSize:8,fill:"#667787"}} axisLine={false} tickLine={false}/><Tooltip contentStyle={{background:"#0c131b",border:"1px solid #25323e",fontSize:10}}/><Area type="monotone" dataKey="value" stroke="#ff6b35" fill="url(#thermalFill)" strokeWidth={2}/></AreaChart></ResponsiveContainer></div>
    <div className="grid grid-cols-3 gap-2 border-t border-slate-800 pt-2 text-[9px]"><div><span className="text-slate-600">Duration</span><br/><b className="text-slate-300">{event.persistence>80?"18h":"12h"}</b></div><div><span className="text-slate-600">Observations</span><br/><b className="text-slate-300">{event.persistence>80?4:3}</b></div><div><span className="text-slate-600">Recurrence</span><br/><b className="text-slate-300">{event.recurrence}</b></div></div>
  </div>
}