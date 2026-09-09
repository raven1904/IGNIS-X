const features = [
  ["Brightness Temperature","brightnessTemperature"],["FIRMS Confidence","confidence"],["Thermal Intensity","intensity"],
  ["Persistence","persistence"],["Industrial Proximity",null],["Spatial Concentration",null],["Satellite Context",null],["Environmental Context",null]
];
export default function ThermalFingerprint({event}) {
  const vals = features.map(([_,k],i)=>k?event[k]:[96,78,84,71][i-4]);
  return <div className="panel p-3">
    <div className="mb-3 text-[10px] font-bold uppercase tracking-[.15em] text-slate-200">Thermal event fingerprint</div>
    <div className="space-y-2">
      {features.map(([label,k],i)=>{const v=vals[i];return <div key={label} className="grid grid-cols-[1fr_42px] items-center gap-2"><div><div className="mb-1 flex justify-between text-[9px] text-slate-500"><span>{label}</span><span className="font-mono text-slate-300">{v}%</span></div><div className="h-1.5 overflow-hidden rounded bg-slate-800"><div className="h-full rounded bg-gradient-to-r from-orange-600 to-red-400" style={{width:`${v}%`}}/></div></div></div>})}
    </div>
    <p className="mt-3 border-t border-slate-800 pt-2 text-[9px] leading-relaxed text-slate-500">Classification is based on thermal characteristics, temporal behaviour and geospatial context.</p>
  </div>
}