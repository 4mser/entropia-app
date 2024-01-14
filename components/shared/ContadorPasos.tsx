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
      <div
        className="fixed md:absolute top-4 left-1/2 -translate-x-1/2  flex rounded-3xl  p-2 justify-between flex-row items-center w-fit gap-3 h-12 overflow-hidden bg-black/20 backdrop-blur-sm border border-white/10 text-white/70 text-[14px] px-3"
        onClick={toggleMenu}
      >
          <img src='../assets/walk.svg' alt="logo" className="w-full h-full object-contain rounded-full shadow-2xl cursor-pointer" />
          <p>23</p>

          <img src='../assets/cripto.svg' alt="logo" className="w-full h-full object-contain rounded-full shadow-2xl cursor-pointer" />
          <p>1200</p>
      </div>

  );
}

export default ContadorPasos;
