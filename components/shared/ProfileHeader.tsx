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
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          
          <ProfilePic imgUrl={imgUrl} />

          <div className='flex-1'>
            <h2 className='text-left text-heading3-bold text-light-1'>
              {name}
            </h2>
            
            <p className='text-base-medium text-gray-1'>@{username}</p>
          </div>
          
        </div>
        {accountId === authUserId && type !== "Community" && (
          <div className="flex flex-col items-center gap-2">
            <Link href='/profile/edit' className="opacity-70 hover:opacity-100">
              <img
                src='/assets/pen.svg'
                alt='logout'
                width={24}
                height={24}
              />
            </Link>

            <div className='block md:hidden'>
              <SignedIn>
                <SignOutButton>
                  <div className='flex cursor-pointer opacity-80 hover:opacity-100'>
                    <img
                      src='/assets/logout.svg'
                      alt='logout'
                      width={24}
                      height={24}
                    />
                  </div>
                </SignOutButton>
              </SignedIn>
            </div> 
          
          </div>
        )}
      </div>

      <p className='mt-6 max-w-lg text-base-regular text-light-2'>{bio}</p>

      <div className='mt-10 w-full bg-dark-3' />
    </div>
  );
}

export default ProfileHeader;
