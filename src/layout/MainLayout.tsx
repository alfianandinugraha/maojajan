import Container from '@/components/Container'
import React, { ReactElement } from 'react'
import styled from 'styled-components'
import MenuBar from '@/components/MenuBar'
import { useHistory } from 'react-router-dom'

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
  margin-bottom: 16px;
`

const BackButton = styled.div`
  background-color: ${(props) => props.theme.color.primary};
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  top: 20px;
  cursor: pointer;
`

const MainContainer = styled(Container)`
  display: flex;
  flex-direction: column;
`

const Information = styled.p`
  color: ${(props) => props.theme.color.gray} !important;
  font-size: 12px !important;
  margin-bottom: 12px;
`
const Background = styled.img`
  position: absolute;
  right: 0;
`

const CaptionEditProduct = (): ReactElement => (
  <Information>* Klik produk untuk mengedit</Information>
)

export default function MainLayout(props: Props): ReactElement {
  const history = useHistory()

  const backButtonHandler = () => {
    history.goBack()
  }

  return (
    <MainContainer>
      <BackButton onClick={backButtonHandler}>
        <img src="/back-arrow--white.svg" alt="Back" />
      </BackButton>
      <Logo src="/MaoJajan-logo--primary.svg" alt="" />
      <Background src="/bg-MainLayout.svg" />
      {props.children}
      <div style={{ marginBottom: '154px' }} />
      <MenuBar />
    </MainContainer>
  )
}

export { HeadingLayout, CaptionEditProduct }
