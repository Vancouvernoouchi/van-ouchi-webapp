import { SUPABASE_JWT_SECRET } from "../env";
import { supabase } from "../lib/supabase";
import { Request, Response } from "express";

export const verifyNotionToken = async (req: Request, res: Response) => {
  try {
    const supabaseSession = await supabase.auth.getSession();
    const session = supabaseSession?.data.session;
    const {
      data: { user },
    } = await supabase.auth.getUser(SUPABASE_JWT_SECRET);

    console.log("⭐️", user);
    res.json("asdf");
  } catch (error) {
    console.error("Invalid Notion Integration Key or other error:", error);
    res.json();
  }
};
