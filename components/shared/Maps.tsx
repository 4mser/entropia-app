'use client'
// Importaciones
import React, { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl, { LngLatLike, Marker } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function Maps() {
  // Estado y referencias
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const mapNode = useRef<HTMLDivElement | null>(null);
  const [userLocation, setUserLocation] = useState<LngLatLike | null>(null);
  const markerRef = useRef<Marker | null>(null);

  // Función para crear el elemento del marcador
  const createMarkerElement = useCallback(
    (isExplorationRadio = false) => {
      const markerElement = document.createElement("div");
      markerElement.className = "custom-marker"; // Aplica las clases de Tailwind aquí

      const markerSize = isExplorationRadio ? 270 : 18; // Cambia el tamaño del marcador según sea necesario

      markerElement.style.width = `${markerSize}px`;
      markerElement.style.height = `${markerSize}px`;
      markerElement.style.borderRadius = "50%";
      markerElement.style.backgroundColor = isExplorationRadio
        ? "rgba(76, 211, 193, 0.233)" // Color translúcido para el radio de exploración
        : "#4cd3c1"; // Color verde para la ubicación del usuario
        if (isExplorationRadio) {
            markerElement.style.border = `2px dotted #4cd3c1`; // Ancho del borde y color
          }
      return markerElement;
    },
    []
  );

  // Función para centrar el mapa en la ubicación del usuario
  const centerMapOnUserLocation = () => {
    if (map && userLocation) {
      map.flyTo({ center: userLocation, zoom: 17 });
    }
  };

  // Efecto para inicializar el mapa y manejar eventos
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

        mapboxMap.on("load", () => {
          mapboxMap.on("zoom", () => {
            const userLocationMarker = markerRef.current;
            const explorationRadioMarker = markerRef.current;

            if (userLocationMarker && explorationRadioMarker) {
              const zoomLevel = mapboxMap.getZoom();
              const metersPerPixel = (156543.03392 * Math.cos(latitude * (Math.PI / 180))) / Math.pow(2, zoomLevel);
              const explorationRadioRadiusInMeters = 270; // Cambia este valor al radio deseado
              const explorationRadioRadiusInPixels = explorationRadioRadiusInMeters / metersPerPixel;
              const markerSizeInPixels = explorationRadioRadiusInPixels * 0.9; // Multiplica por 2 para el diámetro

              explorationRadioMarker.getElement().style.width = `${markerSizeInPixels}px`;
              explorationRadioMarker.getElement().style.height = `${markerSizeInPixels}px`;
            }
          });
        });

        return () => {
          if (mapboxMap) {
            mapboxMap.remove();
          }
        };
      },
      (error) => {
        console.error("Error al obtener la ubicación del usuario:", error);
      }
    );
  }, []);

  // Efecto para actualizar los marcadores cuando cambia el mapa o la ubicación del usuario
  useEffect(() => {
    if (map && userLocation) {
      // Eliminar marcadores anteriores si existen
      if (markerRef.current) {
        markerRef.current.remove();
      }

      // Crear un nuevo marcador de ubicación del usuario
      const userLocationMarker = new mapboxgl.Marker({
        element: createMarkerElement(),
      })
        .setLngLat(userLocation)
        .addTo(map);

      // Crear un nuevo marcador de radio de exploración
      const explorationRadioMarker = new mapboxgl.Marker({
        element: createMarkerElement(true), // Pasa true para indicar el marcador de radio de exploración
      })
        .setLngLat(userLocation) // Establecer la misma ubicación que el marcador de usuario
        .addTo(map);

      // Guardar la referencia del marcador para limpieza
      markerRef.current = explorationRadioMarker;
    }
  }, [map, userLocation, createMarkerElement]);

  // Renderizar el contenedor del mapa
  return (
    <section className="h-fit">
      <div ref={mapNode} style={{ width: "100%", height: "100vh" }} />
      <button onClick={centerMapOnUserLocation} className="absolute z-50 right-4 top-4 bg-dark-4/80 flex justify-center items-center w-10 h-10 rounded-full p-2.5">
        <img src="./assets/ubicacion.svg" alt="" className="w-full h-full rotate-45 translate-x-[1.5px]" />
      </button>
    </section>
  );
}

export default Maps;
