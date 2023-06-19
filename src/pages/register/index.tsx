import { FormEvent, useContext, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'

import logoFishPizzaria from '../../../public/logo.svg'

import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { AuthContext } from '@/contexts/AuthContext'

import { toast } from 'react-toastify'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  const { signUp } = useContext(AuthContext)

  async function handleForm(event: FormEvent) {
    event.preventDefault()

    if (name.trim() === '') {
      toast.error('Digite um nome válido!')
      return
    }

    if (password.trim() === '') {
      toast.error('Digite uma senha válida!')
      return
    }

    setLoading(true)

    const data = {
      name,
      email,
      password,
    }

    await signUp(data)

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>FishPizzaria - Register</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-5 rounded-xl border border-gray-400/80 px-5 py-10">
          <Image src={logoFishPizzaria} alt="Logo FishPizzaria" width={300} />

          <h1 className="text-3xl font-semibold">REGISTER</h1>

          <div className="flex w-[500px] flex-col items-center justify-center space-y-5">
            <form
              onSubmit={handleForm}
              className="flex w-[80%] flex-col space-y-3"
            >
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Name"
                required
              />
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                required
              />
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                required
              />
              <Button type="submit" loading={loading}>
                REGISTER
              </Button>
            </form>

            <Link
              className=" text-gray-400 transition hover:text-white"
              href={'/'}
            >
              <p>Already have an account? Access</p>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
