import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user.actions";
import AccountProfile from "@/components/forms/AccountProfile";
import BackButton from "@/components/ui/back-button";

// Copy paste most of the code as it is from the /onboarding

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  return (
    <section className="p-5">
      <div className="flex items-center -translate-x-3">
        <BackButton />
        <h1 className='text-heading3-bold text-white'> Editar perfil</h1>
      </div>

      <section className='mt-5'>
        <AccountProfile user={userData} btnTitle='Continuar' />
      </section>
    </section>
  );
}

export default Page;
