import { Post } from "@prisma/client";
import Link from "next/link";

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.id}`} className="p-5">
      <div className="border border-gray-500 w-[50%] p-5 rounded-md">
        <h3 className="text-2xl">{post.title}</h3>
        <p className="m-0">{post.description}</p>
      </div>
    </Link>
  );
}
