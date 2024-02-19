"use client";

import * as actions from "@/app/actions";
import { formatDate } from "@/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { Post } from "@prisma/client";
import LoadingButton from "@/app/components/LoadingButton";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { SquarePen, X } from "lucide-react";

interface EditPostFormParams {
  params: {
    slug: string;
  };
}

export default function EditPost({ params }: EditPostFormParams) {
  const [post, setPost] = useState<Post>({} as Post);
  const [publishedAt, setPublishedAt] = useState<Date>();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { slug } = params;
  const { isLoggedIn, updatePosts } = useAuth();
  const router = useRouter();

  useEffect(() => {
    actions.getPostBySlug(slug).then((post) => {
      setPost(post);
    });
    setPublishedAt(post.publishedAt);
  }, []);

  const formSchema = z.object({
    title: z
      .string()
      .min(5, { message: "Title must be at least 5 characters" }),
    description: z
      .string()
      .min(5, { message: "Title must be at least 5 characters" }),
    slug: z.string().min(5, { message: "Title must be at least 5 characters" }),
    author: z.string(),
    imageUrl: z
      .string()
      .min(5, { message: "Title must be at least 5 characters" }),
    publishedAt: z.date(),
    body: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post.title,
      description: post.description,
      slug: post.slug,
      author: post.author,
      imageUrl: post.imageUrl,
      publishedAt: post.publishedAt,
      body: post.body,
    },
  });

  function handleUpdatePost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsUpdating(true);

    const formData = new FormData(e.currentTarget);

    actions
      .updatePost(formData, slug)
      .then(() => updatePosts())
      .finally(() => setIsUpdating(false));
  }

  function handleDeletePost() {
    setIsDeleting(true);
    actions
      .deletePost(slug)
      .then(() => {
        updatePosts();
        router.push("/admin/create-post");
      })
      .catch((err) => console.log(err.message))
      .finally(() => setIsDeleting(false));
  }

  if (!isLoggedIn) router.push("/admin-auth");

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={handleUpdatePost}
          className="flex-1 text-black flex justify-between flex-col gap-3 w-full max-w-[600px] "
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Title"
                    {...field}
                    defaultValue={post?.title}
                  />
                </FormControl>
                <FormDescription>
                  This is the title of your new blog post
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Description"
                    {...field}
                    defaultValue={post?.description}
                  />
                </FormControl>
                <FormDescription>
                  This is the description of your new blog post
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Slug"
                    {...field}
                    defaultValue={post?.slug}
                  />
                </FormControl>
                <FormDescription>
                  This is the slug of your new blog post
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Author"
                    {...field}
                    defaultValue={post?.author}
                  />
                </FormControl>
                <FormDescription>
                  This is the author of your new blog post
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Image URL"
                    {...field}
                    defaultValue={post?.imageUrl}
                  />
                </FormControl>
                <FormDescription>
                  This is the image of your new blog post
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="publishedAt"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Published At</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Body"
                    {...field}
                    defaultValue={post?.body}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isUpdating ? (
            <LoadingButton variant="default" />
          ) : (
            <Button type="submit">
              Update Post
              <SquarePen size={20} style={{ marginLeft: "1rem" }} />
            </Button>
          )}
          <Button
            variant="destructive"
            onClick={() => setIsDialogOpen(true)}
            type="button"
          >
            Delete Post <X size={20} style={{ marginLeft: "1rem" }} />
          </Button>
        </form>
      </Form>
      <Dialog open={isDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>You are about to delete this post!</DialogTitle>
            <DialogDescription>Are you sure?</DialogDescription>
          </DialogHeader>
          {isDeleting ? (
            <LoadingButton variant="destructive" />
          ) : (
            <Button onClick={handleDeletePost} variant="destructive">
              Yes, delete
            </Button>
          )}
          <Button onClick={() => setIsDialogOpen(false)}>No, cancel</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
