import { Product } from 'Types'
import initialFirebaseTimestamp from './intialFirebaseTImestamp'

const initialProduct: Product = {
  uid: 'helloworlduser',
  name: 'Pizza XL Tomatoes',
  id: Math.random().toString(),
  ...initialFirebaseTimestamp,
}

const initialProducts: Product[] = [
  {
    uid: 'helloworlduser',
    name: 'Pizza XL Tomatoes',
    id: Math.random().toString(),
    ...initialFirebaseTimestamp,
  },
  {
    uid: 'helloworlduser',
    name: 'Pizza XL Tomatoes',
    id: Math.random().toString(),
    ...initialFirebaseTimestamp,
  },
  {
    uid: 'helloworlduser',
    name: 'Pizza XL Tomatoes',
    id: Math.random().toString(),
    ...initialFirebaseTimestamp,
  },
]

export { initialProduct, initialProducts }
