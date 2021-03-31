import React, { ReactElement } from 'react'
import styled from 'styled-components'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string
  fullWidth?: boolean
}

interface InputProps {
  fullWidth?: boolean
}

const Root = styled.div`
  position: relative;
`

const Input = styled.input<InputProps>`
  padding: 1rem;
  border-radius: 5px;
  background: #ffffff;
  font-size: 14px;
  border: 1px solid ${(props) => props.theme.color.gray};
  position: relative;
  ${(props) => props.fullWidth && 'width: 100%;'};

  &::placeholder {
    color: ${(props) => props.theme.color.gray};
  }
`

const ImageIcon = styled.img`
  width: 16px;
  height: 16px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 16px;
  z-index: 1;
`

export default function index(props: Props): ReactElement {
  return (
    <Root>
      {props.icon && <ImageIcon alt="icon" src={props.icon} />}
      <Input
        {...props}
        style={{
          paddingLeft: props.icon ? '48px' : '16px',
        }}
      />
    </Root>
  )
}
