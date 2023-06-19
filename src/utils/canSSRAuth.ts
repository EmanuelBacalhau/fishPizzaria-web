import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'

import { parseCookies, destroyCookie } from 'nookies'

export function canSSRAuth<Props>(callback: GetServerSideProps<Props>) {
  return async (
    context: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<Props> | void> => {
    const cookies = parseCookies(context)

    const token = cookies[process.env.NEXT_PUBLIC_KEY_TOKEN as string]

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }
    try {
      return await callback(context)
    } catch (error) {
      if (error instanceof Error) {
        destroyCookie(context, process.env.NEXT_PUBLIC_KEY_TOKEN as string)

        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        }
      }
    }
  }
}
