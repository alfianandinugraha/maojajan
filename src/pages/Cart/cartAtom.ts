import { atom } from 'jotai'
import { Cart } from 'Types'
import getInitialCart from '@/initials/initialCart'

const cartAtom = atom<Cart>(getInitialCart())

export default cartAtom
