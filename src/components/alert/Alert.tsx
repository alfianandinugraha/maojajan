import React from 'react'
import { AlertProps } from 'Types'
import styled from 'styled-components'

interface Props extends React.HTMLAttributes<HTMLElement>, AlertProps {}

const AlartIconWrapper = styled.section`
  border-radius: 5px 0 0 5px;
  width: 49px;
  background-color: rgba(50, 50, 44, 0.25);
  height: 100%;
  display: flex;
  img {
    margin: auto;
    width: 16px;
    height: 16px;
  }
`

const AlertContianer = styled.section<Props>`
  background-color: ${(props) => props.theme.color.success};
  height: 49px;
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 5px 0 0 5px;
  margin-bottom: 12px;
  position: relative;
  ${(props) =>
    props.variant === 'danger' &&
    `background-color: ${props.theme.color.danger};`}
  p {
    color: white !important;
    margin-left: 12px;
  }
  ${AlartIconWrapper} {
    img {
      ${(props) =>
        props.variant === 'danger' &&
        `
        transform: rotate(45deg);
      `}
    }
  }
`

const Alert = (props: Props): React.ReactElement => (
  <AlertContianer {...props}>
    <AlartIconWrapper>
      {props.variant === 'success' && (
        <img src="/check--white.svg" alt="success icon" />
      )}
      {props.variant === 'danger' && (
        <img src="/plus--white.svg" alt="failed icon" />
      )}
    </AlartIconWrapper>
    <p>{props.message}</p>
  </AlertContianer>
)

export default Alert
