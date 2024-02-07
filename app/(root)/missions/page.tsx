'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Page: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);

  // Asegúrate de que los valores cumplan con los tipos esperados por Framer Motion.
  const spinAnimation = {
    rotateY: [0, 360],
    transition: {
      duration: 2,
      ease: "easeOut",
      times: [0, 1],
      repeat: 0, // 0 para no repetir, ajusta según la necesidad
      repeatType: "loop" as const, // Usar 'as const' para asegurar que el tipo sea literalmente "loop"
    }
  };

  const handleClick = (): void => {
    setIsSpinning(!isSpinning);
  };

  return (
    <div className='flex items-center justify-center h-screen'>
        <motion.img 
            src="https://app-valdi.s3.amazonaws.com/xplorers/isotipo_3+copia.png"
            width={300}
            height={300}
            alt="Logo Xplorers"
            className="-translate-y-14 cursor-pointer"
            animate={isSpinning ? spinAnimation : {}}
            onClick={handleClick}
        />
    </div>
  );
}

export default Page;
