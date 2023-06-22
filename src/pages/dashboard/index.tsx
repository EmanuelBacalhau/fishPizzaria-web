import { useState } from 'react'
import { FiRefreshCcw } from 'react-icons/fi'

import Head from 'next/head'

import { Header } from '@/components/Header'
import { canSSRAuth } from '@/utils/canSSRAuth'
import { api, setupApiClient } from '@/services/api'

interface OrderProps {
  id: string
  name?: string
  table: number
}

interface DashboardProps {
  ordersList: OrderProps[]
}

export default function Dashboard({ ordersList }: DashboardProps) {
  const [orders, setOrders] = useState<OrderProps[]>(ordersList || [])

  async function refreshOrders() {
    const response = await api.get('/orders')
    setOrders(response.data)
  }

  return (
    <>
      <Head>
        <title>FishPizzaria - Dashboard</title>
      </Head>
      <main className="space-y-10">
        <Header />
        <div className="m-auto flex w-[500px] flex-col justify-center space-y-2">
          <div className="mb-2 flex justify-between">
            <h1 className="text-2xl font-bold">Orders list:</h1>
            <button
              onClick={() => refreshOrders()}
              className="duration-500 hover:scale-105"
            >
              <FiRefreshCcw className="text-dark-green" size={24} />
            </button>
          </div>
          {orders.map((order) => {
            return (
              <div key={order.id}>
                <button
                  className={`flex 
                  h-12 w-[100%] 
                  items-center 
                  space-x-3 
                  rounded-md
                  bg-gray-600 
                  duration-1000
                  hover:scale-105`}
                >
                  <div className="h-[100%] w-3 rounded-l-md bg-dark-green"></div>
                  <p>Mesa {order.table}</p>
                </button>
              </div>
            )
          })}
        </div>
      </main>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (context) => {
  const response = await setupApiClient(context).get('/orders')

  return {
    props: {
      ordersList: response.data,
    },
  }
})
