import { atom } from 'jotai'
import { Cart } from 'Types'

const cartsAtom = atom<Cart[]>([])

export { cartsAtom }
