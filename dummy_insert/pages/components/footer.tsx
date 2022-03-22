import Link from "next/link"
import { css } from '@emotion/react'

const Footer = () => {
  return (
    <footer css={footer}>
      <Link href="https://docs.google.com/forms/d/e/1FAIpQLSe-NSLrd6lcqhJoJlup8q888iLFHZg8GWXAa81fFRQpX70NQQ/viewform?usp=sf_link">
        <a>お問い合わせ</a>
      </Link>
      <p>&copy; 2022 nakamura</p>
    </footer>
  )
}
export default Footer

const footer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: auto;
  border-top: 2px solid #cccccc;
  background-color: #ffffff;
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: bold;
  a {
    margin: 10px 0;
    text-decoration: underline;
  }
  p {
    padding: 10px;
  }
`