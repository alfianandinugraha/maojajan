import { useAtom } from 'jotai'
import { cartsAtom } from '@/store/cartAtom'
import { Cart } from 'Types'

interface CartsSetter {
  update: (cart: Cart) => void
  remove: (cartId: string) => void
}

const useCartsAtom = (): [Cart[], CartsSetter] => {
  const [carts, setCarts] = useAtom(cartsAtom)

  const updateCart = (cart: Cart) => {
    setCarts(
      carts.map((cartItem) => (cartItem.id === cart.id ? cart : cartItem))
    )
  }

  const removeCart = (cartId: string) => {
    setCarts(carts.filter((cartItem) => cartItem.id !== cartId))
  }

  const setter: CartsSetter = {
    update: updateCart,
    remove: removeCart,
  }

  return [carts, setter]
}

export default useCartsAtom
