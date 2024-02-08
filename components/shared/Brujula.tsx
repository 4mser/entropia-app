'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Brujula: React.FC = () => {
  const [rotation, setRotation] = useState<number>(0);

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      const { alpha } = event;
      setRotation(alpha || 0);
    };

    const requestOrientationPermission = async () => {
      // Verifica si DeviceOrientationEvent.requestPermission está disponible
      if ('DeviceOrientationEvent' in window && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        try {
          const permissionState = await (DeviceOrientationEvent as any).requestPermission();
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          } else {
            console.error("Permission not granted for DeviceOrientation");
          }
        } catch (error) {
          console.error("Error requesting device orientation permission:", error);
        }
      } else {
        // requestPermission no es necesario o no está disponible, agrega el listener directamente
        window.addEventListener('deviceorientation', handleOrientation);
      }
    };

    // Solicita permiso al cargar el componente
    requestOrientationPermission();

    // Limpieza al desmontar el componente
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  return (
    <div className='flex items-center justify-center h-[80vh]'>
        <motion.img 
            src="https://app-valdi.s3.amazonaws.com/xplorers/brujula1.png"
            width={250}
            height={250}
            alt="Logo Xplorers"
            className="cursor-pointer absolute"
        />
        <motion.img 
            src="https://app-valdi.s3.amazonaws.com/xplorers/brujula2.png"
            width={250}
            height={250}
            alt="Logo Xplorers"
            className="cursor-pointer absolute"
            style={{ rotate: rotation }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 10,
              mass: 2,
              restDelta: 0.002,
              from: 0,
              repeat: 0,
              duration: 2
            }}
        />
    </div>
  );
}

export default Brujula;
