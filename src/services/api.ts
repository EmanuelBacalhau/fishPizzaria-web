import { signOut } from '@/contexts/AuthContext'
import axios, { AxiosError } from 'axios'
import { parseCookies } from 'nookies'

export function setupApiClient(ctx = undefined) {
  const cookies = parseCookies(ctx)

  console.log(process.env.BASE_URL_API)

  console.log(process.env.KEY_TOKEN)

  const api = axios.create({
    baseURL: process.env.BASE_URL_API,
    headers: {
      Authorization: `Bearer ${cookies[process.env.KEY_TOKEN as string]}`,
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

export default setupApiClient
