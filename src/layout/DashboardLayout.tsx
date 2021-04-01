import Container from '@/components/Container'
import MenuBar from '@/components/MenuBar'
import React, { ReactElement } from 'react'
import styled from 'styled-components'

interface Props extends React.HTMLAttributes<HTMLElement> {}

const DashboardContainer = styled(Container)`
  background-color: ${(props) => props.theme.color.primary};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`

const Logo = styled.img`
  height: 16px;
  margin-top: 28px;
  margin-bottom: 28px;
  cursor: pointer;
`

export default function DashboardLayout(props: Props): ReactElement {
  return (
    <DashboardContainer>
      <Logo src="/MaoJajan-logo--white.svg" alt="MaoJajan logo" />
      {props.children}
      <MenuBar />
    </DashboardContainer>
  )
}
