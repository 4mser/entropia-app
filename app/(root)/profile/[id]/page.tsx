import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { profileTabs } from "@/constants";

import ThreadsTab from "@/components/shared/ThreadsTab";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { fetchUser } from "@/lib/actions/user.actions";
import BackButton from "@/components/ui/back-button";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(params.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <section className="pb-1">
      {user.id !== params.id && <BackButton />}
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />

        <Tabs defaultValue='threads' className='w-full px-4'>
          <TabsList className='tab'>
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className='tab'>
                <div className="w-full h-full bg-dark-2/80 transition hover:bg-dark-2/90 rounded-full flex items-center justify-center">
                  <div className="h-8 w-auto p-1.5">
                    <img
                      src={tab.icon}
                      alt={tab.label}
                      className='w-full h-full object-contain opacity-80'
                    />
                  </div>

                  {tab.label === "Posts" && (
                    <p className=' rounded-sm  py-1 !text-subtle-medium text-light-2/80'>
                      {userInfo.threads.length}
                    </p>
                  )}
                  <p className='max-sm:hidden !text-subtle-medium text-light-2/80 ml-1'>{tab.label}</p>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className='w-full text-light-1'
            >
              {/* @ts-ignore */}
              <ThreadsTab
                currentUserId={user.id}
                accountId={userInfo.id}
                accountType='User'
              />
            </TabsContent>
          ))}
        </Tabs>
    </section>
  );
}
export default Page;