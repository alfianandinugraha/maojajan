import firebase from '@/utils/Firebase'
import { CartFirebase, Cart } from 'Types'
import { cartFirebaseFactory } from '@/factory/cartFirebaseFactory'

const storeCart = (cart: CartFirebase): Promise<Cart> =>
  firebase
    .firestore()
    .collection('carts')
    .add(cart)
    .then((res) => ({ ...cart, id: res.id }))

const getCarts = (uid: string): Promise<Cart[]> =>
  firebase
    .firestore()
    .collection('carts')
    .orderBy('date', 'asc')
    .where('uid', '==', uid)
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

const getCartById = (id: string): Promise<Cart> =>
  firebase
    .firestore()
    .collection('carts')
    .doc(id)
    .get()
    .then((res) => ({ ...(res.data() as Cart), id }))

const editCart = (cart: Cart): Promise<Cart> =>
  firebase
    .firestore()
    .collection('carts')
    .doc(cart.id)
    .set(cartFirebaseFactory(cart))
    .then(() => cart)

const removeCart = (id: string): Promise<void> =>
  firebase.firestore().collection('carts').doc(id).delete()

const editAllIsPurchased = (cart: Cart, value: boolean) => {
  const newProducts = cart.products.map((product) => ({
    ...product,
    isPurchased: value,
  }))
  const newCart = {
    ...cart,
    products: newProducts,
  }

  return newCart
}

const finishCart = (cart: Cart): Promise<Cart> =>
  editCart(editAllIsPurchased(cart, true))
const unfinishCart = (cart: Cart): Promise<Cart> =>
  editCart(editAllIsPurchased(cart, false))

export {
  storeCart,
  getCarts,
  finishCart,
  unfinishCart,
  removeCart,
  getCartById,
  editCart,
}
