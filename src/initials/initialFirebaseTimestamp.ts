import { FirebaseTimestamp } from 'Types'
import { generateFirebaseTimestampNow } from '@/utils/Date'

const getInitialFirebaseTimestamp = (): FirebaseTimestamp => {
  const timestamp = generateFirebaseTimestampNow()

  return {
    createdAt: timestamp,
    updatedAt: timestamp,
  }
}

export default getInitialFirebaseTimestamp
