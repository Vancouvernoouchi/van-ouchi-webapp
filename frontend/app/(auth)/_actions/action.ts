"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * TODO
 * redirect先のURLを変更する
 */

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
      },
    },
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.log(error);
    redirect("/error");
  }

  revalidatePath("/properties", "layout");
  redirect("/properties");
}

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/properties", "layout");
  redirect("/properties");
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
  };

  const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
    redirectTo: "http://localhost:3000/update-password",
  });

  if (error) {
    redirect("/error");
  }

  revalidatePath("/properties", "layout");
  redirect("/properties");
}

export async function logout(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Sign out error:", error);
    redirect("/error");
  }

  // キャッシュを再検証（必要に応じて対象パスを変更）
  revalidatePath("/");
  redirect("/");
}

export async function updatePassword(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    console.error("Sign out error:", error);
    redirect("/error");
  }

  revalidatePath("/");
  redirect("/");
}
