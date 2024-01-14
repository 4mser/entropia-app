'use client'




function ContadorPasos() {

  return (
      <section className='fixed top-4 left-0 w-full h-fit flex justify-center'>
        <div
        className="flex rounded-3xl  py-2 px-3 justify-between w-auto items-center  gap-3 h-12 bg-black/20 backdrop-blur-sm border border-white/10 text-white/70 text-[14px] "
        >
          <div className='w-full h-full flex items-center gap-2'>
            <img src='../assets/walk.svg' alt="logo" className="w-full h-full object-contain rounded-full shadow-2xl cursor-pointer" />
            <p>240</p>
          </div>

          <div className='w-full h-full flex items-center gap-2'>
            <img src='../assets/cripto.svg' alt="logo" className="w-full h-full object-contain rounded-full shadow-2xl cursor-pointer" />
            <p>12</p>
          </div>
        </div>
      </section>

  );
}

export default ContadorPasos;
