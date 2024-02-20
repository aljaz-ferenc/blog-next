"use server";

import { connectToDatabase } from "@/database";
import Post, { IPost } from "@/models/Post";
import User from "@/models/User";


export async function getPosts(): Promise<IPost[]> {
  try {
    await connectToDatabase();
    const posts: IPost[] = await Post.find().sort({ publishedAt: -1 });
    if (!posts) throw new Error("Could not get posts");
    return JSON.parse(JSON.stringify(posts));
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw err
    }
  }
  return [];
}


export async function getRecentPosts(): Promise<IPost[]> {
  try {
    await connectToDatabase();
    const posts: IPost[] = await Post.find().sort({ publishedAt: -1 }).limit(2);

    return JSON.parse(JSON.stringify(posts));
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
    throw err;
  }
}


export async function getPostBySlug(slug: string): Promise<IPost> {
  try {
    await connectToDatabase();
    await User.findOne()
    const post = await Post.findOne({ slug }).populate({
      path: "author",
      select: ["firstName", "lastName", "_id"],
    });
    
    if (!post) throw new Error("Post not found");
    return JSON.parse(JSON.stringify(post));
  } catch (err: unknown) {
    throw err;
  }
}

export async function getPostsByQuery(query: string): Promise<IPost[]> {
  try {
    await connectToDatabase();
    const posts = await Post.find({
      title: { $regex: query, $options: "i" },
    });

    return JSON.parse(JSON.stringify(posts));
  } catch (err: unknown) {
    throw err;
  }
}