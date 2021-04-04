import { Product, ProductFirebase } from 'Types'

const productFirebaseFactory = ({
  uid,
  name,
  createdAt,
  updatedAt,
}: Product): ProductFirebase => ({ uid, name, createdAt, updatedAt })

export { productFirebaseFactory }
