import useHistoryPusher from '@/hooks/useHistoryPusher'
import React, { ReactElement, useState } from 'react'
import styled from 'styled-components'
import Button from '@/components/form/Button'
import { CSSTransition } from 'react-transition-group'
import Container from './Container'

interface Props extends React.HTMLAttributes<HTMLElement> {}

const MenuBarContainer = styled(Container)`
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  z-index: 5;
`

const MenuBarWrapper = styled.section`
  width: 100%;
  background-color: ${(props) => props.theme.color.primary};
  border-radius: 5px 5px 0 0;
  height: 62px;
  display: flex;
  justify-content: space-between;
`

const MenuItem = styled.section`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 34px;

  img {
    padding-bottom: 8px;
  }

  p {
    font-size: 10px;
    color: white !important;
  }
`

const LeftMenu = styled.section`
  display: flex;
  height: 100%;
  align-items: center;

  ${MenuItem} {
    margin-left: 22px;
  }
`

const RightMenu = styled(LeftMenu)`
  ${MenuItem} {
    margin-left: 0px;
    margin-right: 22px;
  }
`

const CenterAdd = styled.section<{ isClose: boolean }>`
  border: solid 5px #ffffff;
  background-color: ${(props) =>
    props.isClose ? props.theme.color.danger : props.theme.color.secondary};
  border-radius: 50%;
  height: 84px;
  width: 84px;
  display: flex;
  cursor: pointer;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  transition: 0.5s;

  img {
    margin: auto;
    transition: 0.5s;
    ${(props) => props.isClose && 'transform: rotate(315deg);'};
  }
`

const PopUpAddItem = styled.section`
  position: absolute;
  bottom: 110px;
  width: 222px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
`

const PopUpContent = styled.main`
  padding: 12px 18px;
  background-color: white;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  button {
    justify-content: center;
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
`

const ArrowPopUp = styled.img`
  margin: auto;
`

export default function MenuBar(props: Props): ReactElement {
  const history = useHistoryPusher()
  const [isPopUpShow, setIsPopUpShow] = useState<boolean>(false)

  const toDashboard = () => history.toDashboardPage()
  const toProfile = () => history.toProfilePage()
  const toAbout = () => history.toAboutPage()
  const toProducts = () => history.toProductsPage()
  const toAddCartPage = () => history.toAddCartPage()

  const togglePopUp = () => {
    setIsPopUpShow(!isPopUpShow)
  }

  return (
    <MenuBarContainer {...props}>
      <MenuBarWrapper>
        <LeftMenu>
          <MenuItem onClick={toDashboard}>
            <img src="/home--white.svg" alt="home icon" />
            <p>Home</p>
          </MenuItem>
          <MenuItem onClick={toProducts}>
            <img src="/product--white.svg" alt="product icon" />
            <p>Product</p>
          </MenuItem>
        </LeftMenu>
        <RightMenu>
          <MenuItem onClick={toProfile}>
            <img src="/user--white.svg" alt="user icon" />
            <p>User</p>
          </MenuItem>
          <MenuItem onClick={toAbout}>
            <img src="/smile--white.svg" alt="smile icon" />
            <p>About</p>
          </MenuItem>
        </RightMenu>
        <CenterAdd onClick={togglePopUp} isClose={isPopUpShow}>
          <img src="/plus--white.svg" alt="user icon" />
        </CenterAdd>
        <CSSTransition
          in={isPopUpShow}
          timeout={500}
          classNames="pop-up-add-item"
          unmountOnExit
        >
          <PopUpAddItem>
            <PopUpContent>
              <Button
                variant="secondary"
                fullWidth
                icon="/cart--white.svg"
                onClick={toAddCartPage}
              >
                Tambah keranjang
              </Button>
              <Button
                variant="secondary"
                fullWidth
                icon="/product--white.svg"
                onClick={toProducts}
              >
                Tambah Produk
              </Button>
            </PopUpContent>
            <ArrowPopUp src="/arrow-popup--white.svg" />
          </PopUpAddItem>
        </CSSTransition>
      </MenuBarWrapper>
    </MenuBarContainer>
  )
}
