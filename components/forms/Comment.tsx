"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { CommentValidation } from "@/lib/validations/thread";
import { addCommentToThread } from "@/lib/actions/thread.actions";
import Loader from "../ui/loader";
import { useState } from "react";

interface Props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

function Comment({ threadId, currentUserImg, currentUserId }: Props) {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const pathname = usePathname();

  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    setIsSubmitting(true)
    try {
      await addCommentToThread(
        threadId,
        values.thread,
        JSON.parse(currentUserId),
        pathname
      );
  
      form.reset();

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form className='comment-form' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='thread'
          render={({ field }) => (
            <FormItem className='flex w-full items-center gap-3'>
              {/* <FormLabel className="w-16">
                <img
                  src={currentUserImg}
                  alt='current_user'
                  className='w-full  h-full rounded-full object-cover'
                />
              </FormLabel> */}
              <FormControl className='border-none bg-transparent'>
                <Input
                  type='text'
                  {...field}
                  placeholder='Comentar...'
                  className='no-focus text-light-1 outline-none'
                />
              </FormControl>
            </FormItem>
          )}
        />

        
        <Button type='submit' className='bg-gradient-to-tr w-40 h-fit p-px from-blue to-green-700 rounded-full overflow-hidden'>
        <div className="rounded-full w-full flex items-center justify-center overflow-hidden bg-dark-1/90 hover:bg-dark-1/20 transition  py-1.5 px-4">
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

export default Comment;
