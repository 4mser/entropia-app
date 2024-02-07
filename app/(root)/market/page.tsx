import React from 'react'

const page = () => {
  return (
    <div className='flex items-center justify-center flex-col h-[100dvh]'>
        <img 
            src={"https://app-valdi.s3.amazonaws.com/xplorers/isotipo_3+copia.png"}
            width={300}
            height={300}
            alt='logo exporers'
            className='-translate-y-14 spin-y'
         />
         {/* <p className='-translate-y-16 text-center px-10  text-white text-[12px] font-bold'>EN <span className='text-[#e6ab45]'>CAMINO</span></p> */}
    </div>
  )
}

export default page