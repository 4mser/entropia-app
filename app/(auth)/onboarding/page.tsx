import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user.actions";
import AccountProfile from "@/components/forms/AccountProfile";

async function Page() {
  const user = await currentUser();
  if (!user) return null; // to avoid typescript warnings

  const userInfo = await fetchUser(user.id);
  if (userInfo?.onboarded) redirect("/");

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  return (
    <main className='custom-scrollbar absolute top-0 left-0 bg-dark-1 flex w-full flex-col justify-center px-5 py-7 items-center md:pt-16'>
      <section className="max-w-3xl h-fit">
      <h1 className='head-text'>Completa tu perfil</h1>
      <p className='mt-2 text-base-regular text-light-2 opacity-80'>
        Para una experiencia más personalizada 👽💫
      </p>

      <section className='mt-5 bg-dark-2 p-5 shadow-lg rounded-3xl'>
        <AccountProfile user={userData} btnTitle='Continuar' />
      </section>
      </section>
    </main>
  );
}

export default Page;
