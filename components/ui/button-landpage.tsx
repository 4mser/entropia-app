'use client'
import { usePathname } from "next/navigation";
import Link from 'next/link';

const ButtonLandpage = () => {  
const pathname = usePathname();
  return (
    <Link href="https://demoentropia.vercel.app/" target="_blank" className={`${pathname !== '/' ? 'hidden' : 'group'}`}>
        <div className="w-full h-11 flex justify-center items-center text-center bg-gradient-to-tr from-blue/80 to-green-600/80 hover:from-blue/100 hover:to-green-600/100 text-white gap-1">Visita nuestra nueva landpage <span className="group-hover:translate-x-2 transition-transform">{`->`}</span> </div>
    </Link>
  )
}

export default ButtonLandpage