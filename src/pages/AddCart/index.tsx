import React, { ReactElement, useState } from 'react'
import MainLayout, {
  HeadingLayout,
  CaptionEditProduct,
} from '@/layout/MainLayout'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'
import styled from 'styled-components'
import { ProductBaseCard, CardAction } from '@/components/Card'
import { ProductBase, ProductCart } from 'Types'
import AddProductButton from '@/components/AddProductButton'
import { initialProductCart } from '@/initials/initialProductCart'

const InputDate = styled(Input)`
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
  const [productCarts, setProductCarts] = useState<ProductCart[]>([])

  const actionCardHandler = (type: CardAction, payload: ProductBase) => {
    console.log(type, payload)
  }

  const addProductHandler = (payload: string) => {
    console.log(payload)
    const productCart = {
      ...initialProductCart,
      name: payload,
      id: Math.random().toString(),
    }
    setProductCarts([productCart, ...productCarts])
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
        {productCarts.map((item) => (
          <ProductBaseCard
            key={item.id}
            payload={item}
            disabled={false}
            actionHandler={actionCardHandler}
          />
        ))}
      </ListProductCart>
    </MainLayout>
  )
}
