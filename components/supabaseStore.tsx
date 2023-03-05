import { atom } from "jotai";
import { createClient } from "@/utils/supabase-browser";

const supabaseStore = atom(() => createClient());

export { supabaseStore };
