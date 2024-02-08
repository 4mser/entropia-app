'use client'
import React, { useState, useEffect } from 'react';

const Brujula: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    async function requestPermission() {
      // Primero, verificamos si requestPermission existe en DeviceOrientationEvent.
      if (DeviceOrientationEvent && 'requestPermission' in DeviceOrientationEvent) {
        try {
          // Como requestPermission existe, lo llamamos y esperamos por la respuesta.
          const permission = await DeviceOrientationEvent.requestPermission();
          if (permission === 'granted') {
            setHasPermission(true);
            window.addEventListener('deviceorientation', handleOrientation);
          } else {
            setHasPermission(false);
          }
        } catch (error) {
          console.error('Error requesting device orientation permission:', error);
          setHasPermission(false);
        }
      } else {
        // Si requestPermission no existe, asumimos que el permiso ya está concedido.
        console.log('DeviceOrientationEvent.requestPermission is not available. Assuming permission is granted.');
        setHasPermission(true);
        window.addEventListener('deviceorientation', handleOrientation);
      }
    }

    function handleOrientation(event: DeviceOrientationEvent) {
      const { alpha } = event;
      if (alpha !== null) {
        setRotation(alpha);
      }
    }

    // Solicitar permiso cuando el componente se monta.
    requestPermission();

    // Limpiar el event listener cuando el componente se desmonte.
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  // Renderizado condicional basado en si tenemos permiso
  return (
    <div className='flex items-center justify-center h-[80vh]'>
      {hasPermission ? (
        <>
          <p className='text-[#DD981D] absolute text-[15px]'>N</p>
          <img
              src="https://app-valdi.s3.amazonaws.com/xplorers/brujula1.png"
              width={250}
              height={250}
              alt="Base de la brújula"
              className="cursor-pointer"
              style={{ position: 'absolute' }}
          />
          <img
              src="https://app-valdi.s3.amazonaws.com/xplorers/brujula2.png"
              width={250}
              height={250}
              alt="Aguja de la brújula"
              className="cursor-pointer"
              style={{ transform: `rotate(${rotation}deg)`, position: 'absolute' }}
          />
        </>
      ) : (
        <p>Requiere permiso para acceder a la orientación del dispositivo.</p>
      )}
    </div>
  );
}

export default Brujula;
