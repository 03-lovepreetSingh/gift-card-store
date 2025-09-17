'use client'

import { createContext, useContext, ReactNode, useState, useEffect } from 'react'

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage or cookies
    const checkAuth = async () => {
      // TODO: Implement actual auth check
      setLoading(false)
    }
    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    // TODO: Implement actual login logic
    setUser({ id: '1', name: 'Test User', email })
  }

  const logout = () => {
    // TODO: Implement actual logout logic
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
