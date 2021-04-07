import { ProductCart } from 'Types'

const initialProductCart: ProductCart = {
  id: Math.random().toString(),
  name: '',
  isPurchased: false,
}

export { initialProductCart }
