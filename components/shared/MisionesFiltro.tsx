'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { misiones } from '@/constants'; // Asegúrate de que esta ruta sea correcta


interface CategoriaState {
  [key: number]: boolean;
}

function MisionesFiltro() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [switchStates, setSwitchStates] = useState<CategoriaState>({ 0: true });

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const toggleSwitch = (index: number) => {
    setSwitchStates((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
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
                  <li key={mision.name} className="relative w-full  rounded-2xl overflow-hidden shadow-lg">
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
