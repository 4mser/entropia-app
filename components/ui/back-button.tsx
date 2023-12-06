'use client'
import { useRouter } from "next/navigation"

function BackButton() {

    const router = useRouter()
  return (
    <button onClick={() => router.back()} className=" w-fit h-fit flex items-center justify-center p-0">
       <img src="/assets/back.svg" alt="volver" className="w-8 h-8" />
    </button>
  )
}

export default BackButton