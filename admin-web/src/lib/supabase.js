import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helper functions
export const auth = {
  // Sign in with email and password
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // Get current user
  getCurrentUser: () => {
    return supabase.auth.getUser();
  },

  // Listen to auth changes
  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback);
  }
};

// Storage helper functions
export const storage = {
  // Upload file to templates bucket
  uploadTemplate: async (file, fileName) => {
    const { data, error } = await supabase.storage
      .from('templates')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });
    return { data, error };
  },

  // Get list of templates
  getTemplates: async () => {
    const { data, error } = await supabase.storage
      .from('templates')
      .list('', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' }
      });
    return { data, error };
  },

  // Delete template
  deleteTemplate: async (fileName) => {
    const { data, error } = await supabase.storage
      .from('templates')
      .remove([fileName]);
    return { data, error };
  },

  // Download template
  downloadTemplate: async (fileName) => {
    const { data, error } = await supabase.storage
      .from('templates')
      .download(fileName);
    return { data, error };
  }
};

