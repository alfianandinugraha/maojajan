import React, { ReactElement } from 'react'
import MainLayout, {
  HeadingLayout,
  CaptionEditProduct,
} from '@/layout/MainLayout'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Button from '@/components/form/Button'
import AddProductButton from '@/components/AddProductButton'
import { CardAction, ProductCartCard } from '@/components/Card'
import { initialProductCart } from '@/initials/initialProductCart'
import { ProductBase } from 'Types'

const ButtonGroup = styled.section`
  margin-bottom: 16px;
  display: flex;

  & > *:first-child {
    margin-right: 8px;
  }
`

export default function index(): ReactElement {
  const params = useParams<{ id: string }>()
  console.log({ params })

  const actionCardHandler = (type: CardAction, payload: ProductBase) => {
    console.log(type, payload)
  }

  const addProductHandler = (payload: string) => {
    console.log(payload)
  }

  return (
    <MainLayout>
      <HeadingLayout>23 April 2020</HeadingLayout>
      <ButtonGroup>
        <Button variant="secondary" icon="/check--white.svg">
          Selesai
        </Button>
        <Button variant="danger" icon="/trash--white.svg">
          Hapus
        </Button>
      </ButtonGroup>
      <AddProductButton
        style={{ marginBottom: '16px' }}
        payloadHandler={addProductHandler}
      />
      <CaptionEditProduct />
      <ProductCartCard
        disabled={false}
        payload={initialProductCart}
        actionHandler={actionCardHandler}
      />
    </MainLayout>
  )
}
