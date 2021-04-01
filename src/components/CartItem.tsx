import DateFormat from '@/utils/DateFormat'
import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { Cart } from 'Types'

interface Props extends React.HTMLAttributes<HTMLElement> {
  item: Cart
  actionHandler: (type: 'CHECK' | 'DELETE', cartId: Cart) => void
}

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

const CartItemContainer = styled.section<{ isPurchased: boolean }>`
  height: 64px;
  display: flex;
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.1);
  position: relative;

  ${CartContent} {
    background-color: ${(props) => (props.isPurchased ? '#D7D7D7' : 'white')};
  }

  ${CheckCart} {
    background-color: ${(props) =>
      props.isPurchased ? props.theme.color.gray : props.theme.color.secondary};
  }
`

export default function CartItem(props: Props): ReactElement {
  const isPurchased = props.item.products.every((item) => item.isPurchased)

  const passingCheckedCart = () => {
    props.actionHandler('CHECK', props.item)
  }

  const passingDeletCart = () => {
    props.actionHandler('DELETE', props.item)
  }

  return (
    <CartItemContainer {...props} isPurchased={isPurchased}>
      <CheckCart onClick={passingCheckedCart}>
        <img
          src={isPurchased ? 'check--dark.svg' : 'check--white.svg'}
          alt=""
        />
      </CheckCart>
      <CartContent>
        <h2>{DateFormat(props.item.date)}</h2>
        <p>{props.item.products.length} barang</p>
      </CartContent>
      <CartTrash onClick={passingDeletCart}>
        <img src="trash--danger.svg" alt="" />
      </CartTrash>
    </CartItemContainer>
  )
}
