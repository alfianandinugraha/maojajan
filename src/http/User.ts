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

const getUser = (uid: string): Promise<User> =>
  firebase
    .firestore()
    .collection('users')
    .doc(uid)
    .get()
    .then((doc) => ({ ...(doc.data() as User), uid: doc.id }))

export { storeUser, getUser }
