import React, { ReactElement, useState } from 'react'
import AuthLayout, {
  AuthFooterLabel,
  AuthHeading,
  AuthInputGroup,
} from '@/layout/AuthLayout'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'
import useHistory from '@/hooks/useHistory'
import { InputState } from 'Types'
import initialInputState from '@/initials/initialInputState'
import {
  isValidEmail,
  isValidFullName,
  isValidPassword,
  EMPTY_VALUE_MESSAGE,
} from '@/validation/form'

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

  const toLoginPage = () => history.toLoginPage()

  const submitHandler = () => {
    const payload = {
      fullName: inputFullName.value,
      email: inputEmail.value,
      password: inputPassword.value,
      rePassword: inputRePassword.value,
    }

    if (!inputFullName.value) {
      setInputFullName({
        ...inputFullName,
        errorMessage: EMPTY_VALUE_MESSAGE,
      })
    }

    if (!inputEmail.value) {
      setInputEmail({
        ...inputEmail,
        errorMessage: EMPTY_VALUE_MESSAGE,
      })
    }

    if (!inputPassword.value) {
      setInputPassword({
        ...inputPassword,
        errorMessage: EMPTY_VALUE_MESSAGE,
      })
    }

    if (!inputRePassword.value) {
      setInputRePassword({
        ...inputRePassword,
        errorMessage: EMPTY_VALUE_MESSAGE,
      })
    }

    if (
      !inputFullName.value ||
      !inputEmail.value ||
      !inputPassword.value ||
      !inputRePassword.value
    ) {
      return
    }
    alert(JSON.stringify(payload, null, 2))
    history.push('/dashboard')
  }

  const inputFullNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValid = isValidFullName(e.target.value)
    setInputFullName({
      errorMessage: isValid.errorMessage,
      value: e.target.value,
    })
  }

  const inputEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValid = isValidEmail(e.target.value)
    setInputEmail({
      errorMessage: isValid.errorMessage,
      value: e.target.value,
    })
  }

  const inputPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValid = isValidPassword(e.target.value)
    setInputPassword({
      errorMessage: isValid.errorMessage,
      value: e.target.value,
    })
  }

  const inputRePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputPassword.value !== e.target.value) {
      setInputRePassword({
        value: e.target.value,
        errorMessage: 'Password tidak sama',
      })
      return
    }

    setInputRePassword({
      errorMessage: '',
      value: e.target.value,
    })
  }

  return (
    <AuthLayout style={{ paddingBottom: '42px' }}>
      <AuthHeading style={{ marginTop: '81px' }}>Register App</AuthHeading>
      <AuthInputGroup>
        <Input
          icon="/user--gray.svg"
          fullWidth
          placeholder="Nama Lengkap"
          onChange={inputFullNameHandler}
          errorMessage={inputFullName.errorMessage}
        />
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
          errorMessage={inputPassword.errorMessage}
        />
        <Input
          icon="/lock--gray.svg"
          fullWidth
          placeholder="Ulangi Password"
          type="password"
          onChange={inputRePasswordHandler}
          errorMessage={inputRePassword.errorMessage}
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
