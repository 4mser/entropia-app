/* 'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { misiones } from '@/constants'; // Asegúrate de que esta ruta sea correcta


interface CategoriaState {
  [key: number]: boolean;
}

function MisionesFiltro() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const [misionActiva, setMisionActiva] = useState<number | null>(0);

  // Función para activar una misión
  const activarMision = (index: number) => {
    setMisionActiva(index);
  };
  

  const dragConstraints = { top: 0, bottom: 0 }; // Restringe el arrastre verticalmente

  return (
    <section className="md:hidden">
      <div
        className="fixed md:absolute top-[4.5rem] right-4 rounded-full flex flex-col p-[2px] justify-center items-center w-12 h-12 overflow-hidden bg-gradient-to-tr from-red-800 to-yellow-600 backdrop-blur-sm"
        onClick={toggleMenu}
      >
        <div className="rounded-full w-full h-full bg-glassmorphism flex justify-center p-1 items-center">
          <img src="https://app-valdi.s3.amazonaws.com/misiones/DALL%C2%B7E+2024-01-13+21.48.24+-+A+naturalist-style+illustration+featuring+a+hummingbird+interacting+with+a+vibrant+and+diverse+ecosystem+of+fruits+and+plants.+The+scene+includes+mand.png" alt="mision" className="w-full h-full object-cover rounded-full shadow-2xl cursor-pointer" />
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div className="fixed top-0 left-0 z-[60] w-full h-screen ">
            <motion.div
              drag="y"
              dragConstraints={dragConstraints}
              onDragEnd={(event, info) => {
                if (info.point.y > 400) { // Cambiar '300' por el umbral deseado
                  toggleMenu();
                }
              }}
              className="menu fixed z-[61] bottom-0 left-0 w-full h-fit max-h-screen backdrop-blur-xl select-none border-t border-white/10 rounded-t-[40px] overflow-hidden"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ ease: 'circOut', duration: 0.2 }}
            >
               <div className='w-full pt-2 h-full flex justify-center hover:cursor-grab'>
                <div className='w-10 h-1 rounded-full bg-white/50 text-center'></div>
               </div>
              <p className="text-white text-center pt-2 text-[14px] font-medium">Filtrar Misión</p>
              <ul className="grid grid-cols-3 px-4 gap-2 pt-3 font-normal text-[12px] text-white mb-5">
                {misiones.map((mision, index) => (
                  <li key={mision.name} 
                    className="relative w-full  rounded-2xl overflow-hidden shadow-lg" 
                    onClick={() => activarMision(index)}
                  >
                      <div className={`filtrador absolute w-8 h-8  p-[3px] rounded-full   top-1 left-1 flex justify-center items-center ${misionActiva === index ? 'bg-gradient-to-tr from-red-800 to-yellow-500' : ' border-white/50 border-3'}`}>
                        <div className={`w-full h-full rounded-full  p-[3px] ${misionActiva === index ? 'bg-black/30 backdrop-blur-3xl' : 'bg-white/50'} transition`}>
                          <div className={`${misionActiva === index ? 'w-full  h-full rounded-full bg-gradient-to-tr from-red-700 to-yellow-500' : ''} `}></div>
                        </div>
                      </div>

                      <img src={mision.image} alt="" className='w-full h-28 object-cover' />
                      <div className='absolute w-8 h-8 rounded-full overflow-hidden left-1/2 -translate-x-1/2 -translate-y-[17px] border-[4px] border-[#1C222C]'>
                        <img src={mision.marca} alt="" className='h-full w-full object-cover' />
                      </div>
                      <div className='h-fit bg-[#1C222C] flex items-center justify-center text-center'>
                        <span className='text-[9px] mt-4 mb-2'>{mision.name}</span>
                      </div>
                  </li>
                  ))}
              </ul>
            </motion.div>
            <motion.div className="w-full h-screen fixed z-[48] left-0 top-0 select-none" onClick={toggleMenu}></motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default MisionesFiltro;

 */

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Asumiendo que `misiones` es un array de un tipo definido, por ejemplo:
interface Mision {
  name: string;
  image: string;
  marca: string;
}

// Si ya tienes un tipo definido para `misiones`, úsalo aquí.
import { misiones } from '@/constants';

const MisionesFiltro: React.FC = () => {
  // Estados: 0 = cerrado, 1 = semiabierto (50%), 2 = completamente abierto
  const [bottomSheetState, setBottomSheetState] = useState<number>(0);

  const toggleMenu = () => {
    setBottomSheetState(prevState => (prevState === 0 ? 1 : 0)); // Cambia entre cerrado y semiabierto
  };

  const [misionActiva, setMisionActiva] = useState<number | null>(null);

  const activarMision = (index: number) => {
    setMisionActiva(index);
  };

  const handleDragEnd = (event: MouseEvent, info: { point: { y: number } }) => {
    if (bottomSheetState === 1) {
      // Está en 15%, verifica los umbrales de arrastre
      if (info.point.y < -300) {
        setBottomSheetState(2); // Expande a y:0
      } else if (info.point.y > 300) {
        setBottomSheetState(0); // Cierra
      }
    } else if (bottomSheetState === 2) {
      // Está completamente abierto
      if (info.point.y > 300 && info.point.y <= 600) {
        setBottomSheetState(1); // Vuelve al 15%
      } else if (info.point.y > 600) {
        setBottomSheetState(0); // Cierra
      }
    }
  };

  const bottomSheetVariants = {
    closed: { y: '100%' },
    semiOpen: { y: '15%' },
    open: { y: 0 },
  };

  return (
    <section className="md:hidden">
      <div
        className="fixed md:absolute top-[4.5rem] right-4 rounded-full flex flex-col p-[2px] justify-center items-center w-12 h-12 overflow-hidden bg-gradient-to-tr from-red-800 to-yellow-600 backdrop-blur-sm"
        onClick={toggleMenu}
      >
        <div className="rounded-full w-full h-full bg-glassmorphism flex justify-center p-1 items-center">
          <img src="https://app-valdi.s3.amazonaws.com/misiones/DALL%C2%B7E+2024-01-13+21.48.24+-+A+naturalist-style+illustration+featuring+a+hummingbird+interacting+with+a+vibrant+and+diverse+ecosystem+of+fruits+and+plants.+The+scene+includes+mand.png" alt="mision" className="w-full h-full object-cover rounded-full shadow-2xl cursor-pointer" />
        </div>
      </div>

      <AnimatePresence>
        {bottomSheetState !== 0 && (
          <motion.div className="fixed top-0 left-0 z-[60] w-full h-screen">
            <motion.div
              drag="y"
              onDragEnd={handleDragEnd}
              className="menu fixed z-[61] bottom-0 left-0 w-full h-fit max-h-screen backdrop-blur-xl select-none border-t border-white/10 rounded-t-[40px] overflow-hidden"
              variants={bottomSheetVariants}
              initial="closed"
              animate={bottomSheetState === 1 ? "semiOpen" : bottomSheetState === 2 ? "open" : "closed"}
              exit="closed"
              transition={{ ease: 'circOut', duration: 0.3 }}
              dragConstraints={{ top: 0, bottom: 300 }} // Ajuste de las restricciones de movimiento
            >
              <div className='w-full pt-2 h-full flex justify-center hover:cursor-grab'>
                <div className='w-10 h-1 rounded-full bg-white/50 text-center'></div>
               </div>
              <p className="text-white text-center pt-2 text-[14px] font-medium">Filtrar Misión</p>
              <ul className="grid grid-cols-3 px-4 gap-2 pt-3 font-normal text-[12px] text-white mb-5">
                {misiones.map((mision, index) => (
                  <li key={mision.name} 
                    className="relative w-full  rounded-2xl overflow-hidden shadow-lg" 
                    onClick={() => activarMision(index)}
                  >
                      <div className={`filtrador absolute w-8 h-8  p-[3px] rounded-full   top-1 left-1 flex justify-center items-center ${misionActiva === index ? 'bg-gradient-to-tr from-red-800 to-yellow-500' : ' border-white/50 border-3'}`}>
                        <div className={`w-full h-full rounded-full  p-[3px] ${misionActiva === index ? 'bg-black/30 backdrop-blur-3xl' : 'bg-white/50'} transition`}>
                          <div className={`${misionActiva === index ? 'w-full  h-full rounded-full bg-gradient-to-tr from-red-700 to-yellow-500' : ''} `}></div>
                        </div>
                      </div>

                      <img src={mision.image} alt="" className='w-full h-28 object-cover' />
                      <div className='absolute w-8 h-8 rounded-full overflow-hidden left-1/2 -translate-x-1/2 -translate-y-[17px] border-[4px] border-[#1C222C]'>
                        <img src={mision.marca} alt="" className='h-full w-full object-cover' />
                      </div>
                      <div className='h-fit bg-[#1C222C] flex items-center justify-center text-center'>
                        <span className='text-[9px] mt-4 mb-2'>{mision.name}</span>
                      </div>
                  </li>
                  ))}
              </ul>
            </motion.div>
            <motion.div className="w-full h-screen fixed z-[48] left-0 top-0 select-none" onClick={toggleMenu}></motion.div>
</motion.div>
)}
</AnimatePresence>
</section>
);
}

export default MisionesFiltro;
