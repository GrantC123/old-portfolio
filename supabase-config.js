// Supabase configuration using CDN
// Load Supabase from CDN
const supabaseUrl = 'https://yjizrkagqyzftumbkdym.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqaXpya2FncXl6ZnR1bWJrZHltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MjA0MDksImV4cCI6MjA2OTM5NjQwOX0.BWX7ofphbS47z78OTxe3A0aySfzoAtYkSBExtKEEjgA'

// Wait for Supabase to be loaded from CDN
let supabase;

async function initSupabase() {
  if (window.supabase) {
    // Supabase already loaded
    supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey);
    return supabase;
  }
  
  // Dynamically load Supabase from CDN
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.3/dist/umd/supabase.min.js';
    script.onload = () => {
      supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey);
      resolve(supabase);
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Initialize on first access
async function getSupabase() {
  if (!supabase) {
    await initSupabase();
  }
  return supabase;
}

export { getSupabase as supabase }

// Authentication helper functions
export const auth = {
  // Sign in with email and password
  async signIn(email, password) {
    const client = await getSupabase();
    const { data, error } = await client.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // Sign out
  async signOut() {
    const client = await getSupabase();
    const { error } = await client.auth.signOut()
    return { error }
  },

  // Get current user
  async getCurrentUser() {
    const client = await getSupabase();
    const { data: { user }, error } = await client.auth.getUser()
    return { user, error }
  },

  // Check if user is authenticated
  async isAuthenticated() {
    const { user } = await this.getCurrentUser()
    return !!user
  },

  // Listen for auth changes
  async onAuthStateChange(callback) {
    const client = await getSupabase();
    return client.auth.onAuthStateChange(callback)
  }
} 