'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Brujula: React.FC = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      const { alpha } = event;
      if (alpha !== null) {
        setRotation(alpha);
      }
    };

    // Solicitar acceso al giroscopio en iOS 13+
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation, true);
          }
        })
        .catch(console.error);
    } else {
      // Para otros dispositivos, solo añade el evento
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    // Limpiar el evento al desmontar el componente
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
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
            animate={{ rotate: 360 }}
            transition={{
              type: "spring",
              stiffness: 40,
              damping: 15,
              mass: 2,
              restDelta: 0.001,
              from: 0,
              repeat: 0,
              duration: 2
            }}
        />
        <motion.img 
            src="https://app-valdi.s3.amazonaws.com/xplorers/brujula2.png"
            width={250}
            height={250}
            alt="Logo Xplorers"
            className="cursor-pointer absolute"
            style={{ rotate: rotation }} // Usa el estado de rotation aquí
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
