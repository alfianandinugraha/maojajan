import MainLayout, { HeadingLayout } from '@/layout/MainLayout'
import React, { ReactElement } from 'react'

export default function index(): ReactElement {
  return (
    <MainLayout>
      <HeadingLayout>Pengaturan</HeadingLayout>
    </MainLayout>
  )
}
