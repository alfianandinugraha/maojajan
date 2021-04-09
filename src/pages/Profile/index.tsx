import MainLayout, {
  HeadingLayout,
  ProfileInputGroup,
  ProfileButtonGroup,
} from '@/layout/MainLayout'
import React, { ReactElement, useState } from 'react'
import Input from '@/components/Form/Input'
import Button from '@/components/Form/Button'
import styled from 'styled-components'
import useHistoryPusher from '@/hooks/useHistoryPusher'
import { logoutUser } from '@/http/auth'
import { editUser } from '@/http/user'
import { useAtom } from 'jotai'
import { userAtom } from '@/store/userAtom'
import { authAtom } from '@/store/authAtom'
import { cartsAtom } from '@/store/cartAtom'
import usePushAlert from '@/hooks/usePushAlert'
import { InputState } from 'Types'
import { isValidFullName } from '@/validation/form'

const LinkGroup = styled.section`
  display: flex;
  flex-direction: column;

  & > *:not(:last-child) {
    margin-bottom: 16px;
  }
`

export default function index(): ReactElement {
  const [user, setUser] = useAtom(userAtom)
  const [, setCarts] = useAtom(cartsAtom)
  const { pushDangerAlert, pushSuccessAlert, defaultMessage } = usePushAlert()
  const [fullName, setFullName] = useState<InputState<string>>({
    value: user ? user.fullName : '',
    errorMessage: '',
  })
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
    setFullName({
      errorMessage: isValidFullName(e.target.value).errorMessage,
      value: e.target.value,
    })
  }

  const submitFormHandler = () => {
    if (
      !user ||
      user.fullName === fullName.value ||
      isRequestFullName ||
      !fullName.value
    )
      return
    setIsRequestFullName(true)

    const newUser = { ...user, fullName: fullName.value }
    editUser(newUser)
      .then(() => {
        pushSuccessAlert(defaultMessage.SUCCESS_UPDATE_FULLNAME)
        setIsRequestFullName(false)
        setUser(newUser)
      })
      .catch((err) => {
        console.error(err)
        pushDangerAlert(defaultMessage.FAILED_UPDATE_FULLNAME)
      })
  }

  const logoutUserHandler = () => {
    logoutUser().then(() => {
      setUser(null)
      setIsLoggedIn(false)
      setCarts([])
    })
  }

  return (
    <MainLayout>
      <HeadingLayout>Pengaturan</HeadingLayout>
      <ProfileInputGroup>
        <Input
          fullWidth
          icon="user--gray.svg"
          value={fullName.value}
          onChange={inputFullNameHandler}
          errorMessage={fullName.errorMessage}
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
