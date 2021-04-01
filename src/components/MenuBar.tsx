import useHistory from '@/hooks/useHistory'
import React, { ReactElement } from 'react'
import styled from 'styled-components'
import Container from './Container'

interface Props extends React.HTMLAttributes<HTMLElement> {}

const MenuBarContainer = styled(Container)`
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
`

const MenuBarWrapper = styled.section`
  width: 100%;
  background-color: ${(props) => props.theme.color.secondary};
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

const CenterAdd = styled.section`
  border: solid 5px #ffffff;
  background-color: ${(props) => props.theme.color.secondary};
  border-radius: 50%;
  height: 84px;
  width: 84px;
  display: flex;
  cursor: pointer;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);

  img {
    margin: auto;
  }
`

export default function MenuBar(props: Props): ReactElement {
  const history = useHistory()

  const toDashboard = () => history.toDashboardPage()
  const toProfile = () => history.toProfilePage()
  const toAbout = () => history.toAboutPage()
  const toProducts = () => history.toProductsPage()

  return (
    <MenuBarContainer {...props}>
      <MenuBarWrapper>
        <LeftMenu>
          <MenuItem onClick={toDashboard}>
            <img src="home--white.svg" alt="home icon" />
            <p>Home</p>
          </MenuItem>
          <MenuItem onClick={toProducts}>
            <img src="product--white.svg" alt="product icon" />
            <p>Product</p>
          </MenuItem>
        </LeftMenu>
        <RightMenu>
          <MenuItem onClick={toProfile}>
            <img src="user--white.svg" alt="user icon" />
            <p>User</p>
          </MenuItem>
          <MenuItem onClick={toAbout}>
            <img src="smile--white.svg" alt="smile icon" />
            <p>About</p>
          </MenuItem>
        </RightMenu>
        <CenterAdd>
          <img src="plus--white.svg" alt="user icon" />
        </CenterAdd>
      </MenuBarWrapper>
    </MenuBarContainer>
  )
}
