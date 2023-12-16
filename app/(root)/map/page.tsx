import Maps from "@/components/shared/Maps"

function page() {
  return (
    <section className="w-full h-full overflow-hidden">
        <Maps />
        <div className="fixed bottom-16 right-4 rounded-full flex flex-col p-2 justify-center items-center w-14 h-14 overflow-hidden bg-gradient-to-tr from-blue/50 to-green-500/50 backdrop-blur-sm ">
          <img src="./assets/walk.svg" alt="" className="translate-x-px" />
          <p className="font-medium text-[10px] text-white">0</p>
        </div>
    </section>
  )
}

export default page