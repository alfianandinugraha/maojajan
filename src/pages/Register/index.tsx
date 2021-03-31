import React, { ReactElement, useState } from 'react'
import AuthLayout, {
  AuthFooterLabel,
  AuthHeading,
  AuthInputGroup,
} from '@/layout/AuthLayout'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'
import { useHistory } from 'react-router-dom'
import { InputState } from 'Types'
import initialInputState from '@/initials/initialInputState'

export default function index(): ReactElement {
  const history = useHistory()
  const [inputFullName, setInputFullName] = useState<InputState<string>>(
    initialInputState
  )
  const [inputEmail, setInputEmail] = useState<InputState<string>>(
    initialInputState
  )
  const [inputPassword, setInputPassword] = useState<InputState<string>>(
    initialInputState
  )
  const [inputRePassword, setInputRePassword] = useState<InputState<string>>(
    initialInputState
  )

  const toLoginPage = () => history.push('/login')

  const submitHandler = () => {
    const payload = {
      fullName: inputFullName.value,
      email: inputEmail.value,
      password: inputPassword.value,
      rePassword: inputRePassword.value,
    }
    alert(JSON.stringify(payload, null, 2))
  }

  const inputFullNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputFullName({
      ...inputFullName,
      value: e.target.value,
    })
  }

  const inputEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail({
      ...inputEmail,
      value: e.target.value,
    })
  }

  const inputPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPassword({
      ...inputPassword,
      value: e.target.value,
    })
  }

  const inputRePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputRePassword({
      ...inputRePassword,
      value: e.target.value,
    })
  }

  return (
    <AuthLayout>
      <AuthHeading style={{ marginTop: '81px' }}>Register App</AuthHeading>
      <AuthInputGroup>
        <Input
          icon="/user--gray.svg"
          fullWidth
          placeholder="Nama Lengkap"
          onChange={inputFullNameHandler}
        />
        <Input
          icon="/email--gray.svg"
          fullWidth
          placeholder="Email"
          type="email"
          onChange={inputEmailHandler}
        />
        <Input
          icon="/lock--gray.svg"
          fullWidth
          placeholder="Password"
          type="password"
          onChange={inputPasswordHandler}
        />
        <Input
          icon="/lock--gray.svg"
          fullWidth
          placeholder="Ulangi Password"
          type="password"
          onChange={inputRePasswordHandler}
        />
      </AuthInputGroup>
      <Button
        variant="auth"
        style={{ marginTop: '86px' }}
        onClick={submitHandler}
      >
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
