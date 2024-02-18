import Link from "next/link";
import type { Metadata } from "next";
import db from "@/db";
import PostCard from "./components/PostCard";
import Spacer from "./components/Spacer";
import {Button} from '@/components/ui/button'
import { LogIn } from "lucide-react";

export const metadata: Metadata = {
  title: "WebBlog | Welcome",
  description: "Welcome Page of WebBlog",
};

export default async function Home() {
  const newestPosts = await db.post.findMany({
    take: 2,
    orderBy: {
      publishedAt: "desc",
    },
  });

  return (
    <main className="page-container bg-background">
      <div className="home__image">
        <div className="image__container">
        </div>
      </div>
      <div className="w-full h-[200px] md:h-[300px] lg:h-[400px] overflow-hidden relative">
        <img
          src="/background.png"
          alt="background image"
          className="object-cover absolute w-full h-full top-0 left-0"
        />
      </div>
      <div className="mb-10">
        <p className="text-2xl text-center my-5 font-bold md:text-4xl">
          Hey there, welcome! 👋
        </p>
        <p>
          You've stumbled across this blog that is all about my journey of
          learning web development, where I share my experiences and insights
          along the way. I started this blog as a way to document my progress,
          take notes and share my learnings with others who are also interested
          in frontend web development.
        </p>
        <p>
          It's about the thrill of discovery, the "AHA!" moments, and the sheer
          joy of creating something from scratch. Together, let's navigate
          through the highs and lows of the learning curve. And hey, your
          insights and experiences are more than welcome – let's learn and grow
          together!
        </p>
      </div>
      <div className="home__popular">
        <Link href="/posts">
          <Button>
          Enter
          <LogIn size={20} className="ml-2" />
          </Button>
        </Link>
        <div className="block mt-10">
          <Spacer />
          <h2 className="mb-5 text-2xl">Most recent posts</h2>
          <div className="flex flex-col gap-8 md:flex-row">
            {newestPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
