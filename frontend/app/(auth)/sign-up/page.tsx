import SignUp from "../_components/SignUp";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  // ユーザーが存在する場合、すでにログインしているのでホームにリダイレクト
  if (!error && data?.user) {
    redirect("/properties");
  }

  return <SignUp />;
}
