'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Page: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);


  const handleClick = (): void => {
    setIsSpinning(!isSpinning);
  };

  return (
    <div className='flex items-center justify-center h-screen'>
        <motion.img 
            src="https://app-valdi.s3.amazonaws.com/xplorers/brujula1.png"
            width={300}
            height={300}
            alt="Logo Xplorers"
            className="cursor-pointer absolute"
            whileTap={{ scale: 0.9 }} // Opcional: Efecto de feedback al hacer clic
            animate={{ rotate: 360 }}
            transition={{
              type: "spring",
              stiffness: 40,
              damping: 15,
              mass: 2,
              restDelta: 0.001, // Ajusta este valor para controlar cuándo la animación debe detenerse
              from: 0,
              repeat: 0,
              duration: 2
            }}
            onClick={handleClick}
        />
        <motion.img 
            src="https://app-valdi.s3.amazonaws.com/xplorers/brujula2.png"
            width={300}
            height={300}
            alt="Logo Xplorers"
            className="cursor-pointer absolute"
            whileTap={{ rotate:360 }} // Opcional: Efecto de feedback al hacer clic
            animate={{ rotate: 360 }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 10,
              mass: 2,
              restDelta: 0.002, // Ajusta este valor para controlar cuándo la animación debe detenerse
              from: 0,
              repeat: 0,
              duration: 2
            }}
            onClick={handleClick}
        />
    </div>
  );
}

export default Page;
