import firebase from '@/utils/Firebase'
import { CartFirebase, Cart } from 'Types'

const storeCart = (cart: CartFirebase): Promise<Cart> =>
  firebase
    .firestore()
    .collection('carts')
    .add(cart)
    .then((res) => ({ ...cart, id: res.id }))

export { storeCart }
