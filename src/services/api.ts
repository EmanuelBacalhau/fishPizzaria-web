import axios, { AxiosError } from 'axios'

import { signOut } from '@/contexts/AuthContext'

import { parseCookies } from 'nookies'

function setupApiClient(ctx = undefined) {
  const cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
    headers: {
      Authorization: `Bearer ${
        cookies[process.env.NEXT_PUBLIC_KEY_TOKEN as string]
      }`,
    },
  })

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (typeof window !== 'undefined') {
          signOut()
        } else {
          return Promise.reject(new Error('Error with authenticate token'))
        }
      }

      return Promise.reject(error)
    },
  )

  return api
}

export const api = setupApiClient()
