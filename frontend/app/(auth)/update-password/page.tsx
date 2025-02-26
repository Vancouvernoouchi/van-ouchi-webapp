import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import UpdatePassword from "@/app/(auth)/_components/UpdatePassword";

export default async function LoginPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  // ユーザーが存在する場合、すでにログインしているのでホームにリダイレクト
  if (!error && data?.user) {
    redirect("/properties");
  }

  return <UpdatePassword />;
}
