import React, { ReactElement } from 'react'
import styled from 'styled-components'

interface Props extends React.HTMLAttributes<HTMLElement> {}

const CartItemContainer = styled.section`
  height: 64px;
  display: flex;
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.1);
  position: relative;
`

const CheckCart = styled.div`
  background-color: ${(props) => props.theme.color.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 46px;
  border-radius: 5px 0 0 5px;
  cursor: pointer;
`

const CartContent = styled.div`
  background-color: white;
  width: 100%;
  border-radius: 0 5px 5px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 14px;
  cursor: pointer;

  h2 {
    font-size: 16px;
    font-weight: bold;
    line-height: normal;
  }

  p {
    font-size: 12px;
    color: ${(props) => props.theme.color.gray};
    line-height: normal;
  }
`

const CartTrash = styled.div`
  position: absolute;
  right: 18px;
  cursor: pointer;
  top: 50%;
  transform: translateY(-50%);
`

export default function CartItem(props: Props): ReactElement {
  return (
    <CartItemContainer {...props}>
      <CheckCart>
        <img src="check--white.svg" alt="" />
      </CheckCart>
      <CartContent>
        <h2>23 April 2020</h2>
        <p>5 barang</p>
      </CartContent>
      <CartTrash>
        <img src="trash--danger.svg" alt="" />
      </CartTrash>
    </CartItemContainer>
  )
}
