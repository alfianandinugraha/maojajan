import Button from '@/components/form/Button'
import Input from '@/components/form/Input'
import MainLayout, {
  HeadingLayout,
  ProfileButtonGroup,
  ProfileInputGroup,
} from '@/layout/MainLayout'
import React, { ReactElement, useState } from 'react'
import { validateLoginUser } from '@/http/Auth'
import { userAtom } from '@/store/userAtom'
import { useAtom } from 'jotai'

export default function index(): ReactElement {
  const [user] = useAtom(userAtom)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [reNewPassword, setReNewPassword] = useState('')
  const [isRequestEditPassword, setIsRequestEditPassword] = useState(false)

  const inputOldPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value)
  }

  const inputNewPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value)
  }

  const inputReNewPasswordHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReNewPassword(e.target.value)
  }

  const submitEditPasswordHandler = async () => {
    if (!user) return
    setIsRequestEditPassword(true)

    try {
      const credentials = await validateLoginUser(user.email, oldPassword)
      await credentials.user?.updatePassword(newPassword)
      setIsRequestEditPassword(false)
    } catch (err) {
      setIsRequestEditPassword(false)
      console.error(err)
    }

    setOldPassword('')
    setNewPassword('')
    setReNewPassword('')
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
          value={oldPassword}
          type="password"
        />
      </ProfileInputGroup>
      <p style={{ marginBottom: '16px' }}>Password Baru</p>
      <ProfileInputGroup>
        <Input
          fullWidth
          icon="lock--gray.svg"
          placeholder="Password baru"
          value={newPassword}
          onChange={inputNewPasswordHandler}
          type="password"
        />
        <Input
          fullWidth
          icon="lock--gray.svg"
          placeholder="Ulangi password baru"
          value={reNewPassword}
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
