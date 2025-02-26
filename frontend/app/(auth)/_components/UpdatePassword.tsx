"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { setErrorMap, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updatePassword } from "@/app/(auth)/_actions/action";
import { AuthForm } from "./common/AuthForm";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const updatePasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const UpdatePassword = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  // ?code= よりセッションIDを取得
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const formMethods = useForm<z.infer<typeof updatePasswordSchema>>({
    mode: "onChange",
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async () => {
    if (!code) {
      setError("Reset code is missing in the URL.");
      return;
    }

    try {
      // 1. Exchange the code for a session
      const { data: sessionData, error: exchangeError } =
        await supabase.auth.exchangeCodeForSession(code);
      if (exchangeError) {
        setError(exchangeError.message);
        return;
      }

      // 2. Now update the password via the server action
      const data = formMethods.getValues();
      const formData = new FormData();
      formData.append("password", data.password);
      await updatePassword(formData);

      setMessage("Password updated successfully.");
      setError(null);
      formMethods.reset();
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setMessage(null);
    }
  };

  return (
    <AuthForm
      title="Reset Password"
      formMethods={formMethods}
      onSubmit={onSubmit}
    >
      {/* Email */}
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
                placeholder="Enter the new password..."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button type="submit">Reset Password</Button>
    </AuthForm>
  );
};

export default UpdatePassword;
