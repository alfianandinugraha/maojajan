import { ProductCart } from 'Types'

const initialProductCart: ProductCart = {
  id: Math.random().toString(),
  name: 'Hello stuff',
  isPurchased: false,
}

export { initialProductCart }
