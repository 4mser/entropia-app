import Categorias from "@/components/shared/Categorias";
import Maps from "@/components/shared/Maps"
import UserPic from "@/components/shared/userPic"
import { fetchUser } from "@/lib/actions/user.actions";

async function Page({ params }: { params: { id: string } }) {
  const userInfo = await fetchUser(params.id);

  return (
    <section className="w-full h-full overflow-hidden relative">
        <Maps />

        {/* categorias */}
        {/* <div className="fixed md:absolute top-4 right-4 rounded-full flex flex-col p-[2px] justify-center items-center w-12 h-12 overflow-hidden bg-gradient-to-tr from-blue to-green-700  backdrop-blur-sm">
          <div className="rounded-full w-full h-full bg-glassmorphism flex justify-center p-1 items-center">
            <img src="../assets/categories/todo.svg" alt="" className="opacity-80 w-9" />
          </div>
        </div> */}

        <Categorias 
          imgUrl={'../assets/categories/todo.svg'}
          name={'categorias'}
          username={'categorias'}
        />

        <UserPic 
          imgUrl={userInfo.image}
          name={userInfo.name}
          username={userInfo.username}
        />

    </section>
  )
}

export default Page