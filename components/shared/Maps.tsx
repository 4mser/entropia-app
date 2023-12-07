'use client'
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function Maps() {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const mapNode = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = mapNode.current;
    if (typeof window === "undefined" || node === null) return;

    // Get user's location using the Geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const mapboxMap = new mapboxgl.Map({
          container: node,
          accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "",
          style: "mapbox://styles/mapbox/navigation-night-v1",
          center: [longitude, latitude],
          zoom: 17,
        });

        setMap(mapboxMap);

        return () => {
          mapboxMap.remove();
        };
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  }, []);

  return <div ref={mapNode} style={{ width: "100%", height: "100vh" }} />;
}

export default Maps;
