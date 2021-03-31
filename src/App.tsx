import React, { ReactElement } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import StartPage from '@/pages/Start'
import LoginPage from '@/pages/Login'
import RegisterPage from '@/pages/Register'
import ResetPage from '@/pages/Reset'
import styled from 'styled-components'
import './theme/reset.css'

const RootStyles = styled.div`
  * {
    color: ${(props) => props.theme.color.dark};
    font-family: 'Hind Siliguri', sans-serif;
    font-size: 14px;
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
      </Switch>
    </BrowserRouter>
  </RootStyles>
)

export default App
