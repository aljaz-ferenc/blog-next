import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Post } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="w-[100%] rounded-lg overflow-hidden bg-white hover:scale-105 hover:shadow-xl transition"
    >
      <Card className="h-full relative flex px-3 bg-primary-foreground">
          <Image
            src={`/icons/${post.imageUrl}`}
            height={50}
            width={50}
            className="self-center"
            alt="icon"
          />
        <CardHeader>
          <CardTitle className="mt-0 z-10">{post.title}</CardTitle>
          <CardDescription className="z-10">{post.description}</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
        </CardContent>
      </Card>
    </Link>
  );
}
