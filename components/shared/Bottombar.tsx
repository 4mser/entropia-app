"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { bottombarLinks } from "@/constants";
import { useAuth } from "@clerk/nextjs";

function Bottombar() {
  const pathname = usePathname();
  const { userId } = useAuth();


  return (
    <section className='bottombar'>
      <div className='bottombar_container'>
        {bottombarLinks.map((link, index) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

            if (link.route === "/profile") link.route = `${link.route}/${userId}`;
            if (link.route === "/map") link.route = `${link.route}/${userId}`;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`bottombar_link w-16 ${isActive ? "opacity-100" : "opacity-70"}`}
            >
              <div className={`h-1  absolute top-0 bg-gradient-to-tr rounded-full from-amber-500 to-amber-800 shadow-custom-2 transition-all duration-300 ease-in-out ${pathname !== link.route ? 'w-0 ' : 'w-full'}`} />
              <img
                src={link.imgURL}
                alt={link.label}
                // width={`${index === 1 ? '25' : '22'}`}
                width={22}
                height={22}
                className='object-contain'
              />

              {/* <p className='text-subtle-medium text-light-1/90 max-sm:hidden'> */}
              <p className='text-[11px] text-light-1/90'>
                {link.label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Bottombar;
