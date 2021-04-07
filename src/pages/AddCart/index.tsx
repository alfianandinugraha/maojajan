import React, { ReactElement, useEffect, useState } from 'react'
import MainLayout, {
  HeadingLayout,
  CaptionEditProduct,
} from '@/layout/MainLayout'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'
import styled from 'styled-components'
import { ProductBaseCard, CardAction } from '@/components/Card'
import { ProductBase, ProductCart, Cart, CartFirebase, InputState } from 'Types'
import AddProductButton from '@/components/AddProductButton'
import { initialProductCart } from '@/initials/initialProductCart'
import { useAtom } from 'jotai'
import { userAtom } from '@/store/userAtom'
import { initialCart } from '@/initials/initialCart'
import firebase from '@/utils/Firebase'
import { cartFirebaseFactory } from '@/factory/cartFirebaseFactory'
import { storeCart } from '@/http/cart'
import useHistoryPusher from '@/hooks/useHistoryPusher'
import usePushAlert from '@/hooks/usePushAlert'
import { cartsAtom } from '@/store/cartAtom'
import Modal, { ModalTitle, ModalContent } from '@/components/Modal'
import initialInputState from '@/initials/initialInputState'
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
  const [productCartName, setProductCartName] = useState<InputState<string>>(
    initialInputState
  )
  const [productCartQuantity, setProductCartQuantity] = useState('')
  const [selectedProductCart, setSelectedProductCart] = useState<
    ProductCart | undefined
  >()
  const [cartDate, setCartDate] = useState<Date>(new Date())
  const pusher = useHistoryPusher()
  const [carts, setCarts] = useAtom(cartsAtom)

  const modalProductCartHandler = () => {
    if (isModalProductCartShow) {
      setProductCartName(initialInputState)
      setProductCartQuantity('')
    }
    setIsModalProductCartShow(!isModalProductCartShow)
  }

  const inputProductCartName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductCartName({
      value: e.target.value,
      errorMessage: e.target.value ? '' : 'Data tidak boleh kosong',
    })
  }

  const inputProductCartQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductCartQuantity(e.target.value)
  }

  const actionCardHandler = (type: CardAction, payload: ProductBase) => {
    console.log(type, payload)
    switch (type) {
      case 'DELETE':
        setProductCarts(
          productCarts.filter((productCart) => productCart.id !== payload.id)
        )
        break
      case 'CLICK':
        setSelectedProductCart(payload as ProductCart)
        setProductCartName({
          ...productCartName,
          value: payload.name,
        })
        modalProductCartHandler()
        break
      default:
    }
  }

  const inputDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value)
    setCartDate(date)
  }

  const submitModalProductCartHandler = () => {
    if (!productCartName.value) return

    if (selectedProductCart) {
      console.log('update cart !!')
      console.log(`Updating ${selectedProductCart.name}...`)
      const newProduct: ProductCart = {
        ...selectedProductCart,
        name: `${productCartQuantity} ${productCartName.value}`,
      }
      setSelectedProductCart(undefined)
      setProductCarts(
        productCarts.map((productCart) =>
          productCart.id === newProduct.id ? newProduct : productCart
        )
      )
    }

    modalProductCartHandler()
  }

  const addProductHandler = (payload: string) => {
    const productCart = {
      ...initialProductCart,
      name: payload,
      id: Math.random().toString(),
    }
    setProductCarts([productCart, ...productCarts])
  }

  const storeCartHandler = () => {
    if (!user || isRequestStoreCart) return
    setIsRequestStoreCart(true)
    const cart: Cart = {
      ...initialCart,
      uid: user.uid,
      date: new firebase.firestore.Timestamp(cartDate.getTime() / 1000, 0),
      products: productCarts,
    }
    const cartFirebase: CartFirebase = cartFirebaseFactory(cart)
    storeCart(cartFirebase)
      .then((res) => {
        console.log('keranjang berhasil di tambahkan')
        setIsRequestStoreCart(false)
        setCarts([res, ...carts])
        pushSuccessAlert(defaultMessage.SUCCESS_STORE_CART)
        pusher.toDashboardPage()
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
        pushDangerAlert(defaultMessage.FAILED_STORE_CART)
      })
  }

  useEffect(() => {
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
      <AddProductButton
        payloadHandler={addProductHandler}
        style={{ margin: '16px 0' }}
      />
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
        {productCarts.map((item) => (
          <ProductBaseCard
            key={item.id}
            payload={item}
            disabled={false}
            actionHandler={actionCardHandler}
          />
        ))}
      </ListProductCart>

      <Modal
        closeHandler={modalProductCartHandler}
        isShow={isModalProductCartShow}
        header={<ModalTitle>Ubah Produk</ModalTitle>}
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
            onClick={submitModalProductCartHandler}
          >
            Ubah Produk
          </Button>
        }
      />
    </MainLayout>
  )
}
