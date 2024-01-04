"use client";

import React, { useCallback, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

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
import { Button, buttonVariants } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/auth-slice";

const Page = () => {
  const [variant, setVariant] = useState("login");
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant == "login" ? "register" : "login"
    );
  }, []);
  const formObject = z.object({
    name: z
      .string()
      .min(4, { message: "Name must be atleast four characters." }),
    email: z.string().email({ message: "Enter a valid email" }),
    password: z.string(),
  });

  const form = useForm<z.infer<typeof formObject>>({
    resolver: zodResolver(formObject),
    defaultValues: {
      name: "test name",
      email: "test@test.com",
      password: "12345",
    },
  });

  const router = useRouter();
  const dispatch = useDispatch();
  async function handler(values: z.infer<typeof formObject>) {
    const url =
      variant == "login"
        ? "http://localhost:8000/auth/login"
        : "http://localhost:8000/auth/register";
    try {
      const res = await axios.post(url, values);
      const { data } = await res;
      const { loggedUser } = data.data;
      dispatch(
        setUser({
          id: loggedUser._id,
          name: loggedUser.name,
          email: loggedUser.email,
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
        })
      );
      router.push("/");
    } catch (error) {
      console.log("Error in axios", error);
    }
  }
  return (
    <MaxWidthWrapper className="py-10">
      <Form {...form}>
        <form
          className="w-1/2 mx-auto flex flex-col gap-y-7"
          onSubmit={form.handleSubmit(handler)}
        >
          {variant == "register" && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormDescription>Enter your name here!</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormDescription>Enter your email</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} />
                </FormControl>
                <FormDescription>Enter your password here!</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
          <div
            onClick={toggleVariant}
            className={cn(
              buttonVariants({ variant: "link" }),
              "cursor-pointer"
            )}
          >
            {variant == "login"
              ? "Don't have an account? Register"
              : "Already Have an account? Login"}
          </div>
        </form>
      </Form>
    </MaxWidthWrapper>
  );
};

export default Page;
