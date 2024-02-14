// import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import db from "@/db";
import PostCard from "./components/PostCard";
import Spacer from "./components/Spacer";

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
    <main className="page-container">
      <div className="home__image">
        <div className="image__container">
          {/* <img src={bgImg} alt="" /> */}
        </div>
        {/* <h1>React Blog</h1> */}
      </div>
      <div className="w-full h-[400px] overflow-hidden relative">
        <img
          src="/background.png"
          alt="background image"
          className="object-cover absolute w-full h-full top-0 left-0"
        />
      </div>
      <div>
        <p className="text-5xl font-bold">Hey there, welcome! 👋</p>
        <p>
          This blog is all about my journey of learning web development, where I
          share my experiences and insights along the way. I started this blog
          as a way to document my progress, take notes and share my learnings
          with others who are also interested in frontend web development.
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
        <Link
          href="/posts"
          className="button-blue"
        >
          Enter
        </Link>
        <div className="block mt-10">
          <Spacer/>
          <h2>Most Recent posts</h2>
          <div className="flex gap-8">
            {newestPosts.map((post) => (
              <PostCard post={post} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
