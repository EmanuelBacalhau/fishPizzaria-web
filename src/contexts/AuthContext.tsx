import { createContext, ReactNode, useEffect, useState } from 'react'

import Router from 'next/router'

import { destroyCookie, parseCookies, setCookie } from 'nookies'

import { api } from '@/services/api'

import { toast } from 'react-toastify'

interface UserProps {
  id: string
  name: string
  email: string
}

interface SignInProps {
  email: string
  password: string
}

interface SignUpProps {
  name: string
  email: string
  password: string
}

interface AuthContextProps {
  user: UserProps
  isAuthenticated: boolean
  signIn: (credentials: SignInProps) => Promise<void>
  signOut: (name?: string) => void
  signUp: (credentials: SignUpProps) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextProps)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>()

  const currentUser = user as UserProps

  const isAuthenticated = !!user

  useEffect(() => {
    const { '@nextAuth_fishPizzaria.token': token } = parseCookies()

    if (token) {
      api
        .get('/me')
        .then((response) => {
          const { id, name, email } = response.data
          setUser({ id, name, email })
        })
        .catch(() => {
          signOut()
        })
    }
  }, [])

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post('/login', { email, password })

      const { id, name, token } = response.data

      setCookie(undefined, process.env.NEXT_PUBLIC_KEY_TOKEN as string, token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      })

      setUser({
        id,
        name,
        email,
      })

      api.defaults.headers.Authorization = `Bearer ${token}`

      toast.success(`Welcome, ${name}!`)

      Router.push('/dashboard')
    } catch (error) {
      toast.error('Email/Password incorrect!')
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      await api.post('/register', { name, email, password })

      toast.success('Registration done successfully!')

      Router.push('/')
    } catch (error) {
      toast.error('This email already exists')
    }
  }

  return (
    <AuthContext.Provider
      value={{ signIn, isAuthenticated, user: currentUser, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function signOut(name?: string) {
  try {
    destroyCookie(undefined, process.env.NEXT_PUBLIC_KEY_TOKEN as string)
    toast.success(`Until next time${name ? `, ${name}!` : '!'}`)
    Router.push('/')
  } catch (error) {
    toast.error('Error exiting')
  }
}
