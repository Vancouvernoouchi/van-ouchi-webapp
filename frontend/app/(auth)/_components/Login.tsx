"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { login } from "../login/action";

export default function LoginPage() {
  const loginSchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
  });

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {
    const data = loginForm.getValues();
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    login(formData);
  };

  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...loginForm}>
            <form
              onSubmit={loginForm.handleSubmit(onSubmit)}
              className="space-y-10"
            >
              {/* email */}
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter email..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* password */}
              <FormField
                control={loginForm.control}
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

              <Link href="login">
                If you already have an account, log in here.
              </Link>
              <Button>Login</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
