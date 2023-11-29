'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface ComentarProps {
  id: string; // Tipo explícito para id
}

const Comentar: React.FC<ComentarProps> = ({ id }) => {
  const pathname = usePathname();

  return (
    <Link href={`/thread/${id}`} className={`${pathname !== '/' ? 'hidden' : 'flex items-center gap-1'}`} passHref>
        <img
          src='/assets/reply.svg'
          alt='heart'
          width={24}
          height={24}
          className='cursor-pointer object-contain'
        />
        <p className="text-violet-200/50 text-subtle-medium">Responder</p>
    </Link>
  );
};

export default Comentar;
