import MainLayout, {
  HeadingLayout,
  ProfileInputGroup,
  ProfileButtonGroup,
} from '@/layout/MainLayout'
import React, { ReactElement } from 'react'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'
import styled from 'styled-components'
import useHistoryPusher from '@/hooks/useHistoryPusher'

const LinkGroup = styled.section`
  display: flex;
  flex-direction: column;

  & > *:not(:last-child) {
    margin-bottom: 16px;
  }
`

export default function index(): ReactElement {
  const pusher = useHistoryPusher()

  const toUpdateEmailPage = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    pusher.toUpdateEmailPage()
  }

  const toUpdatePasswordPage = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    pusher.toUpdatePasswordPage()
  }

  return (
    <MainLayout>
      <HeadingLayout>Pengaturan</HeadingLayout>
      <ProfileInputGroup>
        <Input fullWidth icon="user--gray.svg" value="Alfian Andi Nugraha" />
        <Input
          fullWidth
          icon="email--dark.svg"
          value="alfian@andi.com"
          disabled
        />
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
        <Button variant="primary" align="center" fullWidth>
          Simpan Perubahan
        </Button>
        <Button
          variant="danger"
          align="center"
          style={{ marginTop: '16px' }}
          fullWidth
        >
          Keluar Aplikasi
        </Button>
      </ProfileButtonGroup>
    </MainLayout>
  )
}
