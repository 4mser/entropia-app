import { SignOutButton, SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import ProfilePic from "../ui/profile-pic";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: string;
}

function ProfileHeader({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  type,
}: Props) {
  return (
    <div className='flex w-full flex-col justify-start p-5'>
      <div className="absolute top-0 left-0 h-28 overflow-hidden w-full flex justify-center items-center">
            <img src="https://p4.wallpaperbetter.com/wallpaper/385/323/754/space-james-webb-space-telescope-hd-wallpaper-preview.jpg" alt="" className="w-full h-full object-cover" />
          </div>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col items-start gap-3 pt-12 w-full'>
          
          <ProfilePic imgUrl={imgUrl} />

          <div className="flex justify-between  w-full">
            <div className='flex-1'>
              <h2 className='text-body-medium text-light-1'>
                {name}
              </h2>
              
              <p className='text-small-medium text-gray-1'>@{username}</p>
            </div>

            <div className="flex flex-col gap-2 absolute right-5">
              {accountId === authUserId && type !== "Community" && (
                <Link href="/profile/edit" className="text-white text-[12px] bg-dark-4 h-fit  px-4 py-1 rounded-md border border-white/0 hover:border-white/20 transition-all ">Editar perfil</Link>
              )}
              {accountId === authUserId && type !== "Community" && (
                <SignedIn>
                  <SignOutButton>
                    <div className="text-white text-[12px] cursor-pointer bg-dark-1 hover:bg-red-900 h-fit  px-4 py-1 rounded-md border hover:border-white/0 border-white/20 transition-all ">Cerrar sesión</div>
                  </SignOutButton>
                </SignedIn>
                )
              }
            </div>
          </div>
          
        </div>
        
      </div>

      <p className='mt-6 max-w-lg text-[14px] text-light-2'>{bio}</p>

      {/* <div className='mt-10 w-full bg-dark-3' /> */}
    </div>
  );
}

export default ProfileHeader;
