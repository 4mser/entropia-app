import Maps from "@/components/shared/Maps"
import UserPic from "@/components/shared/userPic"
import { fetchUser } from "@/lib/actions/user.actions";

async function Page({ params }: { params: { id: string } }) {
  const userInfo = await fetchUser(params.id);

  return (
    <section className="w-full h-full overflow-hidden relative">
        <Maps />

        {/* categorias */}
        <div className="fixed md:absolute top-4 right-4 rounded-full flex flex-col p-[2px] justify-center items-center w-12 h-12 overflow-hidden bg-gradient-to-tr from-blue to-green-700  backdrop-blur-sm">
          <div className="rounded-full w-full h-full bg-glassmorphism flex justify-center p-1 items-center">
            <img src="../assets/mushroom.svg" alt="" className="opacity-80 -translate-y-[2px]" />
          </div>
        </div>

        <UserPic 
          imgUrl={userInfo.image}
          name={userInfo.name}
          username={userInfo.username}
        />
      
        {/* pasos */}
        {/* <div className="fixed md:absolute bottom-16 lg:bottom-10 right-4 rounded-full flex flex-col p-2 justify-center items-center w-14 h-14 overflow-hidden bg-black/20 border-2 border-white/70 backdrop-blur-sm shadow-custom shadow-white/10">
          <img src="./assets/walk.svg" alt="" className="translate-x-px opacity-80" />
          <p className="font-medium text-[10px] text-white">0</p>
        </div> */}

    </section>
  )
}

export default Page