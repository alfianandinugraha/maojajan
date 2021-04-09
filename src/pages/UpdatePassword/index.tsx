import Button from '@/components/form/Button'
import Input from '@/components/form/Input'
import MainLayout, {
  HeadingLayout,
  ProfileButtonGroup,
  ProfileInputGroup,
} from '@/layout/MainLayout'
import React, { ReactElement, useState } from 'react'
import { validateLoginUser } from '@/http/auth'
import { userAtom } from '@/store/userAtom'
import { useAtom } from 'jotai'
import usePushAlert from '@/hooks/usePushAlert'
import { InputState } from 'Types'
import { isValidPassword } from '@/validation/form'
import initialInputState from '@/initials/initialInputState'

export default function index(): ReactElement {
  const [user] = useAtom(userAtom)
  const { pushDangerAlert, pushSuccessAlert, defaultMessage } = usePushAlert()
  const [oldPassword, setOldPassword] = useState<InputState<string>>(
    initialInputState
  )
  const [newPassword, setNewPassword] = useState<InputState<string>>(
    initialInputState
  )
  const [reNewPassword, setReNewPassword] = useState<InputState<string>>(
    initialInputState
  )
  const [isRequestEditPassword, setIsRequestEditPassword] = useState(false)

  const inputOldPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword({
      value: e.target.value,
      errorMessage: isValidPassword(e.target.value).errorMessage,
    })
  }

  const inputNewPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword({
      value: e.target.value,
      errorMessage: isValidPassword(e.target.value).errorMessage,
    })
  }

  const inputReNewPasswordHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let { errorMessage } = isValidPassword(e.target.value)
    if (e.target.value !== newPassword.value) {
      errorMessage = 'Password tidak sama'
    }
    setReNewPassword({
      value: e.target.value,
      errorMessage,
    })
  }

  const submitEditPasswordHandler = async () => {
    if (
      !user ||
      newPassword.value !== reNewPassword.value ||
      !oldPassword.value ||
      isRequestEditPassword
    )
      return
    setIsRequestEditPassword(true)

    try {
      const credentials = await validateLoginUser(user.email, oldPassword.value)
      await credentials.user?.updatePassword(newPassword.value)
      setIsRequestEditPassword(false)
      pushSuccessAlert(defaultMessage.SUCCESS_UPDATE_PASSWORD)
    } catch (err) {
      pushDangerAlert(defaultMessage.FAILED_UPDATE_PASSWORD)
      setIsRequestEditPassword(false)
      console.error(err)
    }

    setOldPassword(initialInputState)
    setNewPassword(initialInputState)
    setReNewPassword(initialInputState)
  }

  return (
    <MainLayout>
      <HeadingLayout>Ubah Password</HeadingLayout>
      <ProfileInputGroup style={{ marginBottom: '24px' }}>
        <Input
          fullWidth
          icon="lock--gray.svg"
          placeholder="Password Lama"
          onChange={inputOldPasswordHandler}
          value={oldPassword.value}
          errorMessage={oldPassword.errorMessage}
          type="password"
        />
      </ProfileInputGroup>
      <p style={{ marginBottom: '16px' }}>Password Baru</p>
      <ProfileInputGroup>
        <Input
          fullWidth
          icon="lock--gray.svg"
          placeholder="Password baru"
          value={newPassword.value}
          errorMessage={newPassword.errorMessage}
          onChange={inputNewPasswordHandler}
          type="password"
        />
        <Input
          fullWidth
          icon="lock--gray.svg"
          placeholder="Ulangi password baru"
          value={reNewPassword.value}
          errorMessage={reNewPassword.errorMessage}
          onChange={inputReNewPasswordHandler}
          type="password"
        />
      </ProfileInputGroup>
      <ProfileButtonGroup>
        <Button
          variant="primary"
          align="center"
          fullWidth
          onClick={submitEditPasswordHandler}
          isLoading={isRequestEditPassword}
        >
          Ubah Password
        </Button>
      </ProfileButtonGroup>
    </MainLayout>
  )
}
