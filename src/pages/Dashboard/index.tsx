import CartCard from '@/components/card/CartCard'
import initialCarts from '@/initials/initialCarts'
import DashboardLayout from '@/layout/DashboardLayout'
import React, { ReactElement } from 'react'
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
  const checkCartHandler = (cartId: Cart) => {
    console.log(cartId)
  }

  const deleteCartHandler = (cartId: Cart) => {
    console.log(cartId)
  }

  const receiveActionHandler = (action: 'CHECK' | 'DELETE', cartId: Cart) => {
    switch (action) {
      case 'CHECK':
        checkCartHandler(cartId)
        break
      case 'DELETE':
        deleteCartHandler(cartId)
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
            key={item.id}
            item={item}
            actionHandler={receiveActionHandler}
          />
        ))}
      </div>
    </DashboardLayout>
  )
}
