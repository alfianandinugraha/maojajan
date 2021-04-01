import React, { ReactElement, useState } from 'react'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'
import { InputState } from 'Types'
import AuthLayout, {
  AuthFooterLabel,
  AuthHeading,
  AuthInputGroup,
} from '@/layout/AuthLayout'
import initialInputState from '@/initials/initialInputState'
import useHistory from '@/hooks/useHistory'

export default function index(): ReactElement {
  const history = useHistory()
  const [inputEmail, setInputEmail] = useState<InputState<string>>(
    initialInputState
  )

  const toRegisterPage = () => history.toRegisterPage()
  const toLoginPage = () => history.toLoginPage()

  const inputEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail({
      ...inputEmail,
      value: e.target.value,
    })
  }

  const submitHandler = () => {
    const payload = {
      email: inputEmail.value,
    }
    alert(JSON.stringify(payload, null, 2))
  }

  return (
    <AuthLayout style={{ paddingBottom: '76px' }}>
      <AuthHeading style={{ marginTop: '198px' }}>Reset Password</AuthHeading>
      <AuthInputGroup>
        <Input
          icon="/email--gray.svg"
          fullWidth
          placeholder="Email"
          type="email"
          onChange={inputEmailHandler}
        />
      </AuthInputGroup>
      <Button
        variant="auth"
        style={{ marginTop: '102px' }}
        onClick={submitHandler}
      >
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
