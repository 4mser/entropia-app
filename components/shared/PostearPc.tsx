'use client'
import CreatePost from './CreatePost'
import { usePathname } from 'next/navigation'

const PostearPc = () => {

    const pathname = usePathname()
  return (
    <section className={`max-md:hidden ${pathname !== '/' && 'hidden'}`}>
        <CreatePost />
    </section>
  )
}

export default PostearPc