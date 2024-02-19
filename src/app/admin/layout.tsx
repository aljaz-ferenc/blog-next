'use client'

import AdminPostsList from "@/app/components/AdminPostsList";
import {Button} from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from "react";
import { getPosts } from "../actions";
import { Post } from "@prisma/client";
import AuthContextProvider from "@/context/authContext";
import { PlusSquare } from "lucide-react";
import {useAuth} from '@/context/authContext'


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [posts, setPosts] = useState<Post[]>([])
  const {logout} = useAuth()

  useEffect(() => {
    getPosts()
      .then(posts => setPosts(posts))
  }, [])

  return (
    <div className="place-content-center h-[100vh] grid">
      <Link href='/admin/create-post' className='w-fit'>
        <Button>Create New Post<PlusSquare size={20} style={{marginLeft: '1rem'}}/></Button>
      </Link>
      <div className="border gap-20 p-5 flex justify-center w-[1000px]">
        <AdminPostsList />
        {children}
      </div>
    </div>
  );
}
