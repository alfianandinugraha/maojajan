import { useHistory as history } from 'react-router-dom'
import { History } from 'history'

interface NavigationPusher extends History {
  toLoginPage: () => void
  toRegisterPage: () => void
  toResetPage: () => void
  toStartPage: () => void
  toAboutPage: () => void
  toDashboardPage: () => void
  toProfilePage: () => void
  toProductsPage: () => void
}

const useHistory = (): NavigationPusher => {
  const pusher = history()
  const toLoginPage = () => pusher.push('/login')
  const toRegisterPage = () => pusher.push('/register')
  const toResetPage = () => pusher.push('/reset')
  const toStartPage = () => pusher.push('/')
  const toAboutPage = () => pusher.push('/about')
  const toDashboardPage = () => pusher.push('/dashboard')
  const toProfilePage = () => pusher.push('/profile')
  const toProductsPage = () => pusher.push('/products')

  return {
    ...pusher,
    toLoginPage,
    toRegisterPage,
    toResetPage,
    toStartPage,
    toProductsPage,
    toAboutPage,
    toDashboardPage,
    toProfilePage,
  }
}

export default useHistory
