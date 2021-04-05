import firebase from '@/utils/Firebase'
import { CartFirebase, Cart } from 'Types'

const storeCart = (cart: CartFirebase): Promise<Cart> =>
  firebase
    .firestore()
    .collection('carts')
    .add(cart)
    .then((res) => ({ ...cart, id: res.id }))

const getCarts = (): Promise<Cart[]> =>
  firebase
    .firestore()
    .collection('carts')
    .get()
    .then((res) => {
      const result: Cart[] = []
      res.forEach((doc) => {
        result.push({
          ...(doc.data() as Cart),
          id: doc.id,
        })
      })
      return result
    })

export { storeCart, getCarts }
