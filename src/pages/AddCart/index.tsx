import React, { ReactElement, useEffect, useState } from 'react'
import MainLayout, {
  HeadingLayout,
  CaptionEditProduct,
} from '@/layout/MainLayout'
import Input from '@/components/Form/Input'
import Button from '@/components/Form/Button'
import styled from 'styled-components'
import Card from '@/components/Card'
import { ProductCart, Cart, CartFirebase, Product } from 'Types'
import { useAtom } from 'jotai'
import { userAtom } from '@/store/userAtom'
import getInitialCart from '@/initials/initialCart'
import firebase from '@/utils/Firebase'
import { cartFirebaseFactory } from '@/factory/cartFirebaseFactory'
import { storeCart } from '@/http/cart'
import { getProducts } from '@/http/product'
import useHistoryPusher from '@/hooks/useHistoryPusher'
import usePushAlert from '@/hooks/usePushAlert'
import { cartsAtom } from '@/store/cartAtom'
import ProductCartModal from '@/components/Modal/ProductCartModal'
import EmptyProductCarts from './EmptyProductCarts'

const InputDate = styled(Input)`
  margin-bottom: 16px;
  width: 69%;
  max-width: 300px;
`

const ListProductCart = styled.section`
  & > * {
    margin-bottom: 16px;
  }
`

export default function index(): ReactElement {
  const [productCarts, setProductCarts] = useState<ProductCart[]>([])
  const { pushDangerAlert, pushSuccessAlert, defaultMessage } = usePushAlert()
  const [user] = useAtom(userAtom)
  const [isRequestStoreCart, setIsRequestStoreCart] = useState(false)
  const [isModalProductCartShow, setIsModalProductCartShow] = useState(false)
  const [selectedProductCart, setSelectedProductCart] = useState<
    ProductCart | undefined
  >()
  const [cartDate, setCartDate] = useState<Date>(new Date())
  const pusher = useHistoryPusher()
  const [carts, setCarts] = useAtom(cartsAtom)
  const [products, setProducts] = useState<Product[]>([])

  const modalProductCartHandler = () => {
    if (selectedProductCart) {
      setSelectedProductCart(undefined)
    }
    setIsModalProductCartShow(!isModalProductCartShow)
  }

  const openModalFromButton = () => {
    setSelectedProductCart(undefined)
    modalProductCartHandler()
  }

  const deleteProductCartHandler = (payload: ProductCart) => {
    setProductCarts(
      productCarts.filter((productCart) => productCart.id !== payload.id)
    )
  }

  const openModalFromProductCartHandler = (payload: ProductCart) => {
    setSelectedProductCart(payload)
    modalProductCartHandler()
  }

  const inputDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value)
    setCartDate(date)
  }

  const submitModalProductCartHandler = (payload: ProductCart) => {
    if (selectedProductCart) {
      const newProduct: ProductCart = {
        ...selectedProductCart,
        name: payload.name,
      }
      setSelectedProductCart(undefined)
      setProductCarts(
        productCarts.map((productCart) =>
          productCart.id === newProduct.id ? newProduct : productCart
        )
      )
    } else {
      setProductCarts([payload, ...productCarts])
    }

    modalProductCartHandler()
  }

  const storeCartHandler = () => {
    if (!user || isRequestStoreCart) return
    setIsRequestStoreCart(true)
    const cart: Cart = {
      ...getInitialCart(),
      uid: user.uid,
      date: new firebase.firestore.Timestamp(cartDate.getTime() / 1000, 0),
      products: productCarts,
    }
    const cartFirebase: CartFirebase = cartFirebaseFactory(cart)
    storeCart(cartFirebase)
      .then((res) => {
        setIsRequestStoreCart(false)
        setCarts([res, ...carts])
        pushSuccessAlert(defaultMessage.SUCCESS_STORE_CART)
        localStorage.removeItem('maojajan-productcart')
        pusher.toDashboardPage()
      })
      .catch((err) => {
        console.error(err)
        pushDangerAlert(defaultMessage.FAILED_STORE_CART)
      })
  }

  useEffect(() => {
    if (!user) return
    getProducts(user.uid)
      .then((payload) => {
        setProducts(payload)
      })
      .catch((err) => {
        console.error(err)
      })

    const productCartsLocalStorage = localStorage.getItem(
      'maojajan-productcart'
    )
    if (!productCartsLocalStorage) return
    setProductCarts(JSON.parse(productCartsLocalStorage))
  }, [])

  useEffect(() => {
    localStorage.setItem(
      'maojajan-productcart',
      JSON.stringify(!productCarts.length ? [] : productCarts)
    )
  }, [productCarts])

  return (
    <MainLayout>
      <HeadingLayout>Tambah keranjang</HeadingLayout>
      <InputDate
        placeholder="Untuk tanggal"
        icon="calendar--gray.svg"
        type="date"
        onChange={inputDateHandler}
        value={cartDate.toISOString().split('T')[0]}
      />
      <Button
        variant="outline-dashed"
        icon="/plus--primary.svg"
        align="center"
        style={{ margin: '16px 0' }}
        fullWidth
        onClick={openModalFromButton}
      >
        Tambah Produk
      </Button>
      {!productCarts.length ? (
        <EmptyProductCarts />
      ) : (
        <>
          <Button
            variant="primary"
            icon="cart--white.svg"
            align="center"
            style={{ marginBottom: '16px' }}
            onClick={storeCartHandler}
            isLoading={isRequestStoreCart}
          >
            Simpan
          </Button>
          <CaptionEditProduct />
        </>
      )}

      <ListProductCart>
        {productCarts.map((item) => {
          const productCartId = item.id
          return (
            <Card
              key={productCartId}
              style={{ height: '48px' }}
              onClickRemove={() => {
                deleteProductCartHandler(item)
              }}
              onClickBody={() => {
                openModalFromProductCartHandler(item)
              }}
            >
              <p>{item.name}</p>
            </Card>
          )
        })}
      </ListProductCart>
      <ProductCartModal
        closeHandler={modalProductCartHandler}
        isShow={isModalProductCartShow}
        payload={selectedProductCart}
        onClickButton={submitModalProductCartHandler}
        products={products}
      />
    </MainLayout>
  )
}
