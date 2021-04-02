import Button from '@/components/form/Button'
import Input from '@/components/form/Input'
import MainLayout, {
  HeadingLayout,
  ProfileButtonGroup,
  ProfileInputGroup,
} from '@/layout/MainLayout'
import React, { ReactElement } from 'react'

export default function index(): ReactElement {
  return (
    <MainLayout>
      <HeadingLayout>Ubah Email</HeadingLayout>
      <ProfileInputGroup style={{ marginBottom: '24px' }}>
        <Input fullWidth icon="email--gray.svg" value="alfian@andi.com" />
      </ProfileInputGroup>
      <p style={{ marginBottom: '16px' }}>Email Baru</p>
      <ProfileInputGroup>
        <Input fullWidth icon="email--gray.svg" placeholder="Email baru" />
        <Input
          fullWidth
          icon="lock--gray.svg"
          placeholder="Password untuk konfirmasi"
        />
      </ProfileInputGroup>
      <ProfileButtonGroup>
        <Button variant="primary" align="center" fullWidth>
          Ubah Email
        </Button>
      </ProfileButtonGroup>
    </MainLayout>
  )
}
