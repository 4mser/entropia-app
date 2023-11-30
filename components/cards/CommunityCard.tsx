import Link from "next/link";

import { Button } from "../ui/button";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  members: {
    image: string;
  }[];
}

function CommunityCard({ id, name, username, imgUrl, bio, members }: Props) {
  return (
    <article className='community-card'>
      <div className='flex flex-wrap items-center gap-3'>
        <Link href={`/communities/${id}`} className='relative h-12 w-12'>
          <img
            src={imgUrl}
            alt='community_logo'
            className='rounded-full object-cover'
          />
        </Link>

        <div>
          <Link href={`/communities/${id}`}>
            <h4 className='text-base-semibold text-light-1'>{name}</h4>
          </Link>
          <p className='text-small-medium text-gray-1'>@{username}</p>
        </div>
      </div>

      <p className='mt-4 text-subtle-medium text-gray-1'>{bio}</p>

      <div className='mt-5 flex flex-wrap items-center justify-between gap-3'>
        {/* <Link href={`/communities/${id}`}>
          <Button size='sm' className='community-card_btn'>
            Ver
          </Button>
        </Link> */}

        <Link 
        href={`/communities/${id}`}
        className='rounded-full w-fit h-fit bg-gradient-to-r group from-blue to-green-700 p-px'
        >
        <div className="py-1 px-5 bg-dark-1/80 text-subtle-medium rounded-full text-white/90 transition group-hover:bg-dark-1/90" >
          Ver
        </div>
      </Link>

        {members.length > 0 && (
          <div className='flex items-center'>
            {members.map((member, index) => (
                <div className={`${
                  index !== 0 && "-ml-5 "
                }  w-8 h-8 p-[2px] rounded-full bg-gradient-to-tr from-blue to-green-700 overflow-hidden `}>
                  <img
                  key={index}
                  src={member.image}
                  alt={`user_${index}`}
                  className="object-cover rounded-full p-1 bg-dark-1 w-full h-full"
                />
              </div>
            ))}
            
            {members.length > 3 && (
              <p className='ml-1 text-subtle-medium text-gray-1'>
                {members.length}+ Usuarios
              </p>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default CommunityCard;
