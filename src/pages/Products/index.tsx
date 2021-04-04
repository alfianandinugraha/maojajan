import React, { ReactElement, useEffect, useState } from 'react'
import MainLayout, {
  HeadingLayout,
  CaptionEditProduct,
} from '@/layout/MainLayout'
import styled from 'styled-components'
import { ProductBaseCard, CardAction } from '@/components/Card'
import { ProductBase, Product } from 'Types'
import AddProductButton from '@/components/AddProductButton'
import { userAtom } from '@/store/userAtom'
import { useAtom } from 'jotai'
import { storeProduct, getProducts } from '@/http/product'

const ListProductCart = styled.section`
  margin-top: 16px;

  & > * {
    margin-bottom: 16px;
  }
`

export default function index(): ReactElement {
  const [user] = useAtom(userAtom)
  const [products, setProducts] = useState<Product[]>([])

  const actionCardHandler = (type: CardAction, payload: ProductBase) => {
    console.log(type, payload)
  }

  const addProductHandler = (payload: string) => {
    if (!user) return
    storeProduct(payload, user.uid).then((data) => {
      console.log(data)
      console.log('produk berhasil disimpan')
      setProducts([data, ...products])
    })
  }

  useEffect(() => {
    console.log('fetching')
    if (!user) return
    getProducts(user.uid).then((data) => {
      setProducts(data)
    })
  }, [])

  return (
    <MainLayout>
      <HeadingLayout>List Produk</HeadingLayout>
      <AddProductButton
        style={{ marginBottom: '16px' }}
        payloadHandler={addProductHandler}
      />
      <CaptionEditProduct />
      <ListProductCart>
        {products.map((item) => (
          <ProductBaseCard
            key={item.id}
            payload={item}
            disabled={false}
            actionHandler={actionCardHandler}
          />
        ))}
      </ListProductCart>
    </MainLayout>
  )
}
