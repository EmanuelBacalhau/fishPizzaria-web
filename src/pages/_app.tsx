import type { AppProps } from 'next/app'

import { AuthContextProvider } from '@/contexts/AuthContext'

import './globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}
