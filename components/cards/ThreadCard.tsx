import Link from "next/link";

import { formatDateString } from "@/lib/utils";
import DeleteThread from "../forms/DeleteThread";
import Comentar from "../ui/comentar";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}

function ThreadCard({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
}: Props) {

  return (
    <article
      className={`flex w-full flex-col px-4 py-7   border-b border-white/10 ${
        isComment ? "" : "bg-dark-1 "
      }`}
    >
      <div className='flex items-start justify-between'>
        <div className='flex w-full flex-1 flex-row gap-4'>
          <div className='flex flex-col items-center'>
            <Link href={`/profile/${author.id}`} className='relative h-11 w-11 '>
              <img
                src={author.image}
                alt='user_community_image'
                className='cursor-pointer w-full h-full object-cover rounded-full'
              />
            </Link>

            <div className='thread-card_bar' />
          </div>

          <div className='flex w-full flex-col'>
            <Link href={`/profile/${author.id}`} className='w-fit'>
              <h4 className='cursor-pointer text-base-semibold text-light-1'>
                {author.name}
              </h4>
            </Link>

            <p className='mt-2 text-small-regular text-light-2'>{content}</p>

            <div className={`${isComment && "mb-10"} mt-2 flex flex-col gap-3`}>
              <div className='flex gap-3.5'>
                {/* <img
                  src='/assets/heart-gray.svg'
                  alt='heart'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                /> */}
                <Comentar id={id} />
                {/* <img
                  src='/assets/repost.svg'
                  alt='heart'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                /> */}
                {/* <img
                  src='/assets/share.svg'
                  alt='heart'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                /> */}
              </div>

              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className='mt-1 text-subtle-medium text-gray-1'>
                    {comments.length} comentari{comments.length > 1 ? "os" : "o"}
                  </p>
                </Link>
              )}
              
            </div>
            <p className={`${!community && comments.length === 0 ? 'pt-5 bg-dark-1 text-subtle-medium text-gray-1  -translate-x-14 ' : 'hidden'}`}>
                {formatDateString(createdAt)}
              </p>
          </div>
        </div>

        <DeleteThread
          threadId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        />
      </div>

      {!isComment && comments.length > 0 && (
        <section>
          <div className='ml-1 mt-3 flex items-center gap-2'>
          {comments.slice(0, 2).map((comment, index) => (
            <div className={`${index !== 0 && "-ml-5"} w-6 h-6 flex justify-center items-center   bg-gradient-to-tr from-blue to-green-700 p-px rounded-full object-cover`}>
              <img
              key={index}
              src={comment.author.image}
              alt={`user_${index}`}
              className="bg-dark-1 w-full p-[2px] h-full rounded-full"
            />
            </div>
          ))}

          <Link href={`/thread/${id}`}>
            <p className='mt-1 text-subtle-medium text-gray-1'>
              
              {comments.length} comentari{comments.length > 1 ? "os" : "o"}
            </p>
            <p className='text-subtle-medium text-gray-1'>
            
          </p>

          </Link>
          
        </div>
        <p className={`${!community ? 'mt-5 text-subtle-medium text-gray-1' : 'hidden'}`}>
          {formatDateString(createdAt)}
        </p>
        </section>
      )}

      {!isComment && community && (
        <Link
          href={`/communities/${community.id}`}
          className='mt-5 flex items-center gap-2'
        >
          <p className='text-subtle-medium text-gray-1'>
            {formatDateString(createdAt)}
            {community && ` - ${community.name}`}
          </p>

          <div className="rounded-md w-5 h-5 overflow-hidden">
          <img
            src={community.image}
            alt={community.name}
            className=' w-full h-full   object-cover'
          />
          </div>
        </Link>
      )}
    </article>
  );
}

export default ThreadCard;
