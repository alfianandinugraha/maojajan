import React, { ReactElement, useState } from 'react'
import Input from '@/components/Form/Input'
import Button from '@/components/Form/Button'
import { InputState } from 'Types'
import AuthLayout, {
  AuthFooterLabel,
  AuthHeading,
  AuthInputGroup,
} from '@/layout/AuthLayout'
import initialInputState from '@/initials/initialInputState'
import useHistoryPusher from '@/hooks/useHistoryPusher'
import { isValidEmail, EMPTY_VALUE_MESSAGE } from '@/validation/form'
import { resetPassword } from '@/http/auth'
import usePushAlert from '@/hooks/usePushAlert'
import useTitlePage from '@/hooks/useTitlePage'

export default function index(): ReactElement {
  useTitlePage('Reset password')
  const history = useHistoryPusher()
  const { pushDangerAlert, pushSuccessAlert, defaultMessage } = usePushAlert()
  const [isRequestSendResetPassword, setIsRequestSendResetPassword] = useState(
    false
  )
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
    if (isRequestSendResetPassword) return
    const email = inputEmail.value
    if (!email) {
      setInputEmail({
        ...inputEmail,
        errorMessage: EMPTY_VALUE_MESSAGE,
      })
      return
    }

    if (!email) return
    setIsRequestSendResetPassword(true)
    resetPassword(email)
      .then(() => {
        pushSuccessAlert(defaultMessage.SUCCESS_SEND_RESET_PASSWORD)
      })
      .catch((err) => {
        pushDangerAlert(defaultMessage.FAILED_SEND_RESET_PASSWORD)
        setInputEmail({
          ...inputEmail,
          value: '',
        })
        console.error(err)
      })
      .finally(() => {
        setIsRequestSendResetPassword(false)
      })
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
        isLoading={isRequestSendResetPassword}
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
