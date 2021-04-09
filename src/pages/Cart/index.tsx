import React, { ReactElement, useEffect, useState } from 'react'
import MainLayout, {
  HeadingLayout,
  CaptionEditProduct,
} from '@/layout/MainLayout'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Button from '@/components/Form/Button'
import { Cart, ProductCart, Product } from 'Types'
import {
  getCartById,
  finishCart,
  unfinishCart,
  removeCart,
  editCart,
} from '@/http/cart'
import { getProducts } from '@/http/product'
import { useAtom } from 'jotai'
import { cartsAtom } from '@/store/cartAtom'
import useHistoryPusher from '@/hooks/useHistoryPusher'
import usePushAlert from '@/hooks/usePushAlert'
import ProductCartModal from '@/components/Modal/ProductCartModal'
import { userAtom } from '@/store/userAtom'
import {
  DateToInputValueHTML,
  DateToFirebase,
  HeadingDateFormat,
} from '@/utils/Date'
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

const LabelInputDate = styled.label`
  position: relative;

  input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    box-sizing: border-box;

    &::-webkit-calendar-picker-indicator {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      cursor: pointer;
    }
  }
`

const DashboardHeadingLayout = styled(HeadingLayout)`
  span {
    font-size: 24px !important;
    margin-right: 12px;
  }

  img {
    cursor: pointer;
  }
`

export default function index(): ReactElement {
  const [carts, setCarts] = useAtom(cartsAtom)
  const [cart, setCart] = useAtom(cartAtom)
  const [isLoadingFinishCart, setIsLoadingFinishCart] = useState(false)
  const [isLoadingRemoveCart, setIsLoadingRemoveCart] = useState(false)
  const [isModalAddProductCartShow, setIsModalAddProductCartShow] = useState(
    false
  )
  const [products, setProducts] = useState<Product[]>([])
  const [user] = useAtom(userAtom)
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

  const toggleModalAddProductCartHandler = () => {
    setIsModalAddProductCartShow(!isModalAddProductCartShow)
  }

  const removeCartHandler = () => {
    setIsLoadingRemoveCart(true)
    removeCart(params.id)
      .then(() => {
        setIsLoadingRemoveCart(false)

        setCarts(carts.filter((cartItem) => cartItem.id !== params.id))
        pusher.toDashboardPage()
        pushSuccessAlert(defaultMessage.SUCCESS_REMOVE_CART)
      })
      .catch((err) => {
        console.error(err)
        pushDangerAlert(defaultMessage.FAILED_REMOVE_CART)
      })
  }

  const addProductCartHandler = (payload: ProductCart) => {
    const newCart = {
      ...cart,
      products: [payload, ...cart.products],
    }

    editCart(newCart)
      .then(() => editCartsAtom(newCart))
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        toggleModalAddProductCartHandler()
      })
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
        console.error(err)
        pushDangerAlert(defaultMessage.FAILED_UPDATE_CART)
      })
  }

  const changeDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value)
    const firebaseDate = DateToFirebase(newDate)

    const newCart = {
      ...cart,
      date: firebaseDate,
    }

    editCart(newCart)
      .then(() => editCartsAtom(newCart))
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    if (user) {
      getProducts(user.uid)
        .then((payload) => {
          setProducts(payload)
        })
        .catch((err) => {
          console.error(err)
        })
    }

    if (!carts.length) {
      getCartById(params.id)
        .then((data) => {
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
      <DashboardHeadingLayout>
        <span>{HeadingDateFormat(cart.date)}</span>
        <LabelInputDate htmlFor="date">
          <img src="/calendar--gray.svg" alt="Calendar icon" />
          <input
            type="date"
            name="date"
            id="date"
            onChange={changeDateHandler}
            value={DateToInputValueHTML(cart.date.toDate())}
          />
        </LabelInputDate>
      </DashboardHeadingLayout>
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
      <Button
        style={{ marginBottom: '16px' }}
        icon="/plus--primary.svg"
        variant="outline-dashed"
        align="center"
        onClick={toggleModalAddProductCartHandler}
      >
        Tambah Produk
      </Button>
      <CaptionEditProduct />
      <CardGroup>{cart.id && <ListProductCart cart={cart} />}</CardGroup>
      <ProductCartModal
        isShow={isModalAddProductCartShow}
        closeHandler={toggleModalAddProductCartHandler}
        onClickButton={addProductCartHandler}
        products={products}
      />
    </MainLayout>
  )
}
