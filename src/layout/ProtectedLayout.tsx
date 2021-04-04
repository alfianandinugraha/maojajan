import React, { ReactElement } from 'react'
import { useAtom } from 'jotai'
import { authAtom } from '@/store/authAtom'
import { Redirect } from 'react-router-dom'

interface ChildredProps {
  children: React.ReactNode
}

interface ProtectedPageProps extends ChildredProps {
  children: React.ReactNode
  redirectTo: string
  isLoggedIn: boolean
}

const ProtectedRoute = (props: ProtectedPageProps): ReactElement =>
  props.isLoggedIn ? <>{props.children}</> : <Redirect to={props.redirectTo} />

const ProtectedAuthRoute = (props: ChildredProps): ReactElement => {
  const [isLoggedIn] = useAtom(authAtom)
  return (
    <ProtectedRoute isLoggedIn={!isLoggedIn} redirectTo="/dashboard">
      {props.children}
    </ProtectedRoute>
  )
}

const ProtectedMainRoute = (props: ChildredProps): ReactElement => {
  const [isLoggedIn] = useAtom(authAtom)
  return (
    <ProtectedRoute isLoggedIn={isLoggedIn} redirectTo="/">
      {props.children}
    </ProtectedRoute>
  )
}

export { ProtectedRoute, ProtectedAuthRoute, ProtectedMainRoute }
