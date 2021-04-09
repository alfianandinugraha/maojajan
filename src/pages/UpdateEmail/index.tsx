import Button from '@/components/Form/Button'
import Input from '@/components/Form/Input'
import MainLayout, {
  HeadingLayout,
  ProfileButtonGroup,
  ProfileInputGroup,
} from '@/layout/MainLayout'
import { userAtom } from '@/store/userAtom'
import { useAtom } from 'jotai'
import React, { ReactElement, useState } from 'react'
import { User } from 'Types'
import { editUser } from '@/http/user'
import { validateLoginUser } from '@/http/auth'
import usePushAlert from '@/hooks/usePushAlert'
import useTitlePage from '@/hooks/useTitlePage'

export default function index(): ReactElement {
  useTitlePage('Ubah email')
  const [user, setUser] = useAtom(userAtom)
  const { pushDangerAlert, pushSuccessAlert, defaultMessage } = usePushAlert()
  const [newEmail, setNewEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRequestEditEmail, setIsRequestEditEmail] = useState(false)

  const inputNewEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value)
  }

  const inputPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const submitEditEmailHandler = async () => {
    if (!user || isRequestEditEmail) return
    setIsRequestEditEmail(true)

    const newUser: User = {
      ...user,
      email: newEmail,
    }

    try {
      const credential = await validateLoginUser(user.email, password)
      await credential.user?.updateEmail(newEmail)
      await editUser(newUser)
      setUser(newUser)
      setIsRequestEditEmail(false)
      setNewEmail('')
      setPassword('')
      pushSuccessAlert(defaultMessage.SUCCESS_UPDATE_EMAIL)
    } catch (err) {
      pushDangerAlert(defaultMessage.FAILED_UPDATE_EMAIL)
      setIsRequestEditEmail(false)
      console.error(err)
    }
  }

  return (
    <MainLayout>
      <HeadingLayout>Ubah Email</HeadingLayout>
      <ProfileInputGroup style={{ marginBottom: '24px' }}>
        <Input fullWidth icon="email--gray.svg" value={user?.email} readOnly />
      </ProfileInputGroup>
      <p style={{ marginBottom: '16px' }}>Email Baru</p>
      <ProfileInputGroup>
        <Input
          fullWidth
          icon="email--gray.svg"
          placeholder="Email baru"
          value={newEmail}
          onChange={inputNewEmailHandler}
        />
        <Input
          fullWidth
          icon="lock--gray.svg"
          placeholder="Password untuk konfirmasi"
          value={password}
          onChange={inputPasswordHandler}
          type="password"
        />
      </ProfileInputGroup>
      <ProfileButtonGroup>
        <Button
          variant="primary"
          align="center"
          fullWidth
          onClick={submitEditEmailHandler}
          isLoading={isRequestEditEmail}
        >
          Ubah Email
        </Button>
      </ProfileButtonGroup>
    </MainLayout>
  )
}
