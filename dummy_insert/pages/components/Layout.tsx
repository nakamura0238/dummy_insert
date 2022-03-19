import { ReactNode } from 'react'
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
`
