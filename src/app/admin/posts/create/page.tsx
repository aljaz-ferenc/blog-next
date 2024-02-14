'use client'

import { useFormState } from "react-dom";
import * as actions from '@/app/actions'
import { formatDate } from "@/utils";

export default function CreatePost() {
  const [formState, action] = useFormState(actions.createPost, { message: "" });

  return (
    <form action={action} className="bg-white text-black flex flex-col gap-3">
      {formState.message}
      <div className="flex flex-col gap-1 ">
        <label htmlFor="title">Title</label>
        <input
          className="border-gray-100"
          id="title"
          name="title"
          type="text"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="description">Description</label>
        <input
          id="description"
          name="description"
          type="text"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="slug">Slug</label>
        <input
          id="slug"
          name="slug"
          type="text"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="author">Author</label>
        <input
          id="author"
          name="author"
          type="text"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="imageUrl">imageUrl</label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="text"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="publishedAt">Published At</label>
        <input
          id="publishedAt"
          name="publishedAt"
          type="date"
          defaultValue={formatDate(new Date())}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="body">Body</label>
        <textarea
          rows={50}
          id="body"
          name="body"
        />
      </div>
      <button>Publish</button>
    </form>
  );
}
