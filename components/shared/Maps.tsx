'use client'
// Importaciones
import React, { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl, { LngLatLike, Marker } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import puntosPinda from '../../app/(root)/data/puntosPinda'
import ModalPuntos from "./ModalPuntos";


interface ModalInfo {
  isOpen: boolean;
  data: {
    location?: string;
    street?: string;
    neighborhood?: string;
    boro_name?: string;
    image?: string;
  };
}


function Maps() {
  // Estado y referencias
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const mapNode = useRef<HTMLDivElement | null>(null);
  const [userLocation, setUserLocation] = useState<LngLatLike | null>(null);
  const markerRef = useRef<Marker | null>(null);

  const [modalInfo, setModalInfo] = useState<ModalInfo>({ isOpen: false, data: {} });


  // Función para crear el elemento del marcador
  const createMarkerElement = useCallback(
    (isExplorationRadio = false) => {
      const markerElement = document.createElement("div");
      markerElement.className = "custom-marker"; // Aplicar las clases de Tailwind aquí

      const markerSize = isExplorationRadio ? 270 : 18; // Cambiar el tamaño del marcador según sea necesario

      markerElement.style.width = `${markerSize}px`;
      markerElement.style.height = `${markerSize}px`;
      markerElement.style.borderRadius = "50%";
      markerElement.style.backgroundColor = isExplorationRadio
        ? "rgba(76, 211, 193, 0.233)" // Color translúcido para el radio de exploración
        : "#4cd3c1"; // Color verde para la ubicación del usuario
        /* if (isExplorationRadio) {
            markerElement.style.border = `2px dotted #4cd3c1`; // Ancho del borde y color
          } */
      return markerElement;
    },
    []
  );

  useEffect(() => {
    if (map) {
      map.on("load", () => {
        map.loadImage("/images/pinda/logoPinda.png", (error, image) => {
          if (error) throw error;

          // Verifica si 'image' es undefined antes de proceder
          if (image === undefined) {
            console.error('La imagen no se pudo cargar');
            return; // Salir de la función si la imagen no está disponible
          }
          map.addImage("custom-icon", image);

          map.addSource("puntosPinda", {
            type: "geojson",
            data: puntosPinda,
          });

          map.addLayer({
            id: "puntos-iconos",
            type: "symbol",
            source: "puntosPinda",
            layout: {
              "icon-image": "custom-icon",
              "icon-size": 0.5,
              "icon-allow-overlap": true,
            },
          });

          map.addLayer({
            id: "puntos-texto",
            type: "symbol",
            source: "puntosPinda",
            layout: {
              "text-field": ["get", "location"],
              "text-offset": [0, 2.3],
              "text-anchor": "center",
              "text-size": 12,
            },
            paint: {
              "text-color": "#eeeeee",
            },
            minzoom: 15,
          });
        });
        // Manejar clic en puntos Pinda para abrir el modal y volar hacia el punto
      map.on("click", "puntos-iconos", (e) => {
        if (!e.features || e.features.length === 0) {
          console.error('No features present');
          return; // Salir de la función si no hay características disponibles
        }

        const feature = e.features[0];

        if (feature.geometry.type === "Point") {
          const coordinates = feature.geometry.coordinates as [number, number]; // Asegura el tipo correcto
          

          // Transforma GeoJsonProperties a la estructura esperada por ModalPuntos
          const modalData = {
            location: feature.properties?.location || "",
            street: feature.properties?.street || "",
            neighborhood: feature.properties?.neighborhood || "",
            boro_name: feature.properties?.boro_name || "",
            image: feature.properties?.image || ""
          };

          // Establece la información del modal para mostrarla
          setModalInfo({ isOpen: true, data: modalData });
      
          // Anima el mapa hacia las coordenadas del punto seleccionado
          map.flyTo({
            center: coordinates,
            zoom: 17,
            pitch: 60,
            // bearing: -25,
            essential: true,
          });
        } else {
          console.error('Unsupported geometry type for this operation');
        }
      });

      // Cambia el cursor al pasar sobre un punto Pinda
      map.on("mouseenter", "puntos-iconos", () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on("mouseleave", "puntos-iconos", () => {
        map.getCanvas().style.cursor = '';
      });

        
      });
    }
  }, [map]);

  // Función para cerrar el modal
  const handleCloseModal = () => setModalInfo({ isOpen: false, data: {} });


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
          // style: "mapbox://styles/mapbox/navigation-night-v1",
          style: "mapbox://styles/mapbox/standard",

          center: [longitude, latitude],
          zoom: 17,
        });

        mapboxMap.on('style.load', () => {
          //@ts-ignore
          mapboxMap.setConfigProperty('basemap', 'lightPreset', 'dusk');
          //@ts-ignore
          mapboxMap.setConfigProperty('basemap', 'showPointOfInterestLabels',  false);
          //@ts-ignore
          mapboxMap.setConfigProperty('basemap', 'showTransitLabels',  false);

      
        })

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
              const markerSizeInPixels = explorationRadioRadiusInPixels * 0.9; // Multiplica el diámetro

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
    <section className="max-h-[100dvh] overflow-hidden">
      <div ref={mapNode} style={{ width: "100%", height: "100dvh" }} />
      {/* <ModalPuntos isOpen={modalInfo.isOpen} onClose={handleCloseModal} data={modalInfo.data} /> */}
      <ModalPuntos isOpen={modalInfo.isOpen} onClose={handleCloseModal} data={modalInfo.data} />
      <button onClick={centerMapOnUserLocation} className="fixed md:absolute z-50 right-4 bottom-32 lg:bottom-28 bg-black/50  flex justify-center items-center w-9 h-9 rounded-full p-1.5">
        <img src="../assets/map-icons/gps.svg" alt="" className="w-full h-full rotate-45 opacity-80" />
      </button>
    </section>
  );
}

export default Maps;
