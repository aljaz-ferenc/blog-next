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
import { format } from "date-fns"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useState } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "@/context/authContext";

export default function CreatePost() {
  const [date, setDate] = useState<Date>();
  const {isLoggedIn} = useAuth()

  if(!isLoggedIn) return redirect('/admin-auth')

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
  });

  return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((formData) =>{
            if(!date) return
            formData.publishedAt = date
            actions.createPost(formData)
          }
          )}
          className="flex-1 text-black flex justify-between flex-col gap-3 w-full max-w-[600px]"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
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
                  <Input placeholder="Description" {...field} />
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
                  <Input placeholder="Slug" {...field} />
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
                  <Input placeholder="Author" {...field} />
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
                  <Input placeholder="Image URL" {...field} />
                </FormControl>
                <FormDescription>
                  This is the image of your new blog post
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => setDate(date)}
                initialFocus
                
              />
            </PopoverContent>
          </Popover>
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Published At</FormLabel>
                <FormControl>
                  <Textarea placeholder="Body" {...field} />
                </FormControl>
                <FormDescription>
                  This is the time of creation of your new blog post
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Publish</Button>
        </form>
      </Form>
  );
}
