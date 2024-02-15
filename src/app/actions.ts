"use server";

import db from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getPosts() {
  const posts = await db.post.findMany();
  return posts;
}

export async function getPost({ id }: { id: number }) {
  const post = await db.post.findFirst({
    where: {
      id: +id,
    },
  });
  return post;
}

export async function createPost(
  formState: { message: string },
  formData: FormData
) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const slug = formData.get("slug") as string;
  const author = formData.get("author") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const publishedAt = formData.get("publishedAt") as string;
  const body = formData.get("body") as string;

  if (!title || !description || !slug || !author || !imageUrl || !publishedAt)
    return { message: "Fields missing" };

  try {
    await db.post.create({
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
    return { message: err };
  }
  revalidatePath(`/admin/posts`);
  revalidatePath(`/posts`);
  redirect("/posts");
}

export async function updatePost(
  formState: { message: string },
  formData: FormData
) {
  const id = parseInt(formData.get("id") as string);
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const slug = formData.get("slug") as string;
  const author = formData.get("author") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const publishedAt = formData.get("publishedAt") as string;
  const body = formData.get("body") as string;

  if (
    !title ||
    !id ||
    !description ||
    !slug ||
    !author ||
    !imageUrl ||
    !publishedAt
  )
    return { message: "Fields missing" };

  try {
    await db.post.update({
      where: { id },
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
    console.log(err.message);
  }

  revalidatePath(`/admin/posts/${id}`);
  revalidatePath(`/admin/posts`);
  revalidatePath(`/posts/${id}`);
  redirect("/admin/posts");
}


export async function deletePost(id: number){
  try{
    await db.post.delete({
      where: {
        id
      }
    })
  }catch(err: any){
    console.log(err.message)
  }
  redirect('/admin/posts')
}