import React, { ReactElement } from 'react'
import MainLayout, { HeadingLayout } from '@/layout/MainLayout'
import { useParams } from 'react-router-dom'

export default function index(): ReactElement {
  const params = useParams<{ id: string }>()
  console.log({ params })

  return (
    <MainLayout>
      <HeadingLayout>Tambah keranjang</HeadingLayout>
    </MainLayout>
  )
}
