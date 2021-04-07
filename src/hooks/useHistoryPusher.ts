import { useHistory } from 'react-router-dom'

interface NavigationPusher {
  toLoginPage: () => void
  toRegisterPage: () => void
  toResetPage: () => void
  toStartPage: () => void
  toAboutPage: () => void
  toDashboardPage: () => void
  toProfilePage: () => void
  toProductsPage: () => void
  toAddCartPage: () => void
  toAddProductPage: () => void
  toUpdateEmailPage: () => void
  toUpdatePasswordPage: () => void
}

const useHistoryPusher = (): NavigationPusher => {
  const pusher = useHistory()
  const toLoginPage = () => pusher.push('/login')
  const toRegisterPage = () => pusher.push('/register')
  const toResetPage = () => pusher.push('/reset-password')
  const toStartPage = () => pusher.push('/')
  const toAboutPage = () => pusher.push('/about')
  const toDashboardPage = () => pusher.push('/dashboard')
  const toProfilePage = () => pusher.push('/profile')
  const toProductsPage = () => pusher.push('/products')
  const toAddCartPage = () => pusher.push('/add-cart')
  const toAddProductPage = () => pusher.push('/add-product')
  const toUpdateEmailPage = () => pusher.push('/update-email')
  const toUpdatePasswordPage = () => pusher.push('/update-password')

  return {
    toLoginPage,
    toRegisterPage,
    toResetPage,
    toStartPage,
    toProductsPage,
    toAboutPage,
    toDashboardPage,
    toProfilePage,
    toAddProductPage,
    toAddCartPage,
    toUpdateEmailPage,
    toUpdatePasswordPage,
  }
}

export default useHistoryPusher
