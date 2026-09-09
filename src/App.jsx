import { useMemo, useState } from "react";
import { Database, Satellite, Map, Users, Wind, AlertTriangle } from "lucide-react";
import Header from "./components/Header";
import KPIBar from "./components/KPIBar";
import CommandMap from "./components/CommandMap";
import EventPanel from "./components/EventPanel";
import AlertPanel from "./components/AlertPanel";
import ScenarioController from "./components/ScenarioController";
import IncidentReport from "./components/IncidentReport";
import PipelineVisualization from "./components/PipelineVisualization";
import { baseEvents, scenarioOverrides } from "./data/demoEvents";

export default function App(){
  const [events,setEvents]=useState(baseEvents);
  const [selectedId,setSelectedId]=useState(baseEvents[0].id);
  const [scenario,setScenario]=useState("Industrial Fire");
  const [running,setRunning]=useState(false);
  const [progress,setProgress]=useState(0);
  const [report,setReport]=useState(false);
  const [ack,setAck]=useState(false);
  const [demoMode,setDemoMode]=useState(true);

  const selected=useMemo(()=>events.find(e=>e.id===selectedId)||events[0],[events,selectedId]);

  const applyScenario=(name)=>{
    const override=scenarioOverrides[name];
    const updated={...events[0],...override,id:"IGNIS-2026-0042"};
    setEvents(prev=>[updated,...prev.slice(1)]);
    setSelectedId(updated.id);
    setAck(false);
  };

  const runAnalysis=()=>{
    applyScenario(scenario);
    setRunning(true); setProgress(0); setAck(false);
    let p=0;
    const timer=setInterval(()=>{
      p+=11; setProgress(Math.min(p,100));
      if(p>=100){clearInterval(timer);setTimeout(()=>setRunning(false),450);}
    },260);
  };

  const reset=()=>{
    setEvents(baseEvents);setSelectedId(baseEvents[0].id);setScenario("Industrial Fire");setRunning(false);setProgress(0);setAck(false);setReport(false);
  };

  return <div className="min-h-screen bg-[#06090d] text-slate-200">
    <div className="mx-auto max-w-[1800px] p-2 sm:p-3">
      <Header demoMode={demoMode} setDemoMode={setDemoMode} onReset={reset}/>
      <main className="mt-2 space-y-2">
        <KPIBar events={events}/>
        <div className="main-grid grid grid-cols-[minmax(0,1.72fr)_minmax(350px,.8fr)] gap-2 items-start">
          <div className="space-y-2">
            <CommandMap events={events} selected={selected} onSelect={e=>{setSelectedId(e.id);setAck(false)}}/>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-[1.05fr_1fr]">
              <ScenarioController scenario={scenario} setScenario={v=>{setScenario(v);applyScenario(v)}} onRun={runAnalysis} running={running} progress={progress} onReset={reset}/>
              <div className="panel p-3">
                <div className="text-[10px] font-bold uppercase tracking-[.15em] text-slate-200">Data sources</div>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {[[Satellite,"NASA FIRMS / VIIRS","SIMULATED"],[Database,"Sentinel-1 / Sentinel-2","REFERENCE"],[Map,"OpenStreetMap","REFERENCE"],[Users,"Population data","SIMULATED"],[Wind,"Environmental context","SIMULATED"]].map(([I,n,s])=><div key={n} className="rounded border border-slate-800 p-2"><I size={14} className="text-cyan-400"/><div className="mt-1 text-[8px] font-bold uppercase text-slate-300">{n}</div><div className="mt-0.5 text-[7px] uppercase tracking-wider text-slate-600">{s}</div></div>)}
                </div>
                <div className="mt-3 rounded border border-orange-500/20 bg-orange-500/5 p-2 text-[8px] leading-relaxed text-slate-500"><b className="text-orange-300">Scientific positioning:</b> NASA FIRMS provides thermal anomaly observations. IGNIS-X performs contextual classification and risk assessment.</div>
              </div>
            </div>
          </div>
          <aside id="incident-panel" className="space-y-2">
            <EventPanel event={selected}/>
            <AlertPanel event={selected} onReport={()=>setReport(true)} acknowledged={ack} onAck={()=>setAck(true)}/>
          </aside>
        </div>
        <PipelineVisualization/>
        <section className="panel flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div><div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[.16em] text-white"><AlertTriangle size={14} className="text-orange-400"/> Traditional approach vs IGNIS-X</div><p className="mt-1 text-[9px] leading-relaxed text-slate-500">Hotspot detected → contextual intelligence: <b className="text-slate-300">{selected.classification}</b>, <b className="text-red-300">{selected.classificationConfidence}% prototype confidence</b>, <b className="text-red-300">{selected.riskScore}/100 {selected.riskLevel}</b>, persistence, industrial proximity and exposure.</p></div>
          <div className="shrink-0 rounded border border-slate-800 px-3 py-2 text-[8px] uppercase tracking-wider text-slate-600">LIVE = not connected · SIMULATED = demo data</div>
        </section>
      </main>
      <footer className="flex flex-col gap-1 px-1 py-4 text-[8px] uppercase tracking-wider text-slate-600 sm:flex-row sm:items-center sm:justify-between"><span>IGNIS-X · SIH 2026 — SIH26162</span><span>AI-powered industrial thermal intelligence</span><span>Prototype demonstration. Satellite observations and AI classifications are subject to observational and model uncertainty.</span></footer>
    </div>
    {report && <IncidentReport event={selected} onClose={()=>setReport(false)}/>}
  </div>
}