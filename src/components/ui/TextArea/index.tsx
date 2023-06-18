import { TextareaHTMLAttributes } from 'react'

type InputProps = TextareaHTMLAttributes<HTMLTextAreaElement>

export function TextArea({ ...rest }: InputProps) {
  return (
    <textarea
      className="rounded-md border-0 p-1 text-black outline-none placeholder:text-black/50"
      {...rest}
    />
  )
}
