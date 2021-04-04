import firebase from '@/utils/Firebase'
import { initialTimestampNow } from '@/initials/intialFirebaseTImestamp'

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
export { storeProduct }
