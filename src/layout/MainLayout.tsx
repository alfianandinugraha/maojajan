import Container from '@/components/Container'
import React, { ReactElement } from 'react'
import styled from 'styled-components'
import MenuBar from '@/components/MenuBar'

interface Props extends React.HTMLAttributes<HTMLElement> {}

const Logo = styled.img`
  height: 16px;
  margin-top: 28px;
  cursor: pointer;
  margin-bottom: 34px;
`

const HeadingLayout = styled.h1`
  font-size: 24px !important;
  color: ${(props) => props.theme.color.dark};
  font-weight: bold;
  line-height: normal;
`

const MainContainer = styled(Container)`
  display: flex;
  flex-direction: column;
`

export default function MainLayout(props: Props): ReactElement {
  return (
    <MainContainer>
      <Logo src="MaoJajan-logo--primary.svg" alt="" />
      {props.children}
      <div style={{ marginBottom: '154px' }} />
      <MenuBar />
    </MainContainer>
  )
}

export { HeadingLayout }
