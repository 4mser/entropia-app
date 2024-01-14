'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';




function ContadorPasos() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };


  const dragConstraints = { top: 0, bottom: 0 }; // Restringe el arrastre verticalmente

  return (
    <section className="md:hidden">
      <div
        className="fixed md:absolute top-4 left-1/2 -translate-x-1/2 rounded-full flex flex-col p-[2px] justify-center items-center w-12 h-12 overflow-hidden bg-gradient-to-tr from-blue to-green-700 backdrop-blur-sm"
        onClick={toggleMenu}
      >
        <div className="rounded-full w-full h-full bg-glassmorphism flex justify-center p-1 items-center">
          <img src='../assets/walk.svg' alt="logo" className="w-full h-full object-cover rounded-full shadow-2xl cursor-pointer" />
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
              
            </motion.div>
            <motion.div className="w-full h-screen fixed z-[48] left-0 top-0 select-none" onClick={toggleMenu}></motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ContadorPasos;
