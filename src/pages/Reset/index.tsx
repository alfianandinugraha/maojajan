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
  const toLoginPage = () => history.push('/login')

  return (
    <AuthLayout style={{ paddingBottom: '76px' }}>
      <AuthHeading style={{ marginTop: '198px' }}>Reset Password</AuthHeading>
      <AuthInputGroup>
        <Input
          icon="/email--gray.svg"
          fullWidth
          placeholder="Email"
          type="email"
        />
      </AuthInputGroup>
      <Button variant="auth" style={{ marginTop: '102px' }}>
        Kirim
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
      <AuthFooterLabel>
        <span>Sudah punya akun ? </span>
        <b onClick={toLoginPage} onKeyDown={toLoginPage} aria-hidden="true">
          Login
        </b>
      </AuthFooterLabel>
    </AuthLayout>
  )
}
