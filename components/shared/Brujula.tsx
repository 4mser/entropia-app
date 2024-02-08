'use client'
import React, { useState, useEffect } from 'react';

const Brujula: React.FC = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      const { alpha } = event;
      if (alpha !== null) {
        setRotation(alpha);
      }
    };

    const requestPermission = async () => {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        // Esto es necesario para iOS 13+
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation, true);
        }
      } else {
        // Para navegadores que no requieren permiso
        window.addEventListener('deviceorientation', handleOrientation, true);
      }
    };

    // Solicitar permiso al cargar el componente
    requestPermission();

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, []);

  return (
    <div className='flex items-center justify-center h-[80vh]'>
        <p className='text-[DD981D] absolute text-[15px]'>N</p>
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
    </div>
  );
}

export default Brujula;
