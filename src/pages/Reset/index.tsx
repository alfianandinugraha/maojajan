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
import useHistoryPusher from '@/hooks/useHistoryPusher'
import { isValidEmail, EMPTY_VALUE_MESSAGE } from '@/validation/form'

export default function index(): ReactElement {
  const history = useHistoryPusher()
  const [inputEmail, setInputEmail] = useState<InputState<string>>(
    initialInputState
  )

  const toRegisterPage = () => history.toRegisterPage()
  const toLoginPage = () => history.toLoginPage()

  const inputEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValid = isValidEmail(e.target.value)
    setInputEmail({
      errorMessage: isValid.errorMessage,
      value: e.target.value,
    })
  }

  const submitHandler = () => {
    const payload = {
      email: inputEmail.value,
    }

    if (!inputEmail.value) {
      setInputEmail({
        ...inputEmail,
        errorMessage: EMPTY_VALUE_MESSAGE,
      })
    }

    if (!inputEmail.value) return
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
          errorMessage={inputEmail.errorMessage}
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
