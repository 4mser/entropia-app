'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categorias } from '@/constants'; // Asegúrate de que esta ruta sea correcta

interface Props {
  imgUrl: string;
}

interface CategoriaState {
  [key: number]: boolean;
}

function Categorias({ imgUrl }: Props) {
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
        className="fixed md:absolute top-4 right-4 rounded-full flex flex-col p-[2px] justify-center items-center w-12 h-12 overflow-hidden bg-gradient-to-tr from-blue to-green-700 backdrop-blur-sm"
        onClick={toggleMenu}
      >
        <div className="rounded-full w-full h-full bg-glassmorphism flex justify-center p-1 items-center">
          <img src={imgUrl} alt="logo" className="w-full h-full object-cover rounded-full shadow-2xl cursor-pointer" />
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
              className="menu fixed z-[61] bottom-0 left-0 w-full h-fit backdrop-blur-xl select-none border-t border-white/10 rounded-t-[40px] overflow-hidden"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ ease: 'circOut', duration: 0.2 }}
            >
               <div className='w-full pt-2 h-full flex justify-center hover:cursor-grab'>
                <div className='w-10 h-1 rounded-full bg-white/50 text-center'></div>
               </div>
              <p className="text-white text-center pt-2 text-[14px] font-medium">Categorías</p>
              <ul className="flex flex-col px-4 gap-1 pt-3 font-normal text-[12px] text-white mb-5">
              {categorias.map((categoria, index) => (
                <li key={categoria.name} className="w-full flex justify-between items-center px-2 py-1">
                    <div 
                    className={`flex items-center gap-4 transition-opacity ${switchStates[index] ? 'opacity-100' : 'opacity-50'}`}
                    >
                        <img src={categoria.icon} alt={categoria.name} className="h-6" />
                        {categoria.name}
                    </div>
                    <div
                    onClick={() => toggleSwitch(index)}
                    className={`w-14 h-7 rounded-full p-1 cursor-pointer transition-colors ${
                        switchStates[index] ? 'bg-gradient-to-r from-blue to-green-500' : 'bg-white/10'
                    }`}
                    >
                    <div
                        className={`bg-white w-5 h-5 rounded-full shadow transform transition-transform ${
                        switchStates[index] ? 'translate-x-7' : 'translate-x-0'
                        }`}
                    />
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

export default Categorias;
