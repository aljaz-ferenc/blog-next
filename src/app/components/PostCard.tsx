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
      <div className="gap-3 shadow-md rounded-lg h-full p-2 lg:p-5 flex flex-col lg:flex-row justify-start items-center  hover:outline-2">
        <Image
          src={`/icons/${post.imageUrl}`}
          height={130}
          width={130}
          alt="icon"
          // className="w-[130px]"
        />
        <div className="text-center lg:text-start">
          <h3 className="text-xl lg:text-xl m-0 mb-2">{post.title}</h3>
          <p className="m-0 text-xs lg:text-sm">{post.description}</p>
        </div>
      </div>
    </Link>
  );
}
