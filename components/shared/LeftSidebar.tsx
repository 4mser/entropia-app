"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";

import { sidebarLinks } from "@/constants";
import { useEffect, useState } from "react";

const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { userId } = useAuth();

  const logos = {
    entropia: "/entropia.svg",
    eoa: "/eoa.svg"
  }

  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Agregar el evento de cambio de tamaño de la ventana
    window.addEventListener('resize', handleResize);

    // Llamar a handleResize una vez para establecer el ancho inicial
    handleResize();

    // Limpiar el evento al desmontar el componente
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const determineLogo = () => {
    if (screenWidth <= 480) {
      // Tamaño 'md' o menor
      return logos.entropia;
    } else if (screenWidth > 768 && screenWidth <= 1024) {
      return logos.eoa;
    } else {
      return logos.entropia;
    }
  };

  return (
    <section className='custom-scrollbar leftsidebar'>
      <Link href='/' className='flex absolute top-6 md:scale-150 md:hover:scale-[1.6] lg:transform-none  items-center gap-4 mb-5 px-7 hover:scale-105 lg:hover:scale-105  transition-all'>
          <img src={determineLogo()} alt='logo' width={110} height={110} />
        </Link>
      <div className='flex w-full flex-1 flex-col gap-7 px-6 mt-12'>
      
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          if (link.route === "/profile") link.route = `${link.route}/${userId}`;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`leftsidebar_link hover:bg-gradient-to-tr  ${isActive ? "group bg-gradient-to-tr from-blue to-green-700" : "from-gray-600 to-white/20 transition opacity-75 hover:opacity-100"}`}
            >
              <div className="rounded-full py-2.5 bg-dark-1 bg-opacity-70 w-full px-4 flex group-hover:bg-opacity-80 transition  items-center gap-3">
                <img
                  src={link.imgURL}
                  alt={link.label}
                  width={24}
                  height={24}
                />

                <p className='text-light-1 max-lg:hidden'>{link.label}</p>
              </div>
            </Link>
          );
        })}
        
      </div>

      <div className='mt-10 px-6'>
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className='flex cursor-pointer gap-4 p-4 opacity-80 hover:opacity-100 hover:scale-110 transition-all'>
              <img
                src='/assets/logout.svg'
                alt='logout'
                width={24}
                height={24}
              />

              <p className='text-light-2 max-lg:hidden'>Cerrar sesión</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSidebar;
