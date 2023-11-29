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
        {bottombarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

            if (link.route === "/profile") link.route = `${link.route}/${userId}`;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`bottombar_link ${isActive && "border-t-2  border-cyan-500"}`}
            >
              <img
                src={link.imgURL}
                alt={link.label}
                width={20}
                height={20}
                className='object-contain'
              />

              <p className='text-subtle-medium text-light-1/90 max-sm:hidden'>
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
