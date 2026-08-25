// // ── Survey Locations Map (28-10 request) ──────────────────────────────────────
// // Shows every application that has a survey geo location recorded, as a pin on a
// // real map — mainly for the A.M.C. login, so they can see where field surveys in
// // their ward have happened.
// //
// // Uses Leaflet loaded from a CDN at runtime (no npm install needed — nothing was
// // added to package.json). If you'd rather bundle it locally instead of pulling
// // from a CDN, `npm install leaflet` and swap the dynamic <script>/<link> loading
// // below for a normal `import "leaflet/dist/leaflet.css"` + `import L from "leaflet"`.
// import { useEffect, useRef, useState } from "react";
// import { FiLoader, FiAlertCircle, FiMapPin } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import { IdBadge } from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { Link } from "react-router-dom";
// import { fetchVendorApplications } from "../../../services/vendorApplicationService";

// const LEAFLET_CSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
// const LEAFLET_JS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";

// // Vasai-Virar City Municipal Corporation — rough center, used as the default map view.
// const VVCMC_CENTER = [19.39, 72.82];

// function loadLeaflet() {
//   return new Promise((resolve, reject) => {
//     if (window.L) {
//       resolve(window.L);
//       return;
//     }
//     if (!document.querySelector(`link[href="${LEAFLET_CSS}"]`)) {
//       const link = document.createElement("link");
//       link.rel = "stylesheet";
//       link.href = LEAFLET_CSS;
//       document.head.appendChild(link);
//     }
//     const existingScript = document.querySelector(`script[src="${LEAFLET_JS}"]`);
//     if (existingScript) {
//       existingScript.addEventListener("load", () => resolve(window.L));
//       existingScript.addEventListener("error", reject);
//       return;
//     }
//     const script = document.createElement("script");
//     script.src = LEAFLET_JS;
//     script.async = true;
//     script.onload = () => resolve(window.L);
//     script.onerror = reject;
//     document.body.appendChild(script);
//   });
// }

// export default function SurveyMap() {
//   const mapDivRef = useRef(null);
//   const mapRef = useRef(null);
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [mapReady, setMapReady] = useState(false);

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     setError("");
//     fetchVendorApplications({ limit: 200 }).then((result) => {
//       if (cancelled) return;
//       setLoading(false);
//       if (!result.success) {
//         setError(result.message || "Could not load survey locations.");
//         return;
//       }
//       setApplications(result.data || []);
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   const withGeo = applications.filter((a) => {
//     const geo = a.survey?.geoLocation;
//     return geo && geo.lat !== undefined && geo.lat !== null && geo.lng !== undefined && geo.lng !== null;
//   });

//   useEffect(() => {
//     let cancelled = false;
//     loadLeaflet()
//       .then((L) => {
//         if (cancelled || !mapDivRef.current) return;
//         if (!mapRef.current) {
//           mapRef.current = L.map(mapDivRef.current).setView(VVCMC_CENTER, 12);
//           L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//             attribution: "&copy; OpenStreetMap contributors",
//             maxZoom: 19,
//           }).addTo(mapRef.current);
//         }
//         setMapReady(true);
//       })
//       .catch(() => {
//         if (!cancelled) setError("Could not load the map. Please check your internet connection.");
//       });
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   // ── Plot / re-plot pins whenever the data or the map becomes ready ──
//   useEffect(() => {
//     if (!mapReady || !window.L || !mapRef.current) return;
//     const L = window.L;

//     // Clear old markers before re-adding (keeps this effect idempotent on refresh)
//     mapRef.current.eachLayer((layer) => {
//       if (layer instanceof L.Marker) mapRef.current.removeLayer(layer);
//     });

//     const bounds = [];
//     withGeo.forEach((a) => {
//       const { lat, lng } = a.survey.geoLocation;
//       const marker = L.marker([lat, lng]).addTo(mapRef.current);
//       marker.bindPopup(
//         `<div style="font-size:13px">
//           <strong>${a.personal?.fullName || ""}</strong><br/>
//           ${a.applicationNo}<br/>
//           ${a.address?.ward || ""} ${a.address?.zone ? "&middot; " + a.address.zone : ""}<br/>
//           Status: ${a.status}
//         </div>`
//       );
//       bounds.push([lat, lng]);
//     });

//     if (bounds.length > 0) {
//       mapRef.current.fitBounds(bounds, { padding: [30, 30], maxZoom: 15 });
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [mapReady, applications]);

//   return (
//     <div className="space-y-5">
//       <div>
//         <h1 className="font-display text-xl font-bold text-ink-900">Survey Locations Map</h1>
//         <p className="text-sm text-ink-500">
//           {withGeo.length} survey location{withGeo.length === 1 ? "" : "s"} plotted
//         </p>
//       </div>

//       <Card padded={false} className="overflow-hidden">
//         {error && (
//           <div className="flex items-center justify-center gap-2 px-5 py-6 text-sm font-medium text-danger-500">
//             <FiAlertCircle size={16} />
//             {error}
//           </div>
//         )}
//         <div ref={mapDivRef} className="h-[480px] w-full" />
//         {loading && (
//           <div className="flex items-center justify-center gap-2 px-5 py-6 text-sm text-ink-400">
//             <FiLoader className="animate-spin" size={16} />
//             Loading applications...
//           </div>
//         )}
//       </Card>

//       <Card padded={false} className="overflow-hidden">
//         <div className="border-b border-ink-100 p-5">
//           <h2 className="text-sm font-bold text-ink-900">Surveyed Locations</h2>
//         </div>
//         <div className="scrollbar-thin overflow-x-auto">
//           <table className="w-full min-w-[560px] text-left text-sm">
//             <thead>
//               <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-400">
//                 <th className="px-5 py-3 font-semibold">Vendor</th>
//                 <th className="px-5 py-3 font-semibold">Application No.</th>
//                 <th className="px-5 py-3 font-semibold">Ward / Zone</th>
//                 <th className="px-5 py-3 font-semibold">Status</th>
//                 <th className="px-5 py-3 text-right font-semibold">Location</th>
//               </tr>
//             </thead>
//             <tbody>
//               {withGeo.map((a) => (
//                 <tr key={a._id || a.applicationNo} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/40">
//                   <td className="px-5 py-3.5">
//                     <Link to={`/vendors/profile/${a.applicationNo}`} className="font-semibold text-ink-900 hover:text-brand-600">
//                       {a.personal?.fullName}
//                     </Link>
//                   </td>
//                   <td className="px-5 py-3.5">
//                     <IdBadge>{a.applicationNo}</IdBadge>
//                   </td>
//                   <td className="px-5 py-3.5 text-ink-700">
//                     {a.address?.ward} &middot; {a.address?.zone}
//                   </td>
//                   <td className="px-5 py-3.5">
//                     <StatusChip status={a.status} />
//                   </td>
//                   <td className="px-5 py-3.5 text-right">
//                     <a
//                       href={`https://www.google.com/maps?q=${a.survey.geoLocation.lat},${a.survey.geoLocation.lng}`}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700"
//                     >
//                       <FiMapPin size={13} /> Open
//                     </a>
//                   </td>
//                 </tr>
//               ))}
//               {withGeo.length === 0 && !loading && (
//                 <tr>
//                   <td colSpan={5} className="px-5 py-10 text-center text-sm text-ink-400">
//                     No survey locations recorded yet.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </Card>
//     </div>
//   );
// }




// ── Survey Locations Map (28-10 request) ──────────────────────────────────────
// Shows every application that has a survey geo location recorded, as a pin on a
// real map — mainly for the A.M.C. login, so they can see where field surveys in
// their ward have happened.
//
// Uses Leaflet loaded from a CDN at runtime (no npm install needed — nothing was
// added to package.json). If you'd rather bundle it locally instead of pulling
// from a CDN, `npm install leaflet` and swap the dynamic <script>/<link> loading
// below for a normal `import "leaflet/dist/leaflet.css"` + `import L from "leaflet"`.
import { useEffect, useRef, useState } from "react";
import { FiLoader, FiAlertCircle, FiMapPin } from "react-icons/fi";
import Card from "../../../components/ui/Card";
import { IdBadge } from "../../../components/ui/Avatar";
import StatusChip from "../../../components/ui/StatusChip";
import { Link } from "react-router-dom";
import { fetchVendorApplications } from "../../../services/vendorApplicationService";
// ── No Feriwala Area Geofencing (NEW) ──
import { fetchGeofences } from "../../../services/geofenceService";

const LEAFLET_CSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const LEAFLET_JS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";

// Vasai-Virar City Municipal Corporation — rough center, used as the default map view.
const VVCMC_CENTER = [19.39, 72.82];

function loadLeaflet() {
  return new Promise((resolve, reject) => {
    if (window.L) {
      resolve(window.L);
      return;
    }
    if (!document.querySelector(`link[href="${LEAFLET_CSS}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = LEAFLET_CSS;
      document.head.appendChild(link);
    }
    const existingScript = document.querySelector(`script[src="${LEAFLET_JS}"]`);
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(window.L));
      existingScript.addEventListener("error", reject);
      return;
    }
    const script = document.createElement("script");
    script.src = LEAFLET_JS;
    script.async = true;
    script.onload = () => resolve(window.L);
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

export default function SurveyMap() {
  const mapDivRef = useRef(null);
  const mapRef = useRef(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mapReady, setMapReady] = useState(false);
  // ── No Feriwala Area Geofencing (NEW) ──
  const [geofences, setGeofences] = useState([]);

  useEffect(() => {
    let cancelled = false;
    fetchGeofences({ status: "active" }).then((result) => {
      if (cancelled) return;
      if (result.success) setGeofences(result.data || []);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    fetchVendorApplications({ limit: 200 }).then((result) => {
      if (cancelled) return;
      setLoading(false);
      if (!result.success) {
        setError(result.message || "Could not load survey locations.");
        return;
      }
      setApplications(result.data || []);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const withGeo = applications.filter((a) => {
    const geo = a.survey?.geoLocation;
    return geo && geo.lat !== undefined && geo.lat !== null && geo.lng !== undefined && geo.lng !== null;
  });

  useEffect(() => {
    let cancelled = false;
    loadLeaflet()
      .then((L) => {
        if (cancelled || !mapDivRef.current) return;
        if (!mapRef.current) {
          mapRef.current = L.map(mapDivRef.current).setView(VVCMC_CENTER, 12);
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors",
            maxZoom: 19,
          }).addTo(mapRef.current);
        }
        setMapReady(true);
      })
      .catch(() => {
        if (!cancelled) setError("Could not load the map. Please check your internet connection.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Plot / re-plot pins whenever the data or the map becomes ready ──
  useEffect(() => {
    if (!mapReady || !window.L || !mapRef.current) return;
    const L = window.L;

    // Clear old markers before re-adding (keeps this effect idempotent on refresh)
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) mapRef.current.removeLayer(layer);
    });

    const bounds = [];
    withGeo.forEach((a) => {
      const { lat, lng } = a.survey.geoLocation;
      const marker = L.marker([lat, lng]).addTo(mapRef.current);
      marker.bindPopup(
        `<div style="font-size:13px">
          <strong>${a.personal?.fullName || ""}</strong><br/>
          ${a.applicationNo}<br/>
          ${a.address?.ward || ""} ${a.address?.zone ? "&middot; " + a.address.zone : ""}<br/>
          Status: ${a.status}
        </div>`
      );
      bounds.push([lat, lng]);
    });

    if (bounds.length > 0) {
      mapRef.current.fitBounds(bounds, { padding: [30, 30], maxZoom: 15 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapReady, applications]);

  // ── No Feriwala Area Geofencing (NEW) — draw restricted-area polygons in red ──
  useEffect(() => {
    if (!mapReady || !window.L || !mapRef.current) return;
    const L = window.L;

    // Clear previously drawn polygons before re-adding (idempotent on refresh)
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Polygon) mapRef.current.removeLayer(layer);
    });

    geofences.forEach((g) => {
      const rings = g.location?.coordinates || [];
      // GeoJSON is [lng, lat] — Leaflet wants [lat, lng]
      const leafletRings = rings.map((ring) => ring.map(([lng, lat]) => [lat, lng]));
      if (leafletRings.length === 0) return;

      const polygon = L.polygon(leafletRings, {
        color: "#DC2626", // clear red border
        weight: 2,
        fillColor: "#EF4444",
        fillOpacity: 0.25, // semi-transparent red fill
      }).addTo(mapRef.current);

      polygon.bindPopup(
        `<div style="font-size:13px"><strong>🔴 ${g.name}</strong><br/>${g.description || "Street vending restricted here."}</div>`
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapReady, geofences]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-bold text-ink-900">Survey Locations Map</h1>
          <p className="text-sm text-ink-500">
            {withGeo.length} survey location{withGeo.length === 1 ? "" : "s"} plotted
          </p>
        </div>
        {/* No Feriwala Area Geofencing (NEW) — legend badge */}
        {geofences.length > 0 && (
          <div className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700">
            🔴 No Feriwala Area
          </div>
        )}
      </div>

      <Card padded={false} className="overflow-hidden">
        {error && (
          <div className="flex items-center justify-center gap-2 px-5 py-6 text-sm font-medium text-danger-500">
            <FiAlertCircle size={16} />
            {error}
          </div>
        )}
        <div ref={mapDivRef} className="h-[480px] w-full" />
        {loading && (
          <div className="flex items-center justify-center gap-2 px-5 py-6 text-sm text-ink-400">
            <FiLoader className="animate-spin" size={16} />
            Loading applications...
          </div>
        )}
      </Card>

      <Card padded={false} className="overflow-hidden">
        <div className="border-b border-ink-100 p-5">
          <h2 className="text-sm font-bold text-ink-900">Surveyed Locations</h2>
        </div>
        <div className="scrollbar-thin overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-400">
                <th className="px-5 py-3 font-semibold">Vendor</th>
                <th className="px-5 py-3 font-semibold">Application No.</th>
                <th className="px-5 py-3 font-semibold">Ward / Zone</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Location</th>
              </tr>
            </thead>
            <tbody>
              {withGeo.map((a) => (
                <tr key={a._id || a.applicationNo} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/40">
                  <td className="px-5 py-3.5">
                    <Link to={`/vendors/profile/${a.applicationNo}`} className="font-semibold text-ink-900 hover:text-brand-600">
                      {a.personal?.fullName}
                    </Link>
                  </td>
                  <td className="px-5 py-3.5">
                    <IdBadge>{a.applicationNo}</IdBadge>
                  </td>
                  <td className="px-5 py-3.5 text-ink-700">
                    {a.address?.ward} &middot; {a.address?.zone}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusChip status={a.status} />
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <a
                      href={`https://www.google.com/maps?q=${a.survey.geoLocation.lat},${a.survey.geoLocation.lng}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700"
                    >
                      <FiMapPin size={13} /> Open
                    </a>
                  </td>
                </tr>
              ))}
              {withGeo.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-sm text-ink-400">
                    No survey locations recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}