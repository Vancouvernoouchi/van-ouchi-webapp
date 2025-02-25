"use client";
import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type AuthFormProps<T extends Record<string, any>> = {
  title: string;
  formMethods: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  children: React.ReactNode;
  formClassName?: string;
};

export function AuthForm<T extends Record<string, any>>({
  title,
  formMethods,
  onSubmit,
  children,
  formClassName,
}: AuthFormProps<T>) {
  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...formMethods}>
            <form
              onSubmit={formMethods.handleSubmit(onSubmit)}
              className={cn("space-y-10", formClassName)}
            >
              {children}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
