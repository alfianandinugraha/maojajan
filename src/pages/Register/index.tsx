import React, { ReactElement } from 'react'
import AuthLayout, {
  AuthFooterLabel,
  AuthHeading,
  AuthInputGroup,
} from '@/layout/AuthLayout'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'
import { useHistory } from 'react-router-dom'

export default function index(): ReactElement {
  const history = useHistory()

  const toLoginPage = () => history.push('/login')
  return (
    <AuthLayout>
      <AuthHeading style={{ marginTop: '81px' }}>Register App</AuthHeading>
      <AuthInputGroup>
        <Input icon="/user--gray.svg" fullWidth placeholder="Nama Lengkap" />
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
        <Input
          icon="/lock--gray.svg"
          fullWidth
          placeholder="Ulangi Password"
          type="password"
        />
      </AuthInputGroup>
      <Button variant="auth" style={{ marginTop: '86px' }}>
        Register
      </Button>
      <AuthFooterLabel>
        <span>Sudah punya akun ? </span>
        <b onClick={toLoginPage} onKeyDown={toLoginPage} aria-hidden="true">
          Login
        </b>
      </AuthFooterLabel>
    </AuthLayout>
  )
}
