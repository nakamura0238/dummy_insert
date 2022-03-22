import Link from "next/link"
import { css } from '@emotion/react'

const Header = () => {
  return(
    <>
      <header css={header}>
        <p>WEBツール</p>
        <div css={navigation}>
          <Link href="/">
            <a css={navItem}>
              ダミーINSERT
            </a>
          </Link>
        </div>
      </header>
      <div css={siteInfo}>ツールは随時追加予定</div>
    </>

  )
}

export default Header

const header = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  padding: 10px 20px;
  border-bottom: 2px solid #cccccc;
  background-color: #ffffff;
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 1.3rem;
  font-weight: bold;
`

const navigation = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const navItem = css`
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
`

const siteInfo = css`
  text-align: center;
  line-height: 2rem;
  background-color: #0099ff;
  color: #ffffff;
`