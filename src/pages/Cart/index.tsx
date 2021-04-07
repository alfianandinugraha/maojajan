import React, { ReactElement, useEffect, useState } from 'react'
import MainLayout, {
  HeadingLayout,
  CaptionEditProduct,
} from '@/layout/MainLayout'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Button from '@/components/form/Button'
import AddProductButton from '@/components/AddProductButton'
import { CardAction, ProductCartCard } from '@/components/Card'
import { initialCart } from '@/initials/initialCart'
import { ProductBase, Cart, ProductCart, InputState } from 'Types'
import Modal, { ModalTitle, ModalContent } from '@/components/Modal'
import Input from '@/components/form/Input'
import {
  getCartById,
  finishCart,
  unfinishCart,
  removeCart,
  editCart,
} from '@/http/cart'
import { useAtom } from 'jotai'
import { cartsAtom } from '@/store/cartAtom'
import useHistoryPusher from '@/hooks/useHistoryPusher'
import usePushAlert from '@/hooks/usePushAlert'
import initialInputState from '@/initials/initialInputState'
import { initialProductCart } from '@/initials/initialProductCart'

const ButtonGroup = styled.section`
  margin-bottom: 16px;
  display: flex;

  & > *:first-child {
    margin-right: 8px;
  }
`

const CardGroup = styled.section`
  & > *:first-child {
    margin-bottom: 16px;
  }
`

export default function index(): ReactElement {
  const [
    isModalUpdateProductCartShow,
    setIsModalUpdateProductCarttShow,
  ] = useState(false)
  const [carts, setCarts] = useAtom(cartsAtom)
  const [cart, setCart] = useState<Cart>(initialCart)
  const [isLoadingFinishCart, setIsLoadingFinishCart] = useState(false)
  const [isLoadingRemoveCart, setIsLoadingRemoveCart] = useState(false)
  const { pushDangerAlert, pushSuccessAlert, defaultMessage } = usePushAlert()
  const [updateProductCartName, setUpdateProductCartName] = useState<
    InputState<string>
  >(initialInputState)
  const [
    selectedUpdateProductCart,
    setSelectedUpdateProductCart,
  ] = useState<ProductCart>(initialProductCart)
  const params = useParams<{ id: string }>()
  const pusher = useHistoryPusher()
  const isFinish = cart.products.every((product) => product.isPurchased)

  const toggleModalUpdateProductCart = () => {
    setIsModalUpdateProductCarttShow(!isModalUpdateProductCartShow)
  }

  const editNewCarts = (newCart: Cart) =>
    carts.map((cartItem) => (cartItem.id === newCart.id ? newCart : cartItem))

  const editCartsAtom = (newCart: Cart) => {
    setCart(newCart)
    setCarts(editNewCarts(newCart))
  }

  const toggleFinishCartProduct = (payload: ProductCart) => {
    const newCart = {
      ...cart,
      products: cart.products.map((product) =>
        product.id === payload.id
          ? { ...payload, isPurchased: !payload.isPurchased }
          : product
      ),
    }

    editCart(newCart).then(() => editCartsAtom(newCart))
  }

  const removeCartHandler = () => {
    console.log(`removing cart id : ${params.id}`)
    setIsLoadingRemoveCart(true)
    removeCart(params.id)
      .then(() => {
        setIsLoadingRemoveCart(false)
        console.log('remove successfully')
        setCarts(carts.filter((cartItem) => cartItem.id !== params.id))
        pusher.toDashboardPage()
        pushSuccessAlert(defaultMessage.SUCCESS_REMOVE_CART)
      })
      .catch((err) => {
        console.log(err)
        pushDangerAlert(defaultMessage.FAILED_REMOVE_CART)
      })
  }

  const deleteProductCart = (productCartId: string) => {
    const newCart = {
      ...cart,
      products: cart.products.filter((product) => product.id !== productCartId),
    }

    if (cart.products.length === 1) {
      removeCartHandler()
      return
    }

    editCart(newCart).then(() => editCartsAtom(newCart))
  }

  const actionCardHandler = (type: CardAction, payload: ProductBase) => {
    switch (type) {
      case 'FINISH':
        console.log('finishing product cart')
        toggleFinishCartProduct(payload as ProductCart)
        break
      case 'CLICK':
        setUpdateProductCartName({
          ...updateProductCartName,
          value: payload.name,
        })
        setSelectedUpdateProductCart(payload as ProductCart)
        toggleModalUpdateProductCart()
        break
      case 'DELETE':
        deleteProductCart(payload.id)
        break
      default:
    }
    console.log(type, payload)
  }

  const addProductHandler = (payload: string) => {
    const newProduct = {
      id: Math.random().toString(),
      name: payload,
      isPurchased: false,
    }

    const newCart = {
      ...cart,
      products: [newProduct, ...cart.products],
    }
    editCart(newCart).then(() => editCartsAtom(newCart))
  }

  const statusCartHandler = () => {
    setIsLoadingFinishCart(true)
    let request = finishCart

    if (isFinish) request = unfinishCart

    request(cart)
      .then((res: Cart) => {
        editCartsAtom(res)
        setIsLoadingFinishCart(false)
        pushSuccessAlert(defaultMessage.SUCCESS_UPDATE_CART)
      })
      .catch((err) => {
        console.log(err)
        pushDangerAlert(defaultMessage.FAILED_UPDATE_CART)
      })
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
      ...cart,
      products: cart.products.map((product) =>
        product.id === newProductCart.id ? newProductCart : product
      ),
    }

    editCart(newCart)
      .then((res) => {
        editCartsAtom(res)
        toggleModalUpdateProductCart()
      })
      .catch((err) => {
        console.error(err)
      })
    console.log(newCart)
  }

  useEffect(() => {
    if (!carts.length) {
      console.log(`fetching cart id: ${params.id}`)
      getCartById(params.id)
        .then((data) => {
          console.log('fetching success')
          if (data) {
            setCart(data)
            return
          }

          pusher.toDashboardPage()
        })
        .catch(() => {
          pusher.toDashboardPage()
        })
      return
    }

    setCart(carts.filter((item) => item.id === params.id)[0])
  }, [])

  return (
    <MainLayout>
      <HeadingLayout>23 April 2020</HeadingLayout>
      <ButtonGroup>
        <Button
          variant="secondary"
          icon="/check--white.svg"
          onClick={statusCartHandler}
          isDisabled={isFinish}
          isLoading={isLoadingFinishCart}
          style={{ width: '105.14px' }}
        >
          Selesai
        </Button>
        <Button
          variant="danger"
          icon="/trash--white.svg"
          onClick={!isLoadingRemoveCart ? removeCartHandler : undefined}
          isLoading={isLoadingRemoveCart}
          style={{ width: '101.16px' }}
        >
          Hapus
        </Button>
      </ButtonGroup>
      <AddProductButton
        style={{ marginBottom: '16px' }}
        payloadHandler={addProductHandler}
      />
      <CaptionEditProduct />
      <CardGroup>
        {cart.products.map((product) => (
          <ProductCartCard
            key={product.id}
            disabled={product.isPurchased}
            payload={product}
            actionHandler={actionCardHandler}
          />
        ))}
      </CardGroup>
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
    </MainLayout>
  )
}
