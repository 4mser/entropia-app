'use client'
// Importaciones
import React, { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl, { LngLatLike, Marker } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function Maps() {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const mapNode = useRef<HTMLDivElement | null>(null);
  const [userLocation, setUserLocation] = useState<LngLatLike | null>(null);
  const markerRef = useRef<Marker | null>(null);

  const createMarkerElement = useCallback(
    (isExplorationRadio = false) => {
      const markerElement = document.createElement("div");
      markerElement.className = "custom-marker";

      const markerSize = isExplorationRadio ? 270 : 18;

      markerElement.style.width = `${markerSize}px`;
      markerElement.style.height = `${markerSize}px`;
      markerElement.style.borderRadius = "50%";
      markerElement.style.backgroundColor = isExplorationRadio
        ? "rgba(76, 211, 193, 0.233)"
        : "#4cd3c1";

      if (isExplorationRadio) {
        markerElement.style.border = `2px dotted #4cd3c1`;
      }

      return markerElement;
    },
    []
  );

  useEffect(() => {
    const node = mapNode.current;
    if (typeof window === "undefined" || node === null) return;

    const initializeMap = async () => {
      try {
        const position = await getCurrentPosition();

        const mapboxMap = new mapboxgl.Map({
          container: node,
          accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "",
          style: "mapbox://styles/mapbox/navigation-night-v1",
          center: [position.coords.longitude, position.coords.latitude],
          zoom: 17,
        });

        setMap(mapboxMap);
        setUserLocation([position.coords.longitude, position.coords.latitude]);

        const userLocationMarker = new mapboxgl.Marker({
          element: createMarkerElement(),
        })
          .setLngLat([position.coords.longitude, position.coords.latitude])
          .addTo(mapboxMap);

        const explorationRadioMarker = new mapboxgl.Marker({
          element: createMarkerElement(true),
        })
          .setLngLat([position.coords.longitude, position.coords.latitude])
          .addTo(mapboxMap);

        markerRef.current = explorationRadioMarker;

        mapboxMap.on("load", () => {
          watchUserLocation(mapboxMap);
        });
      } catch (error) {
        console.error("Error al obtener la ubicación del usuario:", error);
      }
    };

    initializeMap();
  }, []);

  const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error)
      );
    });
  };

  const watchUserLocation = (mapboxMap: mapboxgl.Map) => {
    navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setUserLocation([longitude, latitude]);

        const userLocationMarker = markerRef.current;

        if (userLocationMarker) {
          userLocationMarker.setLngLat([longitude, latitude]);
        }

        mapboxMap.flyTo({
          center: [longitude, latitude],
        });
      },
      (error) => {
        console.error("Error al obtener la ubicación del usuario:", error);
      }
    );
  };

  useEffect(() => {
    if (map && userLocation) {
      if (markerRef.current) {
        markerRef.current.setLngLat(userLocation);
      } else {
        const userLocationMarker = new mapboxgl.Marker({
          element: createMarkerElement(),
        })
          .setLngLat(userLocation)
          .addTo(map);

        const explorationRadioMarker = new mapboxgl.Marker({
          element: createMarkerElement(true),
        })
          .setLngLat(userLocation)
          .addTo(map);

        markerRef.current = explorationRadioMarker;
      }
    }
  }, [map, userLocation, createMarkerElement]);

  return <div ref={mapNode} style={{ width: "100%", height: "100vh" }} />;
}

export default Maps;
