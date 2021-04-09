import { Product } from 'Types'
import getInitialFirebaseTimestamp from './initialFirebaseTimestamp'

const getInitialProduct = (): Product => ({
  uid: 'helloworlduser',
  name: 'Pizza XL Tomatoes',
  id: '',
  ...getInitialFirebaseTimestamp(),
})

export default getInitialProduct
