import MainLayout, { HeadingLayout } from '@/layout/MainLayout'
import React, { ReactElement } from 'react'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'
import styled from 'styled-components'
import useHistoryPusher from '@/hooks/useHistoryPusher'

const InputGroup = styled.section`
  margin-bottom: 24px;

  & > *:not(:last-child) {
    margin-bottom: 16px;
  }
`

const LinkGroup = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 94px;

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
      <InputGroup>
        <Input fullWidth icon="user--gray.svg" value="Alfian Andi Nugraha" />
        <Input
          fullWidth
          icon="email--dark.svg"
          value="alfian@andi.com"
          disabled
        />
      </InputGroup>
      <LinkGroup>
        <a href="/" onClick={toUpdateEmailPage}>
          Ubah Email
        </a>
        <a href="/" onClick={toUpdatePasswordPage}>
          Ubah Password
        </a>
      </LinkGroup>
      <Button variant="primary" align="center">
        Simpan Perubahan
      </Button>
      <Button variant="danger" align="center" style={{ marginTop: '16px' }}>
        Keluar Aplikasi
      </Button>
    </MainLayout>
  )
}
