import Container from '@/components/Container'
import MenuBar from '@/components/MenuBar'
import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { ProtectedMainRoute } from './ProtectedLayout'

interface Props extends React.HTMLAttributes<HTMLElement> {}

const DashboardContainer = styled(Container)`
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

const Background = styled.section`
  position: absolute;
  top: 0;
  z-index: -1;
  left: 0;
  width: 100vw;
  height: 300px;
  img {
    height: 100%;
    width: 100%;
  }
`

export default function DashboardLayout(props: Props): ReactElement {
  return (
    <ProtectedMainRoute>
      <DashboardContainer>
        <Background>
          <img src="bg-dashboard.png" alt="" />
        </Background>
        <Logo src="/MaoJajan-logo--white.svg" alt="MaoJajan logo" />
        {props.children}
        <MenuBar />
      </DashboardContainer>
    </ProtectedMainRoute>
  )
}
