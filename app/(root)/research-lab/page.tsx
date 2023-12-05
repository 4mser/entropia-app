import Projects from "@/components/forms/Projects"

function page() {
  return (
    <div className=" text-white">
        <img src="/images/1.png" alt="entropia-research-lab" className="  overflow-hidden  py-2 pr-5" />

          <h2 className="p-3 bg-dark-2 text-base-medium border-b border-t border-white/10">Ciencia, tecnología e innovación para impulsar un futuro sostenible</h2>
          <p className="p-3 opacity-80 pt-2 text-custom-body">Este laboratorio representa el núcleo vital de nuestra investigación, desempeñando un papel crucial en disciplinas que abarcan desde física, inteligencia artificial y deep learning hasta automatización, robótica y la preservación de recursos naturales.</p>
        <section>
          <h1 className="p-3 text-white">Proyectos</h1>
          <Projects />
        </section>



    </div>
  )
}

export default page