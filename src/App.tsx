import React, { ReactElement } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import StartPage from '@/pages/Start'
import LoginPage from '@/pages/Login'
import RegisterPage from '@/pages/Register'
import ResetPage from '@/pages/Reset'
import DashboardPage from '@/pages/Dashboard'
import AddCartPage from '@/pages/AddCart'
import ProductsPage from '@/pages/Products'
import CartPage from '@/pages/Cart'
import AboutPage from '@/pages/About'
import ProfilePage from '@/pages/Profile'
import UpdatePasswordPage from '@/pages/UpdatePassword'
import styled from 'styled-components'
import './theme/reset.css'

const RootStyles = styled.div`
  * {
    color: ${(props) => props.theme.color.dark};
    font-family: 'Hind Siliguri', sans-serif;
    font-size: 14px;
    box-sizing: border-box;
  }

  a {
    color: ${(props) => props.theme.color.primary};
    text-decoration: none;
  }
`

const App = (): ReactElement => (
  <RootStyles>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <StartPage />
        </Route>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/register" exact>
          <RegisterPage />
        </Route>
        <Route path="/reset" exact>
          <ResetPage />
        </Route>
        <Route path="/dashboard" exact>
          <DashboardPage />
        </Route>
        <Route path="/add-cart" exact>
          <AddCartPage />
        </Route>
        <Route path="/products" exact>
          <ProductsPage />
        </Route>
        <Route path="/carts/:id" exact>
          <CartPage />
        </Route>
        <Route path="/about" exact>
          <AboutPage />
        </Route>
        <Route path="/profile" exact>
          <ProfilePage />
        </Route>
        <Route path="/update-password" exact>
          <UpdatePasswordPage />
        </Route>
      </Switch>
    </BrowserRouter>
  </RootStyles>
)

export default App
