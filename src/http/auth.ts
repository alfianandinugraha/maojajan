import firebase from '@/utils/Firebase'
import { storeUser, getUser } from '@/http/user'
import { User, UserRegisterRequire } from 'Types'
import { generateFirebaseTimestampNow } from '@/utils/Date'

const validateLoginUser = (
  email: string,
  password: string
): Promise<firebase.auth.UserCredential> =>
  firebase.auth().signInWithEmailAndPassword(email, password)

const registerUser = (userInfo: UserRegisterRequire): Promise<string> => {
  const processRequest = async (
    resolve: (message: string) => void,
    reject: (message: string) => void
  ) => {
    try {
      const authRequest = await firebase
        .auth()
        .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
      if (authRequest.user) {
        await storeUser({
          uid: authRequest.user.uid,
          fullName: userInfo.fullName,
          email: userInfo.email,
          createdAt: generateFirebaseTimestampNow(),
          updatedAt: generateFirebaseTimestampNow(),
        })
      }
      resolve('Pendaftaran berhasil')
    } catch (err) {
      reject(err.code)
    }
  }

  return new Promise(processRequest)
}

const loginUser = async (email: string, password: string): Promise<User> => {
  const processRequest = async (
    resolve: (user: User) => void,
    reject: (message: string) => void
  ) => {
    try {
      const authRequest = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
      if (authRequest.user) {
        const userInfo: User = await getUser(authRequest.user.uid)
        resolve(userInfo)
        return
      }
    } catch (err) {
      reject(err.code)
    }
  }

  return new Promise(processRequest)
}

const logoutUser = (): Promise<void> => firebase.auth().signOut()

const resetPassword = (email: string): Promise<void> =>
  firebase.auth().sendPasswordResetEmail(email)

const verifyResetCode = (actionCode: string): Promise<string> =>
  firebase.auth().verifyPasswordResetCode(actionCode)

const confirmResetPassword = (
  actionCode: string,
  newPassword: string
): Promise<void> =>
  firebase.auth().confirmPasswordReset(actionCode, newPassword)

export {
  registerUser,
  loginUser,
  logoutUser,
  validateLoginUser,
  resetPassword,
  verifyResetCode,
  confirmResetPassword,
}
