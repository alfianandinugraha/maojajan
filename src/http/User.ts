import firebase from '@/utils/Firebase'
import { User } from 'Types'

const storeUser = async ({
  uid,
  email,
  createdAt,
  updatedAt,
  fullName,
}: User): Promise<void> =>
  firebase
    .firestore()
    .collection('users')
    .doc(uid)
    .set({ email, createdAt, updatedAt, fullName })

export { storeUser }
