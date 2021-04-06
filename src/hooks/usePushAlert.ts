import { useAtom } from 'jotai'
import { alertsAtom } from '@/store/alertAtom'
import { AlertVariant } from 'Types'

interface PushAlertHookProps {
  pushDangerAlert: (message: string) => void
  pushSuccessAlert: (message: string) => void
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
  }
}

export default usePushAlert
