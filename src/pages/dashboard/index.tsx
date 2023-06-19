import { canSSRAuth } from '@/utils/canSSRAuth'
import Head from 'next/head'

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>FishPizzaria - Dashboard</title>
      </Head>
      <main>
        <h1>Bem-vindo ao painel</h1>
      </main>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (context) => {
  return {
    props: {},
  }
})
