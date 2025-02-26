"use client";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { resetPassword } from "@/app/(auth)/_actions/action";
import { AuthForm } from "./common/AuthForm";

const resetPasswordSchema = z.object({
  email: z.string().email(),
});

const ResetPassword = () => {
  const formMethods = useForm<z.infer<typeof resetPasswordSchema>>({
    mode: "onChange",
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async () => {
    const data = formMethods.getValues();
    const formData = new FormData();
    formData.append("email", data.email);
    resetPassword(formData);
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
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input {...field} type="email" placeholder="Enter email..." />
            </FormControl>
            <FormMessage />
            <FormDescription>
              Enter your email address to receive a password reset link.
            </FormDescription>
          </FormItem>
        )}
      />

      <Button type="submit">Reset Password</Button>
    </AuthForm>
  );
};

export default ResetPassword;
