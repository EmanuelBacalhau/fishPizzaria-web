import Router from 'next/router'
import { destroyCookie } from 'nookies'
import { createContext, ReactNode, useState } from 'react'

interface UserProps {
  id: string
  name: string
  email: string
}

interface SignInProps {
  email: string
  password: string
}

interface AuthContextProps {
  user: UserProps
  isAuthenticated: boolean
  signIn: (credentials: SignInProps) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext({} as AuthContextProps)

interface AuthProviderProps {
  children: ReactNode
}

function useUserData() {
  const [user, setUser] = useState<UserProps>()

  const insert = (currentUser: UserProps) => {
    setUser(currentUser)
  }

  return { user, insert }
}

export function AuthContextProvider({ children }: AuthProviderProps) {
  const { user, insert } = useUserData()

  const currentUser = user as UserProps

  const isAuthenticated = !!user

  async function signIn({ email, password }: SignInProps) {
    alert(`Email: ${email} / Password: ${password}`)
  }

  return (
    <AuthContext.Provider
      value={{ signIn, isAuthenticated, user: currentUser, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function signOut() {
  try {
    destroyCookie(undefined, process.env.KEY_TOKEN as string)
    Router.push('/')
  } catch (error) {
    console.log('Error ao deslogar')
  }
}
