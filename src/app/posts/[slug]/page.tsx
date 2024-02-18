import db from "@/db";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import Markdown from "react-markdown";
import { formatDate, parseString } from "@/utils";
import { notFound } from "next/navigation";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { Metadata } from "next";
import Spacer from "@/app/components/Spacer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";

export async function generateMetadata({params}: SinglePostProps): Promise<Metadata> {
  const {slug} = params;

  const post = await db.post.findFirst({
    where: {
      slug,
    },
  });

  return {
    title: `WebBlog | ${post?.title || 'Not Found'}`,
  };
}

interface SinglePostProps {
  params: {
    slug: string;
  };
}
const dateFormatter = Intl.DateTimeFormat("en-GB", { dateStyle: "full" });

export default async function SinglePost({ params }: SinglePostProps) {
  const { slug } = params;

  const post = await db.post.findFirst({
    where: {
      slug,
    },
  });

  if (!post) notFound();

  //configure displayed images from post's body
  const CustomImage = ({ alt, src, title }: any) => {
    return (
      <img src={src} alt={alt} title={title} style={{ margin: "0 auto" }} />
    );
  };

  //configure displayed code blocks from post's body
  const CodeBlock = ({ inline, className, children }: any) => {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        PreTag="div"
        children={String(children).replace(/\n$/, "")}
        language={match[1]}
        style={vscDarkPlus}
      />
    ) : (
      <code className={className}>{children}</code>
    );
  };

  const components = {
    img: CustomImage,
    code: CodeBlock,
  };

  return (
    <div className="page-container md:mt-5">
      {slug && <>
      <h1 className="text-4xl">{post.title}</h1>
      <p className="text-gray-400 italic text-xs md:text-sm">
        Published by {post.author} on {formatDate(post.publishedAt)}
      </p>
      <Spacer />
      <Markdown children={parseString(post.body)} components={components} />
      <Spacer className="my-10" />
      <Link href="/posts">
        <Button><MoveLeft size={20} className={'mr-2'} />Back to Posts</Button>
      </Link>
      </>}
    </div>
  );
}

//cache initial posts during build time
export async function generateStaticParams() {
  const posts = await db.post.findMany();

  return posts.map((post) => {
    return {
      slug: post.slug,
    };
  });
}
