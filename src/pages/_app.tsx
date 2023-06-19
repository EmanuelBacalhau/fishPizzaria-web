import type { AppProps } from 'next/app'

import { AuthContextProvider } from '@/contexts/AuthContext'
import { ToastContainer } from 'react-toastify'

import './globals.css'
import 'react-toastify/dist/ReactToastify.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} theme="dark" />
    </AuthContextProvider>
  )
}
