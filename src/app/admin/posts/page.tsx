
import { getPosts } from "@/app/actions";
import { Post } from "@prisma/client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default async function Posts() {

   const posts = await getPosts()

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>){
    const id = e.target.value
    console.log(id)
  }

  return (
    <div className="border-gray-100">
      <div className="flex flex-col gap-3">
      {posts.map(post => (
        <Link key={post.id} href={`/admin/posts/${post.id}`}>{post.title}</Link>
        ))}
        </div>
    </div>
  );
}