import { Activity, RefreshCw, Settings, Wifi, Radio, Moon } from "lucide-react";

export default function Header({ demoMode, setDemoMode, onReset }) {
  return <header className="panel sticky top-0 z-50 flex items-center justify-between gap-4 px-4 py-3">
    <div className="flex items-center gap-3 min-w-0">
      <div className="grid h-9 w-9 place-items-center rounded-md border border-red-500/30 bg-red-500/10 text-red-400">
        <Activity size={20}/>
      </div>
      <div className="min-w-0">
        <div className="flex items-baseline gap-2">
          <h1 className="text-lg font-black tracking-[.18em] text-white">IGNIS-X</h1>
        </div>
        <p className="truncate text-[10px] uppercase tracking-[.16em] text-slate-400">Industrial Thermal Intelligence & Early Warning</p>
      </div>
    </div>
    <div className="hidden lg:flex items-center gap-5 text-[10px] uppercase tracking-wider">
      <span className="flex items-center gap-1.5 text-emerald-400"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"/> System online</span>
      <span className="flex items-center gap-1.5 text-cyan-400"><Radio size={12}/> Satellite feed: simulated</span>
      <span className="text-slate-500">Last update: 2 min ago</span>
    </div>
    <div className="flex items-center gap-1.5">
      <button onClick={()=>setDemoMode(!demoMode)} className={`flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider ${demoMode?"border-cyan-500/40 bg-cyan-500/10 text-cyan-300":"border-slate-700 text-slate-400"}`}><Moon size={13}/>{demoMode?"Demo mode":"Live mode"}</button>
      <button title="Reset demo" onClick={onReset} className="rounded-md border border-slate-700 p-2 text-slate-400 hover:border-slate-500 hover:text-white"><RefreshCw size={15}/></button>
      <button title="Settings" className="rounded-md border border-slate-700 p-2 text-slate-400 hover:border-slate-500 hover:text-white"><Settings size={15}/></button>
    </div>
  </header>
}
