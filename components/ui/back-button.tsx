'use client'
import { useRouter } from "next/navigation"

function BackButton() {

    const router = useRouter()
  return (
    <button onClick={() => router.back()} className="border-b border-white/10 w-full h-fit px-4 py-2 text-white flex items-start ">
       {'<'} Volver
    </button>
  )
}

export default BackButton