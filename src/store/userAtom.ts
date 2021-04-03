import { atom } from 'jotai'
import { User } from 'Types'

const userAtom = atom<User | null>(null)

export { userAtom }
