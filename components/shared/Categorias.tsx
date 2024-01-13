'use client'
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

interface Props {
  imgUrl: string;
}

function Categorias({ imgUrl }: Props) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const { userId } = useAuth();


  return (
    <section className="md:hidden">
      <div
        className="fixed md:absolute top-4 right-4 rounded-full flex flex-col p-[2px] justify-center items-center w-12 h-12 overflow-hidden bg-gradient-to-tr from-blue to-green-700  backdrop-blur-sm"
        onClick={toggleMenu}
      >
        <div className="rounded-full w-full h-full bg-glassmorphism flex justify-center p-1 items-center">
            <img
            src={imgUrl}
            alt="logo"
            className="w-full h-full object-cover rounded-full shadow-2xl cursor-pointer"
            />
          </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed top-0 left-0 z-[50] w-full h-screen"
          >
            <motion.div
              className="menu fixed z-[49] bottom-0 left-0 w-full h-3/4 backdrop-blur-xl select-none  border-t border-white/10 rounded-t-3xl overflow-hidden"
              initial={{opacity: 1, y: "100%" }}
              animate={{ opacity: 1,  y: 0 }}
              exit={{ opacity: 1, y: "100%" }}
              transition={{ ease: "circOut", duration: 0.2 }}
            >
                <p className="text-white text-center pt-2 text-[14px]">Categorías</p>
              <ul className="flex flex-col px-4 gap-3 pt-14 font-normal text-[12px] text-white">
                <li>
                  <Link href={`/profile/${userId}`} className="flex items-center gap-4 ">
                    <img src="../assets/categories/naturaleza.svg" alt="icono" className="h-6" />
                    Naturaleza
                  </Link>
                </li>
                <li className="flex items-center  gap-4 ">
                  <img src="../assets/categories/rutas.svg" alt="icono" className="h-6" />
                  Rutas y Aventuras
                </li>
                <li className="flex items-center  gap-4 ">
                  <img src="../assets/categories/comidas.svg" alt="icono" className="h-6" />
                  Comidas y Bebidas
                </li>
                <li className="flex items-center  gap-4 ">
                  <img src="../assets/categories/deporte.svg" alt="icono" className="h-6" />
                  Deporte y Fitness
                </li>
                <li className="flex items-center  gap-4 ">
                  <img src="../assets/categories/.svg" alt="icono" className="h-6" />
                  Actividades y Eventos
                </li>
                <li className="   ">
                  <Link href='/research-lab' className="flex items-center gap-4">
                    <img src="../assets/categories/cultura.svg" alt="icono" className="h-6" />
                    Educación y Cultura
                  </Link>
                </li>
                <li className="flex items-center  gap-4 ">
                  <img src="../assets/categories/medioambiente.svg" alt="icono" className="h-6" />
                  Activismo y Medioambiente
                </li>
              </ul>
            </motion.div>
            <motion.div
              className="w-full h-screen fixed z-[48] left-0 top-0 select-none"
              onClick={toggleMenu}
            ></motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Categorias;
