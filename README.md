# IGNIS-X — SIH 2026 Demo

Single-page React/Vite command-center prototype for SIH26162.

## Run

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Build

```bash
npm run build
npm run preview
```

## Dependencies

- React + Vite
- Tailwind CSS
- Lucide React
- Leaflet
- Recharts

## Demo data

The thermal events, classification scores, risk scores, temporal observations, exposure values and scenario changes are **local simulated data** for presentation. The app does not claim live NASA/government connectivity or production accuracy.

The Leaflet map is intentionally tile-free so the core demo does not depend on an API key or live tile server. It uses a local stylized geographic base and Leaflet overlays for hotspots, risk radius and zoom/pan.

## 2-minute judge demo

1. Start on the dashboard and point out the KPI strip.
2. Click the pulsing red hotspot on the map.
3. Explain the Thermal Event Fingerprint and the selected incident.
4. Choose **Industrial Fire** in Demo Scenario.
5. Click **RUN THERMAL ANALYSIS** and let the nine pipeline stages complete.
6. Call out **Industrial Fire — 91% prototype confidence** and **87/100 CRITICAL**.
7. Explain that risk is not a black box: thermal intensity +24, persistence +19, industrial exposure +20, population +14, infrastructure +10.
8. Point to the 2.5 km exposure radius and nearby facilities/roads.
9. Click **GENERATE REPORT** and download the local text report.
10. Close the report and finish with: “We don't just detect heat. We turn thermal anomalies into actionable intelligence.”

## Source positioning

NASA FIRMS is described as a source of thermal anomaly observations. IGNIS-X is positioned as the contextual classification and risk-assessment layer.

## Production next step

Replace demoEvents.js and the tile-free map with validated ingestion, model services, PostGIS-backed geospatial context, authenticated REST APIs and operational alerting after field validation.
