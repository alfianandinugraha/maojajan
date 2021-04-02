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
      <HeadingLayout>Ubah Password</HeadingLayout>
      <ProfileInputGroup style={{ marginBottom: '24px' }}>
        <Input fullWidth icon="lock--gray.svg" placeholder="Password Lama" />
      </ProfileInputGroup>
      <p style={{ marginBottom: '16px' }}>Password Baru</p>
      <ProfileInputGroup>
        <Input fullWidth icon="lock--gray.svg" placeholder="Password baru" />
        <Input
          fullWidth
          icon="lock--gray.svg"
          placeholder="Ulangi password baru"
        />
      </ProfileInputGroup>
      <ProfileButtonGroup>
        <Button variant="primary" align="center" fullWidth>
          Ubah Password
        </Button>
      </ProfileButtonGroup>
    </MainLayout>
  )
}
