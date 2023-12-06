"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "../ui/input";

interface Props {
  routeType: string;
}

function Searchbar({ routeType }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  // query after 0.3s of no input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        router.push(`/${routeType}?q=` + search);
      } else {
        router.push(`/${routeType}`);
      }
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  }, [search, routeType]);

  return (
    <div className='searchbar'>
      <img
        src='/assets/lupa.svg'
        alt='search'
        width={21}
        height={21}
        className='object-contain opacity-60'
      />
      <Input
        id='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`${
          routeType !== "/search" ? "Buscar" : "Buscar"
        }`}
        className='no-focus searchbar_input placeholder-white'
      />
    </div>
  );
}

export default Searchbar;
