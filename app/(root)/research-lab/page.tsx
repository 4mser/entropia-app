import Projects from "@/components/forms/Projects"

function page() {
  return (
    <div className="">
        <div className="w-full border-b border-white/10 shadow-custom shadow-slate-800" >
          <img src="/images/1.png" alt="entropia-research-lab" className="  overflow-hidden  py-2 w-72 xl:w-96 " />
        </div>

          <h2 className=" px-3 py-2 text-[14px] border-b border-white/10 text-white font-light ">Ciencia, tecnología e innovación para impulsar un futuro sostenible</h2>
          {/* <p className="p-3 opacity-80  text-[11px]">E.R.LAB abarca campos desde la física, inteligencia artificial y deep learning hasta la automatización, robótica y la preservación de recursos naturales.</p> */}
        {/* <section>
          <h1 className="px-3 pb-2 mt-3 text-white">Proyectos</h1>
          <Projects />
        </section> */}

        


    </div>
  )
}

export default page