'use client'
import { usePathname } from "next/navigation";
import Link from 'next/link';

const ButtonLandpage = () => {  
const pathname = usePathname();
  return (
    <Link href="https://demoentropia.vercel.app/" target="_blank" className={` ${pathname !== '/' ? 'hidden' : 'group '}`}>
        <div className="w-full xs:mt-[73px] md:mt-0 h-11 flex justify-center items-center text-center bg-gradient-to-tr from-amber-400/80 to-amber-800/80 hover:from-amber-400/100 hover:to-amber-800/100 text-white gap-1">Ver Landpage {'('}En construcción{')'}<span className="group-hover:translate-x-2 transition-transform">{`->`}</span> </div>
    </Link>
  )
}

export default ButtonLandpage