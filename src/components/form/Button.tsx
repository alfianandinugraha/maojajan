import React, { ReactElement } from 'react'
import styled from 'styled-components'

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonProps {
  icon?: string
  fullWidth?: boolean
}

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'auth'
  fullWidth?: boolean
}

const ImageIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 16px;
`

const Children = styled.p`
  color: white !important;
`

const Button = styled.button<ButtonProps>`
  padding: 16px;
  ${(props) => props.fullWidth && 'width: 100%;'}
  ${(props) =>
    props.variant === 'primary' &&
    `background-color: ${props.theme.color.primary};`}
  ${(props) =>
    props.variant === 'secondary' &&
    `background-color: ${props.theme.color.secondary};`}
  ${(props) =>
    props.variant === 'auth' &&
    `
    background-color: white;
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
    `}
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;

  ${Children} {
    ${(props) =>
      props.variant === 'auth' &&
      `
      color: ${props.theme.color.primary} !important;
      width: 100%;
      text-align: center;
      `}
  }
`

export default function index(props: Props): ReactElement {
  return (
    <Button {...props}>
      {props.icon && <ImageIcon src={props.icon} alt="icon" />}
      <Children>{props.children}</Children>
    </Button>
  )
}
