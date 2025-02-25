"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { signup } from "@/app/(auth)/_actions/action";
import { AuthForm } from "@/app/(auth)/_components/common/AuthForm";

const signUpSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const formMethods = useForm<SignUpFormData>({
    mode: "onChange",
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (data: SignUpFormData) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("name", data.name);
    signup(formData);
  };

  return (
    <AuthForm title="Sign up" formMethods={formMethods} onSubmit={onSubmit}>
      {/* Name Field */}
      <FormField
        control={formMethods.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter name..." />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Email Field */}
      <FormField
        control={formMethods.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input {...field} type="email" placeholder="Enter email..." />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Password Field */}
      <FormField
        control={formMethods.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="password"
                placeholder="Enter password..."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex flex-col gap-4">
        <Link href="/login">If you already have an account, log in here.</Link>
        <Button type="submit">Sign up</Button>
      </div>
    </AuthForm>
  );
}
