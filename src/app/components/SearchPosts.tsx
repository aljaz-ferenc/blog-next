"use client";

import { useEffect, useState } from "react";
import { getPosts, getPostsByQuery } from "../actions";
import { useDebounce } from "@/hooks";
import { Input } from "@/components/ui/input";
import Spacer from "./Spacer";
import PostCard from "./PostCard";
import { motion } from "framer-motion";
import { IPost } from "@/models/Post";

export default function SearchPosts() {
  const [posts, setPosts] = useState([] as IPost[]);

  useEffect(() => {
    getPosts().then((posts) => {
      if (!posts) throw new Error("Could not get posts");
      setPosts(posts);
    });
  }, []);

  const handleChangeDebounced = useDebounce(handleChange, 500);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const query = e.target.value;
    let posts: IPost[] = [];

    if (!query) {
      posts = await getPosts();
    } else {
      posts = await getPostsByQuery(query.toLowerCase());
    }
    setPosts(posts);
  }

  
  return (
    <>
      <div className="relative">
        <Input
          onChange={handleChangeDebounced}
          placeholder="Search..."
          name="search"
        />
      </div>
      <Spacer className="mb-10 mt-10 " />
      {posts.length > 0 && (
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <motion.div layout key={`${post._id}`}>
              <PostCard post={post} />
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
}
