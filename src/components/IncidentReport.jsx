import { Download, X } from "lucide-react";
export default function IncidentReport({event,onClose}) {
  const report = `IGNIS-X INCIDENT INTELLIGENCE REPORT
Event ID: ${event.id}
Detection time: ${event.timestamp}
Location: ${event.location}
Classification: ${event.classification}
Classification confidence: ${event.classificationConfidence}%
Risk score: ${event.riskScore}/100 (${event.riskLevel})
Thermal persistence: ${event.persistence > 80 ? "4 observations / 18 hours" : "3 observations / 12 hours"}
Nearby industrial assets: ${event.facilities}
Population exposure: ${event.populationExposure}
Infrastructure exposure: ${event.infrastructureExposure}

SATELLITE OBSERVATION
Thermal anomaly observation is represented using simulated demo data.

AI ASSESSMENT
IGNIS-X prototype classification: ${event.classification} (${event.classificationConfidence}% prototype confidence).

GEOSPATIAL CONTEXT
Industrial distance: ${event.industrialDistance} km
Suggested monitoring radius: ${event.radius} km
Roads in radius: ${event.roads}
Critical infrastructure: ${event.criticalInfrastructure}

RISK ASSESSMENT
Thermal intensity, persistence, industrial exposure, population exposure and infrastructure exposure contribute to the demonstrated risk score.

RECOMMENDED ACTION
Immediate verification recommended. Prioritize visual/ground confirmation of the affected industrial zone.

DISCLAIMER
Prototype demonstration. Satellite observations and AI classifications are subject to observational and model uncertainty.`;
  const download=()=>{const blob=new Blob([report],{type:"text/plain"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`${event.id}-incident-report.txt`;a.click();URL.revokeObjectURL(a.href)};
  return <div className="fixed inset-0 z-[100] grid place-items-center bg-black/75 p-4 backdrop-blur-sm"><div className="panel max-h-[90vh] w-full max-w-2xl overflow-auto"><div className="flex items-center justify-between border-b border-slate-800 px-4 py-3"><div><div className="text-xs font-black uppercase tracking-[.16em] text-white">Incident intelligence report</div><div className="mt-0.5 text-[9px] text-slate-500">{event.id}</div></div><button onClick={onClose} className="p-1 text-slate-500 hover:text-white"><X size={17}/></button></div><div className="grid gap-3 p-4 text-[10px] sm:grid-cols-2">{[["Satellite Observation","Thermal anomaly observation represented using simulated demo data."],["AI Assessment",`${event.classification} — ${event.classificationConfidence}% prototype confidence.`],["Geospatial Context",`${event.industrialDistance} km from industrial context · ${event.populationExposure} population exposure.`],["Risk Assessment",`${event.riskScore}/100 · ${event.riskLevel}. Risk combines thermal, temporal and exposure factors.`],["Recommended Action","Immediate verification recommended. Prioritize visual/ground confirmation of the affected industrial zone."]].map(([h,t])=><div key={h} className="rounded border border-slate-800 bg-slate-950/40 p-3 sm:col-span-1"><div className="mb-1 text-[9px] font-black uppercase tracking-wider text-cyan-400">{h}</div><div className="leading-relaxed text-slate-400">{t}</div></div>)}</div><div className="flex items-center justify-end gap-2 border-t border-slate-800 px-4 py-3"><button onClick={onClose} className="rounded border border-slate-700 px-3 py-2 text-[9px] font-bold uppercase tracking-wider text-slate-400">Close</button><button onClick={download} className="flex items-center gap-1.5 rounded bg-cyan-500/90 px-3 py-2 text-[9px] font-black uppercase tracking-wider text-slate-950"><Download size={13}/> Download report</button></div></div></div>
}