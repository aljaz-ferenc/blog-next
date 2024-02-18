"use client";

import { Post } from "@prisma/client";
import Link from "next/link";
import {useParams, useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/context/authContext";


export default function Posts() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const {slug} = useParams()
  const {posts} = useAuth()

  if (!isLoggedIn) router.replace("/admin-auth");

  return (
    <div className="border flex justify-center align-center">
      <Table className="w-fit">
        <TableHeader>
          <TableRow>
            <TableHead>Posts</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="flex flex-col">
          {posts.map((post) => (
            <TableRow key={post.id}  className={`w-full block ${String(post.slug) === slug && 'bg-accent'}`}>
              <TableCell>
              <Link className="block w-full" href={`/admin/edit/${post.slug}`}>
                {post.title}
              </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
