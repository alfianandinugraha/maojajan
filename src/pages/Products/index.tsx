import React, { ReactElement, useEffect, useState } from 'react'
import MainLayout, {
  HeadingLayout,
  CaptionEditProduct,
} from '@/layout/MainLayout'
import styled from 'styled-components'
import { ProductBaseCard, CardAction } from '@/components/Card'
import { ProductBase, Product, InputState } from 'Types'
import { userAtom } from '@/store/userAtom'
import { useAtom } from 'jotai'
import {
  storeProduct,
  getProducts,
  removeProduct,
  editProduct,
} from '@/http/product'
import Modal, { ModalTitle, ModalContent } from '@/components/Modal'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'
import { initialProduct } from '@/initials/initialProduct'
import usePushAlert from '@/hooks/usePushAlert'
import initialInputState from '@/initials/initialInputState'

const ListProductCart = styled.section`
  margin-top: 16px;

  & > * {
    margin-bottom: 16px;
  }
`

export default function index(): ReactElement {
  const [user] = useAtom(userAtom)
  const { pushDangerAlert, pushSuccessAlert, defaultMessage } = usePushAlert()
  const [isModalEditProductShow, setIsModalEditProductShow] = useState(false)
  const [isModalAddProductShow, setIsModalAddProductShow] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product>(
    initialProduct
  )
  const [productName, setProductName] = useState('')
  const [addProductName, setAddProductName] = useState<InputState<string>>(
    initialInputState
  )

  const toggleModalEditProduct = () => {
    setIsModalEditProductShow(!isModalEditProductShow)
  }

  const toggleModalAddProduct = () => {
    setAddProductName(initialInputState)
    setIsModalAddProductShow(!isModalAddProductShow)
  }

  const inputProductNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value)
  }

  const inputAddProductNameHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAddProductName({
      value: e.target.value,
      errorMessage: e.target.value ? '' : 'Data tidak boleh kosong',
    })
  }

  const actionCardHandler = (type: CardAction, payload: ProductBase) => {
    if (type === 'DELETE') {
      removeProduct(payload.id)
        .then(() => {
          pushSuccessAlert(defaultMessage.SUCCESS_REMOVE_PRODUCT)
          setProducts(products.filter((product) => product.id !== payload.id))
        })
        .catch((err) => {
          console.error(err)
          pushDangerAlert(defaultMessage.FAILED_REMOVE_PRODUCT)
        })
    }

    if (type === 'CLICK') {
      const product: Product = payload as Product
      setProductName(payload.name)
      setSelectedProduct(product)
      toggleModalEditProduct()
    }
  }

  const storeProductToFirebaseHandler = () => {
    if (!user || !addProductName.value) return

    storeProduct(addProductName.value, user.uid)
      .then((data) => {
        pushSuccessAlert(defaultMessage.SUCCESS_STORE_PRODUCT)
        setProducts([data, ...products])
        toggleModalAddProduct()
      })
      .catch((err) => {
        console.log(err)
        pushDangerAlert(defaultMessage.FAILED_STORE_PRODUCT)
      })
  }

  const submitEditProduct = () => {
    if (!selectedProduct.id) return
    const productData = { ...selectedProduct, name: productName }
    editProduct(productData)
      .then(() => {
        pushSuccessAlert(defaultMessage.SUCCESS_UPDATE_PRODUCT)
        setProducts(
          products.map((product) =>
            product.id === selectedProduct.id ? productData : product
          )
        )
      })
      .catch((err) => {
        console.log(err)
        pushDangerAlert(defaultMessage.FAILED_UPDATE_PRODUCT)
      })
    setSelectedProduct(initialProduct)
    setProductName('')
    toggleModalEditProduct()
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
      <Button
        variant="outline-dashed"
        icon="/plus--primary.svg"
        align="center"
        style={{ marginBottom: '16px' }}
        onClick={toggleModalAddProduct}
      >
        Tambah Produk
      </Button>
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
      <Modal
        isShow={isModalEditProductShow}
        closeHandler={toggleModalEditProduct}
        header={<ModalTitle>Edit Produk</ModalTitle>}
        content={
          <ModalContent>
            <Input
              fullWidth
              placeholder="Nama produk"
              onChange={inputProductNameHandler}
              value={productName}
            />
          </ModalContent>
        }
        footer={
          <Button
            variant="primary"
            icon="/product--white.svg"
            align="center"
            fullWidth
            onClick={submitEditProduct}
          >
            Edit Produk
          </Button>
        }
      />
      <Modal
        closeHandler={toggleModalAddProduct}
        isShow={isModalAddProductShow}
        header={<ModalTitle>Tambah Produk</ModalTitle>}
        content={
          <>
            <ModalContent>
              <Input
                list="products"
                placeholder="Pilih / input produk"
                fullWidth
                onChange={inputAddProductNameHandler}
                {...addProductName}
              />
            </ModalContent>
          </>
        }
        footer={
          <Button
            variant="primary"
            icon="/plus--white.svg"
            align="center"
            fullWidth
            onClick={
              !addProductName.errorMessage
                ? storeProductToFirebaseHandler
                : undefined
            }
          >
            Tambah Produk
          </Button>
        }
      />
    </MainLayout>
  )
}
