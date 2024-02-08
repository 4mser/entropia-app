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

    window.addEventListener('deviceorientation', handleOrientation, true);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, []);

  // Clase condicional para aplicar el box shadow. Ajusta los valores según necesites.
  const boxShadowClass = rotation === -45 ? 'shadow-lg ring-1 ring-amber-500/50 filter drop-shadow-lg' : 'filter';

  return (
    <div className='flex items-center justify-center h-[80vh]'>
        <p className='text-[#DD981D] absolute text-[15px]'>N</p>
        <img 
            src="https://app-valdi.s3.amazonaws.com/xplorers/brujula1.png"
            width={250}
            height={250}
            alt="Base de la brújula"
            className={`cursor-pointer ${rotation === -45 ? 'shadow-amber-500/50' : ''}`}
            style={{ position: 'absolute' }}
        />
        <img 
            src="https://app-valdi.s3.amazonaws.com/xplorers/brujula2.png"
            width={250}
            height={250}
            alt="Aguja de la brújula"
            className={`cursor-pointer ${boxShadowClass}`}
            style={{ transform: `rotate(${rotation}deg)`, position: 'absolute' }}
        />
    </div>
  );
}

export default Brujula;
