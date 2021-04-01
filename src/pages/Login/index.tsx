import React, { ReactElement, useState } from 'react'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'
import useHistory from '@/hooks/useHistory'
import { InputState } from 'Types'
import AuthLayout, {
  AuthFooterLabel,
  AuthHeading,
  AuthInputGroup,
} from '@/layout/AuthLayout'
import initialInputState from '@/initials/initialInputState'
import { isValidEmail } from '@/validation/form'

export default function index(): ReactElement {
  const history = useHistory()

  const toRegisterPage = () => history.toRegisterPage()
  const toResetPage = () => history.toResetPage()

  const [inputEmail, setInputEmail] = useState<InputState<string>>(
    initialInputState
  )
  const [inputPassword, setInputPassword] = useState<InputState<string>>(
    initialInputState
  )

  const inputEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValid = isValidEmail(e.target.value)
    setInputEmail({
      errorMessage: isValid.errorMessage,
      value: e.target.value,
    })
  }

  const inputPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPassword({
      ...inputPassword,
      value: e.target.value,
    })
  }

  const submitHandler = () => {
    const payload = {
      email: inputEmail.value,
      password: inputPassword.value,
    }
    alert(JSON.stringify(payload, null, 2))
  }

  return (
    <AuthLayout style={{ paddingBottom: '76px' }}>
      <AuthHeading style={{ marginTop: '148px' }}>Login App</AuthHeading>
      <AuthInputGroup>
        <Input
          icon="/email--gray.svg"
          fullWidth
          placeholder="Email"
          type="email"
          onChange={inputEmailHandler}
          errorMessage={inputEmail.errorMessage}
        />
        <Input
          icon="/lock--gray.svg"
          fullWidth
          placeholder="Password"
          type="password"
          onChange={inputPasswordHandler}
        />
      </AuthInputGroup>
      <AuthFooterLabel
        onClick={toResetPage}
        style={{ color: 'white', textAlign: 'left', cursor: 'pointer' }}
      >
        Lupa Password ?
      </AuthFooterLabel>
      <Button
        variant="auth"
        style={{ marginTop: '86px' }}
        onClick={submitHandler}
      >
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
