import React from 'react'
import useTitlePage from '@/hooks/useTitlePage'
import styled from 'styled-components'
import { useAtom } from 'jotai'
import { authAtom } from '@/store/authAtom'
import useHistoryPusher from '@/hooks/useHistoryPusher'
import Button from '@/components/Form/Button'

const Wrapper = styled.section`
  background-color: ${(props) => props.theme.color.primary};
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    color: white;
    font-size: 24px;
    font-weight: bold;
  }

  button {
    margin: 0 auto;
    margin-top: 16px;
  }
`

const Logo = styled.img`
  height: 16px;
  top: 28px;
  cursor: pointer;
  position: absolute;
`

const ErrorPage = (): React.ReactElement => {
  useTitlePage('Halaman tidak ditemukan')
  const [isLoggedIn] = useAtom(authAtom)
  const pusher = useHistoryPusher()
  const buttonText = isLoggedIn ? 'Dashboard' : 'Kembali'

  const pushButtonHandler = () => {
    if (isLoggedIn) pusher.toDashboardPage()
    else pusher.toStartPage()
  }

  return (
    <Wrapper>
      <Logo
        src="/MaoJajan-logo--white.svg"
        alt="MaoJajan logo"
        onClick={pushButtonHandler}
      />
      <main>
        <h1>Page not found :(</h1>
        <Button onClick={pushButtonHandler} aria-hidden="true" variant="auth">
          {buttonText}
        </Button>
      </main>
    </Wrapper>
  )
}

export default ErrorPage
