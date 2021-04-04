import firebase from '@/utils/Firebase'
import { initialTimestampNow } from '@/initials/intialFirebaseTImestamp'
import { Product } from 'Types'

const storeProduct = (
  productName: string,
  uid: string
): Promise<
  firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
> =>
  firebase.firestore().collection('products').add({
    name: productName,
    uid,
    createdAt: initialTimestampNow,
    updatedAt: initialTimestampNow,
  })

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
export { storeProduct, getProducts }
