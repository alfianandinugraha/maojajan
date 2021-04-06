import React from 'react'
import Firebase from 'firebase'
import {} from 'styled-components'

interface FirebaseTimestamp {
  createdAt: Firebase.firestore.Timestamp
  updatedAt: Firebase.firestore.Timestamp
}

interface ProductBase {
  id: string
  name: string
}

interface ProductCart extends ProductBase {
  isPurchased: boolean
}

interface CartFirebase extends FirebaseTimestamp {
  date: Firebase.firestore.Timestamp
  products: ProductCart[]
  uid: string
}

interface Cart extends CartFirebase {
  id: string
}

interface ProductFirebase extends FirebaseTimestamp {
  name: string
  uid: string
}

interface Product extends ProductFirebase, ProductBase {
  id: string
}

interface UserFirebase extends FirebaseTimestamp {
  fullName: string
  email: string
}

interface UserRegisterRequire {
  fullName: string
  email: string
  password: string
}

interface User extends UserFirebase {
  uid: string
}

interface DefaultAlertMessageProps {
  SUCCESS_LOGIN: string
  FAILED_LOGIN: string
  SUCCESS_REGISTER: string
  FAILED_REGISTER: string
  SUCCESS_UPDATE_EMAIL: string
  FAILED_UPDATE_EMAIL: string
  SUCCESS_UPDATE_PASSWORD: string
  FAILED_UPDATE_PASSWORD: string
  SUCCESS_STORE_CART: string
  FAILED_STORE_CART: string
  SUCCESS_UPDATE_CART: string
  FAILED_UPDATE_CART: string
  SUCCESS_REMOVE_CART: string
  FAILED_REMOVE_CART: string
  SUCCESS_STORE_PRODUCT: string
  FAILED_STORE_PRODUCT: string
  SUCCESS_UPDATE_PRODUCT: string
  FAILED_UPDATE_PRODUCT: string
  SUCCESS_REMOVE_PRODUCT: string
  FAILED_REMOVE_PRODUCT: string
}

type AlertVariant = 'danger' | 'success'

interface AlertProps {
  message?: string
  variant?: AlertVariant
  alertId: string
}

interface ThemeProps {
  color: {
    primary: string
    secondary: string
    danger: string
    success: string
    dark: string
    gray: string
  }
}

interface InputState<T> {
  value: T
  errorMessage: string
}

interface ValidationResult {
  errorMessage: string
}

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeProps {}
}

declare module 'Types' {
  export type {
    ThemeProps,
    InputState,
    ValidationResult,
    CartFirebase,
    Cart,
    ProductFirebase,
    Product,
    ProductBase,
    AlertVariant,
    DefaultAlertMessageProps,
  }
}
