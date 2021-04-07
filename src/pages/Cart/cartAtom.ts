import { atom } from 'jotai'
import { Cart } from 'Types'
import { initialCart } from '@/initials/initialCart'

const cartAtom = atom<Cart>(initialCart)

export default cartAtom
