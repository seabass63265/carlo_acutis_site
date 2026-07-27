"use client";
import { useRef, useState, useEffect } from "react";
import { Map, MapMarker, MarkerContent, MarkerTooltip, MapArc, type MapRef } from "@/components/ui/mapcn-map-arc";
import { miracles } from "@/components/miracles-data";

const ROME: [number, number] = [12.4534, 41.9029];

const COUNTRY_COORDS: Record<string, [number, number]> = {
  "Italy":          [ 11.5,     44.5  ],
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
  "Scotland":       [ -4.2026,  57.5   ],
  "Malta":          [ 14.3754,  35.5   ],
  "Luxembourg":     [  6.1296,  49.8153],
  "Latvia":         [ 24.6032,  56.8796],
  "Sweden":         [ 18.6435,  60.1282],
  "Denmark":        [  9.5018,  56.2639],
  "Cyprus":         [ 33.4299,  35.1264],
  "Ukraine":        [ 31.1656,  48.3794],
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
  "India":          [ 78.9629,  20.5937],
  "Philippines":    [121.7740,  12.8797],
  "Japan":          [138.2529,  36.2048],
  "South Korea":    [127.7669,  35.9078],
  "Indonesia":      [113.9213,  -0.7893],
  "Vietnam":        [108.2772,  14.0583],
  "Georgia":        [ 43.3569,  42.3154],
  "Israel":         [ 34.8516,  31.5   ],
  "Lebanon":        [ 35.8623,  34.0   ],
  "Egypt":          [ 30.8025,  26.8206],
  "Nigeria":        [  8.6753,   9.0820],
  "Uganda":         [ 32.2903,   1.3733],
  "South Africa":   [ 22.9375, -30.5595],
  "Kenya":          [ 37.9062,  -1.5   ],
  "Ethiopia":       [ 40.4897,   9.1450],
  "Australia":      [133.7751, -25.2744],
  "New Zealand":    [172.8352, -40.9006],
  "Martinique":     [-60.9789,  14.6415],
  "Réunion":        [ 55.5364, -21.1151],
};

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

const P = {
  gold:        "#C9A96E",
  goldDark:    "#8B6333",
  ink:         "rgba(55, 38, 10, 0.72)",
  inkLight:    "rgba(80, 58, 18, 0.45)",
  panelBg:     "rgba(242, 232, 206, 0.92)",
  panelBorder: "rgba(160, 125, 62, 0.28)",
  panelShadow: "0 1px 8px rgba(60,40,10,0.14)",
};

const TOOLTIP_CLASS =
  "!bg-[rgba(242,232,206,0.96)] !rounded-sm !px-3.5 !py-2.5 !shadow-[0_1px_8px_rgba(60,40,10,0.18)] border border-[rgba(160,125,62,0.35)] backdrop-blur-sm";

function dispatchFilter(country: string) {
  window.dispatchEvent(new CustomEvent("miracles-filter", { detail: { country } }));
}

export default function MiraclesMap() {
  const [isGlobe, setIsGlobe] = useState(false);
  const mapRef = useRef<MapRef>(null);

  // Dark-gold filter applied directly to WebGL canvas — markers/UI unaffected
  useEffect(() => {
    const id = setInterval(() => {
      const map = mapRef.current;
      if (!map) return;
      clearInterval(id);
      const apply = () => {
        map.getCanvas().style.filter =
          "sepia(0.95) saturate(2.6) brightness(0.76) hue-rotate(-8deg) contrast(1.08)";
      };
      map.isStyleLoaded() ? apply() : map.once("load", apply);
      map.on("style.load", apply);
    }, 50);
    return () => clearInterval(id);
  }, []);

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
        (map as any).setFog?.({ color: "#2a1a06", "high-color": "#5c3a10", "space-color": "#0a0602", "horizon-blend": 0.05, "star-intensity": 0.18 });
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
      (map as any).setFog?.({ color: "#2a1a06", "high-color": "#5c3a10", "space-color": "#0a0602", "horizon-blend": 0.05, "star-intensity": 0.18 });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (map as any).setFog?.(null);
    }
    map.flyTo({ center: [15, 20], zoom: globe ? 1.1 : 1.6, duration: 800 });
  }

  return (
    <div style={{ position: "relative", height: 520, borderRadius: 4, overflow: "hidden", background: "#110D00" }}>
      {/* Strip MapLibre's default white popup chrome and speech-bubble tail
          so tooltips read as part of the map's own cream/gold panel system,
          not a generic browser-default bubble. */}
      <style>{`
        .maplibregl-popup-content {
          background: transparent;
          padding: 0;
          box-shadow: none;
          border-radius: 0;
        }
        .maplibregl-popup-tip {
          display: none;
        }
      `}</style>
      <Map
        ref={mapRef}
        theme="dark"
        center={[15, 20]}
        zoom={1.6}
        minZoom={0.5}
        maxZoom={8}
        scrollZoom={false}
      >
        {/* Arcs from Rome */}
        <MapArc
          id="miracles"
          data={ARC_DATA}
          curvature={0.25}
          paint={{ "line-color": P.gold, "line-width": 0.9, "line-opacity": 0.38 }}
          hoverPaint={{ "line-color": P.gold, "line-opacity": 0.85, "line-width": 1.8 }}
        />

        {/* Rome origin dot */}
        <MapMarker longitude={ROME[0]} latitude={ROME[1]}>
          <MarkerContent>
            <div style={{
              width: 10, height: 10, borderRadius: "50%",
              background: P.gold,
              border: `2px solid ${P.goldDark}`,
              pointerEvents: "none",
            }} />
          </MarkerContent>
          <MarkerTooltip className={TOOLTIP_CLASS}>
            <span style={{ fontFamily: "Georgia, serif", fontSize: 13, fontWeight: 600, color: P.goldDark }}>
              Rome
            </span>
            <span style={{ display: "block", fontSize: 10, letterSpacing: "0.02em", marginTop: 2, color: P.ink }}>
              Carlo&apos;s home
            </span>
          </MarkerTooltip>
        </MapMarker>

        {/* Miracle site markers */}
        {MIRACLE_SITES.map((site) => {
          const size = site.count >= 10 ? 14 : site.count >= 4 ? 11 : 8;
          return (
            <MapMarker key={site.id} longitude={site.coords[0]} latitude={site.coords[1]}>
              <MarkerContent>
                <button
                  onClick={() => dispatchFilter(site.name)}
                  aria-label={`View ${site.count} miracle${site.count !== 1 ? "s" : ""} from ${site.name}`}
                  style={{
                    width: size, height: size, borderRadius: "50%",
                    background: P.gold,
                    border: `1.5px solid ${P.goldDark}`,
                    cursor: "pointer", padding: 0,
                    transition: "transform 0.15s, box-shadow 0.15s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "scale(1.5)";
                    e.currentTarget.style.boxShadow = `0 0 8px ${P.gold}88`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </MarkerContent>
              <MarkerTooltip className={TOOLTIP_CLASS}>
                <span style={{ fontFamily: "Georgia, serif", fontSize: 13, fontWeight: 600, color: P.goldDark }}>
                  {site.name}
                </span>
                <span style={{ display: "block", fontSize: 10, letterSpacing: "0.02em", marginTop: 2, color: P.ink }}>
                  {site.count} miracle{site.count !== 1 ? "s" : ""} · Click to explore ↓
                </span>
              </MarkerTooltip>
            </MapMarker>
          );
        })}

        {/* Zoom controls — bottom right */}
        <div style={{
          position: "absolute", bottom: 12, right: 12, zIndex: 10,
          display: "flex", flexDirection: "column",
          background: P.panelBg, border: `1px solid ${P.panelBorder}`,
          borderRadius: 4, overflow: "hidden", backdropFilter: "blur(6px)",
          boxShadow: P.panelShadow,
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
                width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
                background: "transparent", border: "none",
                borderBottom: label === "+" ? `1px solid ${P.panelBorder}` : "none",
                color: P.goldDark, fontSize: 17, fontWeight: 300, cursor: "pointer",
                lineHeight: 1, transition: "background 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(180,145,70,0.15)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Projection toggle — top right */}
        <div style={{
          position: "absolute", top: 12, right: 12, zIndex: 10,
          display: "flex",
          background: P.panelBg, border: `1px solid ${P.panelBorder}`,
          borderRadius: 4, overflow: "hidden", backdropFilter: "blur(6px)",
          boxShadow: P.panelShadow,
        }}>
          {(["Map", "Globe"] as const).map((label) => {
            const active = label === "Globe" ? isGlobe : !isGlobe;
            return (
              <button
                key={label}
                onClick={() => toggleProjection(label === "Globe")}
                style={{
                  padding: "5px 13px", fontSize: 9, fontWeight: 700,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color:      active ? "#2A1A04" : P.inkLight,
                  background: active ? P.gold : "transparent",
                  border: "none", cursor: "pointer", transition: "all 0.2s",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Click hint — bottom left */}
        <div style={{
          position: "absolute", bottom: 12, left: 12, zIndex: 10,
          background: P.panelBg, border: `1px solid ${P.panelBorder}`,
          borderRadius: 3, padding: "4px 10px", backdropFilter: "blur(6px)",
          color: P.ink, fontSize: 9, fontWeight: 600,
          letterSpacing: "0.14em", textTransform: "uppercase",
          pointerEvents: "none", boxShadow: P.panelShadow,
        }}>
          ● Click a dot to explore miracles
        </div>
      </Map>
    </div>
  );
}
