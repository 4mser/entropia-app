'use client'
import React, { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl, { LngLatLike, Marker } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function Maps() {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const mapNode = useRef<HTMLDivElement | null>(null);
  const [userLocation, setUserLocation] = useState<LngLatLike | null>(null);
  const markerRef = useRef<[Marker, Marker] | null>(null);

  const createMarkerElement = useCallback(
    (isExplorationRadio = false) => {
      const markerElement = document.createElement("div");
      markerElement.className = "custom-marker"; // Apply Tailwind classes here

      const markerSize = isExplorationRadio ? 270 : 18;
      const borderWidth = 2;
      const borderColor = "#4cd3c1"; // Color of the user location marker

      markerElement.style.width = `${markerSize}px`;
      markerElement.style.height = `${markerSize}px`;
      markerElement.style.borderRadius = "50%";
      markerElement.style.backgroundColor = isExplorationRadio
        ? "rgba(76, 211, 193, 0.103)" // Translucent color for exploration radio
        : "#4cd3c1"; // Green color for user location

      if (isExplorationRadio) {
        // Add border with separated points for exploration radio
        markerElement.style.border = `${borderWidth}px dotted ${borderColor}`;
      }

      return markerElement;
    },
    []
  );

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

  useEffect(() => {
    if (map && userLocation) {
      // Remove previous markers if exist
      if (markerRef.current) {
        markerRef.current.forEach((marker) => marker.remove());
      }

      // Create a new user location marker
      const userLocationMarker = new mapboxgl.Marker({
        element: createMarkerElement(),
      })
        .setLngLat(userLocation)
        .addTo(map);

      // Create a new exploration radio marker
      const explorationRadioMarker = new mapboxgl.Marker({
        element: createMarkerElement(true), // Pass true to indicate exploration radio marker
      })
        .setLngLat(userLocation) // Set the same location as the user marker
        .addTo(map);

      // Save the markers' references for cleanup
      markerRef.current = [userLocationMarker, explorationRadioMarker];
    }
  }, [map, userLocation, createMarkerElement]);

  return <div ref={mapNode} style={{ width: "100%", height: "100vh" }} />;
}

export default Maps;
