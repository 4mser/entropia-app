import Maps from "@/components/shared/Maps"

function page() {
  return (
    <section className="w-full h-full overflow-hidden">
        <Maps />

        // pasos
        <div className="fixed bottom-16 right-4 rounded-full flex flex-col p-2 justify-center items-center w-14 h-14 overflow-hidden bg-black/20 border-2 border-white/70 backdrop-blur-sm shadow-custom shadow-white/10">
          <img src="./assets/walk.svg" alt="" className="translate-x-px opacity-80" />
          <p className="font-medium text-[10px] text-white">0</p>
        </div>

        {/* // porcentaje de exploración
        <div className="fixed bottom-16 right-20 rounded-full flex flex-col p-2 justify-center items-center w-14 h-14 overflow-hidden bg-black/20 border-2 border-white/70 backdrop-blur-sm shadow-custom shadow-white/10">
          <p className="font-medium text-[16px] text-white/80">0%</p>
        </div> */}
    </section>
  )
}

export default page