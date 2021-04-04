import React, { ReactElement, useState } from 'react'
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
import Modal, { ModalTitle, ModalContent } from '@/components/Modal'
import Input from '@/components/form/Input'

const ButtonGroup = styled.section`
  margin-bottom: 16px;
  display: flex;

  & > *:first-child {
    margin-right: 8px;
  }
`

export default function index(): ReactElement {
  const [isModalAddProductShow, setIsModalAddProductShow] = useState(false)
  const params = useParams<{ id: string }>()
  console.log({ params })

  const actionCardHandler = (type: CardAction, payload: ProductBase) => {
    switch (type) {
      case 'CLICK':
        setIsModalAddProductShow(!isModalAddProductShow)
        break
      default:
    }
    console.log(type, payload)
  }

  const addProductHandler = (payload: string) => {
    console.log(payload)
  }

  const toggleModalAddProduct = () => {
    setIsModalAddProductShow(!isModalAddProductShow)
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
      <Modal
        isShow={isModalAddProductShow}
        closeHandler={toggleModalAddProduct}
        header={<ModalTitle>Edit Produk</ModalTitle>}
        content={
          <ModalContent>
            <Input fullWidth placeholder="Nama produk" />
          </ModalContent>
        }
        footer={
          <Button
            variant="primary"
            icon="/product--white.svg"
            align="center"
            fullWidth
            onClick={toggleModalAddProduct}
          >
            Edit Produk
          </Button>
        }
      />
    </MainLayout>
  )
}
