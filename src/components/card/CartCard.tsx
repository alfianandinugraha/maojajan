import DateFormat from '@/utils/DateFormat'
import React, { ReactElement } from 'react'
import {
  CardTrash,
  CardItemContainer,
  LeftCart,
  CardContent,
} from '@/components/card/styled'
import { Cart } from 'Types'

interface Props extends React.HTMLAttributes<HTMLElement> {
  item: Cart
  actionHandler: (type: 'CHECK' | 'DELETE', cartId: Cart) => void
}

export default function CartCard(props: Props): ReactElement {
  const isPurchased = props.item.products.every((item) => item.isPurchased)

  const passingCheckedCart = () => {
    props.actionHandler('CHECK', props.item)
  }

  const passingDeleteCart = () => {
    props.actionHandler('DELETE', props.item)
  }

  return (
    <CardItemContainer {...props} disabled={isPurchased}>
      <LeftCart onClick={passingCheckedCart}>
        <img
          src={isPurchased ? 'check--dark.svg' : 'check--white.svg'}
          alt=""
        />
      </LeftCart>
      <CardContent>
        <h2>{DateFormat(props.item.date)}</h2>
        <p>{props.item.products.length} barang</p>
      </CardContent>
      <CardTrash onClick={passingDeleteCart}>
        <img src="trash--danger.svg" alt="" />
      </CardTrash>
    </CardItemContainer>
  )
}
