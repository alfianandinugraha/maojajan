import React, { useEffect } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styled from 'styled-components'
import { useAtom } from 'jotai'
import { alertsAtom } from '@/store/alertAtom'
import Alert from '@/components/Alert/Alert'

const AlertGroupWrapper = styled.section`
  position: fixed;
  max-width: 322px;
  width: 100%;
  right: 0;
  top: 24px;
  z-index: 150;
  max-height: 244px;
  overflow: hidden;
`

const ALERT_TIMEOUT = 1500

const AlertGroup = (): React.ReactElement => {
  const [alerts, setAlerts] = useAtom(alertsAtom)

  useEffect(() => {
    if (!alerts.length) return
    const updateAlertTimeout = setTimeout(() => {
      const newAlerts = [...alerts]
      newAlerts.pop()
      setAlerts(newAlerts)
    }, ALERT_TIMEOUT)
    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(updateAlertTimeout)
    }
  }, [alerts])

  return (
    <AlertGroupWrapper>
      <TransitionGroup>
        {alerts.map((alert) => (
          <CSSTransition
            timeout={500}
            classNames="alert"
            key={alert.alertId}
            unmountOnExit
          >
            <Alert {...alert} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </AlertGroupWrapper>
  )
}

export default AlertGroup
