import React, { ReactElement, useState } from 'react'
import MainLayout, { HeadingLayout } from '@/layout/MainLayout'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'
import styled from 'styled-components'
import Modal, { ModalTitle, ModalContent } from '@/components/Modal'
import { initialProducts } from '@/initials/initialProduct'
import { initialProductCart } from '@/initials/initialProductCart'
import ProductCartCard from '@/components/card/ProductCartCard'

const InputDate = styled(Input)`
  margin-top: 6px;
  margin-bottom: 16px;
  width: 69%;
  max-width: 300px;
`

const ButtonGroup = styled.section`
  margin-top: 16px;
  margin-bottom: 16px;
  display: flex;
  justify-content: left;

  & > *:first-child {
    margin-right: 16px;
  }
`

const ListProductCart = styled.section`
  & > * {
    margin-bottom: 16px;
  }
`

export default function index(): ReactElement {
  const [isModalAddProductShow, setIsModalAddProductShow] = useState(false)
  const [isModalPickProductShow, setIsModalPickProductShow] = useState(false)

  const toggleModalAddProduct = () => {
    setIsModalAddProductShow(!isModalAddProductShow)
  }

  const toggleModalPickProduct = () => {
    setIsModalPickProductShow(!isModalPickProductShow)
  }

  const inputAddProductHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e)
  }

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
      <ButtonGroup>
        <Button
          variant="outline-dashed"
          icon="plus--primary.svg"
          align="center"
          onClick={toggleModalAddProduct}
        >
          Tambah Produk
        </Button>
        <Button
          variant="outline-dashed"
          icon="search--primary.svg"
          align="center"
          onClick={toggleModalPickProduct}
        >
          Pilih Produk
        </Button>
      </ButtonGroup>
      <ListProductCart>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item) => (
          <ProductCartCard key={item} product={initialProductCart} />
        ))}
      </ListProductCart>
      {isModalPickProductShow && (
        <Modal
          closeHandler={toggleModalPickProduct}
          header={<ModalTitle>Pilih Produk</ModalTitle>}
          content={
            <>
              <ModalContent>
                <Input list="products" placeholder="Pilih produk" fullWidth />
                <datalist id="products">
                  {initialProducts.map((product) => (
                    <option key={product.id} value={product.name}>
                      {product.name}
                    </option>
                  ))}
                </datalist>
              </ModalContent>
              <ModalContent>
                <Input fullWidth placeholder="Jumlah" />
              </ModalContent>
            </>
          }
          footer={
            <Button
              variant="primary"
              icon="product--white.svg"
              align="center"
              fullWidth
              onClick={toggleModalPickProduct}
            >
              Tambah Produk
            </Button>
          }
        />
      )}
      {isModalAddProductShow && (
        <Modal
          closeHandler={toggleModalAddProduct}
          header={<ModalTitle>Tambah Produk</ModalTitle>}
          content={
            <ModalContent>
              <Input
                fullWidth
                onChange={inputAddProductHandler}
                placeholder="Nama produk"
              />
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
