import { ChangeEvent, FormEvent, useState } from 'react'
import Head from 'next/head'
import { FiUpload } from 'react-icons/fi'
import { toast } from 'react-toastify'

import Image from 'next/image'

import { Header } from '@/components/Header'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { canSSRAuth } from '@/utils/canSSRAuth'
import { TextArea } from '@/components/ui/TextArea'
import { api, setupApiClient } from '@/services/api'

interface ProductProps {
  id: string
  name: string
}

interface CategoryListProps {
  categoryList: ProductProps[]
}

export default function Product({ categoryList }: CategoryListProps) {
  const [imageProduct, setImageProduct] = useState<File>()
  const [name, setName] = useState<string>()
  const [price, setPrice] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [categorySelected, setCategorySelected] = useState<number>(0)

  const [loading, setLoading] = useState<boolean>(false)

  const [imageUrl, setImageUrl] = useState<string>()

  const [categories] = useState(categoryList || [])

  async function sendData(event: FormEvent) {
    event.preventDefault()

    setLoading(true)

    if (imageProduct === undefined) {
      toast.error('Picture is required')
      setLoading(false)
      return
    }

    if (name?.trim() === '' || !name) {
      toast.error('Name is required')
      setLoading(false)
      return
    }

    if (!price) {
      toast.error('Price is required')
      setLoading(false)
      return
    }

    if (!description || description.trim() === '') {
      toast.error('Description is required')
      setLoading(false)
      return
    }

    try {
      const data = new FormData()

      const categoryId = categories[categorySelected].id

      data.append('name', name)
      data.append('price', price)
      data.append('description', description)
      data.append('categoryId', categoryId)
      data.append('banner', imageProduct)

      await api.post('/product', data)

      setLoading(false)

      toast.success('Product successfully resgitered!')
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Error when registering!')
        setLoading(false)
      }
    }

    setImageUrl('')
    setName('')
    setPrice('')
    setDescription('')
  }

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return
    }

    const image = event.target.files[0]

    if (!image) {
      return
    }

    if (image.type === 'image/jpeg' || image.type === 'image/png') {
      setImageProduct(image)
      setImageUrl(URL.createObjectURL(image))
      return
    }

    toast.error('Invalid image type')
  }

  function handleChangeCategory(event: ChangeEvent<HTMLSelectElement>) {
    setCategorySelected(Number(event.target.value))
  }

  return (
    <>
      <Head>
        <title>FishPizzaria - Product</title>
      </Head>
      <main className="space-y-10">
        <Header />
        <div className="m-auto flex max-w-[720px] flex-col items-center justify-center">
          <form onSubmit={sendData} className="flex w-[70%] flex-col space-y-2">
            <h1 className="text-3xl font-semibold">New product</h1>

            <label className=" flex h-40 cursor-pointer items-center justify-center rounded-md bg-white">
              <span className="absolute z-50 opacity-80 hover:opacity-100">
                <FiUpload
                  className={
                    imageUrl
                      ? 'text-white/50 duration-700 hover:scale-110 hover:text-white'
                      : 'text-black/80 duration-700 hover:scale-110 hover:text-black'
                  }
                  size={24}
                />
              </span>

              <Input
                className="hidden"
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFile}
              />

              {imageUrl ? (
                <Image
                  className={'h-[100%] w-[100%] rounded-md object-cover'}
                  src={imageUrl}
                  alt="Product picture"
                  width={250}
                  height={250}
                />
              ) : null}
            </label>

            <select
              value={categorySelected}
              className="h-8 rounded-md text-black outline-none"
              onChange={handleChangeCategory}
              placeholder="Select the type of shield"
            >
              {categories.map((item, index) => {
                return (
                  <option key={item.id} value={index}>
                    {item.name}
                  </option>
                )
              })}
            </select>

            <Input
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              placeholder="Type product name"
              required
            />
            <Input
              value={price}
              onChange={(event) => {
                const currentPrice = event.target.value
                setPrice(currentPrice)
              }}
              type="text"
              placeholder="Type product price"
              required
            />
            <TextArea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Type the product description"
            />
            <Button bgColor={'bg-dark-green'} type="submit" loading={loading}>
              REGISTER
            </Button>
          </form>
        </div>
      </main>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (context) => {
  const apiClient = setupApiClient(context)

  const response = await apiClient.get('/category')

  return {
    props: {
      categoryList: response.data,
    },
  }
})
