"use client";

import { Post } from "@prisma/client";
import { useEffect, useState } from "react";
import { getPosts, getPostsByQuery } from "../actions";
import { useDebounce } from "@/hooks";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Spacer from "./Spacer";
import PostCard from "./PostCard";
import {motion} from 'framer-motion'

export default function SearchPosts() {
  const [posts, setPosts] = useState([] as Post[]);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const posts = await getPostsByQuery(e.target.value.toLowerCase());
    if (!posts) return;
    setPosts(posts);
  }

  const handleChangeDebounced = useDebounce(handleChange, 500);

  useEffect(() => {
    getPosts().then((posts) => setPosts(posts));
  }, []);

  return (
    <>
      <div className="relative">
        <Input
          onChange={handleChangeDebounced}
          placeholder="Search..."
        />
      </div>
      <Spacer className="mb-10 mt-10 " />
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <motion.div layout key={post.id} >
          <PostCard post={post} />
          </motion.div>
        ))}
      </div>
    </>
  );
}
