import React, { ReactElement } from 'react'
import MainLayout, {
  HeadingLayout,
  CaptionEditProduct,
} from '@/layout/MainLayout'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'
import styled from 'styled-components'
import { initialProducts } from '@/initials/initialProduct'
import { ProductBaseCard, CardAction } from '@/components/Card'
import { ProductBase } from 'Types'
import AddProductButton from '@/components/AddProductButton'

const InputDate = styled(Input)`
  margin-top: 6px;
  margin-bottom: 16px;
  width: 69%;
  max-width: 300px;
`

const ListProductCart = styled.section`
  & > * {
    margin-bottom: 16px;
  }
`

export default function index(): ReactElement {
  const actionCardHandler = (type: CardAction, payload: ProductBase) => {
    console.log(type, payload)
  }

  const addProductHandler = (payload: string) => {
    console.log(payload)
  }

  return (
    <MainLayout>
      <HeadingLayout>Tambah keranjang</HeadingLayout>
      <InputDate
        placeholder="Untuk tanggal"
        icon="calendar--gray.svg"
        type="date"
      />
      <AddProductButton
        payloadHandler={addProductHandler}
        style={{ margin: '16px 0' }}
      />
      <Button
        variant="primary"
        icon="cart--white.svg"
        align="center"
        style={{ marginBottom: '16px' }}
      >
        Simpan
      </Button>
      <CaptionEditProduct />
      <ListProductCart>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item) => (
          <ProductBaseCard
            key={item}
            payload={initialProducts[0]}
            disabled={false}
            actionHandler={actionCardHandler}
          />
        ))}
      </ListProductCart>
    </MainLayout>
  )
}
