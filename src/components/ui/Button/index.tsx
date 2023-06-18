import { ButtonHTMLAttributes, ReactNode } from 'react'

import { FaSpinner } from 'react-icons/fa'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  loading: boolean
}

export function Button({ children, loading, ...rest }: ButtonProps) {
  return (
    <button
      disabled={loading}
      className={
        !loading
          ? 'flex items-center justify-center rounded-md bg-red-dark p-1 font-semibold'
          : 'flex cursor-not-allowed items-center justify-center rounded-md bg-red-dark p-1'
      }
      {...rest}
    >
      {loading ? (
        <FaSpinner className="animate-spin" color="white" size={22} />
      ) : (
        <p>{children}</p>
      )}
    </button>
  )
}

// background: var(--dark-red);
// padding: 0.3rem;
// font-weight: bold;
// color: white;
// border-radius: 0.3rem;
// border: 0;
// width: 100%;
// transition: 1s;
