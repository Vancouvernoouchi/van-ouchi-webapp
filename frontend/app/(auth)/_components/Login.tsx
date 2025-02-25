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
import { login } from "@/app/(auth)/_actions/action";
import { AuthForm } from "@/app/(auth)/_components/common/AuthForm";

const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const formMethods = useForm<LoginFormData>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    login(formData);
  };

  return (
    <AuthForm title="Login" formMethods={formMethods} onSubmit={onSubmit}>
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
        <Link href="/reset-password">Forgot your password? Reset it here.</Link>
        <Button type="submit">Login</Button>
      </div>
    </AuthForm>
  );
}
