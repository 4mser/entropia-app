'use client'

function Projects() {

    const projects = [
        {
            name: "Cultibox",
            image: "/images/banner.png"
        },
        {
            name: "Deep Eye",
            image: "/images/img-eye.jpg"
        },
        {
            name: "M.A.P.S",
            image: "/images/OIP.jpeg"
        }
    ]
  return (
        <section className='w-full  px-3 grid grid-cols-3 gap-3'>
            {projects.map((project, index) => (
                <div key={index} className="relative h-16 flex justify-center items-center  overflow-hidden  rounded-xl hover:scale-105 transition-all">
                    <img src={project.image} alt={project.name} className="w-full h-full  object-cover " />
                    <p className="absolute bottom-0 w-full px-2 py-1 bg-gradient-to-t from-dark-1/80 text-subtle-medium to-transparent">{project.name}</p>
                </div>
            ))}
        </section>
  )
}

export default Projects