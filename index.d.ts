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
  }
}
