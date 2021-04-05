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
import { ProductBase, Cart } from 'Types'
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

const ButtonGroup = styled.section`
  margin-bottom: 16px;
  display: flex;

  & > *:first-child {
    margin-right: 8px;
  }
`

export default function index(): ReactElement {
  const [isModalAddProductShow, setIsModalAddProductShow] = useState(false)
  const [carts, setCarts] = useAtom(cartsAtom)
  const [cart, setCart] = useState<Cart>(initialCart)
  const params = useParams<{ id: string }>()
  const pusher = useHistoryPusher()
  const isFinish = cart.products.every((product) => product.isPurchased)

  const editCarts = (newCart: Cart) =>
    carts.map((cartItem) => (cartItem.id === newCart.id ? newCart : cartItem))

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
    const newProduct = {
      id: Math.random().toString(),
      name: payload,
      isPurchased: false,
    }

    const newCart = {
      ...cart,
      products: [newProduct, ...cart.products],
    }
    editCart(newCart).then(() => {
      setCart(newCart)
      setCarts(editCarts(newCart))
    })
  }

  const toggleModalAddProduct = () => {
    setIsModalAddProductShow(!isModalAddProductShow)
  }

  const finishCartHandler = () => {
    finishCart(cart).then((res: Cart) => {
      setCarts(editCarts(res))
      setCart(res)
    })
  }

  const unfinishCartHandler = () => {
    unfinishCart(cart).then((res: Cart) => {
      setCarts(editCarts(res))
      setCart(res)
    })
  }

  const removeCartHandler = () => {
    console.log(`removing cart id : ${params.id}`)
    removeCart(params.id).then(() => {
      console.log('remove successfully')
      setCarts(carts.filter((cartItem) => cartItem.id !== params.id))
      pusher.toDashboardPage()
    })
  }

  useEffect(() => {
    if (!carts.length) {
      console.log(`fetching cart id: ${params.id}`)
      getCartById(params.id).then((data) => {
        console.log('fetching success')
        if (data) {
          setCart(data)
          return
        }

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
          onClick={isFinish ? unfinishCartHandler : finishCartHandler}
          isDisabled={isFinish}
        >
          Selesai
        </Button>
        <Button
          variant="danger"
          icon="/trash--white.svg"
          onClick={removeCartHandler}
        >
          Hapus
        </Button>
      </ButtonGroup>
      <AddProductButton
        style={{ marginBottom: '16px' }}
        payloadHandler={addProductHandler}
      />
      <CaptionEditProduct />
      {cart.products.map((product) => (
        <ProductCartCard
          key={product.id}
          disabled={product.isPurchased}
          payload={product}
          actionHandler={actionCardHandler}
        />
      ))}
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
