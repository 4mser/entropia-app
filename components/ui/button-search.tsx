'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const ButtonSearch = () => {
    const pathname = usePathname();

    const buscar = {
        imgURL: "/assets/search.svg",
        route: "/search",
        label: "Buscar",
      }

  return (
    <Link href={buscar.route} className="h-full opacity-70 hover:opacity-100">
        <img src={buscar.imgURL} alt="" className={`h-full object-contain `} />
    </Link>
  )
}

export default ButtonSearch