import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { getPosts } from "../actions";
import SearchPosts from "../components/SearchPosts";

export const metadata: Metadata = {
  title: "WebBlog | Blog Posts",
};

export default async function Posts() {
    const posts = await getPosts()

    return (
    <main className="page-container text-xs my-5">
      <Link href="/">
        <Button className="mb-4">Home<Home size={20} className="ml-2"/></Button>
      </Link>
      <SearchPosts/>
    </main>
  );
}

