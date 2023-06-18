import Image from 'next/image'
import Link from 'next/link'

import logoFishPizzaria from '../../public/logo.svg'

import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>FishPizzaria - Login</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-5 rounded-xl border border-gray-400/80 px-5 py-10">
          <Image src={logoFishPizzaria} alt="Logo FishPizzaria" width={300} />

          <h1 className="text-3xl font-semibold">LOGIN</h1>

          <div className="flex w-[500px] flex-col items-center justify-center space-y-5">
            <form className="flex w-[80%] flex-col space-y-3">
              <Input type="email" placeholder="Email" required />
              <Input type="password" placeholder="Password" required />
              <Button type="submit" loading={false}>
                ACCESS
              </Button>
            </form>

            <Link
              className=" text-gray-400 transition hover:text-white"
              href={'/register'}
            >
              <p>Don´t have an account? Register</p>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
