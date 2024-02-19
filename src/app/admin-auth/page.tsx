"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import * as actions from "@/app/actions";

interface CheckPassResult {
  isValid: boolean;
  message?: string;
}

const formSchema = z
  .object({
    password: z.string(),
  })
  .superRefine(async ({ password }, ctx) => {
    const passIsValid: CheckPassResult = await actions.checkAdminPass(password);

    if (!passIsValid.isValid) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: passIsValid.message,
        path:['password']
      });
      return false
    }
  });

export default function AdminPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{password:''}
  });

  const { login } = useAuth();
  const router = useRouter();

  function handleSubmit() {
    login();
    router.push("/admin/create-post");
  }

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <Form {...form}>
        <form
          className="max-w-[300px]"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Admin Password</FormLabel>
                <FormDescription>Provide your admin password</FormDescription>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Admin Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-5">
            Log In
          </Button>
        </form>
      </Form>
    </div>
  );
}
