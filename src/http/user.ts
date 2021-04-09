import firebase from '@/utils/Firebase'
import { User } from 'Types'
import { generateFirebaseTimestampNow } from '@/utils/Date'
import { userFirebaseFactory } from '@/factory/userFirebaseFactory'

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

const editUser = (user: User): Promise<void> => {
  const newUser: User = {
    ...user,
    updatedAt: generateFirebaseTimestampNow(),
  }

  return firebase
    .firestore()
    .collection('users')
    .doc(user.uid)
    .set(userFirebaseFactory(newUser))
}

export { storeUser, getUser, editUser }
