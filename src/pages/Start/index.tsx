import React, { ReactElement } from 'react'
import Button from '@/components/form/Button'
import AuthLayout from '@/layout/AuthLayout'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

const Logo = styled.img`
  padding-top: 276px;
  padding-bottom: 86px;
  margin: 0 auto;
`

const Container = styled(AuthLayout)`
  display: flex;
  flex-direction: column;
`

export default function index(): ReactElement {
  const history = useHistory()

  const toLoginPage = () => history.push('/login')
  const toRegisterPage = () => history.push('/register')

  return (
    <Container>
      <Logo src="/StartPageIcon.svg" alt="MaoJajan logo" />
      <Button
        variant="auth"
        fullWidth
        style={{ marginBottom: '12px' }}
        onClick={toLoginPage}
      >
        Login
      </Button>
      <Button variant="auth" fullWidth onClick={toRegisterPage}>
        Register
      </Button>
    </Container>
  )
}
