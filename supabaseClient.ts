import { localClient } from './localClient';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const hasSupabaseCreds = !!(supabaseUrl && supabaseKey
  && supabaseUrl !== 'undefined'
  && supabaseKey !== 'undefined');

export const supabase = hasSupabaseCreds
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: 'kdci-auth',
      },
    })
  : (localClient as any);
