// components/CDMXHeatmap.tsx
"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface MapCenter {
  lat: number;
  lng: number;
  zoom: number;
}

interface HeatmapProps {
  data: Array<{
    lat: number;
    lng: number;
    intensity?: number;
  }>;
  center?: MapCenter;
}

export default function CDMXHeatmap({ data, center }: HeatmapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          "raster-tiles": {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: "© OpenStreetMap contributors"
          }
        },
        layers: [
          {
            id: "simple-tiles",
            type: "raster",
            source: "raster-tiles",
            minzoom: 0,
            maxzoom: 19,
            paint: {
              "raster-opacity": 0.8
            }
          }
        ]
      },
      center: center ? [center.lng, center.lat] : [-99.1332, 19.4326],
      zoom: center?.zoom || 10
    });

    map.current.on("load", () => {
      if (!map.current) return;

      fetch("/cdmx-boundaries.geojson")
        .then((response) => response.json())
        .catch(() => {
          console.warn(
            "No se pudo cargar el GeoJSON de CDMX, usando un borde simplificado"
          );
          return {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Polygon",
                  coordinates: [
                    [
                      [-99.35, 19.2],
                      [-99.35, 19.6],
                      [-98.95, 19.6],
                      [-98.95, 19.2],
                      [-99.35, 19.2]
                    ]
                  ]
                }
              }
            ]
          };
        })
        .then((geojsonData) => {
          map.current!.addSource("cdmx-boundaries", {
            type: "geojson",
            data: geojsonData
          });
          map.current!.addLayer({
            id: "cdmx-boundaries-lines",
            type: "line",
            source: "cdmx-boundaries",
            paint: {
              "line-color": "#444444",
              "line-width": 1
            }
          });

          map.current!.addLayer({
            id: "cdmx-outline",
            type: "line",
            source: "cdmx-boundaries",
            paint: {
              "line-color": "#000000",
              "line-width": 5
            },
            filter: ["==", "$type", "Polygon"]
          });
        });

      const heatData = {
        type: "FeatureCollection",
        features: data.map((point) => ({
          type: "Feature",
          properties: {
            intensity: point.intensity || 0.9
          },
          geometry: {
            type: "Point",
            coordinates: [point.lng, point.lat]
          }
        }))
      };

      map.current.addSource("heat-data", {
        type: "geojson",
        //@ts-expect-error default GeoJSON type is FeatureCollection
        data: heatData
      });

      map.current.addLayer({
        id: "heat-layer",
        type: "heatmap",
        source: "heat-data",
        paint: {
          "heatmap-intensity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            8,
            0.5,
            12,
            1.5
          ],

          "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 8, 8, 12, 15],

          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(255, 255, 255, 0)",
            0.1,
            "rgba(255, 255, 190, 0.6)",
            0.3,
            "rgba(255, 229, 0, 0.7)",
            0.5,
            "rgba(255, 179, 0, 0.75)",
            0.7,
            "rgba(255, 120, 0, 0.8)",
            0.9,
            "rgba(255, 0, 0, 0.85)"
          ],

          "heatmap-weight": [
            "interpolate",
            ["linear"],
            ["get", "intensity"],
            0.2,
            0.3,
            1,
            1
          ],

          "heatmap-opacity": 0.8
        }
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [data, center]);

  // Add effect to handle center changes
  useEffect(() => {
    if (!map.current || !center) return;

    map.current.flyTo({
      center: [center.lng, center.lat],
      zoom: center.zoom,
      duration: 1000
    });
  }, [center]);

  return (
    <div
      ref={mapContainer}
      className="w-full h-full min-h-[300px] border border-gray-300 rounded-lg"
    />
  );
}
