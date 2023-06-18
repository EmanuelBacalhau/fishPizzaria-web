import { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input({ ...rest }: InputProps) {
  return (
    <input
      className="rounded-md border-0 p-1 text-black outline-none placeholder:text-black/50"
      {...rest}
    />
  )
}
