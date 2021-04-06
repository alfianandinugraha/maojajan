import React, { ReactElement, useState } from 'react'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'
import useHistoryPusher from '@/hooks/useHistoryPusher'
import { InputState } from 'Types'
import AuthLayout, {
  AuthFooterLabel,
  AuthHeading,
  AuthInputGroup,
} from '@/layout/AuthLayout'
import initialInputState from '@/initials/initialInputState'
import { isValidEmail, EMPTY_VALUE_MESSAGE } from '@/validation/form'
import { loginUser } from '@/http/Auth'
import { useAtom } from 'jotai'
import { authAtom } from '@/store/authAtom'
import usePushAlert from '@/hooks/usePushAlert'

export default function index(): ReactElement {
  const [isRequestLogin, setIsRequestLogin] = useState(false)
  const [, setIsLoggedIn] = useAtom(authAtom)
  const { pushDangerAlert, pushSuccessAlert, defaultMessage } = usePushAlert()
  const history = useHistoryPusher()

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
    if (isRequestLogin) return

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

    if (!inputEmail.value || !inputPassword.value) {
      return
    }

    setIsRequestLogin(true)
    loginUser(inputEmail.value, inputPassword.value)
      .then(() => {
        setIsLoggedIn(true)
        pushSuccessAlert(defaultMessage.SUCCESS_LOGIN)
      })
      .catch((err) => {
        console.error({ err })
        pushDangerAlert(defaultMessage.FAILED_LOGIN)
      })
      .finally(() => {
        setIsRequestLogin(false)
      })
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
          errorMessage={inputPassword.errorMessage}
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
        isLoading={isRequestLogin}
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
