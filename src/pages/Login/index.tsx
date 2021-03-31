import React, { ReactElement } from 'react'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'
import { useHistory } from 'react-router-dom'
import AuthLayout, {
  AuthFooterLabel,
  AuthHeading,
  AuthInputGroup,
} from '@/layout/AuthLayout'

export default function index(): ReactElement {
  const history = useHistory()

  const toRegisterPage = () => history.push('/register')
  const toResetPage = () => history.push('/reset')

  return (
    <AuthLayout style={{ paddingBottom: '76px' }}>
      <AuthHeading style={{ marginTop: '148px' }}>Login App</AuthHeading>
      <AuthInputGroup>
        <Input
          icon="/email--gray.svg"
          fullWidth
          placeholder="Email"
          type="email"
        />
        <Input
          icon="/lock--gray.svg"
          fullWidth
          placeholder="Password"
          type="password"
        />
      </AuthInputGroup>
      <AuthFooterLabel
        onClick={toResetPage}
        style={{ color: 'white', textAlign: 'left', cursor: 'pointer' }}
      >
        Lupa Password ?
      </AuthFooterLabel>
      <Button variant="auth" style={{ marginTop: '86px' }}>
        Login
      </Button>
      <AuthFooterLabel>
        <span>Belum punya akun ? </span>
        <b
          onClick={toRegisterPage}
          onKeyDown={toRegisterPage}
          aria-hidden="true"
        >
          Register
        </b>
      </AuthFooterLabel>
    </AuthLayout>
  )
}
