import { Post } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { getPosts } from "../actions";
import Loading from "./loading";
import db from "@/db";
import PostCard from "../components/PostCard";
import type { Metadata } from "next";
import Spacer from "../components/Spacer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "WebBlog | Blog Posts",
};

export default async function Posts() {
  const posts = await db.post.findMany({
    orderBy: {
      publishedAt: "desc",
    },
  });

  return (
    <main className="page-container text-xs my-5">
      <Link className="button-blue" href='/'>Back</Link>
      <Spacer className='mb-10 mt-10 '/>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
