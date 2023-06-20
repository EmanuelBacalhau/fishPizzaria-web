import { ChangeEvent, useState } from 'react'
import Head from 'next/head'
import { FiUpload } from 'react-icons/fi'
import { toast } from 'react-toastify'

import Image from 'next/image'

import { Header } from '@/components/Header'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { canSSRAuth } from '@/utils/canSSRAuth'
import { TextArea } from '@/components/ui/TextArea'
import { setupApiClient } from '@/services/api'

interface ProductProps {
  id: string
  name: string
}

interface CategoryListProps {
  categoryList: ProductProps[]
}

export default function Product({ categoryList }: CategoryListProps) {
  const [imageUrl, setImageUrl] = useState<string>()
  const [imageProduct, setImageProduct] = useState<File>()

  const [categories] = useState(categoryList || [])
  const [categorySelected, setCategorySelected] = useState<number>(0)

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
          <form className="flex w-[70%] flex-col space-y-2">
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

            <Input type="text" placeholder="Type product name" required />
            <Input type="text" placeholder="Type product price" required />
            <TextArea placeholder="Type the product description" />
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
  const apiClient = setupApiClient(context)

  const response = await apiClient.get('/category')

  return {
    props: {
      categoryList: response.data,
    },
  }
})
