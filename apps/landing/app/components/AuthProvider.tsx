'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user] = useState<null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For now, just set loading to false since Firebase setup is complex
    // In a real implementation, you would initialize Firebase here
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);