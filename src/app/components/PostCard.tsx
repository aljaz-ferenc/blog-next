import { Post } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/posts/${post.id}`}
      className="w-[100%] rounded-lg overflow-hidden bg-white hover:scale-105 hover:shadow-xl  transition"
    >
      <div className="gap-3 shadow-md rounded-lg h-full p-2 md:p-4 lg:p-5 flex flex-col md:flex-row justify-start items-center hover:outline-2">
        <Image
          src={`/icons/${post.imageUrl}`}
          height={80}
          width={80}
          alt="icon"
        />
        <div className="text-center lg:text-start flex flex-col gap-3">
        <h3 className="text-lg lg:text-xl m-0 mb-2 md:text-lg md:text-start">{post.title}</h3>
          <p className="text-center m-0 text-xs lg:text-sm md:text-sm md:text-start">{post.description}</p>
        </div>
      </div>
    </Link>
  );
}
