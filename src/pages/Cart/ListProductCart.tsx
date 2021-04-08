import React, { useState } from 'react'
import { Cart, InputState, ProductCart } from 'Types'
import { initialProductCart } from '@/initials/initialProductCart'
import initialInputState from '@/initials/initialInputState'
import Modal, { ModalTitle, ModalContent } from '@/components/Modal'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'
import { removeCart, editCart } from '@/http/cart'
import { useAtom } from 'jotai'
import useHistoryPusher from '@/hooks/useHistoryPusher'
import useCartsAtom from '@/hooks/useCartsAtom'
import Card from '@/components/Card'
import cartAtom from './cartAtom'

interface Props {
  cart: Cart
}

const ListProductCart = (props: Props): React.ReactElement => {
  const [
    isModalUpdateProductCartShow,
    setIsModalUpdateProductCartShow,
  ] = useState(false)
  const [updateProductCartName, setUpdateProductCartName] = useState<
    InputState<string>
  >(initialInputState)
  const [
    selectedUpdateProductCart,
    setSelectedUpdateProductCart,
  ] = useState<ProductCart>(initialProductCart)
  const [, setCarts] = useCartsAtom()
  const [cart, setCart] = useAtom(cartAtom)
  const pusher = useHistoryPusher()

  const toggleModalUpdateProductCart = () => {
    setIsModalUpdateProductCartShow(!isModalUpdateProductCartShow)
  }

  const inputUpdateProductCartNameHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUpdateProductCartName({
      value: e.target.value,
      errorMessage: e.target.value ? '' : 'Data tidak boleh kosong',
    })
  }

  const submitUpdateProductCartHandler = () => {
    if (!updateProductCartName.value) return

    const newProductCart = {
      ...selectedUpdateProductCart,
      name: updateProductCartName.value,
    }

    const newCart = {
      ...props.cart,
      products: props.cart.products.map((product) =>
        product.id === newProductCart.id ? newProductCart : product
      ),
    }

    editCart(newCart)
      .then(() => {
        console.log('Update product cart berhasil...')
        toggleModalUpdateProductCart()
        setCarts.update(newCart)
        setCart(newCart)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const removeProductCartHandler = (productCartId: string) => {
    const newCart = {
      ...props.cart,
      products: props.cart.products.filter(
        (product) => product.id !== productCartId
      ),
    }

    if (!newCart.products.length) {
      removeCart(newCart.id)
        .then(() => {
          console.log('remove cart...')
          setCarts.remove(newCart.id)
          pusher.toDashboardPage()
        })
        .catch((err) => {
          console.error(err)
        })

      return
    }

    editCart(newCart)
      .then(() => {
        setCarts.update(newCart)
        setCart(newCart)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const toggleFinishProductCart = (payload: ProductCart) => {
    const newCart = {
      ...props.cart,
      products: props.cart.products.map((product) =>
        product.id === payload.id
          ? { ...payload, isPurchased: !payload.isPurchased }
          : product
      ),
    }

    editCart(newCart)
      .then(() => {
        console.log('Status product cart berhasil diperbarui')
        setCarts.update(newCart)
        setCart(newCart)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <>
      {cart.products.map((product) => {
        const productId = product.id
        return (
          <Card
            key={product.id}
            disabled={product.isPurchased}
            style={{ height: '48px' }}
            onClickRemove={() => {
              console.log(`removing ${productId}...`)
              removeProductCartHandler(productId)
            }}
            onClickToggleFinish={() => {
              console.log(`toggling finish ${productId}...`)
              toggleFinishProductCart(product)
            }}
            onClickBody={() => {
              console.log('Opening modal...')
              setSelectedUpdateProductCart(product)
              setUpdateProductCartName({
                ...updateProductCartName,
                value: product.name,
              })
              toggleModalUpdateProductCart()
            }}
          >
            <p>{product.name}</p>
          </Card>
        )
      })}
      {/* <ProductCartCard
          key={product.id}
          disabled={product.isPurchased}
          payload={product}
          actionHandler={actionProductCartCardHandler}
        /> */}
      <Modal
        isShow={isModalUpdateProductCartShow}
        closeHandler={toggleModalUpdateProductCart}
        header={<ModalTitle>Edit Produk</ModalTitle>}
        content={
          <ModalContent>
            <Input
              fullWidth
              placeholder="Nama produk"
              onChange={inputUpdateProductCartNameHandler}
              {...updateProductCartName}
            />
          </ModalContent>
        }
        footer={
          <Button
            variant="primary"
            icon="/product--white.svg"
            align="center"
            fullWidth
            onClick={submitUpdateProductCartHandler}
          >
            Edit Produk
          </Button>
        }
      />
    </>
  )
}

export default ListProductCart
