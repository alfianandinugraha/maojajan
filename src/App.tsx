import React, { ReactElement, useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { useAtom } from 'jotai'
import firebase from '@/utils/Firebase'
import routes from '@/routes'
import {
  ProtectedMainRoute,
  ProtectedAuthRoute,
} from '@/routes/ProtectComponent'
import { authAtom } from './store/authAtom'
import './theme/reset.css'
import './style/animation.css'
import { userAtom } from './store/userAtom'
import { getUser } from './http/user'
import AlertGroup from './components/Alert/AlertGroup'
import useTitlePage from './hooks/useTitlePage'
import TitlePage from './components/TitlePage'
import ErrorPage from './pages/Error'

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
          {routes.map((route) => (
            <Route path={route.path} exact key={route.id}>
              <TitlePage title={route.title} />
              {route.isProtected ? (
                <ProtectedMainRoute>
                  <route.component />
                </ProtectedMainRoute>
              ) : (
                <ProtectedAuthRoute>
                  <route.component />
                </ProtectedAuthRoute>
              )}
            </Route>
          ))}
          <Route>
            <ErrorPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </RootStyles>
  )
}

export default App
