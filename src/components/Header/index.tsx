import Image from 'next/image'
import Link from 'next/link'

import { FiLogOut } from 'react-icons/fi'

import logoFishPizzaria from '../../../public/logo.svg'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'

export function Header() {
  const { signOut } = useContext(AuthContext)

  return (
    <header className="h-20">
      <div className="m-auto flex items-center justify-between px-10 py-2">
        <Link href={'/dashboard'}>
          <Image src={logoFishPizzaria} alt="Logo FishPizzaria" width={250} />
        </Link>

        <nav className="flex items-center space-x-4">
          <Link className="duration-500 hover:text-gray-400" href={'/category'}>
            Categorias
          </Link>
          <Link className="duration-500 hover:text-gray-400" href={'/product'}>
            Cardapio
          </Link>
          <button onClick={signOut} className="duration-700 hover:scale-110">
            <FiLogOut color="white" size={24} />
          </button>
        </nav>
      </div>
    </header>
  )
}
