import React, { ReactElement } from 'react'
import styled from 'styled-components'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string
  fullWidth?: boolean
  errorMessage?: string
}

interface InputErrorMessageProps extends React.HTMLAttributes<HTMLDivElement> {}

interface InputProps {
  fullWidth?: boolean
}

const Root = styled.div`
  position: relative;
`

const InputContainer = styled.div`
  position: relative;
  z-index: 1;
`

const Input = styled.input<InputProps>`
  padding: 1rem;
  border-radius: 5px;
  background: ${(props) =>
    props.disabled ? props.theme.color.gray : '#ffffff'};
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

const RootErrorMessage = styled.div`
  background-color: ${(props) => props.theme.color.danger};
  color: white !important;
  padding: 8px;
  padding-top: 13px;
  border-radius: 0 0 5px 5px;
  position: relative;
  top: -5px;
`

const InputErrorMessage = (props: InputErrorMessageProps): ReactElement => (
  <RootErrorMessage>{props.children}</RootErrorMessage>
)

export default function index(props: Props): ReactElement {
  return (
    <Root>
      <InputContainer>
        {props.icon && <ImageIcon alt="icon" src={props.icon} />}
        <Input
          {...props}
          style={{
            paddingLeft: props.icon ? '48px' : '16px',
          }}
        />
      </InputContainer>
      {props.errorMessage && (
        <InputErrorMessage>{props.errorMessage}</InputErrorMessage>
      )}
    </Root>
  )
}

export { InputErrorMessage }
