import React, { useState, useEffect } from 'react'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'
import { InputState, ProductCart, Product } from 'Types'
import initialInputState from '@/initials/initialInputState'
import { initialProductCart } from '@/initials/initialProductCart'
import Modal, { ModalTitle, ModalContent, ModalProps } from './Modal'

interface ProductCartModalProps extends ModalProps {
  type?: 'ADD' | 'EDIT'
  payload?: ProductCart
  onClickButton: (payload: ProductCart) => void
  products: Product[]
}

const TitleAndButtonText = {
  ADD: 'Tambah produk',
  EDIT: 'Edit produk',
}

const ProductCartModal = (props: ProductCartModalProps): React.ReactElement => {
  const modalType = props.payload ? 'EDIT' : 'ADD'
  const [productCartName, setProductCartName] = useState<InputState<string>>(
    initialInputState
  )
  const [productCartQuantity, setProductCartQuantity] = useState('')

  const inputProductCartName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductCartName({
      value: e.target.value,
      errorMessage: e.target.value ? '' : 'Data tidak boleh kosong',
    })
  }

  const inputProductCartQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductCartQuantity(e.target.value)
  }

  const submitFormHandler = () => {
    if (productCartName.errorMessage) return

    const newProductCart: ProductCart = {
      ...initialProductCart,
      id: props.payload ? props.payload.id : Math.random().toString(),
      name: `${productCartQuantity.trim()} ${productCartName.value.trim()}`.trim(),
    }

    props.onClickButton(newProductCart)
    setProductCartName(initialInputState)
    setProductCartQuantity('')
  }

  useEffect(() => {
    if (!props.payload) return
    setProductCartName({
      errorMessage: '',
      value: props.payload.name,
    })
  }, [props.payload])

  return (
    <Modal
      {...props}
      header={<ModalTitle>{TitleAndButtonText[modalType]}</ModalTitle>}
      content={
        <>
          <ModalContent>
            <Input
              list="products"
              placeholder="Pilih / input produk"
              onChange={inputProductCartName}
              fullWidth
              {...productCartName}
            />
          </ModalContent>
          <datalist id="products">
            {props.products.map((item) => (
              <option value={item.name} key={item.id} aria-label="Product" />
            ))}
          </datalist>
          <ModalContent>
            <Input
              fullWidth
              placeholder="Jumlah. Misal : 5 kg, 2 liter, atau 3"
              onChange={inputProductCartQuantity}
              value={productCartQuantity}
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
          onClick={submitFormHandler}
        >
          {TitleAndButtonText[modalType]}
        </Button>
      }
    />
  )
}

ProductCartModal.defaultProps = {
  type: 'ADD',
  payload: undefined,
}

export default ProductCartModal
