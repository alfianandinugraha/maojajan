import DateFormat from '@/utils/DateFormat'
import React, { ReactElement } from 'react'
import { Cart, ProductBase, ProductCart } from 'Types'
import styled from 'styled-components'

export type CardAction =
  | 'CHECK'
  | 'DELETE'
  | 'EDIT_PRODUCT'
  | 'FINISH'
  | 'CLICK'
  | 'UNFINISH'

interface Props<T> extends React.HTMLAttributes<HTMLElement> {
  payload: T
  disabled: boolean
  actionHandler: (type: CardAction, sendPayload: T) => void
}

const FinishCart = styled.div`
  background-color: ${(props) => props.theme.color.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 46px;
  border-radius: 5px 0 0 5px;
  cursor: pointer;
`

const CardContent = styled.div`
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

const CardTrash = styled.div`
  position: absolute;
  right: 18px;
  cursor: pointer;
  top: 50%;
  transform: translateY(-50%);
`

const CardItemContainer = styled.section<{ disabled: boolean }>`
  height: 64px;
  display: flex;
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  border-radius: 5px;

  ${CardContent} {
    background-color: ${(props) => (props.disabled ? '#D7D7D7' : 'white')};
  }

  ${FinishCart} {
    background-color: ${(props) =>
      props.disabled ? props.theme.color.gray : props.theme.color.secondary};
  }
`

const ProductCartCardContent = styled(CardContent)`
  p {
    color: ${(props) => props.theme.color.dark};
    font-size: 14px;
  }
`

export default function Card<T>(props: Props<T>): ReactElement {
  const passingDeleteCart = () => {
    props.actionHandler('DELETE', props.payload)
  }

  return (
    <CardItemContainer {...props} disabled={props.disabled}>
      {props.children}
      <CardTrash onClick={passingDeleteCart}>
        <img src="/trash--danger.svg" alt="" />
      </CardTrash>
    </CardItemContainer>
  )
}

const CartCard = (props: Props<Cart>): ReactElement => {
  const unfinishCartCardHandler = () => {
    props.actionHandler('UNFINISH', props.payload)
  }

  const finishCartCardHandler = () => {
    props.actionHandler('FINISH', props.payload)
  }

  const clickContentHandler = () => {
    props.actionHandler('CLICK', props.payload)
  }

  return (
    <Card<Cart> {...props}>
      <FinishCart
        onClick={
          props.disabled ? unfinishCartCardHandler : finishCartCardHandler
        }
      >
        <img
          src={props.disabled ? '/check--dark.svg' : '/check--white.svg'}
          alt=""
        />
      </FinishCart>
      <CardContent onClick={clickContentHandler}>
        <h2>{DateFormat(props.payload.date)}</h2>
        <p>{props.payload.products.length} barang</p>
      </CardContent>
    </Card>
  )
}

const ProductCartCard = (props: Props<ProductCart>): ReactElement => {
  const finishHandler = () => {
    props.actionHandler('FINISH', props.payload)
  }

  const clickContentHandler = () => {
    props.actionHandler('CLICK', props.payload)
  }

  return (
    <>
      <Card<ProductCart> {...props} style={{ height: '48px' }}>
        <FinishCart onClick={finishHandler}>
          <img
            src={props.disabled ? '/check--dark.svg' : '/check--white.svg'}
            alt=""
          />
        </FinishCart>
        <ProductCartCardContent onClick={clickContentHandler}>
          <p>{props.payload.name}</p>
        </ProductCartCardContent>
      </Card>
    </>
  )
}

const ProductBaseCard = (props: Props<ProductBase>): ReactElement => {
  const clickContentHandler = () => {
    props.actionHandler('CLICK', props.payload)
  }

  return (
    <>
      <Card<ProductBase> {...props} style={{ height: '48px' }}>
        <FinishCart style={{ width: '12px' }} />
        <ProductCartCardContent onClick={clickContentHandler}>
          <p>{props.payload.name}</p>
        </ProductCartCardContent>
      </Card>
    </>
  )
}

export { CartCard, ProductBaseCard, ProductCartCard }
