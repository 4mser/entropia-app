import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className='flex items-center justify-center flex-col h-[100dvh]'>
        <img 
            src={"https://app-valdi.s3.amazonaws.com/xplorers/isotipo_3+copia.png"}
            width={300}
            height={300}
            alt='logo exporers'
            className='-translate-y-14'
         />
         <p className='-translate-y-16 text-center px-10  text-white text-[12px]'>¡Nos estamos preparando para la gran aventura! <span className='text-amber-400'>X</span>plorers estará aquí pronto, trayendo nuevas formas de ver y vivir el mundo. ¡No te despegues, que la diversión está <span className='text-amber-400'>cerca</span> de comenzar!</p>
    </div>
  )
}

export default page