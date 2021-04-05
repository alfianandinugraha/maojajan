import { Cart } from 'Types'
import { initialTimestampNow } from './intialFirebaseTImestamp'

const initialCart: Cart = {
  createdAt: initialTimestampNow,
  updatedAt: initialTimestampNow,
  date: initialTimestampNow,
  uid: '',
  products: [],
  id: '',
}

export { initialCart }
