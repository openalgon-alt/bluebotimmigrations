import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nhqivqvmnhbkecnmabcl.supabase.co";
const supabaseAnonKey = "sb_publishable_zaFZ8o18qg3C7qnfSfwZ6Q_85lsY2l2";


export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null as any;

