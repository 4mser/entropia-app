import { motion, AnimatePresence } from "framer-motion";
import React from "react"; // Importa React (necesario para JSX si estás usando TypeScript)

// Definición de la interfaz para las props
interface ModalPuntosProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    location?: string;
    street?: string;
    neighborhood?: string;
    boro_name?: string;
    image?: string;
  };
}

const ModalPuntos: React.FC<ModalPuntosProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;
  const dragConstraints = { top: 0, bottom: 0 }; // Restringe el arrastre verticalmente

  const menuVariants = {
    open: {
      opacity: 1,
      x: 0,
      backdropFilter: "blur(10px)",
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
    closed: {
      opacity: 0,
      x: "-100%",
      backdropFilter: "blur(0px)",
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
  };

  const backdropVariants = {
    open: { opacity: 1, transition: { duration: 0.3 } },
    closed: { opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed top-0 left-0 z-[60] w-full min-h-[100dvh] flex items-center justify-center p-8">
          <motion.div
            drag="y"
            dragConstraints={dragConstraints}
            onDragEnd={(event, info) => {
              if (info.point.y > 400) {
                // Cambiar '300' por el umbral deseado
                onClose();
              }
            }}
            className="menu  z-[61]   w-full h-fit backdrop-blur-md select-none   border-b  border-white/10 shadow-xl rounded-[20px] overflow-hidden"
            initial={{ y: "50%", opacity:0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "50%", opacity:0 }}
            transition={{ ease: "anticipate", duration: 0.5 }}
          >
            <div className="w-full pt-2 h-full flex justify-center hover:cursor-grab">
              <div className="w-10 h-1 rounded-full bg-white/30 text-center"></div>
            </div>
            <p className="text-white text-center pt-2 text-[14px] font-medium">
              {data?.location}
            </p>
            <div className="flex items-center flex-col mb-7 px-7">
              <p className="font-normal text-[11px] pt-1 text-white/70">
                {data?.street} - {data?.neighborhood}, {data?.boro_name}
              </p>
              <img src={data?.image} alt="" className="mt-3 rounded-xl" />
            </div>
          </motion.div>
          <motion.div
            className="w-full h-[100dvh] fixed z-[48] left-0 top-0 select-none backdrop-blur-sm"
            initial="closed"
          animate="open"
          exit="closed"
            variants={backdropVariants}
            onClick={onClose}
          ></motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalPuntos;
