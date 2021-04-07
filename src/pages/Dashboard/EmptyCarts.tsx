import React from 'react'
import styled from 'styled-components'
import Button from '@/components/form/Button'
import useHistoryPusher from '@/hooks/useHistoryPusher'

interface Props extends React.HTMLAttributes<HTMLElement> {}

const EmptyCartsContainer = styled.section`
  padding: 16px;
  background-color: white;
  text-align: center;
  border-radius: 5px;
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.1);

  h3 {
    margin-bottom: 16px;
  }
`

const EmptyCarts = (props: Props): React.ReactElement => {
  const pusher = useHistoryPusher()

  const toAddCart = () => pusher.toAddCartPage()

  return (
    <EmptyCartsContainer {...props}>
      <h3>Tidak ada keranjang</h3>
      <Button
        variant="secondary"
        fullWidth
        align="center"
        icon="/plus--white.svg"
        onClick={toAddCart}
      >
        Tambah keranjang
      </Button>
    </EmptyCartsContainer>
  )
}

export default EmptyCarts
