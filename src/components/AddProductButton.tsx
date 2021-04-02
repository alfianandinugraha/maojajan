import React, { ReactElement, useState } from 'react'
import Button from '@/components/form/Button'
import Input from '@/components/form/Input'
import Modal, { ModalTitle, ModalContent } from '@/components/Modal'
import { initialProducts } from '@/initials/initialProduct'

interface Props extends React.HTMLAttributes<HTMLElement> {
  payloadHandler: (payload: string) => void
}

export default function AddProductButtonGroup(props: Props): ReactElement {
  const [isModalAddProductShow, setIsModalAddProductShow] = useState(false)
  const [productName, setProductName] = useState<string>('')
  const [productQuantity, setProductQuantity] = useState<string>('')

  const toggleModalAddProduct = () => {
    setProductName('')
    setIsModalAddProductShow(!isModalAddProductShow)
  }

  const sendPayload = () => {
    toggleModalAddProduct()
    props.payloadHandler(`${productQuantity} ${productName}`)
  }

  const inputProductNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value)
  }

  const inputProductQuantityHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProductQuantity(e.target.value)
  }

  return (
    <>
      <Button
        variant="outline-dashed"
        icon="/plus--primary.svg"
        align="center"
        onClick={toggleModalAddProduct}
        {...props}
      >
        Tambah Produk
      </Button>
      {isModalAddProductShow && (
        <Modal
          closeHandler={toggleModalAddProduct}
          header={<ModalTitle>Tambah Produk</ModalTitle>}
          content={
            <>
              <ModalContent>
                <Input
                  list="products"
                  placeholder="Pilih produk"
                  fullWidth
                  onChange={inputProductNameHandler}
                />
                <datalist id="products">
                  {initialProducts.map((product) => (
                    <option key={product.id} value={product.name}>
                      {product.name}
                    </option>
                  ))}
                </datalist>
              </ModalContent>
              <ModalContent>
                <Input
                  fullWidth
                  placeholder="Jumlah"
                  onChange={inputProductQuantityHandler}
                />
              </ModalContent>
            </>
          }
          footer={
            <Button
              variant="primary"
              icon="/plus--white.svg"
              align="center"
              fullWidth
              onClick={sendPayload}
            >
              Tambah Produk
            </Button>
          }
        />
      )}
    </>
  )
}
