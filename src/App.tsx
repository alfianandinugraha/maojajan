import React, { ReactElement } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import StartPage from '@/pages/Start'
import LoginPage from '@/pages/Login'
import RegisterPage from '@/pages/Register'
import ResetPage from '@/pages/Reset'

const App = (): ReactElement => (
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
)

export default App
