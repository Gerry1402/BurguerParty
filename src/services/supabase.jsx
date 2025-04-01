import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://apwvdicuxcbvlhqcjpld.supabase.co';
const supabaseRoleKey = import.meta.env.VITE_ROLE_KEY;



const supabase = createClient(supabaseUrl, supabaseRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

export default supabase;
