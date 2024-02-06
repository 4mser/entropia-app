import BotonesMapa from "@/components/shared/BotonesMapa";
import Categorias from "@/components/shared/Categorias";
import ContadorPasos from "@/components/shared/ContadorPasos";
import Maps from "@/components/shared/Maps"
import MisionesFiltro from "@/components/shared/MisionesFiltro";
import UserPic from "@/components/shared/userPic"
import { fetchUser } from "@/lib/actions/user.actions";

async function Page({ params }: { params: { id: string } }) {
  const userInfo = await fetchUser(params.id);

  return (
    <section className="w-full h-[100dvh] overflow-hidden relative">
        <Maps />
        <ContadorPasos />

        <BotonesMapa />

        <Categorias 
          imgUrl={'../assets/categories/todo.svg'}
        />

        <MisionesFiltro />

        <UserPic 
          imgUrl={userInfo.image}
          name={userInfo.name}
          username={userInfo.username}
        />

        

    </section>
  )
}

export default Page