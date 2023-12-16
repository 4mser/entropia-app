import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";

async function CrearPost() {

  const user = await currentUser();
  if (!user) return null;

  // fetch organization list created by user
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <section className="p-5 w-full h-screen fixed z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-dark-4 rounded-md overflow-hidden border border-white/10">
        <h1 className='text-heading2-semibold text-white'>Crear Post</h1>
        <PostThread userId={userInfo._id} />
      </div>
    </ section>
  );
}

export default CrearPost;
