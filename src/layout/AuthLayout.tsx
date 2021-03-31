import Container from '@/components/Container'
import React, { ReactElement } from 'react'
import styled from 'styled-components'

type Props = React.HTMLAttributes<HTMLElement>

const AuthContainer = styled(Container)`
  background-color: ${(props) => props.theme.color.primary};
  min-height: 100vh;
`

export default function AuthLayout(props: Props): ReactElement {
  return <AuthContainer {...props}>{props.children}</AuthContainer>
}
