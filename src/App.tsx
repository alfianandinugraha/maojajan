import React, { ReactElement, useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import StartPage from '@/pages/Start'
import LoginPage from '@/pages/Login'
import RegisterPage from '@/pages/Register'
import ResetPage from '@/pages/ResetPassword'
import DashboardPage from '@/pages/Dashboard'
import AddCartPage from '@/pages/AddCart'
import ProductsPage from '@/pages/Products'
import CartPage from '@/pages/Cart'
import AboutPage from '@/pages/About'
import ProfilePage from '@/pages/Profile'
import UpdatePasswordPage from '@/pages/UpdatePassword'
import UpdateEmailPage from '@/pages/UpdateEmail'
import VerifyPasswordPage from '@/pages/VerifyPassword'
import styled from 'styled-components'
import { useAtom } from 'jotai'
import firebase from 'firebase'
import { authAtom } from './store/authAtom'
import './theme/reset.css'
import './style/animation.css'
import { userAtom } from './store/userAtom'
import { getUser } from './http/user'
import AlertGroup from './components/Alert/AlertGroup'
import useTitlePage from './hooks/useTitlePage'

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

const App = (): ReactElement => {
  useTitlePage('Fetching...')
  const [, setIsLoggedIn] = useAtom(authAtom)
  const [, setUser] = useAtom(userAtom)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((data) => {
      if (data) {
        getUser(data.uid)
          .then((userInfo) => {
            setUser(userInfo)
            setIsLoggedIn(true)
          })
          .catch(() => {
            setIsLoggedIn(false)
          })
          .finally(() => {
            setIsLoading(false)
          })
        return
      }
      setIsLoggedIn(false)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) return <></>

  return (
    <RootStyles>
      <AlertGroup />
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
          <Route path="/reset-password" exact>
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
          <Route path="/update-email" exact>
            <UpdateEmailPage />
          </Route>
          <Route path="/verify-password" exact>
            <VerifyPasswordPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </RootStyles>
  )
}

export default App
