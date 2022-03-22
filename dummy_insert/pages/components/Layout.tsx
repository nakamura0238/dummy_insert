import { ReactNode } from 'react'
// import Head from 'next/head'
import { css } from "@emotion/react"


type Props = {
  children: ReactNode;
}


export const Layout = ({ children }: Props) => {

  return (
    <div css={homeMount}>
      {children}
    </div>
  )
}

const homeMount = css`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: bold;
`
