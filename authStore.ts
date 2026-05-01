/**
 * authStore.ts
 * ─────────────────────────────────────────────────────────────────
 * Supabase authentication helpers.
 * Used by LoginPage (sign in/out) and App.tsx (route guard).
 * ─────────────────────────────────────────────────────────────────
 */

import { supabase } from './supabaseClient';
import type { User, Session } from '@supabase/supabase-js';

// ─── Sign in with email + password ───────────────────────────────
export async function signIn(email: string, password: string): Promise<{
  user: User | null;
  error: string | null;
}> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { user: null, error: error.message };
  return { user: data.user, error: null };
}

// ─── Sign out ─────────────────────────────────────────────────────
export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}

// ─── Get current session (used on app load) ───────────────────────
export async function getSession(): Promise<Session | null> {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

// ─── Get current user ─────────────────────────────────────────────
export async function getCurrentUser(): Promise<User | null> {
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
}

// ─── Listen for auth state changes ────────────────────────────────
export function onAuthChange(callback: (user: User | null) => void) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null);
  });
  return () => subscription.unsubscribe();
}

// ─── Password reset email ─────────────────────────────────────────
export async function sendPasswordReset(email: string): Promise<{
  error: string | null;
}> {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/?reset=true`,
  });
  if (error) return { error: error.message };
  return { error: null };
}

// ─── Add a new staff member (admin only) ─────────────────────────
// Creates the Supabase auth user + inserts into staff table
export async function inviteStaff(email: string, fullName: string, role: string = 'editor'): Promise<{
  error: string | null;
}> {
  // Use Supabase admin invite (requires service role key on backend)
  // For now, staff are added via Supabase dashboard Authentication > Users
  // This function inserts the staff record once the user exists
  const { data: existingUser } = await supabase
    .from('staff')
    .select('id')
    .eq('email', email)
    .single();

  if (existingUser) return { error: 'This email is already registered as staff.' };

  // Look up the user in auth.users via staff table join
  const { error } = await supabase.from('staff').insert({
    email,
    full_name: fullName,
    role,
  });

  if (error) return { error: error.message };
  return { error: null };
}
