import { createContext, ReactNode, useState } from 'react'

import Router from 'next/router'

import { destroyCookie, setCookie } from 'nookies'

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
  signOut: () => void
  signUp: (credentials: SignUpProps) => Promise<void>
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
    try {
      const response = await api.post('/login', { email, password })

      const { id, name, token } = response.data

      setCookie(undefined, process.env.NEXT_PUBLIC_KEY_TOKEN as string, token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      })

      insert({
        id,
        name,
        email,
      })

      api.defaults.headers.Authorization = `Bearer ${token}`

      toast.success(`Seja bem-vindo, ${name}!`)

      Router.push('/dashboard')
    } catch (error) {
      toast.error('Email/Password incorrect!')
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      await api.post('/register', { name, email, password })

      toast.success('Cadastro realizado com sucesso!')

      Router.push('/')
    } catch (error) {
      toast.error('Erro ao cadastrar!')
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

export function signOut() {
  try {
    destroyCookie(undefined, process.env.KEY_TOKEN as string)
    Router.push('/')
  } catch (error) {
    console.log('Error ao deslogar')
  }
}
