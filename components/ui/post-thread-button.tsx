import Link from "next/link";

function PostThreadButton() {
  const button = {
    imgURL: "/assets/pen.svg",
    route: "/create-thread",
    label: "Crear Post",
  };

  return (
    <div className="fixed md:hidden  bottom-20 max-sm:bottom-20 shadow-md right-4 p-px rounded-full bg-gradient-to-tr from-blue to-green-600 overflow-hidden">
      <Link href={button.route} className="w-full h-full flex items-center bg-dark-1/50 hover:bg-dark-1/80 transition rounded-full justify-center p-3">
          <img src={button.imgURL} alt={button.label} className="w-6" />
      </Link>
    </div>
  );
}

export default PostThreadButton;


/* 'use client'

import { useState } from "react";
import CrearPost from "./create-post";


function PostThreadButton() {


  const button = {
    imgURL: "/assets/pen.svg",
    route: "/create-thread",
    label: "Crear Post",
  };

  const [modalPost, setModalPost] = useState(false)

  const handleModal = () => {
    setModalPost(!modalPost);
  }

  return (
    <section>
      <div className="fixed md:hidden  bottom-20 max-sm:bottom-16 shadow-md right-4 p-px rounded-full bg-gradient-to-tr from-blue to-green-600 overflow-hidden">
        <button onClick={handleModal} className="w-full h-full flex items-center bg-dark-1/50 hover:bg-dark-1/80 transition rounded-full justify-center p-3">
            <img src={button.imgURL} alt={button.label} className="w-6" />
        </button>
      </div>

      {modalPost === true && (
        <section onClick={handleModal} className="bg-black/20 top-0 left-0 backdrop-blur-md w-full h-screen fixed z-50">
          <CrearPost />
        </section>
        // <CrearPost />
      )}
    </section>
  );
}

export default PostThreadButton; */
