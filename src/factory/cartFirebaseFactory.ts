import { Cart, CartFirebase } from 'Types'

const cartFirebaseFactory = ({
  createdAt,
  updatedAt,
  date,
  products,
  uid,
}: Cart): CartFirebase => ({
  createdAt,
  updatedAt,
  date,
  products,
  uid,
})

export { cartFirebaseFactory }
