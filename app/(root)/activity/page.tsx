import Image from "next/image";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser, getActivity } from "@/lib/actions/user.actions";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const activity = await getActivity(userInfo._id);

  return (
    <>
      <h1 className='text-heading2-semibold text-light-2 p-5'> Actividad</h1>

      <section className=' flex flex-col'>
        {activity.length > 0 ? (
          <>
            {activity.map((activity) => (
              <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                <article className='flex items-center w-full p-5 border-b  border-white/10 gap-2'>
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-gradient-to-tr from-blue to-green-700 p-px">
                    <img
                      src={activity.author.image}
                      alt='user_logo'
                      className='w-full h-full rounded-full p-px bg-dark-1 object-cover'
                    />
                  </div>
                  <p className='!text-small-regular text-light-1'>
                    <span className='mr-1 text-cyan-500 font-semibold'>
                      {activity.author.name}
                    </span>{" "}
                    respondió a tu post
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className='!text-base-regular text-light-3 px-5'>Sin actividad reciente</p>
        )}
      </section>
    </>
  );
}

export default Page;
