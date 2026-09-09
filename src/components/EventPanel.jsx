import { AlertTriangle, Building2, Clock3, Factory, ShieldAlert, Users } from "lucide-react";
import ThermalFingerprint from "./ThermalFingerprint";
import RiskExplanation from "./RiskExplanation";
import ClassificationChart from "./ClassificationChart";
import TemporalChart from "./TemporalChart";
import ExposurePanel from "./ExposurePanel";

export default function EventPanel({event}) {
  if(!event) return <div className="panel grid min-h-[520px] place-items-center p-8 text-center text-slate-500"><div><ShieldAlert size={34} className="mx-auto mb-3 text-slate-600"/><p className="text-xs uppercase tracking-widest">Select a thermal hotspot</p><p className="mt-1 text-[10px]">Incident intelligence will appear here.</p></div></div>;
  return <div className="space-y-2">
    <div className="panel p-3">
      <div className="flex items-start justify-between gap-3">
        <div><div className="text-[9px] uppercase tracking-[.16em] text-slate-500">Selected event</div><div className="mt-1 font-mono text-sm font-bold text-white">{event.id}</div></div>
        <span className={`rounded border px-2 py-1 text-[9px] font-black uppercase tracking-widest ${event.riskLevel==="CRITICAL"?"border-red-500/40 bg-red-500/10 text-red-300":event.riskLevel==="HIGH"?"border-orange-500/40 bg-orange-500/10 text-orange-300":"border-yellow-500/30 bg-yellow-500/10 text-yellow-300"}`}>{event.riskLevel}</span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
        {[
          ["Classification",event.classification],["AI confidence",`${event.classificationConfidence}%`],
          ["Risk score",`${event.riskScore} / 100`],["Detected",event.timestamp],
          ["Location",event.location],["Persistence",event.persistence>80?"4 observations / 18 hours":"3 observations / 12 hours"],
          ["Industrial distance",`${event.industrialDistance} km`],["Population exposure",event.populationExposure],
          ["Infrastructure exposure",event.infrastructureExposure]
        ].map(([k,v])=><div key={k} className="border-t border-slate-800 pt-2"><div className="text-[8px] uppercase tracking-wider text-slate-600">{k}</div><div className="mt-0.5 text-[10px] font-semibold text-slate-200">{v}</div></div>)}
      </div>
    </div>
    <ThermalFingerprint event={event}/>
    <RiskExplanation event={event}/>
    <ClassificationChart/>
    <TemporalChart event={event}/>
    <ExposurePanel event={event}/>
  </div>
}