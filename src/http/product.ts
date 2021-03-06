import firebase from '@/utils/Firebase'
import { Product, ProductFirebase } from 'Types'
import { productFirebaseFactory } from '@/factory/productFirebaseFactory'
import { generateFirebaseTimestampNow } from '@/utils/Date'

const storeProduct = (productName: string, uid: string): Promise<Product> => {
  const firebaseData: ProductFirebase = {
    name: productName,
    uid,
    createdAt: generateFirebaseTimestampNow(),
    updatedAt: generateFirebaseTimestampNow(),
  }

  return firebase
    .firestore()
    .collection('products')
    .add(firebaseData)
    .then((data) => ({ ...firebaseData, id: data.id }))
}

const getProducts = (uid: string): Promise<Product[]> =>
  firebase
    .firestore()
    .collection('products')
    .where('uid', '==', uid)
    .get()
    .then((ref) => {
      const result: Product[] = []
      ref.forEach((doc) => {
        result.push({
          ...(doc.data() as Product),
          id: doc.id,
        })
      })
      return result
    })

const removeProduct = (id: string): Promise<void> =>
  firebase.firestore().collection('products').doc(id).delete()

const editProduct = (product: Product): Promise<void> =>
  firebase
    .firestore()
    .collection('products')
    .doc(product.id)
    .set({
      ...productFirebaseFactory(product),
      updatedAt: generateFirebaseTimestampNow(),
    })

export { storeProduct, getProducts, removeProduct, editProduct }
