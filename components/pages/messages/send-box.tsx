"use client";

import { Loader2, Send } from "lucide-react";
import React, { useState } from "react";

// UI
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// FORM
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
const FormSchema = z.object({
  message: z.string().min(2),
});

// BACKEND
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const SendBox = ({
  senderId,
  chatId,
}: {
  senderId: string;
  chatId: string;
}) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  // FORM
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: "",
    },
  });

  const sendMessage = async ({
    chatId,
    content,
  }: {
    chatId: string;
    content: string;
  }) => {
    const res = await axios.post("/api/message", {
      chatId,
      content,
      senderId,
    });
    setIsLoading(true);
    return res.data.data;
  };

  const sendMessageMutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`chats-messages:${chatId}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`chats`],
      });
      form.reset();
      setIsLoading(false);
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { message } = data;
    setIsLoading(true);
    if (chatId) sendMessageMutation.mutate({ chatId, content: message });
    else {
      setIsLoading(false);
      console.log({ senderId, chatId });
    }
  }

  return (
    <div className="flex items-center justify-center w-full h-16">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full gap-2 px-4 py-2"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    disabled={form.formState.isSubmitting || isLoading}
                    className="w-full h-10"
                    placeholder="Enter message"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={
              form.getValues("message") === "" ||
              form.formState.isSubmitting ||
              isLoading
            }
            className="h-10 p-2 rounded-md aspect-square"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" />
              </>
            ) : (
              <>
                <Send />
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SendBox;
