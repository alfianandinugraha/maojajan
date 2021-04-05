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
  const [user] = useAtom(userAtom)
  const [cartDate, setCartDate] = useState<Date>(new Date())

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
    if (!user) return
    const cart: Cart = {
      ...initialCart,
      uid: user.uid,
      date: new firebase.firestore.Timestamp(cartDate.getTime() / 1000, 0),
      products: productCarts,
    }
    const cartFirebase: CartFirebase = cartFirebaseFactory(cart)
    storeCart(cartFirebase).then((res) => {
      console.log('keranjang berhasil di tambahkan')
      console.log(res)
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
