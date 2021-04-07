import React, { ReactElement, useEffect, useState } from 'react'
import MainLayout, {
  HeadingLayout,
  CaptionEditProduct,
} from '@/layout/MainLayout'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Button from '@/components/form/Button'
import AddProductButton from '@/components/AddProductButton'
import { Cart } from 'Types'
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
import ListProductCart from './ListProductCart'
import cartAtom from './cartAtom'

const ButtonGroup = styled.section`
  margin-bottom: 16px;
  display: flex;

  & > *:first-child {
    margin-right: 8px;
  }
`

const CardGroup = styled.section`
  & > *:not(:last-child) {
    margin-bottom: 16px;
  }
`

export default function index(): ReactElement {
  const [carts, setCarts] = useAtom(cartsAtom)
  const [cart, setCart] = useAtom(cartAtom)
  const [isLoadingFinishCart, setIsLoadingFinishCart] = useState(false)
  const [isLoadingRemoveCart, setIsLoadingRemoveCart] = useState(false)
  const { pushDangerAlert, pushSuccessAlert, defaultMessage } = usePushAlert()
  const params = useParams<{ id: string }>()
  const pusher = useHistoryPusher()
  const isFinish = cart.products.every((product) => product.isPurchased)

  const editNewCarts = (newCart: Cart) =>
    carts.map((cartItem) => (cartItem.id === newCart.id ? newCart : cartItem))

  const editCartsAtom = (newCart: Cart) => {
    setCart(newCart)
    setCarts(editNewCarts(newCart))
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
      <CardGroup>{cart.id && <ListProductCart cart={cart} />}</CardGroup>
    </MainLayout>
  )
}
