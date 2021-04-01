import { Cart } from 'Types'
import initialFirebaseTimestamp, {
  initialTimestamp,
} from './intialFirebaseTImestamp'

const initialCarts: Cart[] = [
  {
    id: Math.random().toString(),
    ...initialFirebaseTimestamp,
    date: initialTimestamp,
    products: [
      { id: Math.random().toString(), isPurchased: false, name: 'Pulsa 5000' },
      { id: Math.random().toString(), isPurchased: true, name: 'Pulsa 10000' },
      { id: Math.random().toString(), isPurchased: false, name: 'Pulsa 15000' },
    ],
  },
  {
    id: Math.random().toString(),
    ...initialFirebaseTimestamp,
    date: initialTimestamp,
    products: [
      { id: Math.random().toString(), isPurchased: false, name: 'Pulsa 5000' },
      { id: Math.random().toString(), isPurchased: false, name: 'Pulsa 10000' },
      { id: Math.random().toString(), isPurchased: false, name: 'Pulsa 15000' },
    ],
  },
  {
    id: Math.random().toString(),
    ...initialFirebaseTimestamp,
    date: initialTimestamp,
    products: [
      { id: Math.random().toString(), isPurchased: true, name: 'Pulsa 5000' },
      { id: Math.random().toString(), isPurchased: true, name: 'Pulsa 10000' },
      { id: Math.random().toString(), isPurchased: true, name: 'Pulsa 15000' },
    ],
  },
]

export default initialCarts
