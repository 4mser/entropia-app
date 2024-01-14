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
      <section className='fixed top-4 left-0 w-full h-fit flex justify-center'>
        <div
        className=" flex rounded-3xl  py-2 px-3 justify-between items-center  gap-3 h-12 bg-black/20 backdrop-blur-sm border border-white/10 text-white/70 text-[14px] "
        onClick={toggleMenu}
      >
          <img src='../assets/walk.svg' alt="logo" className="w-full h-full object-contain rounded-full shadow-2xl cursor-pointer" />
          <p>4326</p>

          <img src='../assets/cripto.svg' alt="logo" className="w-full h-full object-contain rounded-full shadow-2xl cursor-pointer" />
          <p>1200</p>
      </div>
      </section>

  );
}

export default ContadorPasos;
