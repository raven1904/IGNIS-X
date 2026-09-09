import { useEffect, useMemo, useRef } from "react";
import L from "leaflet";
import { Crosshair, Layers, MapPin, Navigation } from "lucide-react";

const markerClass = r=>`thermal-marker ${r.toLowerCase()}`;

export default function CommandMap({events, selected, onSelect}) {
  const mapRef = useRef(null);
  const map = useRef(null);
  const layerRef = useRef(null);

  useEffect(()=>{
    if(!map.current) {
      map.current = L.map(mapRef.current, { zoomControl:true, attributionControl:true, minZoom:8, maxZoom:12 })
        .setView([19.04,73.08], 9);
      // No external tile service: keep the Leaflet map functional offline.
      L.rectangle([[18.55,72.45],[19.55,73.7]], {color:"#28404d",weight:1,fillColor:"#0b1820",fillOpacity:.95,interactive:false}).addTo(map.current);
      L.polyline([[18.62,72.62],[18.78,72.85],[18.98,73.02],[19.2,73.24],[19.5,73.48]], {color:"#244553",weight:3,opacity:.8,interactive:false}).addTo(map.current);
      L.polyline([[19.0,72.55],[19.0,72.9],[19.06,73.2],[19.08,73.6]], {color:"#1e3945",weight:2,opacity:.8,interactive:false}).addTo(map.current);
      L.polygon([[18.82,72.72],[19.02,72.78],[19.22,72.94],[19.18,73.18],[18.98,73.32],[18.78,73.1]], {color:"#24404a",weight:1,fillColor:"#11303a",fillOpacity:.22,interactive:false}).addTo(map.current);
      L.control.scale({imperial:false,position:"bottomleft"}).addTo(map.current);
    }
    return ()=>{};
  },[]);

  useEffect(()=>{
    if(!map.current) return;
    if(layerRef.current) layerRef.current.clearLayers(); else layerRef.current=L.layerGroup().addTo(map.current);
    events.forEach(e=>{
      const icon=L.divIcon({className:"", html:`<div class="${markerClass(e.riskLevel)}"></div>`, iconSize:[18,18], iconAnchor:[9,9]});
      const m=L.marker([e.latitude,e.longitude],{icon}).addTo(layerRef.current);
      m.bindTooltip(`<b>${e.id}</b><br/>${e.riskLevel} · ${e.classification}<br/>Confidence ${e.classificationConfidence}%`,{direction:"top",offset:[0,-8]});
      m.on("click",()=>onSelect(e));
    });
    const s=selected;
    if(s) {
      L.circle([s.latitude,s.longitude],{radius:s.radius*1000,color:"#ff5b2d",weight:1,dashArray:"6 6",fillColor:"#ff5b2d",fillOpacity:.07,interactive:false}).addTo(layerRef.current);
      L.circleMarker([s.latitude,s.longitude],{radius:26,color:"#ff5b2d",weight:1,opacity:.55,fillOpacity:0,interactive:false}).addTo(layerRef.current);
    }
  },[events,selected,onSelect]);

  const selectedLabel = useMemo(()=>selected?.location || "No incident selected",[selected]);

  return <section className="panel scanline overflow-hidden">
    <div className="flex items-center justify-between border-b border-slate-800 px-3 py-2.5">
      <div>
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.14em] text-slate-200"><MapPin size={14} className="text-cyan-400"/> Geospatial command map</div>
        <div className="mt-0.5 text-[9px] uppercase tracking-wider text-slate-500">{selectedLabel} · thermal observation layer</div>
      </div>
      <div className="flex items-center gap-2 text-[9px] uppercase text-slate-500">
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-500"/> Critical</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-orange-500"/> High</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-yellow-400"/> Moderate</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-400"/> Low</span>
      </div>
    </div>
    <div className="map-shell">
      <div ref={mapRef} className="absolute inset-0 z-10"/>
      <div className="map-grid z-20"/>
      <div className="noise z-20"/>
      <div className="absolute left-3 top-3 z-30 flex flex-col gap-1">
        <div className="rounded border border-cyan-500/20 bg-[#071018]/85 px-2 py-1.5 text-[9px] uppercase tracking-widest text-cyan-300"><Navigation size={11} className="mr-1 inline"/> India · industrial belt</div>
        <div className="rounded border border-slate-700 bg-[#071018]/85 px-2 py-1 text-[9px] text-slate-500">TILE SOURCE: LOCAL DEMO GRID</div>
      </div>
      <div className="absolute right-3 top-3 z-30 flex gap-1">
        <button className="rounded border border-slate-700 bg-[#071018]/90 p-2 text-slate-400"><Layers size={14}/></button>
        <button onClick={()=>map.current?.setView([19.04,73.08],9)} className="rounded border border-slate-700 bg-[#071018]/90 p-2 text-slate-400 hover:text-white"><Crosshair size={14}/></button>
      </div>
      <div className="absolute bottom-3 right-3 z-30 rounded border border-slate-700 bg-[#071018]/90 px-2 py-1 text-[9px] text-slate-500">LAT/LON · DEMO REGION</div>
    </div>
  </section>
}