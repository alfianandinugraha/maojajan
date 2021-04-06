import { useAtom } from 'jotai'
import { alertsAtom } from '@/store/alertAtom'
import { AlertVariant, DefaultAlertMessageProps } from 'Types'

const defaultAlertMessage: DefaultAlertMessageProps = {
  SUCCESS_LOGIN: 'Login berhasil',
  FAILED_LOGIN: 'Login gagal',
  SUCCESS_REGISTER: 'Register berhasil',
  FAILED_REGISTER: 'Register gagal',
  SUCCESS_UPDATE_EMAIL: 'Ubah email berhasil',
  FAILED_UPDATE_EMAIL: 'Ubah email gagal',
  SUCCESS_UPDATE_PASSWORD: 'Ubah password berhasil',
  FAILED_UPDATE_PASSWORD: 'Ubah password gagal',
  SUCCESS_STORE_CART: 'Keranjang berhasil ditambahkan',
  FAILED_STORE_CART: 'Keranjang gagal ditambahkan',
  SUCCESS_UPDATE_CART: 'Keranjang berhasil diperbarui',
  FAILED_UPDATE_CART: 'Keranjang berhasil gagal diperbarui',
  SUCCESS_REMOVE_CART: 'Keranjang berhasil dihapus',
  FAILED_REMOVE_CART: 'Keranjang gagal dihapus',
  SUCCESS_STORE_PRODUCT: 'Produk berhasil ditambahkan',
  FAILED_STORE_PRODUCT: 'Produk gagal ditambahkan',
  SUCCESS_UPDATE_PRODUCT: 'Produk berhasil diperbarui',
  FAILED_UPDATE_PRODUCT: 'Produk berhasil gagal diperbarui',
  SUCCESS_REMOVE_PRODUCT: 'Produk berhasil dihapus',
  FAILED_REMOVE_PRODUCT: 'Produk gagal dihapus',
  SUCCESS_UPDATE_FULLNAME: 'Nama berhasil diperbaharui',
  FAILED_UPDATE_FULLNAME: 'Nama gagal diperbaharui',
}

interface PushAlertHookProps {
  pushDangerAlert: (message: string) => void
  pushSuccessAlert: (message: string) => void
  defaultMessage: DefaultAlertMessageProps
}

const usePushAlert = (): PushAlertHookProps => {
  const [alerts, setAlerts] = useAtom(alertsAtom)

  const pushAlert = (variant: AlertVariant, message: string) => {
    setAlerts([
      {
        alertId: Math.random().toString(),
        message,
        variant,
      },
      ...alerts,
    ])
  }

  const pushDangerAlert = (message: string) => {
    pushAlert('danger', message)
  }

  const pushSuccessAlert = (message: string) => {
    pushAlert('success', message)
  }

  return {
    pushDangerAlert,
    pushSuccessAlert,
    defaultMessage: defaultAlertMessage,
  }
}

export default usePushAlert
