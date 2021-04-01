import React, { ReactElement } from 'react'
import styled from 'styled-components'

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonProps {
  icon?: string
  fullWidth?: boolean
  align?: 'center' | 'left' | 'right'
}

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'auth' | 'outline-dashed'
  fullWidth?: boolean
  align?: 'center' | 'left' | 'right'
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
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
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
  ${(props) =>
    props.variant === 'outline-dashed' &&
    `
    background-color: white;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='5' ry='5' stroke='%23477998FF' stroke-width='2' stroke-dasharray='10%2c 5' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
    `}
  ${(props) => props.align && `justify-content: ${props.align};`}

  ${Children} {
    ${(props) =>
      props.variant === 'auth' &&
      `
      color: ${props.theme.color.primary} !important;
      width: 100%;
      text-align: center;
      `}
    ${(props) =>
      props.variant === 'outline-dashed' &&
      `
      color: ${props.theme.color.primary} !important;
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
