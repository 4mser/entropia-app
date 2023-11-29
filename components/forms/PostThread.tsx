"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";
import { useEffect, useState } from "react";
import Loader from "../ui/loader";

interface Props {
  userId: string;
}

function PostThread({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const { organization } = useOrganization();

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  useEffect(() => {
    // Simulate loading delay (you can replace this with your actual loading logic)
    const loadingTimeout = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(loadingTimeout);
  }, []);

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    setIsSubmitting(true);
    try {
      await createThread({
        text: values.thread,
        author: userId,
        communityId: organization ? organization.id : null,
        path: pathname,
      });

      router.push("/");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded) {
    // Render loader or any loading indicator here
    return (
      <section className="w-full min-h-[70vh] flex items-center justify-center">
        <Loader />
      </section>
    );
  }

  return (
    <Form {...form}>
      <form
        className='mt-5 flex flex-col justify-start gap-5'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='thread'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                Contenido
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Textarea rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='bg-cyan-600 hover:bg-cyan-700' disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader />
            </>
          ) : (
            'Publicar'
          )}
        </Button>
      </form>
    </Form>
  );
}

export default PostThread;
