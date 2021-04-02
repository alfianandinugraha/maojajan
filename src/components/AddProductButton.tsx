import React, { ReactElement, useState } from 'react'
import Button from '@/components/form/Button'
import Input from '@/components/form/Input'
import Modal, { ModalTitle, ModalContent } from '@/components/Modal'
import { initialProducts } from '@/initials/initialProduct'
import { InputState } from 'Types'
import initialInputState from '@/initials/initialInputState'
import { EMPTY_VALUE_MESSAGE } from '@/validation/form'

interface Props extends React.HTMLAttributes<HTMLElement> {
  payloadHandler: (payload: string) => void
}

export default function AddProductButtonGroup(props: Props): ReactElement {
  const [isModalAddProductShow, setIsModalAddProductShow] = useState(false)
  const [productName, setProductName] = useState<InputState<string>>(
    initialInputState
  )
  const [productQuantity, setProductQuantity] = useState<string>('')

  const toggleModalAddProduct = () => {
    setProductName(initialInputState)
    setProductQuantity('')
    setIsModalAddProductShow(!isModalAddProductShow)
  }

  const sendPayload = () => {
    if (!productName.value) {
      setProductName({
        ...productName,
        errorMessage: EMPTY_VALUE_MESSAGE,
      })
      return
    }
    toggleModalAddProduct()
    props.payloadHandler(`${productQuantity} ${productName.value}`)
  }

  const inputProductNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName({
      value: e.target.value,
      errorMessage: '',
    })
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
      <Modal
        closeHandler={toggleModalAddProduct}
        isShow={isModalAddProductShow}
        header={<ModalTitle>Tambah Produk</ModalTitle>}
        content={
          <>
            <ModalContent>
              <Input
                list="products"
                placeholder="Pilih / input produk"
                fullWidth
                onChange={inputProductNameHandler}
                errorMessage={productName.errorMessage}
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
                placeholder="Jumlah. Misal : 5 kg, 2 liter, atau 3"
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
    </>
  )
}
