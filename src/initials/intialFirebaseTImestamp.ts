import { FirebaseTimestamp } from 'Types'
import Firebase from 'firebase'

const initialTimestamp = new Firebase.firestore.Timestamp(0, 0)

const initialFirebaseTimestamp: FirebaseTimestamp = {
  createdAt: new Firebase.firestore.Timestamp(0, 0),
  updatedAt: new Firebase.firestore.Timestamp(0, 0),
}

export default initialFirebaseTimestamp
export { initialTimestamp }
