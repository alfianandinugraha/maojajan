import React, { ReactElement } from 'react'
import MainLayout, { HeadingLayout } from '@/layout/MainLayout'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'
import styled from 'styled-components'

const InputDate = styled(Input)`
  margin-top: 6px;
  margin-bottom: 16px;
  width: 69%;
  max-width: 300px;
`

export default function index(): ReactElement {
  return (
    <MainLayout>
      <HeadingLayout>Tambah keranjang</HeadingLayout>
      <InputDate
        placeholder="Untuk tanggal"
        icon="calendar--gray.svg"
        type="date"
      />
      <Button variant="primary" icon="cart--white.svg" align="center">
        Simpan
      </Button>
    </MainLayout>
  )
}
