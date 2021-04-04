import { CartCard, CardAction } from '@/components/Card'
import initialCarts from '@/initials/initialCarts'
import DashboardLayout from '@/layout/DashboardLayout'
import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Cart } from 'Types'

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
  const history = useHistory()

  const checkCartHandler = (cartId: Cart) => {
    console.log(cartId)
  }

  const deleteCartHandler = (cartId: Cart) => {
    console.log(cartId)
  }

  const receiveActionHandler = (action: CardAction, cartId: Cart) => {
    switch (action) {
      case 'FINISH':
        checkCartHandler(cartId)
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

  return (
    <DashboardLayout>
      <Header>
        <p>Hello,</p>
        <h1>Alfian Andi</h1>
      </Header>
      <div>
        {initialCarts.map((item) => (
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
