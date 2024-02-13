import { Post } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { getPosts } from "../actions";
import Loading from "./loading";
import db from "@/db";
import PostCard from "../components/PostCard";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'WebBlog | Blog Posts',
}

export default async function Posts() {
  const posts = await db.post.findMany();

  return (
    <main className='page-container'>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </main>
  );
}
