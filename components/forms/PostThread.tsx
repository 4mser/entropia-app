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
import { useState } from "react";
import Loader from "../ui/loader";

interface Props {
  userId: string;
}

function PostThread({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { organization } = useOrganization();

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    setIsSubmitting(true)
    try {
      await createThread({
        text: values.thread,
        author: userId,
        communityId: organization ? organization.id : null,
        path: pathname,
      });

      router.push("/");
    } finally {
      setIsSubmitting(false); // Reset isSubmitting to false when the submission is complete
    }
  };

  return (
    <Form {...form}>
      <form
        className='mt-5 flex flex-col justify-start items-end gap-5'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='thread'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              {/* <FormLabel className='text-base-semibold text-light-2 md:hidden'>
                Contenido
              </FormLabel> */}
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Textarea rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='bg-gradient-to-tr w-fit h-fit p-px from-blue to-green-700 rounded-full overflow-hidden'>
        <div className="rounded-full bg-dark-1/90 hover:bg-dark-1/20 transition h-full py-2 px-4">
          {isSubmitting ? (
          <>
            <Loader />
          </>
          ) : ('Publicar')}
        </div>
        </Button>
      </form>
    </Form>
  );
}

export default PostThread;
