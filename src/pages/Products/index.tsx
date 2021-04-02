import React, { ReactElement, useState } from 'react'
import MainLayout, { HeadingLayout } from '@/layout/MainLayout'
import Button from '@/components/form/Button'
import Input from '@/components/form/Input'
import Modal, { ModalTitle, ModalContent } from '@/components/Modal'
import styled from 'styled-components'
import { ProductBaseCard, CardAction } from '@/components/Card'
import { initialProduct } from '@/initials/initialProduct'
import { ProductBase } from 'Types'

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
  const [isModalAddProductShow, setIsModalAddProductShow] = useState(false)

  const toggleModalAddProduct = () => {
    setIsModalAddProductShow(!isModalAddProductShow)
  }

  const actionCardHandler = (type: CardAction, payload: ProductBase) => {
    console.log(type, payload)
  }

  return (
    <MainLayout>
      <HeadingLayout>List Produk</HeadingLayout>
      <Information>* Klik produk untuk mengedit</Information>
      <Button
        variant="primary"
        icon="product--white.svg"
        align="center"
        onClick={toggleModalAddProduct}
      >
        Tambah Produk
      </Button>
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
      {isModalAddProductShow && (
        <Modal
          closeHandler={toggleModalAddProduct}
          header={<ModalTitle>Tambah Produk</ModalTitle>}
          content={
            <ModalContent>
              <Input fullWidth placeholder="Nama produk" />
            </ModalContent>
          }
          footer={
            <Button
              variant="primary"
              icon="product--white.svg"
              align="center"
              fullWidth
              onClick={toggleModalAddProduct}
            >
              Tambah Produk
            </Button>
          }
        />
      )}
    </MainLayout>
  )
}
