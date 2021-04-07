import React from 'react'
import styled from 'styled-components'

const EmptyProductCartsContainer = styled.section`
  text-align: center;
  margin-top: 120px;
`

const EmptyProductCarts = (): React.ReactElement => (
  <EmptyProductCartsContainer>Tidak ada produk</EmptyProductCartsContainer>
)

export default EmptyProductCarts
