import { Cart } from 'Types'
import { generateFirebaseTimestampNow } from '@/utils/Date'
import getInitialFirebaseTimestamp from './initialFirebaseTimestamp'

const getInitialCart = (): Cart => ({
  ...getInitialFirebaseTimestamp(),
  date: generateFirebaseTimestampNow(),
  uid: '',
  products: [],
  id: '',
})

export default getInitialCart
