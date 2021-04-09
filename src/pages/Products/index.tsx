import React, { ReactElement, useEffect, useState } from 'react'
import MainLayout, {
  HeadingLayout,
  CaptionEditProduct,
} from '@/layout/MainLayout'
import styled from 'styled-components'
import { Product, InputState } from 'Types'
import { userAtom } from '@/store/userAtom'
import { useAtom } from 'jotai'
import {
  storeProduct,
  getProducts,
  removeProduct,
  editProduct,
} from '@/http/product'
import Modal, { ModalTitle, ModalContent } from '@/components/Modal'
import Input from '@/components/Form/Input'
import Button from '@/components/Form/Button'
import getInitialProduct from '@/initials/initialProduct'
import usePushAlert from '@/hooks/usePushAlert'
import initialInputState from '@/initials/initialInputState'
import Card from '@/components/Card'
import useTitlePage from '@/hooks/useTitlePage'
import EmptyProductCarts from '../AddCart/EmptyProductCarts'

const ListProductCart = styled.section`
  margin-top: 16px;

  & > * {
    margin-bottom: 16px;
  }
`

export default function index(): ReactElement {
  useTitlePage('Produk')
  const [user] = useAtom(userAtom)
  const { pushDangerAlert, pushSuccessAlert, defaultMessage } = usePushAlert()
  const [isModalEditProductShow, setIsModalEditProductShow] = useState(false)
  const [isModalAddProductShow, setIsModalAddProductShow] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product>(
    getInitialProduct()
  )
  const [productName, setProductName] = useState('')
  const [addProductName, setAddProductName] = useState<InputState<string>>(
    initialInputState
  )
  const [isRequestAddProductName, setIsRequestAddProductName] = useState(false)

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

  const storeProductToFirebaseHandler = () => {
    if (!user || !addProductName.value || isRequestAddProductName) return
    setIsRequestAddProductName(true)
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
      .finally(() => {
        setIsRequestAddProductName(false)
      })
  }

  const removeProductHandler = (id: string) => {
    removeProduct(id)
      .then(() => {
        pushSuccessAlert(defaultMessage.SUCCESS_REMOVE_PRODUCT)
        setProducts(products.filter((product) => product.id !== id))
      })
      .catch((err) => {
        console.error(err)
        pushDangerAlert(defaultMessage.FAILED_REMOVE_PRODUCT)
      })
  }

  const clickCardHandler = (product: Product) => {
    setProductName(product.name)
    setSelectedProduct(product)
    toggleModalEditProduct()
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
    setSelectedProduct(getInitialProduct())
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
      {!products.length ? (
        <EmptyProductCarts />
      ) : (
        <ListProductCart>
          {products.map((item) => {
            const { id } = item
            return (
              <Card
                key={id}
                style={{ height: '48px' }}
                onClickRemove={() => {
                  console.log(`removing ${id}...`)
                  removeProductHandler(id)
                }}
                onClickBody={() => {
                  console.log('Opening modal...')
                  clickCardHandler(item)
                }}
              >
                <p>{item.name}</p>
              </Card>
            )
          })}
          {/* <ProductBaseCard
              key={item.id}
              payload={item}
              disabled={false}
              actionHandler={actionCardHandler}
            /> */}
        </ListProductCart>
      )}
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
            isLoading={isRequestAddProductName}
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
