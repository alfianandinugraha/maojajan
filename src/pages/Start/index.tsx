import React, { ReactElement } from 'react'
import Button from '@/components/form/Button'
import AuthLayout from '@/layout/AuthLayout'
import styled from 'styled-components'
import useHistory from '@/hooks/useHistory'

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

  const toLoginPage = () => history.toLoginPage()
  const toRegisterPage = () => history.toRegisterPage()

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
