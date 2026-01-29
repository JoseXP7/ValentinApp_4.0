
const supabase = {
  auth: {
    onAuthStateChange: () => {},
    signInWithPassword: async () => ({ data: null, error: null }),
    signOut: async () => ({ error: null }),
    getUser: async () => ({ data: { user: null }, error: null })
  },

  from: () => ({
    select: async () => ({ data: [], error: null }),
    insert: async () => ({ data: null, error: null }),
    update: async () => ({ data: null, error: null }),
    delete: async () => ({ data: null, error: null })
  })
}

export function useSupabase() {
  return { supabase }
}
