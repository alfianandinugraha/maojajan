import React, { ReactElement } from 'react'
import MainLayout, { HeadingLayout } from '@/layout/MainLayout'

export default function index(): ReactElement {
  return (
    <MainLayout>
      <HeadingLayout>List Produk</HeadingLayout>
    </MainLayout>
  )
}
