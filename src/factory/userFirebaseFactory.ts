import { User, UserFirebase } from 'Types'

const userFirebaseFactory = ({
  fullName,
  createdAt,
  updatedAt,
  email,
}: User): UserFirebase => ({ fullName, createdAt, updatedAt, email })

export { userFirebaseFactory }
