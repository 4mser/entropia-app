'use client'
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

interface Props {
  imgUrl: string;
  name: string;
  username: string;
}

function UserPic({ imgUrl, name, username }: Props) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const { userId } = useAuth();


  return (
    <section className="">
      <div
        className="fixed z-50 md:absolute top-4 left-4 rounded-full flex flex-col p-px justify-center items-center w-12 h-12 overflow-hidden"
        onClick={toggleMenu}
      >
        <img
          src={imgUrl}
          alt="logo"
          className="w-full h-full object-cover rounded-full shadow-2xl cursor-pointer"
        />
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed top-0 left-0 z-[49] w-full h-screen"
          >
            <motion.div
              className="menu fixed z-[49] top-0 left-0 w-9/12 h-screen backdrop-blur-xl select-none  border-r border-white/10"
              initial={{opacity: 1, x: "-100%" }}
              animate={{ opacity: 1,  x: 0 }}
              exit={{ opacity: 1, x: "-100%" }}
              transition={{ ease: "circOut", duration: 0.2 }}
            >
              <div className="pt-5 px-20">
                <h2 className="text-white text-[14px] font-bold">{name}</h2>
                <p className="text-white/40 text-[12px] font-medium">@{username}</p>
              </div>
              <ul className="flex flex-col px-4 gap-8 pt-14">
                <li className=" text-white text-[19px]">
                  <Link href={`/profile/${userId}`} className="flex items-center gap-4 ">
                    <img src="../assets/menu-map/perfil.svg" alt="icono" className="h-7" />
                    Perfil
                  </Link>
                </li>
                <li className="flex items-center text-white gap-4 text-[19px]">
                  <img src="../assets/menu-map/billetera.svg" alt="icono" className="h-7" />
                  Billetera
                </li>
                <li className="flex items-center text-white gap-4 text-[19px]">
                  <img src="../assets/menu-map/premium.svg" alt="icono" className="h-7" />
                  Premium
                </li>
                <li className="flex items-center text-white gap-4 text-[19px]">
                  <img src="../assets/menu-map/planesempresas.svg" alt="icono" className="h-7" />
                  Planes empresas
                </li>
                <li className="flex items-center text-white gap-4 text-[19px]">
                  <img src="../assets/menu-map/publicidad.svg" alt="icono" className="h-7" />
                  Publicidad
                </li>
                <li className=" text-white  text-[19px]">
                  <Link href='/research-lab' className="flex items-center gap-4">
                    <img src="../assets/menu-map/researchlab.svg" alt="icono" className="h-7" />
                    Research Lab
                  </Link>
                </li>
                <li className="flex items-center text-white gap-4 text-[19px]">
                  <img src="../assets/menu-map/configuracion.svg" alt="icono" className="h-7" />
                  Configuración
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

export default UserPic;
