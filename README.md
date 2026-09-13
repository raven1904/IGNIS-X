# IGNIS-X

Single-page React/Vite command-center prototype.

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

## Source positioning

NASA FIRMS is described as a source of thermal anomaly observations. IGNIS-X is positioned as the contextual classification and risk-assessment layer.
