import CartItem from '@/components/CartItem'
import DashboardLayout from '@/layout/DashboardLayout'
import React, { ReactElement } from 'react'
import styled from 'styled-components'

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

const Cart = styled(CartItem)`
  &:not(:last-child) {
    margin-bottom: 16px;
  }
`

export default function index(): ReactElement {
  return (
    <DashboardLayout>
      <Header>
        <p>Hello,</p>
        <h1>Alfian Andi</h1>
      </Header>
      <div>
        {[1, 2, 3, 4, 5].map((item) => (
          <Cart key={item} />
        ))}
      </div>
    </DashboardLayout>
  )
}
