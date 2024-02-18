import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SearchPosts from "../components/SearchPosts";
import { Home } from "lucide-react";

export const metadata: Metadata = {
  title: "WebBlog | Blog Posts",
};

export default function Posts() {
  return (
    <main className="page-container text-xs my-5">
      <Link href="/">
        <Button className="mb-4">Home<Home size={20} className="ml-2"/></Button>
      </Link>
      <SearchPosts/>
    </main>
  );
}

