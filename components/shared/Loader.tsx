import React from 'react'

const Loader = () => {
  return (
    <section className='w-full h-[85vh]  flex items-center justify-center'>
            <div className='particle-container'>
            {[...Array(13)].map((_, index) => (
                <div className="particle" key={index}></div>
            ))}
            </div>
        </section>
  )
}

export default Loader