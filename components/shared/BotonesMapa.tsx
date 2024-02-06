'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categorias } from '@/constants'; // Asegúrate de que esta ruta sea correcta




function BotonesMapa() {
  const [isMenuOpen, setMenuOpen] = useState(false);


  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };



  return (
        
        <section className='fixed z-50 bottom-14 w-fit right-3 h-fit'>
            <button className='absolute right-0 bottom-3 w-14 h-14 rounded-full overflow-hidden flex justify-center items-center  bg-gradient-to-tr from-amber-500 to-amber-800 p-[2px]'>
                    <div className='flex justify-center items-center w-full h-full p-2.5 bg-black/30 backdrop-blur-3xl rounded-full'>
                        <img src="../assets/map-icons/pin.svg" alt="" className='w-full filter hue-rotate-[220deg] h-full  object-contain' />
                    </div>
            </button>

            <button className='absolute right-12 bottom-14 bg-black/50  flex justify-center items-center w-9 h-9 rounded-full p-2'>
                        <img src="../assets/map-icons/ranking.svg" alt="" className='w-full h-full  object-contain opacity-80' />
            </button>

            <button className='absolute right-[3.8rem] bottom-3 bg-black/50  flex justify-center items-center w-9 h-9 rounded-full p-2'>
                        <img src="../assets/map-icons/rayo.svg" alt="" className='w-full h-full  object-contain opacity-80' />
            </button>
        </section>
  );
}
       
export default BotonesMapa;
