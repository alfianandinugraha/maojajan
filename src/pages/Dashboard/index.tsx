import { CartCard, CardAction } from '@/components/Card'
import DashboardLayout from '@/layout/DashboardLayout'
import React, { ReactElement, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Cart } from 'Types'
import { getCarts, finishCart, unfinishCart, removeCart } from '@/http/cart'
import { useAtom } from 'jotai'
import { cartsAtom } from '@/store/cartAtom'
import { userAtom } from '@/store/userAtom'
import usePushAlert from '@/hooks/usePushAlert'
import EmptyCarts from './EmptyCarts'

interface ButtonFiltersStateProps {
  text: string
  isSelected: boolean
  id: string
}

const Header = styled.header`
  margin-bottom: 12px;

  * {
    color: white !important;
  }

  p,
  h1 {
    text-align: center;
  }

  p {
    font-size: 16px !important;
    line-height: normal;
  }

  h1 {
    font-size: 36px !important;
    font-weight: bold;
    line-height: normal;
  }
`

const CartElement = styled(CartCard)`
  &:not(:last-child) {
    margin-bottom: 16px;
  }
`

const ButtonFilterGroup = styled.section`
  display: flex;
  justify-content: center;
`

const ButtonFilter = styled.button<{ isSelected?: boolean }>`
  background-color: white;
  border: none;
  border-radius: 5px;
  padding: 8px;
  margin-right: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  font-size: 12px !important;
  color: ${(props) => props.theme.color.primary} !important;

  ${(props) =>
    props.isSelected &&
    `
    background-color: ${props.theme.color.primary} !important;
    border: 1px solid white !important;
    color: white !important;
  `}
`

export default function index(): ReactElement {
  const [carts, setCarts] = useAtom(cartsAtom)
  const [filteredCarts, setFilteredCarts] = useState(carts)
  const { pushDangerAlert, pushSuccessAlert, defaultMessage } = usePushAlert()
  const [user] = useAtom(userAtom)
  const [buttonFiltersState, setButtonFiltersState] = useState<
    ButtonFiltersStateProps[]
  >([
    { text: 'Belum selesai', isSelected: true, id: 'FINISH' },
    { text: 'Selesai', isSelected: false, id: 'UNFINISH' },
    { text: 'Semua', isSelected: false, id: 'ALL' },
  ])
  const history = useHistory()

  const editCarts = (newCart: Cart) =>
    carts.map((cart) => (cart.id === newCart.id ? newCart : cart))

  const updateFilteredCarts = (id: string) => {
    let newCarts: Cart[] = [...carts]
    switch (id) {
      case 'FINISH':
        newCarts = carts.filter(
          (cart) => !cart.products.every((product) => product.isPurchased)
        )
        break
      case 'UNFINISH':
        newCarts = carts.filter((cart) =>
          cart.products.every((product) => product.isPurchased)
        )
        break
      default:
    }
    setFilteredCarts(newCarts)
  }

  const switchButtonFilter = (id: string) => {
    setButtonFiltersState(
      buttonFiltersState.map((item) => ({
        ...item,
        isSelected: item.id === id,
      }))
    )
    updateFilteredCarts(id)
  }

  const checkCartHandler = (cartPayload: Cart) => {
    finishCart(cartPayload)
      .then((res: Cart) => {
        setCarts(editCarts(res))
        pushSuccessAlert(defaultMessage.SUCCESS_UPDATE_CART)
      })
      .catch((err) => {
        console.log(err)
        pushDangerAlert(defaultMessage.FAILED_UPDATE_CART)
      })
  }

  const unfinishCartHandler = (cartPayload: Cart) => {
    unfinishCart(cartPayload)
      .then((res: Cart) => {
        setCarts(editCarts(res))
        pushSuccessAlert(defaultMessage.SUCCESS_UPDATE_CART)
      })
      .catch((err) => {
        console.log(err)
        pushDangerAlert(defaultMessage.FAILED_UPDATE_CART)
      })
  }

  const deleteCartHandler = (cartId: Cart) => {
    console.log(cartId)
    removeCart(cartId.id)
      .then(() => {
        pushSuccessAlert(defaultMessage.SUCCESS_REMOVE_CART)
        setCarts(carts.filter((cart) => cart.id !== cartId.id))
      })
      .catch((err) => {
        console.log(err)
        pushDangerAlert(defaultMessage.FAILED_REMOVE_CART)
      })
  }

  const receiveActionHandler = (action: CardAction, cartId: Cart) => {
    switch (action) {
      case 'FINISH':
        checkCartHandler(cartId)
        break
      case 'UNFINISH':
        unfinishCartHandler(cartId)
        break
      case 'DELETE':
        deleteCartHandler(cartId)
        break
      case 'CLICK':
        history.push(`/carts/${cartId.id}`)
        break
      default:
    }
  }

  useEffect(() => {
    if (!user || carts.length) return
    getCarts(user.uid).then((data) => {
      console.log(data)
      setCarts(data)
      setFilteredCarts(data)
    })
  }, [])

  useEffect(() => {
    if (!carts.length) return
    const selectedButtonFilterId = buttonFiltersState.filter(
      (item) => item.isSelected
    )[0].id
    updateFilteredCarts(selectedButtonFilterId)
  }, [carts])

  return (
    <DashboardLayout>
      <Header>
        <p>Hello,</p>
        <h1>Alfian Andi</h1>
      </Header>
      {!carts.length ? (
        <EmptyCarts />
      ) : (
        <>
          <ButtonFilterGroup>
            {buttonFiltersState.map((item) => (
              <ButtonFilter
                type="button"
                isSelected={item.isSelected}
                key={item.id}
                onClick={() => switchButtonFilter(item.id)}
              >
                {item.text}
              </ButtonFilter>
            ))}
          </ButtonFilterGroup>
          <div>
            {filteredCarts.map((item) => (
              <CartElement
                disabled={item.products.every((product) => product.isPurchased)}
                key={item.id}
                payload={item}
                actionHandler={receiveActionHandler}
              />
            ))}
          </div>
        </>
      )}
    </DashboardLayout>
  )
}
