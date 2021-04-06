import MainLayout, {
  HeadingLayout,
  ProfileInputGroup,
  ProfileButtonGroup,
} from '@/layout/MainLayout'
import React, { ReactElement, useState } from 'react'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'
import styled from 'styled-components'
import useHistoryPusher from '@/hooks/useHistoryPusher'
import { logoutUser } from '@/http/Auth'
import { editUser } from '@/http/User'
import { useAtom } from 'jotai'
import { userAtom } from '@/store/userAtom'
import { authAtom } from '@/store/authAtom'
import usePushAlert from '@/hooks/usePushAlert'

const LinkGroup = styled.section`
  display: flex;
  flex-direction: column;

  & > *:not(:last-child) {
    margin-bottom: 16px;
  }
`

export default function index(): ReactElement {
  const [user, setUser] = useAtom(userAtom)
  const { pushDangerAlert, pushSuccessAlert, defaultMessage } = usePushAlert()
  const [fullName, setFullName] = useState(user ? user.fullName : '')
  const [isRequestFullName, setIsRequestFullName] = useState(false)
  const [, setIsLoggedIn] = useAtom(authAtom)
  const pusher = useHistoryPusher()

  const toUpdateEmailPage = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    pusher.toUpdateEmailPage()
  }

  const toUpdatePasswordPage = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    pusher.toUpdatePasswordPage()
  }

  const inputFullNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value)
  }

  const submitFormHandler = () => {
    if (!user || user.fullName === fullName || isRequestFullName) return
    setIsRequestFullName(true)
    const newUser = { ...user, fullName }
    editUser(newUser)
      .then(() => {
        console.log('update fullname berhasil')
        pushSuccessAlert(defaultMessage.SUCCESS_UPDATE_FULLNAME)
        setIsRequestFullName(false)
        setUser(newUser)
      })
      .catch((err) => {
        console.log(err)
        pushDangerAlert(defaultMessage.FAILED_UPDATE_FULLNAME)
      })
  }

  const logoutUserHandler = () => {
    logoutUser().then(() => {
      setUser(null)
      setIsLoggedIn(false)
    })
  }

  return (
    <MainLayout>
      <HeadingLayout>Pengaturan</HeadingLayout>
      <ProfileInputGroup>
        <Input
          fullWidth
          icon="user--gray.svg"
          value={fullName}
          onChange={inputFullNameHandler}
        />
        <Input fullWidth icon="email--dark.svg" disabled value={user?.email} />
      </ProfileInputGroup>
      <LinkGroup>
        <a href="/" onClick={toUpdateEmailPage}>
          Ubah Email
        </a>
        <a href="/" onClick={toUpdatePasswordPage}>
          Ubah Password
        </a>
      </LinkGroup>
      <ProfileButtonGroup>
        <Button
          variant="primary"
          align="center"
          fullWidth
          onClick={submitFormHandler}
          isLoading={isRequestFullName}
        >
          Simpan Perubahan
        </Button>
        <Button
          variant="danger"
          align="center"
          style={{ marginTop: '16px' }}
          fullWidth
          onClick={logoutUserHandler}
        >
          Keluar Aplikasi
        </Button>
      </ProfileButtonGroup>
    </MainLayout>
  )
}
