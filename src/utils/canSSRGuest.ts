import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticPropsResult,
} from 'next'

import { parseCookies } from 'nookies'

export function canSSRGuest<Props>(callback: GetServerSideProps<Props>) {
  return async (
    context: GetServerSidePropsContext,
  ): Promise<GetStaticPropsResult<Props>> => {
    const cookies = parseCookies(context)

    const token = cookies[process.env.NEXT_PUBLIC_KEY_TOKEN as string]

    if (token) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      }
    }

    return await callback(context)
  }
}
