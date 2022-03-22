import '../styles/destyle.css'
import '../styles/base.css'
import type { AppProps } from 'next/app'
import Head from "next/head"
import { Layout } from './components/Layout'
import { css } from '@emotion/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout css={layout}>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp

const layout = css`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: bold;
`