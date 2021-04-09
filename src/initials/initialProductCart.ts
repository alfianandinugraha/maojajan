import { ProductCart } from 'Types'

const getInitialProductCart = (): ProductCart => ({
  id: Math.random().toString(),
  name: '',
  isPurchased: false,
})

export default getInitialProductCart
