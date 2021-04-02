import React, { ReactElement } from 'react'
import MainLayout, { HeadingLayout } from '@/layout/MainLayout'
import styled from 'styled-components'
import { ProductBaseCard, CardAction } from '@/components/Card'
import { initialProduct } from '@/initials/initialProduct'
import { ProductBase } from 'Types'
import AddProductButton from '@/components/AddProductButton'

const Information = styled.p`
  color: ${(props) => props.theme.color.gray} !important;
  font-size: 12px !important;
  margin-bottom: 12px;
`

const ListProductCart = styled.section`
  margin-top: 16px;

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
      <HeadingLayout>List Produk</HeadingLayout>
      <Information>* Klik produk untuk mengedit</Information>
      <AddProductButton
        style={{ marginBottom: '16px' }}
        payloadHandler={addProductHandler}
      />
      <ListProductCart>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item) => (
          <ProductBaseCard
            key={item}
            payload={initialProduct}
            disabled={false}
            actionHandler={actionCardHandler}
          />
        ))}
      </ListProductCart>
    </MainLayout>
  )
}
