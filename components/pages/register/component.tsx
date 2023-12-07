"use client";
import React, { useEffect, useState } from "react";

// FORM
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

const validation = z.object({
  username: z.string().min(1),
  email: z.string().email().min(1, {
    message: "Invalid Email",
  }),
  password: z.string().min(4),
  child_name: z.string().min(1),
  gradeLevel: z.string().min(1),
});

// UI
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Cat,
  EyeIcon,
  EyeOffIcon,
  User,
  CalendarIcon,
  Loader2,
  Book,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

//ROUTER
import { useRouter } from "next/navigation";
import { createNewParent } from "@/lib/actions/parent.action";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { StudentType } from "@/lib/interfaces/student.interface";
import { calculateAge } from "@/utils/helpers/calculateAge";
import { GRADE_LEVEL, getGradeLevel } from "@/utils/constants/data/gradeLevels";
import { AgeGroupType } from "@/lib/interfaces/class.interface";
import { Toast } from "@/components/ui/toast";
import Image from "next/image";

const RegisterComponent = () => {
  const [isLoading, setisLoading] = useState(false);
  const [child_bday, setchild_bday] = useState<string | undefined>();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<z.infer<typeof validation>>({
    resolver: zodResolver(validation),
  });
  const [gradeOption, setGradeOption] = useState<string[]>([]);

  useEffect(() => {
    if (child_bday) {
      const child_age = calculateAge(new Date(child_bday));
      const temp = getGradeLevel(child_age as number);
      setGradeOption(temp);
    }
  }, [child_bday]);

  async function onSubmit(values: z.infer<typeof validation>) {
    setisLoading(true);
    const { username, email, child_name, password, gradeLevel } = values;
    const child_age = calculateAge(new Date(child_bday || ""));
    const newDataParent: ParentType = {
      name: username,
      email,
      isAccepted: false,
    };
    const newDataStudent: StudentType = {
      name: child_name,
      age: child_age,
      gradeLevel: gradeLevel as AgeGroupType,
      parent: newDataParent,
      status: "Enrolling",
      classSchedule: [],
    };

    const res = await createNewParent({
      newDataParent,
      newDataStudent,
      password,
    });

    if (res.success) {
      toast({
        // variant: "success",
        title: "Successfully Registered! Please login again",
      });
      form.reset();
      router.push("/auth/sign-in");
    } else {
      toast({
        variant: "destructive",
        title: "Email already exists",
      });
      setisLoading(false);
    }
  }

  return (
    <>
      <Toast />
      <section className="flex w-full h-screen">
        <div className="flex flex-col w-full md:w-1/2">
          <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
            <p className="text-3xl text-center">Welcome.</p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col pt-3 md:pt-8"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-col pt-4">
                          <div className="relative flex ">
                            <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-white border-t border-b border-l border-gray-300 shadow-sm ">
                              <User className="w-4 h-4" />
                            </span>
                            <Input
                              className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-none shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-main-600 focus:border-transparent"
                              type="text"
                              {...field}
                              placeholder="Username"
                            />
                          </div>
                        </div>
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
                      <FormControl>
                        <div className="flex flex-col pt-4">
                          <div className="relative flex ">
                            <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-white border-t border-b border-l border-gray-300 shadow-sm ">
                              <svg
                                width="15"
                                height="15"
                                fill="currentColor"
                                viewBox="0 0 1792 1792"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z"></path>
                              </svg>
                            </span>
                            <Input
                              className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-none shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-main-600 focus:border-transparent"
                              type="email"
                              {...field}
                              placeholder="Email"
                            />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-col pt-4">
                          <div className="relative flex ">
                            <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-white border-t border-b border-l border-gray-300 shadow-sm ">
                              <svg
                                width="15"
                                height="15"
                                fill="currentColor"
                                viewBox="0 0 1792 1792"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                              </svg>
                            </span>
                            <div className="relative flex-1 w-full">
                              <Input
                                type={showPassword ? "text" : "password"}
                                {...field}
                                placeholder="Password"
                                className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-none shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-main-600 focus:border-transparent"
                              />
                              {showPassword ? (
                                <Button
                                  type="button"
                                  variant={"ghost"}
                                  onClick={() => setShowPassword(false)}
                                  className="absolute w-6 h-6 p-1 -translate-y-1/2 rounded-full right-4 top-1/2"
                                >
                                  <EyeOffIcon className="w-full h-full" />
                                </Button>
                              ) : (
                                <Button
                                  type="button"
                                  variant={"ghost"}
                                  onClick={() => setShowPassword(true)}
                                  className="absolute w-6 h-6 p-1 -translate-y-1/2 rounded-full right-4 top-1/2"
                                >
                                  <EyeIcon className="w-full h-full" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="w-full mt-8 mb-4 text-sm font-bold text-center">
                  {`Child's information`}
                </div>
                <FormField
                  control={form.control}
                  name="child_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-col">
                          <div className="relative flex ">
                            <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-white border-t border-b border-l border-gray-300 shadow-sm ">
                              <Cat className="w-4 h-4" />
                            </span>
                            <Input
                              className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-none shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-main-600 focus:border-transparent"
                              type="text"
                              {...field}
                              placeholder="Child Name"
                            />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col pt-4">
                  <div className="relative flex ">
                    <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-white border-t border-b border-l border-gray-300 shadow-sm ">
                      <CalendarIcon className="w-4 h-4" />
                    </span>
                    <input
                      className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-none shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-main-600 focus:border-transparent"
                      type="date"
                      value={child_bday}
                      onChange={(e) => setchild_bday(e.target.value)}
                      placeholder="Child Date of Birth"
                    />
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="gradeLevel"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <div className="flex flex-col mt-4">
                            <div className="relative flex ">
                              <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-white border-t border-b border-l border-gray-300 shadow-sm ">
                                <Book className="w-4 h-4" />
                              </span>
                              <SelectTrigger className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-none shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-main-600 focus:border-transparent">
                                <SelectValue placeholder="Select a grade level for your child" />
                              </SelectTrigger>
                            </div>
                          </div>
                        </FormControl>
                        <SelectContent>
                          {gradeOption.length === 0 ? (
                            <div className="w-full text-sm text-center">
                              No Options
                            </div>
                          ) : (
                            <>
                              {gradeOption.map((d) => {
                                const label =
                                  GRADE_LEVEL[d as keyof typeof GRADE_LEVEL];
                                return (
                                  <SelectItem key={d} value={d}>
                                    {label}
                                  </SelectItem>
                                );
                              })}
                            </>
                          )}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={isLoading}
                  type="submit"
                  className="mt-12 text-base font-semibold"
                >
                  Submit
                  {isLoading && (
                    <Loader2 className="w-5 h-6 ml-2 animate-spin" />
                  )}
                </Button>
              </form>
            </Form>
            <div className="pt-12 pb-12 text-center">
              <p>
                Already have an account?
                <Link
                  href="/auth/sign-in"
                  className="ml-2 font-semibold underline"
                >
                  Login here.
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="w-1/2 m-10 shadow-2xl">
          <Image
            className="hidden object-cover w-full h-full md:block"
            src=""
            alt=""
          />
        </div>
      </section>
    </>
  );
};

export default RegisterComponent;
