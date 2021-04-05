import { CartCard, CardAction } from '@/components/Card'
import DashboardLayout from '@/layout/DashboardLayout'
import React, { ReactElement, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Cart } from 'Types'
import { getCarts, finishCart, unfinishCart, removeCart } from '@/http/cart'
import { useAtom } from 'jotai'
import { cartsAtom } from '@/store/cartAtom'
import { userAtom } from '@/store/userAtom'

const Header = styled.header`
  margin-bottom: 12px;

  * {
    color: white !important;
  }

  p,
  h1 {
    text-align: center;
  }

  p {
    font-size: 16px !important;
    line-height: normal;
  }

  h1 {
    font-size: 36px !important;
    font-weight: bold;
    line-height: normal;
  }
`

const CartElement = styled(CartCard)`
  &:not(:last-child) {
    margin-bottom: 16px;
  }
`

export default function index(): ReactElement {
  const [carts, setCarts] = useAtom(cartsAtom)
  const [user] = useAtom(userAtom)
  const history = useHistory()

  const editCarts = (newCart: Cart) =>
    carts.map((cart) => (cart.id === newCart.id ? newCart : cart))

  const checkCartHandler = (cartPayload: Cart) => {
    finishCart(cartPayload).then((res: Cart) => setCarts(editCarts(res)))
  }

  const unfinishCartHandler = (cartPayload: Cart) => {
    unfinishCart(cartPayload).then((res: Cart) => setCarts(editCarts(res)))
  }

  const deleteCartHandler = (cartId: Cart) => {
    console.log(cartId)
    removeCart(cartId.id).then(() => {
      setCarts(carts.filter((cart) => cart.id !== cartId.id))
    })
  }

  const receiveActionHandler = (action: CardAction, cartId: Cart) => {
    switch (action) {
      case 'FINISH':
        checkCartHandler(cartId)
        break
      case 'UNFINISH':
        unfinishCartHandler(cartId)
        break
      case 'DELETE':
        deleteCartHandler(cartId)
        break
      case 'CLICK':
        history.push(`/carts/${cartId.id}`)
        break
      default:
    }
  }

  useEffect(() => {
    if (!user) return
    getCarts(user.uid).then((data) => {
      console.log(data)
      setCarts(data)
    })
  }, [])

  return (
    <DashboardLayout>
      <Header>
        <p>Hello,</p>
        <h1>Alfian Andi</h1>
      </Header>
      <div>
        {carts.map((item) => (
          <CartElement
            disabled={item.products.every((product) => product.isPurchased)}
            key={item.id}
            payload={item}
            actionHandler={receiveActionHandler}
          />
        ))}
      </div>
    </DashboardLayout>
  )
}
