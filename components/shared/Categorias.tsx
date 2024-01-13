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

  const categorias = [
    {
        id: 1,
        name: 'Naturaleza',
        icon: '../assets/categories/naturaleza.svg'
    },
    {
        id: 2,
        name: 'Rutas y Aventuras',
        icon: '../assets/categories/rutas.svg'
    },
    {
        id: 3,
        name: 'Comidas y Bebidas',
        icon: '../assets/categories/comidas.svg'
    },
    {
        id: 4,
        name: 'Deporte y Fitness',
        icon: '../assets/categories/deporte.svg'
    },
    {
        id: 5,
        name: 'Actividades y Eventos',
        icon: '../assets/categories/eventos.svg'
    },
    {
        id: 6,
        name: 'Educación y Cultura',
        icon: '../assets/categories/cultura.svg'
    },
    {
        id: 7,
        name: 'Activismo y Medioambiente',
        icon: '../assets/categories/medioambiente.svg'
    },
    {
        id: 8,
        name: 'Ciencia y Tecnología',
        icon: '../assets/categories/ciencia.svg'
    },
    {
        id: 9,
        name: 'Emprendimientos',
        icon: '../assets/categories/emprendimientos.svg'
    },
    {
        id: 10,
        name: 'Exploración Urbana',
        icon: '../assets/categories/exploracion.svg'
    },
    {
        id: 11,
        name: 'Arte y Creatividad',
        icon: '../assets/categories/arte.svg'
    },
    {
        id: 12,
        name: 'Salud y Bienestar',
        icon: '../assets/categories/salud.svg'
    },
    {
        id: 13,
        name: 'Belleza y Estilo',
        icon: '../assets/categories/belleza.svg'
    },
    {
        id: 14,
        name: 'Historia y Patrimonio',
        icon: '../assets/categories/historia.svg'
    }
  ]


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
              className="menu fixed z-[49] bottom-0 left-0 w-full h-fit backdrop-blur-xl select-none  border-t border-white/10 rounded-t-3xl overflow-hidden"
              initial={{opacity: 1, y: "100%" }}
              animate={{ opacity: 1,  y: 0 }}
              exit={{ opacity: 1, y: "100%" }}
              transition={{ ease: "circOut", duration: 0.2 }}
            >
                <p className="text-white text-center pt-2 text-[14px]">Categorías</p>
              <ul className="flex flex-col px-4 gap-3 pt-5 font-normal text-[12px] text-white mb-10">
                
                {categorias.map((categoria) => (
                    <li className="flex items-center  gap-4 ">
                        <img src={categoria.icon} alt={categoria.name} className="h-6" />
                        {categoria.name}
                    </li>
                ))}
                
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
