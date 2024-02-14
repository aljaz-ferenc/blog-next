"use client";

import * as actions from "@/app/actions";
import { formatDate } from "@/utils";
import { Post } from "@prisma/client";
import { useState } from "react";
import { useFormState } from "react-dom";

interface EditPostFormParams {
  post: Post;
}

export default function EditPostForm({ post }: EditPostFormParams) {
  const [formState, action] = useFormState(actions.updatePost, { message: "" });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <form
        action={action}
        className="page-container bg-white text-black flex flex-col gap-3"
      >
        {formState.message}
        <input
          className="border-gray-100"
          id="id"
          name="id"
          type="text"
          defaultValue={post.id}
          hidden
        />
        <div className="flex flex-col gap-1 ">
          <label htmlFor="title">Title</label>
          <input
            className="border-gray-100"
            id="title"
            name="title"
            type="text"
            defaultValue={post.title}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            type="text"
            defaultValue={post.description}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="slug">Slug</label>
          <input id="slug" name="slug" type="text" defaultValue={post.slug} />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="author">Author</label>
          <input
            id="author"
            name="author"
            type="text"
            defaultValue={post.author}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="imageUrl">imageUrl</label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="text"
            defaultValue={post.imageUrl}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="publishedAt">Published At</label>
          <input
            id="publishedAt"
            name="publishedAt"
            type="date"
            defaultValue={formatDate(post.publishedAt)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="body">Body</label>
          <textarea rows={50} id="body" name="body" defaultValue={post.body} />
        </div>
        <div className="flex justify-evenly">
          <button
            className="bg-blue-500 hover:bg-blue-600 transition py-2 px-4 text-white rounded-[20px]"
            type="submit"
          >
            Update Post
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 transition py-2 px-4 text-white rounded-[20px]"
            onClick={() => setModalIsOpen(true)}
            type="button"
          >
            Delete Post
          </button>
        </div>
      </form>
      {modalIsOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black">
          <div className="fixed top-[50%] left-[50%] translate-x-[-50%] rounded translate-y-[-50%] bg-white p-10">
            <p className="text-lg text-center">
              Are you sure you want to delete this post? There is no going
              back...
            </p>
            <div className="flex justify-evenly mt-8">
              <button
                className="bg-red-500 hover:bg-red-600 transition py-2 px-4 text-white rounded-[20px]"
                onClick={() => actions.deletePost(post.id)}
              >
                Yes, I'm sure!
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 transition py-2 px-4 text-white rounded-[20px]"
                onClick={() => setModalIsOpen(false)}
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
