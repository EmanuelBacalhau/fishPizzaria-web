import Head from 'next/head'

import { Header } from '@/components/Header'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function Category() {
  return (
    <>
      <Head>
        <title>FishPizzaria - Categories</title>
      </Head>
      <main className="space-y-10">
        <Header />
        <div className="m-auto flex max-w-[720px] flex-col items-center justify-center">
          <form className="flex w-[70%] flex-col space-y-2">
            <h1 className="text-3xl font-semibold">New category</h1>
            <Input type="text" placeholder="Type your category name" required />
            <Button bgColor={'bg-dark-green'} type="submit" loading={false}>
              REGISTER
            </Button>
          </form>
        </div>
      </main>
    </>
  )
}
