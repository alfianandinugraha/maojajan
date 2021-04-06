import { atom } from 'jotai'
import { AlertProps } from 'Types'

const alertsAtom = atom<AlertProps[]>([])

export { alertsAtom }
