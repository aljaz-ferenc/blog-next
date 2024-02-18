"use server";

import db from "@/db";
import { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getPosts() {
  const posts = await db.post.findMany({
    orderBy: {
      publishedAt: "desc",
    },
  });
  return posts;
}

export async function getPost({ id }: { id: number }) {
  const post = await db.post.findFirst({
    where: {
      id: id,
    },
  });
  return post;
}

type CreatePostFormData = {
  title: string;
  description: string;
  slug: string;
  author: string;
  imageUrl: string;
  publishedAt: Date;
  body: string;
};

export async function createPost(formData: CreatePostFormData) {
  try {
    await db.post.create({
      data: formData,
    });
  } catch (err: any) {
    console.log(err.message);
    return { message: err };
  }
  revalidatePath(`/admin`);
  revalidatePath(`/posts`);
  redirect("/posts");
}

export async function updatePost(
formData: FormData, slugParam: string
) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const slug = formData.get("slug") as string;
  const author = formData.get("author") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const publishedAt = formData.get("publishedAt") as string;
  const body = formData.get("body") as string;

  if (
    !slugParam ||
    !title ||
    !description ||
    !slug ||
    !author ||
    !imageUrl ||
    !publishedAt ||
    !body
  )
  
  try {
    await db.post.update({
      where: { slug },
      data: {
        title,
        description,
        slug,
        author,
        imageUrl,
        publishedAt: new Date(publishedAt),
        body,
      },
    });
  } catch (err: any) {
    console.log(err.message)
  }
  revalidatePath(`/posts/${slug}`);
  revalidatePath(`/admin/edit`);
  revalidatePath(`/posts/${slug}`);
}

export async function deletePost(slug: string) {
  try {
    await db.post.delete({
      where: {
        slug,
      },
    });
  } catch (err: any) {
    console.log(err.message);
  }
  revalidatePath("/posts");
  revalidatePath("/");
  revalidatePath("/admin/create-post");
  // redirect(`/admin/create-post`);
}

export async function getPostBySlug(slug: string): Promise<Post> {
  try {
    const post = await db.post.findFirst({
      where: { slug },
    });
    if (!post) throw new Error("Post not found");

    return post;
  } catch (err: unknown) {
    redirect("/admin/posts");
  }
}

export async function getPostsByQuery(query: string): Promise<Post[] | null> {
  let posts: Post[];

  try {
    posts = await db.post.findMany({
      where: {
        title: { contains: query },
      },
    });
    return posts;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message)
    }
    return null;
  }
}
