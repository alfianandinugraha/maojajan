import React, { ReactElement } from 'react'
import styled from 'styled-components'

interface Props extends React.HTMLAttributes<HTMLElement> {
  variant?: 'p' | 'h1'
}

const P = styled.p`
  font-size: 14px;
`

const H1 = styled.h1`
  font-size: 24px;
  font-weight: bold;
`

export default function Typography(props: Props): ReactElement {
  if (props.variant === 'h1') {
    return <H1 {...props}>{props.children}</H1>
  }

  return <P {...props}>{props.children}</P>
}

Typography.defaultProps = {
  variant: 'p',
}
