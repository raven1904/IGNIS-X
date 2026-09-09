const items = [
  ["ACTIVE EVENTS","24"],["CRITICAL","3"],["HIGH RISK","7"],["INDUSTRIAL SITES","142"],["EVENTS TODAY","38"],["AVG RESPONSE PRIORITY","HIGH"]
];
export default function KPIBar({events}) {
  const critical = events.filter(e=>e.riskLevel==="CRITICAL").length;
  const high = events.filter(e=>e.riskLevel==="HIGH").length;
  return <div className="kpi-grid grid grid-cols-6 gap-2">
    {items.map(([label,value],i)=><div key={label} className="panel px-3 py-2.5">
      <div className="text-[9px] uppercase tracking-[.16em] text-slate-500">{label}</div>
      <div className={`mt-1 text-xl font-black ${i===1?"text-red-400":i===2?"text-orange-400":"text-slate-100"}`}>{i===1?critical:i===2?high:value}</div>
    </div>)}
  </div>
}