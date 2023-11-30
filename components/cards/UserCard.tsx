"use client";

import { useRouter } from "next/navigation";

import { Button } from "../ui/button";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
}

function UserCard({ id, name, username, imgUrl, personType }: Props) {
  const router = useRouter();

  const isCommunity = personType === "Community";

  return (
    <article className='user-card'>
      <div className='user-card_avatar'>
        <div className='relative h-12 w-12'>
          <img
            src={imgUrl}
            alt='user_logo'
            className='rounded-full object-cover'
          />
        </div>

        <div className='flex-1 text-ellipsis'>
          <h4 className='text-base-semibold text-light-1'>{name}</h4>
          <p className='text-small-medium text-gray-1'>@{username}</p>
        </div>
      </div>

      <Button
        className='rounded-full w-fit h-fit bg-gradient-to-r group from-blue to-green-700 p-px'
        onClick={() => {
          if (isCommunity) {
            router.push(`/communities/${id}`);
          } else {
            router.push(`/profile/${id}`);
          }
        }}
      >
        <div className="py-1 px-5 bg-dark-1/80 text-subtle-medium rounded-full text-white/90 transition group-hover:bg-dark-1/90" >
          Ver
        </div>
      </Button>
    </article>
  );
}

export default UserCard;
