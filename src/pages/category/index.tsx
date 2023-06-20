import { FormEvent, useState } from 'react'

import Head from 'next/head'

import { toast } from 'react-toastify'

import { Header } from '@/components/Header'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { api } from '@/services/api'
import { canSSRAuth } from '@/utils/canSSRAuth'

export default function Category() {
  const [name, setName] = useState('')

  async function handleForm(event: FormEvent) {
    event.preventDefault()

    if (name.trim() === '' || name === ' ') {
      toast.error('Enter a valid name')
      return
    }

    try {
      api.post('/category', { name: name.trim() })
      toast.success('Category successfully registered')
      setName('')
    } catch (error) {
      toast.error('Teste ' + error)
    }
  }

  return (
    <>
      <Head>
        <title>FishPizzaria - Category</title>
      </Head>
      <main className="space-y-10">
        <Header />
        <div className="m-auto flex max-w-[720px] flex-col items-center justify-center">
          <form
            onSubmit={handleForm}
            className="flex w-[70%] flex-col space-y-2"
          >
            <h1 className="text-3xl font-semibold">New category</h1>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Type the category name"
              required
            />
            <Button bgColor={'bg-dark-green'} type="submit" loading={false}>
              REGISTER
            </Button>
          </form>
        </div>
      </main>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (context) => {
  return {
    props: {},
  }
})
