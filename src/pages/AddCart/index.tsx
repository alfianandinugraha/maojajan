import React, { ReactElement, useState } from 'react'
import MainLayout, {
  HeadingLayout,
  CaptionEditProduct,
} from '@/layout/MainLayout'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'
import styled from 'styled-components'
import { ProductBaseCard, CardAction } from '@/components/Card'
import { ProductBase, ProductCart, Cart, CartFirebase } from 'Types'
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
  const [cartDate, setCartDate] = useState<Date>(new Date())
  const pusher = useHistoryPusher()
  const [carts, setCarts] = useAtom(cartsAtom)

  const actionCardHandler = (type: CardAction, payload: ProductBase) => {
    console.log(type, payload)
  }

  const inputDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value)
    setCartDate(date)
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
    </MainLayout>
  )
}
