"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { EyeIcon, EyeOffIcon, Verified } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { UserType } from "@/lib/interfaces/user.interface";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { useState } from "react";
import { updatePassword } from "@/lib/actions/parent.action";
import Parent from "@/lib/models/parent.model";
import { userId } from "@/utils/constants";

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z.string().email(),
  initial_password: z.string().optional(),
  new_password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character.",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one numeric character.",
    })
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm({ userInfo }: { userInfo: UserType | ParentType }) {
  const [showPasswordNew, setShowPasswordNew] = useState<boolean>(false);
  const [showPasswordPrev, setShowPasswordPrev] = useState<boolean>(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: userInfo.name,
      email: userInfo.email,
      initial_password: "",
      new_password: "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: ProfileFormValues) {
    try {
      // Check if the new password is provided without the initial password
      if (data.new_password && !data.initial_password) {
        toast({
          title: "Enter your previous password to change to your new password",
          variant: "destructive",
        });
        return null;
      }
  
      // Retrieve the user's stored password from the database (adjust this part based on your data structure)
      const user = await Parent.findById(userId);
      if (!user) {
        toast({
          title: "User not found",
          variant: "destructive",
        });
        return null;
      }
  
      // Verify the initial password (replace this with your own password verification logic)
      const isInitialPasswordCorrect = user.password === data.initial_password;
      if (!isInitialPasswordCorrect) {
        toast({
          title: "Incorrect initial password",
          variant: "destructive",
        });
        return null;
      }
  
      // Call the function to update the password
      const newPassword = data.new_password || ""; 
      const updatePasswordResponse = await updatePassword(userId, newPassword);
  
      if (updatePasswordResponse.success) {
        toast({
          title: "Password changed successfully!",
          variant: "default",
        });
      } else {
        toast({
          title: "Error changing password",
          description: updatePasswordResponse.message || "An error occurred.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error changing password:", error);
    }
  }
  

  
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <Label className="text-lg">Profile</Label>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input className="max-w-md" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center justify-start gap-2">
                Email <Verified className="w-5 h-5" />
              </FormLabel>
              <FormControl>
                <Input className="max-w-md" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator className="my-4" />
        <Label className="text-lg">Change Password</Label>
        <FormField
          control={form.control}
          name="initial_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Initial Password</FormLabel>
              <FormControl>
                <div className="relative max-w-md">
                  <Input
                    type={showPasswordPrev ? "text" : "password"}
                    className="max-w-md"
                    placeholder="Initial Password"
                    {...field}
                  />
                  {!showPasswordPrev ? (
                    <Button
                      type="button"
                      variant={"ghost"}
                      onClick={() => {
                        setShowPasswordPrev(true);
                      }}
                      className="absolute z-10 w-6 h-6 p-1 -translate-y-1/2 rounded-full right-4 top-1/2"
                    >
                      <EyeOffIcon className="w-full h-full" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant={"ghost"}
                      onClick={() => {
                        setShowPasswordPrev(false);
                      }}
                      className="absolute z-10 w-6 h-6 p-1 -translate-y-1/2 rounded-full right-4 top-1/2"
                    >
                      <EyeIcon className="w-full h-full" />
                    </Button>
                  )}
                </div>
              </FormControl>
              <FormDescription>
                Input your initial/previous password to change your password.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="new_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <div className="relative max-w-md">
                  <Input
                    type={showPasswordNew ? "text" : "password"}
                    className="max-w-md"
                    placeholder="New Password"
                    {...field}
                  />
                  {!showPasswordNew ? (
                    <Button
                      type="button"
                      variant={"ghost"}
                      onClick={() => {
                        setShowPasswordNew(true);
                      }}
                      className="absolute z-10 w-6 h-6 p-1 -translate-y-1/2 rounded-full right-4 top-1/2"
                    >
                      <EyeOffIcon className="w-full h-full" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant={"ghost"}
                      onClick={() => {
                        setShowPasswordNew(false);
                      }}
                      className="absolute z-10 w-6 h-6 p-1 -translate-y-1/2 rounded-full right-4 top-1/2"
                    >
                      <EyeIcon className="w-full h-full" />
                    </Button>
                  )}
                </div>
              </FormControl>
              <FormDescription>
                Minimum length of 8 characters, must contain at least 1 special
                character, 1 uppercase letter and 1 numerical character
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="">
          <Button type="submit" className="">
            Update profile
          </Button>
        </div>
      </form>
    </Form>
  );
}
