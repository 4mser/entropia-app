'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';



function ContadorPasos() {

  const [isMenuOpen, setMenuOpen] = useState(false);


  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
      <section className='fixed top-4 left-0 w-full h-fit flex justify-center select-none '>
        <div
        className="flex flex-col rounded-3xl  py-2 px-3 justify-between w-auto items-center  gap-3 h-auto bg-black/20 backdrop-blur-sm border border-white/10 text-white/70 text-[14px] " 
        onClick={toggleMenu}
        >
            <div className='flex items-center h-7 gap-3 '>
              <img src='../assets/walk.svg' alt="logo" className="h-full object-contain " />
              <p>24</p>

              <img src='../assets/cripto.svg' alt="logo" className="  h-full object-contain " />
              <p>12</p>
            </div>
            
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div 
                  className='overflow-hidden'
                  initial={{ height: '0' }}
                  animate={{ height: 'auto' }}
                  exit={{ height: '0' }}
                  transition={{ ease: 'circOut', duration: 0.2 }}
                >
                  <img src="../images/grafico.png" alt="" />
                </motion.div>
              )}

            </AnimatePresence>
        </div>


      </section>

  );
}

export default ContadorPasos;
