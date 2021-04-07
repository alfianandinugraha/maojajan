import React, { ReactElement, useEffect, useState } from 'react'
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
import { isValidPassword, EMPTY_VALUE_MESSAGE } from '@/validation/form'
import { verifyResetCode, confirmResetPassword } from '@/http/Auth'
import usePushAlert from '@/hooks/usePushAlert'
import { useLocation } from 'react-router-dom'

export default function index(): ReactElement {
  const pusher = useHistoryPusher()
  const location = useLocation()
  const { pushDangerAlert, pushSuccessAlert, defaultMessage } = usePushAlert()
  const [isRequestResetPassword, setIsRequestResetPassword] = useState(false)
  const [key, setKey] = useState('')
  const [password, setPassword] = useState<InputState<string>>(
    initialInputState
  )
  const [rePassword, setRePassword] = useState<InputState<string>>(
    initialInputState
  )
  const [isPageLoading, setIsPageLoading] = useState(false)

  const toRegisterPage = () => pusher.toRegisterPage()
  const toLoginPage = () => pusher.toLoginPage()

  const inputPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValid = isValidPassword(e.target.value)

    setRePassword({
      ...rePassword,
      errorMessage:
        rePassword.value !== e.target.value && rePassword.value
          ? 'Password tidak sama'
          : '',
    })

    setPassword({
      errorMessage: isValid.errorMessage,
      value: e.target.value,
    })
  }

  const inputRePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRePassword({
      errorMessage:
        password.value !== e.target.value ? 'Password tidak sama' : '',
      value: e.target.value,
    })
  }

  const submitHandler = () => {
    if (isRequestResetPassword) return
    const requestPassword = password.value
    const requestRePassword = rePassword.value

    if (requestPassword !== requestRePassword) {
      setRePassword({
        ...rePassword,
        errorMessage: 'Password tidak sama',
      })
      return
    }

    if (!requestPassword) {
      setPassword({
        ...password,
        errorMessage: EMPTY_VALUE_MESSAGE,
      })
      return
    }

    if (!requestRePassword) {
      setPassword({
        ...rePassword,
        errorMessage: EMPTY_VALUE_MESSAGE,
      })
      return
    }

    if (
      !requestPassword ||
      !key ||
      password.errorMessage ||
      rePassword.errorMessage
    )
      return
    setIsRequestResetPassword(true)
    confirmResetPassword(key, requestPassword)
      .then(() => {
        pushSuccessAlert(defaultMessage.SUCCESS_RESET_PASSWORD)
        pusher.toLoginPage()
      })
      .catch((err) => {
        pushDangerAlert(defaultMessage.FAILED_RESET_PASSWORD)
        console.error(err)
      })
      .finally(() => {
        setIsRequestResetPassword(false)
      })
  }

  useEffect(() => {
    const keyQuery = new URLSearchParams(location.search).get('oobCode')

    if (!keyQuery) {
      pusher.toStartPage()
      return
    }

    setIsPageLoading(true)
    verifyResetCode(keyQuery)
      .then(() => setKey(keyQuery))
      .catch((err) => {
        pusher.toStartPage()
        console.error(err)
      })
      .finally(() => {
        setIsPageLoading(false)
      })
  }, [])

  if (isPageLoading) return <></>

  return (
    <AuthLayout style={{ paddingBottom: '76px' }}>
      <AuthHeading style={{ marginTop: '198px' }}>Password Baru</AuthHeading>
      <AuthInputGroup>
        <Input
          icon="/lock--gray.svg"
          fullWidth
          placeholder="Password baru"
          type="password"
          value={password.value}
          onChange={inputPasswordHandler}
          errorMessage={password.errorMessage}
        />
        <Input
          icon="/lock--gray.svg"
          fullWidth
          placeholder="Ulangi password baru"
          type="password"
          value={rePassword.value}
          onChange={inputRePasswordHandler}
          errorMessage={rePassword.errorMessage}
        />
      </AuthInputGroup>
      <Button
        variant="auth"
        style={{ marginTop: '102px' }}
        onClick={submitHandler}
        isLoading={isRequestResetPassword}
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
