import React, { ReactElement } from 'react'
import { ProductCart } from 'Types'
import {
  CardTrash,
  CardItemContainer,
  LeftCart,
  CardContent,
} from '@/components/card/styled'
import styled from 'styled-components'

interface Props extends React.HTMLAttributes<HTMLElement> {
  product: ProductCart
}

const ProductCartCardContent = styled(CardContent)`
  p {
    color: ${(props) => props.theme.color.dark};
    font-size: 14px;
  }
`

export default function ProductCartItem(props: Props): ReactElement {
  return (
    <CardItemContainer {...props} disabled={false} style={{ height: '48px' }}>
      <LeftCart style={{ width: '12px' }} />
      <ProductCartCardContent>
        <p>{props.product.name}</p>
      </ProductCartCardContent>
      <CardTrash>
        <img src="trash--danger.svg" alt="" />
      </CardTrash>
    </CardItemContainer>
  )
}
