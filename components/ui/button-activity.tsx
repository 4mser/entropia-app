'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const ButtonActivity = () => {
    const pathname = usePathname();

    const actividad = {
        imgURL: "/assets/heart.svg",
        imgActive: "/assets/heart-bold.svg",
        route: "/activity",
        label: "Actividad",
      }

  return (
    <Link href={actividad.route} className="h-full opacity-70 hover:opacity-100 mr-2">
        <img src={`${pathname === '/activity' ? '/assets/heart-filled.svg' : '/assets/heart.svg'}`} alt="" className={`h-full object-contain ${pathname === '/activity' && 'scale-125'}`} />
    </Link>
  )
}

export default ButtonActivity