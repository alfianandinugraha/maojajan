import firebase from '@/utils/Firebase'
import { storeUser } from '@/http/User'
import { UserRegisterRequire } from 'Types'
import { initialTimestampNow } from '@/initials/intialFirebaseTImestamp'

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
          createdAt: initialTimestampNow,
          updatedAt: initialTimestampNow,
        })
      }
      resolve('Pendaftaran berhasil')
    } catch (err) {
      reject(err.code)
    }
  }

  return new Promise(processRequest)
}

export { registerUser }
