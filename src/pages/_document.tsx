import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className={`bg-black font-sans text-white no-underline`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
