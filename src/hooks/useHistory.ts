import { useHistory as history } from 'react-router-dom'
import { History } from 'history'

interface NavigationPusher extends History {
  toLoginPage: () => void
  toRegisterPage: () => void
  toResetPage: () => void
  toStartPage: () => void
}

const useHistory = (): NavigationPusher => {
  const pusher = history()
  const toLoginPage = () => pusher.push('/login')
  const toRegisterPage = () => pusher.push('/register')
  const toResetPage = () => pusher.push('/reset')
  const toStartPage = () => pusher.push('/')

  return {
    ...pusher,
    toLoginPage,
    toRegisterPage,
    toResetPage,
    toStartPage,
  }
}

export default useHistory
