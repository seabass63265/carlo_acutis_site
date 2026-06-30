"use client";
import { useRef, useState, useEffect } from "react";
import { Map, MapMarker, MarkerContent, MarkerTooltip, MapArc, type MapRef } from "@/components/ui/mapcn-map-arc";
import { miracles } from "@/components/miracles-data";

const ROME: [number, number] = [12.4534, 41.9029];

const COUNTRY_COORDS: Record<string, [number, number]> = {
  // Europe — Italy moved to northern Italy to avoid overlapping the Rome origin dot
  "Italy":          [ 11.5,     44.5  ],  // near Parma, away from Rome
  "Germany":        [ 10.4515,  51.1657],
  "France":         [  2.2137,  46.2276],
  "Poland":         [ 19.1451,  51.9194],
  "Spain":          [ -3.7492,  40.4637],
  "Portugal":       [ -8.2245,  39.3999],
  "Netherlands":    [  5.2913,  52.1326],
  "Belgium":        [  4.4699,  50.5039],
  "Austria":        [ 14.5501,  47.5162],
  "Czech Republic": [ 15.4730,  49.8175],
  "Switzerland":    [  8.2275,  46.8182],
  "Hungary":        [ 19.5033,  47.1625],
  "Croatia":        [ 15.2000,  45.1000],
  "Lithuania":      [ 23.8813,  55.1694],
  "Slovakia":       [ 19.6990,  48.6690],
  "Romania":        [ 24.9668,  45.9432],
  "Serbia":         [ 21.0059,  44.0165],
  "Bulgaria":       [ 25.4858,  42.7339],
  "Slovenia":       [ 14.9955,  46.1512],
  "Ireland":        [ -8.2439,  53.4129],
  "Scotland":       [ -4.2026,  57.5   ],  // nudged north to separate from Ireland
  "Malta":          [ 14.3754,  35.5   ],  // nudged south to separate from nearby countries
  "Luxembourg":     [  6.1296,  49.8153],
  "Latvia":         [ 24.6032,  56.8796],
  "Sweden":         [ 18.6435,  60.1282],
  "Denmark":        [  9.5018,  56.2639],
  "Cyprus":         [ 33.4299,  35.1264],
  "Ukraine":        [ 31.1656,  48.3794],
  // Americas
  "Argentina":      [-63.6167, -38.4161],
  "Mexico":         [-102.5528, 23.6345],
  "United States":  [-100.0,    38.0   ],
  "Colombia":       [-74.2973,   4.5709],
  "Ecuador":        [-78.1834,  -1.8312],
  "Brazil":         [-51.9253, -14.2350],
  "Venezuela":      [-66.5897,   6.4238],
  "Peru":           [-75.0152,  -9.1900],
  "Chile":          [-71.5430, -35.6751],
  "Paraguay":       [-58.4438, -23.4425],
  "Bolivia":        [-64.9631, -16.2902],
  "Uruguay":        [-55.7658, -32.5228],
  "Canada":         [-96.8165,  56.1304],
  // Asia
  "India":          [ 78.9629,  20.5937],
  "Philippines":    [121.7740,  12.8797],
  "Japan":          [138.2529,  36.2048],
  "South Korea":    [127.7669,  35.9078],
  "Indonesia":      [113.9213,  -0.7893],
  "Vietnam":        [108.2772,  14.0583],
  "Georgia":        [ 43.3569,  42.3154],
  // Middle East
  "Israel":         [ 34.8516,  31.5   ],  // nudged north to separate from Lebanon
  "Lebanon":        [ 35.8623,  34.0   ],  // nudged north to separate from Israel
  "Egypt":          [ 30.8025,  26.8206],
  // Africa
  "Nigeria":        [  8.6753,   9.0820],
  "Uganda":         [ 32.2903,   1.3733],
  "South Africa":   [ 22.9375, -30.5595],
  "Kenya":          [ 37.9062,  -1.5   ],  // nudged south to separate from Uganda
  "Ethiopia":       [ 40.4897,   9.1450],
  // Oceania
  "Australia":      [133.7751, -25.2744],
  "New Zealand":    [172.8352, -40.9006],
  // Caribbean
  "Martinique":     [-60.9789,  14.6415],
  // Indian Ocean
  "Réunion":        [ 55.5364, -21.1151],
};

// Compute counts per country from data
const countryCounts: Record<string, number> = {};
for (const m of miracles) {
  countryCounts[m.country] = (countryCounts[m.country] || 0) + 1;
}

const MIRACLE_SITES = Object.entries(countryCounts)
  .filter(([country]) => COUNTRY_COORDS[country])
  .map(([country, count]) => ({
    id:     country.toLowerCase().replace(/\s+/g, "-"),
    name:   country,
    count,
    coords: COUNTRY_COORDS[country],
  }));

const ARC_DATA = MIRACLE_SITES.map((site) => ({
  id:   site.id,
  from: ROME,
  to:   site.coords,
}));

function dispatchFilter(country: string) {
  window.dispatchEvent(new CustomEvent("miracles-filter", { detail: { country } }));
  document.getElementById("miracles-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function MiraclesMap() {
  const [isGlobe, setIsGlobe] = useState(false);
  const mapRef = useRef<MapRef>(null);

  // Default to globe on mobile
  useEffect(() => {
    if (window.innerWidth >= 768) return;
    setIsGlobe(true);
    const id = setInterval(() => {
      const map = mapRef.current;
      if (!map) return;
      clearInterval(id);
      const apply = () => {
        map.setProjection({ type: "globe" });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (map as any).setFog?.({ color: "#111827", "high-color": "#1e3a8a", "space-color": "#000000", "horizon-blend": 0.06, "star-intensity": 0.35 });
        map.flyTo({ center: [15, 20], zoom: 1.1, duration: 0 });
      };
      map.isStyleLoaded() ? apply() : map.once("load", apply);
    }, 50);
    return () => clearInterval(id);
  }, []);

  function toggleProjection(globe: boolean) {
    setIsGlobe(globe);
    const map = mapRef.current;
    if (!map) return;
    map.setProjection(globe ? { type: "globe" } : { type: "mercator" });
    if (globe) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (map as any).setFog?.({ color: "#111827", "high-color": "#1e3a8a", "space-color": "#000000", "horizon-blend": 0.06, "star-intensity": 0.35 });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (map as any).setFog?.(null);
    }
    map.flyTo({ center: [15, 20], zoom: globe ? 1.1 : 1.6, duration: 800 });
  }

  return (
    <div style={{ position: "relative", height: 520, borderRadius: 4, overflow: "hidden", background: "#000000" }}>
      <Map
        ref={mapRef}
        theme="dark"
        center={[15, 20]}
        zoom={1.6}
        minZoom={0.5}
        maxZoom={8}
        scrollZoom={false}
      >
        <MapArc
          id="miracles"
          data={ARC_DATA}
          curvature={0.25}
          paint={{ "line-color": "#D9A441", "line-width": 1.0, "line-opacity": 0.35 }}
          hoverPaint={{ "line-color": "#D9A441", "line-opacity": 0.9, "line-width": 2.0 }}
        />

        {/* Rome origin dot — rendered as a small decorative pin, non-clickable */}
        <MapMarker longitude={ROME[0]} latitude={ROME[1]}>
          <MarkerContent>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#D9A441", border: "1.5px solid #fff", boxShadow: "0 0 6px rgba(217,164,65,0.9)", pointerEvents: "none" }} />
          </MarkerContent>
          <MarkerTooltip>Rome — Carlo&apos;s home</MarkerTooltip>
        </MapMarker>

        {/* Miracle location dots — clickable */}
        {MIRACLE_SITES.map((site) => (
          <MapMarker key={site.id} longitude={site.coords[0]} latitude={site.coords[1]}>
            <MarkerContent>
              <button
                onClick={() => dispatchFilter(site.name)}
                aria-label={`View ${site.count} miracle${site.count !== 1 ? "s" : ""} from ${site.name}`}
                style={{
                  width:         site.count >= 10 ? 20 : site.count >= 4 ? 14 : 10,
                  height:        site.count >= 10 ? 20 : site.count >= 4 ? 14 : 10,
                  borderRadius:  "50%",
                  background:    "#C74A2A",
                  border:        "1.5px solid rgba(255,255,255,0.6)",
                  display:       "flex",
                  alignItems:    "center",
                  justifyContent:"center",
                  color:         "#fff",
                  fontSize:      8,
                  fontWeight:    700,
                  cursor:        "pointer",
                  padding:       0,
                  transition:    "transform 0.15s, box-shadow 0.15s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "scale(1.25)";
                  e.currentTarget.style.boxShadow = "0 0 8px rgba(199,74,42,0.7)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {site.count >= 4 ? site.count : null}
              </button>
            </MarkerContent>
            <MarkerTooltip>
              {site.name} · {site.count} miracle{site.count !== 1 ? "s" : ""} · Click to explore ↓
            </MarkerTooltip>
          </MapMarker>
        ))}

        {/* Custom zoom controls */}
        <div style={{
          position: "absolute", bottom: 12, right: 12, zIndex: 10,
          display: "flex", flexDirection: "column",
          background: "rgba(10,14,30,0.85)", border: "1px solid rgba(217,164,65,0.25)",
          borderRadius: 6, overflow: "hidden", backdropFilter: "blur(8px)",
        }}>
          {[
            { label: "+", title: "Zoom in",  onClick: () => mapRef.current?.zoomTo((mapRef.current.getZoom() ?? 2) + 1, { duration: 300 }) },
            { label: "−", title: "Zoom out", onClick: () => mapRef.current?.zoomTo((mapRef.current.getZoom() ?? 2) - 1, { duration: 300 }) },
          ].map(({ label, title, onClick }) => (
            <button
              key={label}
              aria-label={title}
              onClick={onClick}
              style={{
                width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
                background: "transparent", border: "none",
                borderBottom: label === "+" ? "1px solid rgba(217,164,65,0.2)" : "none",
                color: "#D9A441", fontSize: 18, fontWeight: 300, cursor: "pointer", lineHeight: 1, transition: "background 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(217,164,65,0.12)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Projection toggle */}
        <div style={{
          position: "absolute", top: 12, left: 12, zIndex: 10,
          display: "flex", background: "rgba(10,14,30,0.85)",
          border: "1px solid rgba(217,164,65,0.25)", borderRadius: 6, overflow: "hidden", backdropFilter: "blur(8px)",
        }}>
          {(["Map", "Globe"] as const).map((label) => {
            const active = label === "Globe" ? isGlobe : !isGlobe;
            return (
              <button
                key={label}
                onClick={() => toggleProjection(label === "Globe")}
                style={{
                  padding: "5px 14px", fontSize: 10, fontWeight: 700,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color:      active ? "#0a0e1e" : "rgba(217,164,65,0.6)",
                  background: active ? "#D9A441"  : "transparent",
                  border: "none", cursor: "pointer", transition: "all 0.2s",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Click hint */}
        <div style={{
          position: "absolute", bottom: 12, left: 12, zIndex: 10,
          background: "rgba(10,14,30,0.75)", border: "1px solid rgba(217,164,65,0.2)",
          borderRadius: 4, padding: "4px 10px", backdropFilter: "blur(8px)",
          color: "rgba(217,164,65,0.6)", fontSize: 9, fontWeight: 700,
          letterSpacing: "0.15em", textTransform: "uppercase",
          pointerEvents: "none",
        }}>
          Click a dot to explore miracles
        </div>
      </Map>
    </div>
  );
}
