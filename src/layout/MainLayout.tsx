import Container from '@/components/Container'
import React, { ReactElement } from 'react'

interface Props extends React.HTMLAttributes<HTMLElement> {}

export default function MainLayout(props: Props): ReactElement {
  return <Container>{props.children}</Container>
}
