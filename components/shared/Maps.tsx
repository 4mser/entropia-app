'use client'
import React, { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl, { LngLatLike, Marker } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function Maps() {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const mapNode = useRef<HTMLDivElement | null>(null);
  const [userLocation, setUserLocation] = useState<LngLatLike | null>(null);
  const markerRef = useRef<Marker | null>(null);

  useEffect(() => {
    const node = mapNode.current;
    if (typeof window === "undefined" || node === null) return;

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
        setUserLocation([longitude, latitude]);

        return () => {
          if (mapboxMap) {
            mapboxMap.remove();
          }
        };
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  }, []);

  const createMarkerElement = useCallback(() => {
    const markerElement = document.createElement("div");
    markerElement.className = "custom-marker"; // Apply Tailwind classes here

    markerElement.style.width = "20px";
    markerElement.style.height = "20px";
    markerElement.style.borderRadius = "50%";
    markerElement.style.backgroundColor = "#4CAF50"; // Green color

    return markerElement;
  }, []);

  useEffect(() => {
    if (map && userLocation) {
      // Remove previous marker if exists
      if (markerRef.current) {
        markerRef.current.remove();
      }

      // Create a new marker with the updated user location
      const marker = new mapboxgl.Marker({
        element: createMarkerElement(),
      })
        .setLngLat(userLocation)
        .addTo(map);

      // Save the marker reference for cleanup
      markerRef.current = marker;
    }
  }, [map, userLocation, createMarkerElement]);

  return <div ref={mapNode} style={{ width: "100%", height: "100vh" }} />;
}

export default Maps;
