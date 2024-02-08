'use client'
import React, { useState, useEffect, useRef } from 'react';

const Brujula: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const brujulaRef = useRef(null); // Referencia al div contenedor para obtener su posición

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      const { alpha } = event;
      if (alpha !== null) {
        setRotation(alpha);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (brujulaRef.current) {
        const brujula = brujulaRef.current.getBoundingClientRect();
        const centerX = brujula.left + brujula.width / 2;
        const centerY = brujula.top + brujula.height / 2;
        const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX) * (180 / Math.PI);
        setRotation(angle);
      }
    };

    // Agregar el event listener para el evento 'deviceorientation'
    window.addEventListener('deviceorientation', handleOrientation, true);
    // Agregar el event listener para el movimiento del ratón
    document.addEventListener('mousemove', handleMouseMove);

    // Limpiar los event listeners cuando el componente se desmonte
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Clase condicional para aplicar el box shadow cuando rotation es igual a -13
  const boxShadowClass = rotation === -13 ? 'shadow-lg ring-1 ring-amber-500/50 filter drop-shadow-lg' : 'filter';

  // Verifica si rotation está en el rango de -20 a -55 para mostrar la etiqueta "N"
  const showN = rotation >= -55 && rotation <= -35;

  return (
    <div ref={brujulaRef} className='flex items-center justify-center h-[80vh]'>
        {showN && <p className='text-[#DD981D] absolute text-[25px] transition-all font-bold top-28'>PRIMERA PISTA</p>}
        <img 
            src="https://app-valdi.s3.amazonaws.com/xplorers/brujula1.png"
            width={250}
            height={250}
            alt="Base de la brújula"
            className={`cursor-pointer transition-all ${rotation === -13 ? 'shadow-amber-500/50' : ''}`}
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
