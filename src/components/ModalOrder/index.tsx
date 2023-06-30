import ReactModal, { Styles } from 'react-modal'
import { FiX } from 'react-icons/fi'

import moment from 'moment'

import { api } from '@/services/api'

export interface OrderProps {
  id: string
  name?: string
  table: number
  updatedAt: Date
  ordersItens: [
    {
      id: string
      amount: number
      product: {
        id: string
        name: string
        price: string
        description: string
      }
    },
  ]
}

interface ModalOrderProps {
  isVisible: boolean
  close: () => void
  data: OrderProps
  refreshOrders: () => void
}

export function ModalOrder({
  isVisible,
  close,
  data,
  refreshOrders,
}: ModalOrderProps) {
  const style: Styles = {
    overlay: {
      background: '#000000b7',
    },
    content: {
      top: '50%',
      left: '50%',
      bottom: 'auto',
      right: 'auto',
      transform: 'translate(-50%, -50%)',
      margin: 'auto',
      maxHeight: '500px',
      overflowY: 'auto',
      overflowX: 'hidden',
      backgroundColor: '#000',
      scrollbarColor: '#fff',
    },
  }

  const totalNumber: number = data.ordersItens.reduce((currentValue, order) => {
    const priceNumber = Number(order.product.price)
    const value = currentValue + priceNumber * order.amount
    return value
  }, 0)

  async function finishOrder(orderId: string) {
    await api.patch('/order/finish', null, {
      params: {
        orderId,
      },
    })
    close()
    refreshOrders()
  }

  const total = totalNumber.toFixed(2)

  ReactModal.setAppElement('#__next')
  return (
    <ReactModal isOpen={isVisible} style={style} onRequestClose={close}>
      <div className="flex w-[500px] flex-col space-y-4 text-2xl text-white">
        <div className={'flex justify-between'}>
          <span className="font-bold">Details of order</span>
          <button onClick={close}>
            <FiX color="red" size={24} />
          </button>
        </div>
        <div className="space-y-2 text-base">
          <hr />
          <div className="px-2">
            <div className="flex justify-between">
              <span className="font-bold">Name:</span>
              <span className="text-dark-green">{data.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Table:</span>
              <span className="text-dark-green">{data.table}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Hour:</span>
              <span className="text-dark-green">
                {moment(data.updatedAt).format('HH:mm:ss')}
              </span>
            </div>
          </div>
          <hr />
          <div className="text-center">
            <span className="text-lg font-bold">Products</span>
          </div>
          <hr />
          <div className="grid grid-cols-3 text-center">
            <span>Name</span>
            <span>Amount</span>
            <span>Price</span>
          </div>
          <hr />
          {data.ordersItens.map((order) => {
            return (
              <div
                key={order.product.id}
                className="grid grid-cols-3 space-y-2 text-center text-sm text-dark-green"
              >
                <span>{order.product.name}</span>
                <span>{order.amount}</span>
                <span>{order.product.price}</span>
              </div>
            )
          })}
          <hr />
          <div className="flex justify-between px-2 text-lg">
            <span className="font-bold">Total:</span>
            <span className="text-dark-red">{total}</span>
          </div>
        </div>
        <div className="h-8 rounded-md bg-dark-green text-base">
          <button
            onClick={async () => {
              finishOrder(data.id)
            }}
            className="h-[100%] w-[100%] text-center font-bold"
          >
            Complete order
          </button>
        </div>
      </div>
    </ReactModal>
  )
}
