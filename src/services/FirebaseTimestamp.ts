import Firebase from 'firebase'

const generateFirebaseTimestampNow = (): Firebase.firestore.Timestamp =>
  new Firebase.firestore.Timestamp(new Date().getTime() / 1000, 0)

export { generateFirebaseTimestampNow }
