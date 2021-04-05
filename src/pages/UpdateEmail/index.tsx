import Button from '@/components/form/Button'
import Input from '@/components/form/Input'
import MainLayout, {
  HeadingLayout,
  ProfileButtonGroup,
  ProfileInputGroup,
} from '@/layout/MainLayout'
import { userAtom } from '@/store/userAtom'
import { useAtom } from 'jotai'
import React, { ReactElement, useState } from 'react'
import { User } from 'Types'
import { editUser } from '@/http/User'
import { validateLoginUser } from '@/http/Auth'

export default function index(): ReactElement {
  const [user, setUser] = useAtom(userAtom)
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
    } catch (err) {
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
