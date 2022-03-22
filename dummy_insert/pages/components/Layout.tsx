import { ReactNode } from 'react'
// import Head from 'next/head'
import { css } from "@emotion/react"
import Header from "./header"
import Footer from "./footer"

type Props = {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {

  return (
    <>
      <Header></Header>
      <div css={homeMount}>
        {children}
      </div>
      <Footer></Footer>
    </>
  )
}

export default Layout

const homeMount = css`
  display: flex;
  flex-direction: column;
  /* min-height: 100vh; */
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: bold;
`
