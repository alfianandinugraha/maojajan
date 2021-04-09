import { ComponentType } from 'react'
import { generateRandomString } from '@/utils/Random'
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

interface Route {
  component: ComponentType
  id: string
  title: string
  path: string
}

const routes: Route[] = [
  {
    component: DashboardPage,
    id: generateRandomString(),
    title: 'Dashboard',
    path: '/dashboard',
  },
  {
    component: StartPage,
    id: generateRandomString(),
    title: 'Welcome',
    path: '/',
  },
  {
    component: LoginPage,
    id: generateRandomString(),
    title: 'Login',
    path: '/login',
  },
  {
    component: RegisterPage,
    id: generateRandomString(),
    title: 'Register',
    path: '/register',
  },
  {
    component: ResetPage,
    id: generateRandomString(),
    title: 'Reset password',
    path: '/reset-password',
  },
  {
    component: AddCartPage,
    id: generateRandomString(),
    title: 'Tambah keranjang',
    path: '/add-cart',
  },
  {
    component: ProductsPage,
    id: generateRandomString(),
    title: 'Produk',
    path: '/products',
  },
  {
    component: CartPage,
    id: generateRandomString(),
    title: 'Keranjang',
    path: '/carts/:id',
  },
  {
    component: AboutPage,
    id: generateRandomString(),
    title: 'Tentang',
    path: '/about',
  },
  {
    component: ProfilePage,
    id: generateRandomString(),
    title: 'Profil',
    path: '/profile',
  },
  {
    component: UpdatePasswordPage,
    id: generateRandomString(),
    title: 'Ubah password',
    path: '/update-password',
  },
  {
    component: UpdateEmailPage,
    id: generateRandomString(),
    title: 'Ubah email',
    path: '/update-email',
  },
  {
    component: VerifyPasswordPage,
    id: generateRandomString(),
    title: 'Verifikasi password',
    path: '/verify-email',
  },
]

export default routes
